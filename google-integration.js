(() => {
  'use strict';
  const CLIENT_ID = '880960556492-d8gqjubk3n9upbn8vpgh2rdjtmtp93u4.apps.googleusercontent.com';
  const SCOPE = 'https://www.googleapis.com/auth/calendar.events';
  const form = document.getElementById('meetingRequest');
  const status = document.getElementById('googleStatus');
  const connect = document.getElementById('connectGoogle');
  const create = document.getElementById('scheduleMeeting');
  const resultLink = document.getElementById('calendarResult');
  let token = null;
  let expiresAt = 0;
  let busy = false;
  let completed = false;
  let requestId = null;
  const say = message => { status.textContent = message; };
  const clearToken = () => { token = null; expiresAt = 0; create.disabled = true; };

  function details() {
    if (!form.reportValidity()) return null;
    const start = new Date(form.elements.meetingTime.value);
    if (!Number.isFinite(start.getTime()) || start.getTime() <= Date.now()) {
      say('Choose a future date and time.');
      return null;
    }
    return {
      name: form.elements.visitorName.value.trim(),
      email: form.elements.visitorEmail.value.trim(),
      topic: form.elements.meetingTopic.value,
      message: form.elements.meetingMessage.value.trim(),
      start,
      end: new Date(start.getTime() + 30 * 60 * 1000)
    };
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = details();
    if (!data) return;
    const body = `Hi Omid,\n\nI'd like to request a 30-minute ${data.topic.toLowerCase()} conversation.\n\nName: ${data.name}\nReply to: ${data.email}\nProposed time: ${data.start.toString()}\nUTC: ${data.start.toISOString()}\n\n${data.message}\n\nPlease confirm your availability and share a meeting link.`;
    window.location.href = `mailto:aomid6362@gmail.com?subject=${encodeURIComponent(`Tested by Omid — ${data.topic} request`)}&body=${encodeURIComponent(body)}`;
    say('Your email app will open with a draft. Send it to request this time; Omid will confirm availability.');
  });

  form.addEventListener('input', () => {
    completed = false;
    requestId = null;
    resultLink.hidden = true;
    if (!busy) create.disabled = !token || Date.now() >= expiresAt;
  });

  connect.addEventListener('click', () => {
    if (!details()) return;
    clearToken();
    if (!window.google?.accounts?.oauth2) {
      say('Google Calendar is unavailable right now. You can still send an email request.');
      return;
    }
    connect.disabled = true;
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPE,
      callback: response => {
        connect.disabled = false;
        if (response.error || !response.access_token || !window.google.accounts.oauth2.hasGrantedAllScopes(response, SCOPE)) {
          say('Calendar permission was not granted. You can still send an email request.');
          return;
        }
        token = response.access_token;
        expiresAt = Date.now() + Math.max(0, Number(response.expires_in) - 60) * 1000;
        create.disabled = completed;
        say('Calendar connected. You can now create a proposed event in your own calendar. No invitation will be sent.');
      },
      error_callback: () => {
        connect.disabled = false;
        say('Google authorization was closed or could not open. Try again, or send an email request.');
      }
    });
    client.requestAccessToken();
  });

  create.addEventListener('click', async () => {
    if (busy || completed) return;
    const data = details();
    if (!data) return;
    if (!token || Date.now() >= expiresAt) {
      clearToken();
      say('Your Calendar connection expired. Connect Google Calendar again.');
      return;
    }
    busy = true;
    document.getElementById('meetingFields').disabled = true;
    create.disabled = true;
    connect.disabled = true;
    // Stable IDs make a manual retry safe after an uncertain network response.
    requestId ||= crypto.randomUUID().replaceAll('-', '');
    const payload = {
      id: requestId,
      summary: `Proposed ${data.topic} — Tested by Omid`,
      description: `Personal planning event only. Omid has not been invited and has not confirmed this time. Email aomid6362@gmail.com to request confirmation.\n\n${data.message}`,
      start: { dateTime: data.start.toISOString() },
      end: { dateTime: data.end.toISOString() },
      conferenceData: { createRequest: { requestId, conferenceSolutionKey: { type: 'hangoutsMeet' } } }
    };
    const eventUrl = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
    try {
      say('Creating your proposed calendar event…');
      const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
      let response = await fetch(`${eventUrl}?conferenceDataVersion=1`, { method: 'POST', headers, body: JSON.stringify(payload) });
      // A previous attempt may have succeeded before its response was lost.
      if (response.status === 409) response = await fetch(`${eventUrl}/${requestId}`, { headers });
      const result = await response.json();
      if (!response.ok) {
        if (response.status === 401) clearToken();
        throw new Error(response.status === 401 ? 'Your connection expired. Connect Google Calendar again.' : 'Google could not create this event. Check your Calendar access or send an email request.');
      }
      completed = true;
      const link = new URL(result.htmlLink || 'https://calendar.google.com/');
      if (link.protocol === 'https:' && ['calendar.google.com', 'www.google.com'].includes(link.hostname)) {
        resultLink.href = link.href;
        resultLink.hidden = false;
      }
      const conferenceStatus = result.conferenceData?.createRequest?.status?.statusCode;
      say(result.hangoutLink ? 'Proposed event created with Google Meet. Open it to view the link. Email Omid to confirm the time.' : conferenceStatus === 'failure' ? 'Proposed event created, but Google Meet could not be added. Open the event to add video conferencing.' : 'Proposed event created. Google Meet may take a moment to appear; open the event to check. Email Omid to confirm the time.');
    } catch (error) {
      say(error instanceof TypeError ? 'The connection failed. Retry to check or create the same event, or send an email request.' : error.message);
    } finally {
      busy = false;
      document.getElementById('meetingFields').disabled = false;
      connect.disabled = false;
      create.disabled = completed || !token || Date.now() >= expiresAt;
    }
  });

  window.addEventListener('pagehide', clearToken);
})();

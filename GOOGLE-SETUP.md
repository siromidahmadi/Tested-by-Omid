# Google Calendar and Meet setup

The public meeting form opens an email draft addressed to aomid6362@gmail.com. Visitors must send that draft to submit a request. No sign-in is required. This static website does not check availability or confirm appointments.

The optional Calendar tool creates a personal proposed event in the account that authorizes it, and requests a Meet conference. It does not invite Omid or send email. Use the email request to agree on a time and share the event link yourself. Google Chat is not connected: no Chat contact link was provided. The email and LinkedIn contact options remain available.

## Google Cloud configuration (requires account owner)

Project: `tested-by-omid`

OAuth web client: `880960556492-d8gqjubk3n9upbn8vpgh2rdjtmtp93u4.apps.googleusercontent.com`

1. Enable the Google Calendar API.
2. Add `https://siromidahmadi.github.io` as an authorized JavaScript origin on this OAuth web client. Add the exact local preview origin only if testing locally.
3. Configure consent-screen data access for `https://www.googleapis.com/auth/calendar.events`. Google may require verification for public use of this scope; while testing, add approved accounts under Audience / test users.
4. Test Connect Google Calendar on the deployed site. Creating a proposed event is a separate explicit button press. This popup-based token flow does not use a redirect URI or client secret.

Access tokens remain in JavaScript memory and are cleared on page exit; no tokens are stored in localStorage, source files, or a server. The OAuth client ID is public configuration. The optional tool handles denied consent, blocked popups, expired tokens, failed requests, repeated submissions, and asynchronous Meet generation. It does not automatically retry event creation; manually retrying uses a stable event ID to avoid duplicate events after an uncertain response.

## Real public booking

Create a Google Calendar appointment schedule, choose Google Meet for conferencing, and copy its booking-page URL. That URL can replace the email-first request flow when ready. Do not treat the optional personal-calendar tool as a booking system.

References:
- https://developers.google.com/identity/oauth2/web/guides/use-token-model
- https://developers.google.com/workspace/calendar/api/v3/reference/events/insert
- https://support.google.com/calendar/answer/10729749

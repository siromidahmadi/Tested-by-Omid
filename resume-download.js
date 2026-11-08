(() => {
  'use strict';
  const disclosure = document.getElementById('resumeDownload');
  if (!disclosure) return;
  const trigger = disclosure.querySelector('summary');
  document.addEventListener('click', event => {
    if (!disclosure.contains(event.target)) disclosure.open = false;
  });
  disclosure.addEventListener('keydown', event => {
    if (event.key === 'Escape' && disclosure.open) {
      disclosure.open = false;
      trigger.focus();
      event.preventDefault();
    }
  });
  disclosure.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', () => { disclosure.open = false; trigger.focus(); });
  });
})();

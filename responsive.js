(() => {
 const nav = document.getElementById('navbar');
 const toggle = document.getElementById('navMenuToggle');
 const links = document.getElementById('primaryLinks');
 const small = matchMedia('(max-width:1200px)');
 const setMenu = open => { nav.dataset.menuOpen = String(open); toggle.setAttribute('aria-expanded',String(open)); };
 toggle.addEventListener('click', () => setMenu(nav.dataset.menuOpen !== 'true'));
 links.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
 document.addEventListener('click', event => { if (!nav.contains(event.target)) setMenu(false); });
 document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.dataset.menuOpen === 'true') { setMenu(false); toggle.focus(); }
 });
 small.addEventListener('change', () => setMenu(false));
 setMenu(false);
 const modal = document.getElementById('cardModal');
 modal.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const items = Array.from(modal.querySelectorAll('button,a[href],[tabindex="0"]')).filter(e => e.getClientRects().length);
  const first = items[0], last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
 });
 const hidden = document.getElementById('proj-hidden');
 const more = document.getElementById('proj-more-btn');
 if (hidden && more) {
  more.setAttribute('aria-controls','proj-hidden');
  more.setAttribute('aria-expanded','false');
  hidden.inert = true;
  new ResizeObserver(() => {
   if (more.getAttribute('aria-expanded') === 'true') hidden.style.maxHeight = hidden.scrollHeight + 'px';
  }).observe(hidden.firstElementChild || hidden);
  window.addEventListener('resize', () => {
   if (more.getAttribute('aria-expanded') === 'true') hidden.style.maxHeight = hidden.scrollHeight + 'px';
  });
 }
})();

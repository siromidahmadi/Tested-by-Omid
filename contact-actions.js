(() => {
'use strict';
const root = document.getElementById('contactActions');
if (!root) return;
let timer;
const persistent = window.matchMedia('(max-width:700px), (hover:none)');
const fineHover = window.matchMedia('(hover:hover) and (pointer:fine)');
const translate = () => {
 const lang = document.documentElement.lang;
 root.querySelectorAll('.contact-action').forEach(link => {
  const label = link.querySelector('.contact-action-label');
  const name = label.getAttribute('data-' + lang) || label.dataset.en;
  link.setAttribute('aria-label', name);
  link.title = name;
 });
};
const expand = value => { clearTimeout(timer); root.dataset.expanded = String(persistent.matches || value); };
const closeSoon = () => {
 clearTimeout(timer);
 timer = setTimeout(() => { if (!root.contains(document.activeElement)) expand(false); }, 90);
};
root.addEventListener('pointerenter', () => { if (fineHover.matches) expand(true); });
root.addEventListener('pointerleave', closeSoon);
root.addEventListener('focusin', () => expand(true));
root.addEventListener('focusout', event => { if (!root.contains(event.relatedTarget)) closeSoon(); });
persistent.addEventListener('change', () => expand(false));
new MutationObserver(translate).observe(document.documentElement, {attributes:true,attributeFilter:['lang']});
expand(false);
translate();
})();

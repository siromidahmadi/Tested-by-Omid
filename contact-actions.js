(() => {
  'use strict';
  const root = document.getElementById('contactActions');
  if (!root) return;
  const toggle = document.getElementById('contactActionToggle');
  const label = toggle.querySelector('span');
  let expanded = false;
  let manualOpen = false;
  let timer;
  const fineHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  const translate = () => {
    const fa = document.documentElement.lang === 'fa';
    label.dataset.en = expanded ? 'Collapse' : 'Expand';
    label.dataset.fa = expanded ? 'بستن' : 'باز کردن';
    label.textContent = fa ? label.dataset.fa : label.dataset.en;
    root.querySelectorAll('.contact-action').forEach(link => {
      const text = link.querySelector('.contact-action-label');
      const name = fa ? text.dataset.fa : text.dataset.en;
      link.setAttribute('aria-label', name);
      link.title = name;
    });
  };
  const setExpanded = value => {
    window.clearTimeout(timer);
    expanded = value;
    root.dataset.expanded = String(value);
    toggle.setAttribute('aria-expanded', String(value));
    translate();
  };
  const closeSoon = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      if (!manualOpen && !root.contains(document.activeElement)) setExpanded(false);
    }, 90);
  };
  root.addEventListener('pointerenter', () => { if (fineHover.matches) setExpanded(true); });
  root.addEventListener('pointerleave', closeSoon);
  root.addEventListener('focusin', event => { if (event.target !== toggle) setExpanded(true); });
  root.addEventListener('focusout', event => { if (!root.contains(event.relatedTarget)) closeSoon(); });
  toggle.addEventListener('click', () => { manualOpen = !expanded; setExpanded(manualOpen); });
  root.addEventListener('keydown', event => {
    if (event.key === 'Escape') { manualOpen = false; setExpanded(false); event.preventDefault(); }
  });
  new MutationObserver(translate).observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });
  translate();
})();

(() => {
 const widget = document.getElementById('languageWidget');
 if (!widget) return;
 const trigger = widget.querySelector('.lang-widget-trigger');
 const current = widget.querySelector('.lang-current');
 const options = widget.querySelector('.lang-widget-options');
 const fineHover = matchMedia('(hover:hover) and (pointer:fine)');
 let timer;
 const expand = value => {
  clearTimeout(timer);
  widget.dataset.expanded = String(value);
  trigger.setAttribute('aria-expanded', String(value));
  options.inert = !value;
 };
 const sync = () => {
  const lang = document.documentElement.lang;
  current.textContent = lang.toUpperCase();
  const names = {en:'Choose language',es:'Elegir idioma',fa:'انتخاب زبان'};
  trigger.setAttribute('aria-label', names[lang] || names.en);
  trigger.title = names[lang] || names.en;
 };
 widget.addEventListener('pointerenter', () => { if (fineHover.matches) expand(true); });
 widget.addEventListener('pointerleave', () => { timer = setTimeout(() => { if (!widget.contains(document.activeElement)) expand(false); }, 90); });
 widget.addEventListener('focusin', () => expand(true));
 widget.addEventListener('focusout', event => { if (!widget.contains(event.relatedTarget)) expand(false); });
 trigger.addEventListener('click', () => expand(true));
 widget.querySelectorAll('.lang-btn').forEach(button => button.addEventListener('click', () => { sync(); trigger.focus(); }));
 document.addEventListener('click', event => { if (!widget.contains(event.target)) expand(false); });
 widget.addEventListener('keydown', event => { if (event.key === 'Escape') { trigger.focus(); expand(false); } });
 new MutationObserver(sync).observe(document.documentElement, {attributes:true,attributeFilter:['lang']});
 sync();
 expand(false);
})();

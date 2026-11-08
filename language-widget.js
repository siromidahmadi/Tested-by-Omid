(() => {
 const widget = document.getElementById('languageWidget');
 if (!widget) return;
 const trigger = widget.querySelector('summary');
 const current = widget.querySelector('.lang-current');
 const sync = () => {
  const lang = document.documentElement.lang;
  current.textContent = lang.toUpperCase();
  const names = {en:'Choose language',es:'Elegir idioma',fa:'انتخاب زبان'};
  trigger.setAttribute('aria-label', names[lang] || names.en);
  trigger.title = names[lang] || names.en;
 };
 widget.querySelectorAll('.lang-btn').forEach(button => button.addEventListener('click', () => {
  widget.open = false;
  sync();
  trigger.focus();
 }));
 document.addEventListener('click', event => { if (!widget.contains(event.target)) widget.open = false; });
 widget.addEventListener('keydown', event => { if (event.key === 'Escape') { widget.open = false; trigger.focus(); } });
 new MutationObserver(sync).observe(document.documentElement, {attributes:true,attributeFilter:['lang']});
 sync();
})();

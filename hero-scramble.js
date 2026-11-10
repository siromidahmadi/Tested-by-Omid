(() => {
 const overlay = document.getElementById('ov2');
 const headline = overlay?.querySelector('h2 > span[data-en]');
 if (!headline) return;
 const reduced = matchMedia('(prefers-reduced-motion:reduce)');
 const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 let words=[],timer=0,scrollTimer=0,wasVisible=false;
 const visible = () => overlay.classList.contains('visible') && document.getElementById('hero').getBoundingClientRect().bottom > innerHeight;
 const stop = () => {
  clearInterval(timer); timer=0;
  words.forEach(word => { word.root.removeAttribute('data-scrambling'); word.visual.textContent=''; });
 };
 const prepare = () => {
  stop();
  const lang=document.documentElement.lang || 'en';
  const text=headline.getAttribute('data-'+lang) || headline.dataset.en;
  const lines=text.split(/<br\s*\/?\s*>/i);
  headline.replaceChildren();
  words=lines.map((text,index) => {
   if(index) headline.append(document.createElement('br'));
   const root=document.createElement('span');
   root.className='scramble-word';
   const original=document.createElement('span'); original.className='scramble-original'; original.textContent=text;
   const visual=document.createElement('span'); visual.className='scramble-visual'; visual.setAttribute('aria-hidden','true');
   root.append(original,visual); headline.append(root);
   return {root,visual,text};
  });
 };
 const play = () => {
  if (timer || reduced.matches || !visible() || document.hidden) return;
  const start=performance.now();
  words.forEach(word=>word.root.dataset.scrambling='true');
  const tick = () => {
   const progress=Math.min(1,(performance.now()-start)/800);
   words.forEach(word => {
    const revealed=Math.floor(progress*word.text.length);
    word.visual.textContent=Array.from(word.text).map((char,index)=>
     index<revealed || /[\s.]/.test(char) ? char : chars[Math.floor(Math.random()*chars.length)]
    ).join('');
   });
   if(progress===1) stop();
  };
  tick(); timer=setInterval(tick,40);
 };
 const update = () => {
  const isVisible=visible();
  if(isVisible && !wasVisible) play();
  if(!isVisible) stop();
  wasVisible=isVisible;
 };
 new MutationObserver(update).observe(overlay,{attributes:true,attributeFilter:['class']});
 new MutationObserver(() => { prepare(); wasVisible=false; update(); }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 window.addEventListener('scroll',() => {
  clearTimeout(scrollTimer);
  scrollTimer=setTimeout(() => { if(visible()) play(); },140);
 },{passive:true});
 reduced.addEventListener('change',stop);
 document.addEventListener('visibilitychange',() => { if(document.hidden) { stop(); clearTimeout(scrollTimer); } });
 window.addEventListener('pagehide',() => { stop(); clearTimeout(scrollTimer); });
 prepare(); update();
})();

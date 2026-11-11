(() => {
 const overlay=document.getElementById('ov2');
 const headline=overlay?.querySelector('h2 > span[data-en]');
 if(!headline) return;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 let words=[],timer=0,scrollTimer=0,wasVisible=false,nextWord=0,entryGesture=false,queue=[];
 const visible=()=>overlay.classList.contains('visible') && document.getElementById('hero').getBoundingClientRect().bottom>innerHeight;
 const stop=()=>{
  clearInterval(timer); timer=0; queue=[];
  words.forEach(word=>{word.root.removeAttribute('data-scrambling');word.visual.textContent='';});
 };
 const reset=()=>{stop();nextWord=0;entryGesture=false;clearTimeout(scrollTimer);words.forEach(word=>{word.root.style.visibility=reduced.matches?'visible':'hidden';});};
 const prepare=()=>{
  reset();
  const lang=document.documentElement.lang||'en';
  const lines=(headline.getAttribute('data-'+lang)||headline.dataset.en).split(/<br\s*\/?\s*>/i);
  headline.replaceChildren();
  words=lines.map((text,index)=>{
   if(index) headline.append(document.createElement('br'));
   const root=document.createElement('span');root.className='scramble-word';root.style.visibility=reduced.matches?'visible':'hidden';
   const original=document.createElement('span');original.className='scramble-original';original.textContent=text;
   const visual=document.createElement('span');visual.className='scramble-visual';visual.setAttribute('aria-hidden','true');
   root.append(original,visual);headline.append(root);return {root,visual,text};
  });
 };
 const play=index=>{
  if(reduced.matches||!visible()||document.hidden)return;
  const word=words[index];if(!word)return;
  word.root.style.visibility='visible';
  const start=performance.now();word.root.dataset.scrambling='true';
  const tick=()=>{
   const progress=Math.min(1,(performance.now()-start)/1600);
   const revealed=Math.floor(progress*word.text.length);
   word.visual.textContent=Array.from(word.text).map((char,i)=>i<revealed||/[\s.]/.test(char)?char:chars[Math.floor(Math.random()*chars.length)]).join('');
   if(progress===1){
    clearInterval(timer);timer=0;word.root.removeAttribute('data-scrambling');word.visual.textContent='';
    if(queue.length)play(queue.shift());
   }
  };
  tick();timer=setInterval(tick,40);
 };
 const advance=()=>{
  if(nextWord>=words.length||reduced.matches||!visible()||document.hidden)return;
  const index=nextWord++;
  if(timer)queue.push(index);else play(index);
 };
 const update=()=>{
  const nowVisible=visible();
  if(nowVisible&&!wasVisible){nextWord=0;entryGesture=true;advance();}
  if(!nowVisible&&wasVisible)reset();
  wasVisible=nowVisible;
 };
 new MutationObserver(update).observe(overlay,{attributes:true,attributeFilter:['class']});
 new MutationObserver(()=>{prepare();wasVisible=visible();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 window.addEventListener('scroll',()=>{
  clearTimeout(scrollTimer);
  scrollTimer=setTimeout(()=>{
   if(!visible())return;
   if(entryGesture){entryGesture=false;return;}
   advance();
  },300);
 },{passive:true});
 reduced.addEventListener('change',reset);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});
 window.addEventListener('pagehide',reset);
 prepare();update();
})();

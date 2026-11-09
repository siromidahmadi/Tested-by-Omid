(() => {
 const enabled = matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
 document.querySelectorAll('#collection .selected-roles-grid > .card').forEach(card => {
  const surface = card.querySelector('.glass-wrap');
  if (!surface) return;
  let targetX=0,targetY=0,x=0,y=0,vx=0,vy=0,frame=0,last=0;
  const paint = () => {
   surface.style.setProperty('--tilt-x', (-y*35)+'deg');
   surface.style.setProperty('--tilt-y', (x*35)+'deg');
   surface.style.setProperty('--logo-y', (y*50)+'px');
   surface.style.setProperty('--copy-y', (-y*50)+'px');
  };
  const step = now => {
   const dt = Math.min((now-last)/1000 || 1/60, 1/30); last=now;
   vx += ((targetX-x)*300-vx*30)*dt;
   vy += ((targetY-y)*300-vy*30)*dt;
   x += vx*dt; y += vy*dt; paint();
   if (Math.abs(targetX-x)+Math.abs(targetY-y)+Math.abs(vx)+Math.abs(vy)>.0005) frame=requestAnimationFrame(step);
   else { x=targetX; y=targetY; paint(); frame=0; if (!x&&!y) surface.removeAttribute('data-tilting'); }
  };
  const animate = () => { if (!frame) { last=0; frame=requestAnimationFrame(step); } };
  const reset = () => { targetX=targetY=0; animate(); };
  card.addEventListener('pointermove', event => {
   if (!enabled.matches || event.pointerType!=='mouse') return;
   const rect=card.getBoundingClientRect();
   targetX=Math.max(-.5,Math.min(.5,(event.clientX-rect.left)/rect.width-.5));
   targetY=Math.max(-.5,Math.min(.5,(event.clientY-rect.top)/rect.height-.5));
   surface.dataset.tilting='true'; animate();
  },{passive:true});
  card.addEventListener('pointerleave',reset);
  card.addEventListener('pointercancel',reset);
  enabled.addEventListener('change', () => {
   cancelAnimationFrame(frame); frame=0; targetX=targetY=x=y=vx=vy=0; paint(); surface.removeAttribute('data-tilting');
  });
 });
})();

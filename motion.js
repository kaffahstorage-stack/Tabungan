// Visual enhancements only. No access to savings storage or transactions.
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const progress=document.getElementById('progress');
const ring=document.querySelector('.orbit-value');
const percent=document.getElementById('orbit-percent');
function syncProgress(){const n=Math.max(0,Math.min(100,Number(progress?.getAttribute('aria-valuenow'))||0));if(ring)ring.style.strokeDashoffset=String(440*(1-n/100));if(percent)percent.textContent=n.toLocaleString('id-ID',{maximumFractionDigits:1})+'%';}
syncProgress();if(progress)new MutationObserver(syncProgress).observe(progress,{attributes:true,attributeFilter:['aria-valuenow']});
const deposit=document.getElementById('deposit'),dock=document.getElementById('dock-deposit');
if(dock&&deposit){dock.disabled=deposit.disabled;dock.onclick=()=>deposit.click();new MutationObserver(()=>dock.disabled=deposit.disabled).observe(deposit,{attributes:true,attributeFilter:['disabled']});}
if(!reduce.matches&&'IntersectionObserver'in window){const cards=document.querySelectorAll('.card,.intro');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('before-view');observer.unobserve(entry.target)}}),{threshold:.07});cards.forEach((card,i)=>{card.classList.add('scroll-reveal','before-view');card.style.transitionDelay=Math.min(i%3*65,130)+'ms';observer.observe(card)});reduce.addEventListener('change',()=>{if(reduce.matches){cards.forEach(c=>c.classList.remove('before-view'));observer.disconnect()}})}
document.addEventListener('pointerdown',event=>{if(reduce.matches)return;const b=event.target.closest('button');if(!b||b.disabled)return;const rect=b.getBoundingClientRect(),wave=document.createElement('span');wave.className='tap-wave';wave.setAttribute('aria-hidden','true');wave.style.left=event.clientX-rect.left+'px';wave.style.top=event.clientY-rect.top+'px';b.append(wave);wave.addEventListener('animationend',()=>wave.remove(),{once:true});setTimeout(()=>wave.remove(),800)});
const chart=document.getElementById('chart'),detail=document.getElementById('chart-detail');
function chartDetail(event){const col=event.target.closest('.chart-col');if(!col||!detail)return;detail.textContent=col.getAttribute('aria-label');detail.hidden=false;}
chart?.addEventListener('click',chartDetail);chart?.addEventListener('focusin',chartDetail);
if(chart)new MutationObserver(()=>{if(detail)detail.hidden=true;if(!reduce.matches&&Element.prototype.animate)chart.querySelectorAll('.bar').forEach((bar,i)=>bar.animate([{transform:'scaleY(.05)'},{transform:'scaleY(1)'}],{duration:650,delay:i*18,easing:'cubic-bezier(.16,1,.3,1)'}))}).observe(chart,{childList:true});
const balance=document.getElementById('balance');
if(balance)new MutationObserver(()=>{if(!reduce.matches&&Element.prototype.animate)balance.animate([{opacity:.45,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:500,easing:'cubic-bezier(.16,1,.3,1)'})}).observe(balance,{childList:true});
const hero=document.querySelector('.balance');let frame;
hero?.addEventListener('pointermove',event=>{if(reduce.matches||event.pointerType!=='mouse')return;cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--light-x',((event.clientX-r.left)/r.width*100)+'%');hero.style.setProperty('--light-y',((event.clientY-r.top)/r.height*100)+'%')})});

/* ============ OPENBOX : boîtes à ouvrir ============ */
(function(){
const css=`
.obw{display:flex;flex-direction:column;align-items:center;gap:8px;padding-top:2px}
.obt{display:flex;justify-content:space-between;align-items:center;width:var(--st);font-weight:800;text-shadow:0 1px 3px #000}
.obt .mb{padding:6px 10px;font-size:13px}
.stage{position:relative;width:var(--st);height:var(--st);border-radius:14px;overflow:hidden;box-shadow:0 12px 30px #000a,0 0 0 2px #ffffff22 inset;user-select:none}
.bgf{position:absolute;inset:0;background-size:100% 100%}
.bgf.f1{filter:brightness(.9) hue-rotate(-6deg)}.bgf.f2{transform:scaleX(-1);filter:brightness(.95)}.bgf.f3{transform:scaleY(-1);filter:brightness(.92) hue-rotate(6deg)}.bgf.f4{transform:rotate(90deg);filter:brightness(1.08) saturate(1.1)}
.in{position:absolute}.p{position:absolute}
.nv{position:absolute;top:50%;transform:translateY(-50%);width:30px;height:56px;border:0;border-radius:12px;background:#000b;color:#f0c060;font-size:20px;z-index:5}
.nv.l{left:3px}.nv.r{right:3px}.nv.t{top:4px;left:50%;transform:translateX(-50%);width:56px;height:30px}.nv.b{top:auto;bottom:4px;left:50%;transform:translateX(-50%);width:56px;height:30px}
.fn{position:absolute;bottom:5px;left:0;right:0;text-align:center;font-size:11px;color:#fff;opacity:.7;text-shadow:0 1px 3px #000;pointer-events:none;z-index:4}
.invb{display:flex;gap:6px;width:var(--st);min-height:62px;padding:6px;background:#0a1420d9;border-radius:14px;box-shadow:0 0 0 1px #ffffff22 inset;overflow-x:auto;align-items:center}
.invb .it{flex:none;width:50px;height:50px;border-radius:10px;border:2px solid transparent;background:#ffffff12;display:flex;align-items:center;justify-content:center;padding:3px}
.invb .it img{max-width:100%;max-height:100%;object-fit:contain}.invb .it.sel{border-color:#f0c060;background:#f0c06033;box-shadow:0 0 10px #f0c060}
.invb .em{color:#b6c4d6;font-size:13px;padding:0 6px}
.note{width:36px;height:42px;background:linear-gradient(#f3e3b8,#d8be84);border-radius:3px;box-shadow:0 2px 4px #0008;position:relative}
.note::after{content:"";position:absolute;left:6px;right:6px;top:10px;height:3px;background:#8a6a2a66;box-shadow:0 7px #8a6a2a66,0 14px #8a6a2a66}
.eng{position:absolute;white-space:nowrap;font-weight:900;line-height:1;transform:translate(-50%,-50%)}
.eng.gl{color:#e8c070;text-shadow:0 -1px 0 #fff8,0 2px 2px #000}
.eng.dk{color:#3a2610;text-shadow:0 1px 0 #ffffff66,0 -1px 1px #0008}
.eng.lt{color:#fff3cc;text-shadow:0 1px 3px #000}
.rg,.lv,.pd,.sl,.hs2{border:0;background:none;padding:0;position:relative;touch-action:manipulation}
.rg{flex:1;aspect-ratio:1}.rg img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;transition:transform .15s}
.rg span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:calc(var(--st)*.085)}
.rg:active img{transform:rotate(25deg)}
.row{display:flex;gap:4%;width:100%;height:100%;align-items:center;justify-content:center}
.lv img{width:100%;height:100%;object-fit:contain;transition:transform .15s}.lv{flex:1;height:100%}.lv.dn img{transform:scaleY(-1)}
.pd{flex:1;aspect-ratio:1;border-radius:50%;box-shadow:0 3px 6px #000a,0 0 0 3px #00000055 inset}
.pd.fl{animation:fl .35s}@keyframes fl{50%{filter:brightness(2.2);transform:scale(1.15)}}
.pdots{position:absolute;left:0;right:0;top:-18%;display:flex;gap:6px;justify-content:center}
.pdots i{width:8px;height:8px;border-radius:50%;background:#0006;box-shadow:0 0 0 1px #fff3}.pdots i.on{background:#f0c060;box-shadow:0 0 6px #f0c060}
.sl{flex:1;height:100%}.sl img{width:100%;height:100%;object-fit:contain}.sl.e img{filter:brightness(0);opacity:.4}.sl.f img{filter:drop-shadow(0 0 6px #fff8)}
.hs2>img:not(.pl){width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 2px 3px #000a)}.hs2 img.pl{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 3px 4px #000a)}
.cav{width:100%;height:100%;border-radius:8px;background:radial-gradient(#1a0f08,#050302);box-shadow:0 0 0 3px #00000088 inset,0 0 8px #000;display:flex;align-items:center;justify-content:center;gap:6px;position:relative}
.cav img{height:70%;max-width:46%;object-fit:contain;animation:pu 1.6s infinite}.cav .open{position:absolute;left:-8%;top:-10%;width:40%;transform:rotate(-80deg);transform-origin:left bottom;opacity:.9}
@keyframes pu{50%{filter:brightness(1.4)}}
.glint{position:absolute;inset:0;border-radius:50%;animation:gl 4s infinite;background:radial-gradient(circle,#fff9 0%,#fff0 60%)}
@keyframes gl{0%,80%,100%{opacity:0}90%{opacity:.7}}
.tl2{border:0;border-radius:6%;background:linear-gradient(135deg,#8c7a58,#5d4d34);color:#f3e3b0;font-weight:900;font-size:calc(var(--st)*.08);box-shadow:0 2px 3px #000a,0 0 0 1px #ffffff40 inset;text-shadow:0 1px 2px #000}
.tl2.e{background:#0006;box-shadow:inset 0 0 6px #000;visibility:visible}
.tg{display:grid;gap:3%;width:100%;height:100%;padding:3%;background:#0005;border-radius:8px}
.ovn{background:linear-gradient(#f3e3b8,#d8be84);color:#3a2610;border-radius:6px;padding:12px;position:relative;height:200px;margin:8px 0;box-shadow:0 0 0 3px #8a6a2a55 inset}
.ovn .eng{font-size:30px}.ovn .tx{position:absolute;left:8px;right:8px;bottom:8px;font-size:15px;font-weight:700}
.bgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.bx{position:relative;border:0;border-radius:16px;overflow:hidden;aspect-ratio:1;color:#fff;font:inherit;text-align:left;padding:0;box-shadow:0 8px 20px #000a,0 0 0 2px #ffffff30 inset;background:#000 center/cover}
.bx div{position:absolute;left:0;right:0;bottom:0;padding:8px 10px;background:linear-gradient(transparent,#000d);font-weight:800;font-size:14px}.bx small{display:block;color:#f0c060;font-weight:700;font-size:12px}
.bx.lock{filter:grayscale(1) brightness(.5)}

.stage{cursor:grab;user-select:none;-webkit-user-select:none}.drh{text-align:center;margin:6px 0 2px;width:var(--st)}
.lvl{display:grid;gap:12px}.lc{position:relative;display:flex;align-items:center;gap:12px;text-align:left;border:2px solid #c9962a;border-radius:18px;padding:16px 14px;color:#f6e7b8;overflow:hidden;min-height:96px;background:#140c06;box-shadow:0 6px 16px #000a}
.lc i{position:absolute;inset:0;background-size:cover;background-position:center;opacity:.5}.lc::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#0c0704f0 20%,#0c070488)}
.lc>*{position:relative;z-index:1}.lc b{font-size:20px;display:block}.lc small{display:block;font-size:12.5px;opacity:.9;margin-top:2px}.lc>div{flex:1}.lc>img{width:60px;height:60px;object-fit:contain;filter:drop-shadow(0 4px 5px #000)}
.lc .st{position:absolute;right:12px;top:8px;color:#ffd24a;font-size:14px;letter-spacing:2px;z-index:2}
.mn{display:grid;gap:14px}.mc{position:relative;height:150px;border:2px solid #c9962a;border-radius:20px;overflow:hidden;color:#fff;text-align:left;padding:0;background-size:cover;background-position:center;box-shadow:0 8px 18px #000b}
.mc::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,#000d,#0003 70%)}.mc div{position:absolute;left:16px;bottom:12px;z-index:1}.mc b{font-size:24px;display:block}.mc small{opacity:.9}
.mc img{position:absolute;right:12px;top:10px;height:70px;z-index:1;filter:drop-shadow(0 4px 6px #000)}
.sb{background:none;border:0;color:var(--gold);font-size:15px;padding:4px 0 10px}
.bn{position:relative;display:block;width:100%;height:118px;border:2px solid #c9962a;border-radius:18px;margin-bottom:12px;overflow:hidden;color:#fff;text-align:left;background-size:cover;background-position:center;padding:0;box-shadow:0 6px 16px #000a}
.bn::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,#000e,#0002 75%)}.bn div{position:absolute;left:14px;right:14px;bottom:10px;z-index:1}.bn b{font-size:19px;display:block}.bn small{opacity:.92;display:block;font-size:12.5px}.bn .tag{color:#ffe08a;background:#f0c06033;border:1px solid #c9962a;border-radius:8px;padding:1px 7px;margin-right:6px}
.sg{height:1.05em;width:auto;vertical-align:middle;filter:drop-shadow(0 2px 2px #000a)}.eng .sg{height:1em}.rg span img.sg{position:static;width:auto;height:70%;inset:auto;filter:brightness(.42) contrast(1.3) drop-shadow(0 1px 0 #fff7)}.tl2{overflow:hidden;min-width:0;min-height:0;padding:0}.tl2 .sg{height:calc(var(--st)*.15);width:auto;max-width:90%;object-fit:contain}
.kn{position:relative;width:100%;height:100%}.kn svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}.kl,.kr{position:absolute;width:11%;aspect-ratio:1;border-radius:50%;transform:translate(-50%,-50%);border:3px solid #222;box-shadow:0 2px 4px #000a,inset 0 2px 3px #fff8;padding:0}.kl{left:6%}.kr{left:94%}.kr.sel{outline:3px solid #fff;box-shadow:0 0 12px #fff}
.trn{position:relative;width:100%;height:100%}.tg2{position:absolute;transform:translate(-50%,-50%);border-radius:50%;border:2px dashed #ffffff66;background:radial-gradient(circle,#0008 30%,#0003);padding:0}.tg2.fl{border:0;background:none}.tg2 img{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 3px 3px #000b)}.spn{animation:gs 6s linear infinite}.spn.r{animation-direction:reverse}@keyframes gs{to{transform:rotate(360deg)}}
.crk{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:6%}.hub{flex:1;aspect-ratio:1;max-height:70%;padding:0;background:none;border:0}.hub .ax{width:70%;height:70%;margin:15%;border-radius:50%;border:3px dashed #ffffff77;background:radial-gradient(circle,#000a,#0004)}.hub img.hd{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 3px 3px #000b)}.hub img.sp2{animation:cs .4s ease-out}@keyframes cs{from{transform:rotate(-120deg)}to{transform:rotate(0)}}.cp{display:flex;gap:5px}.cp i{width:9px;height:9px;border-radius:50%;background:#0008;border:1px solid #fff6}.cp i.on{background:#ffd24a;box-shadow:0 0 6px #ffd24a}
.stage{overflow:visible!important;box-shadow:none!important}
.scene{position:absolute;inset:0;perspective:1300px;perspective-origin:50% 42%}
.cube{position:absolute;inset:0;transform-style:preserve-3d}
.face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:12px;overflow:hidden;box-shadow:0 0 0 2px #000a}
.shade{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 28% 18%,rgba(255,255,255,.17),transparent 55%),radial-gradient(ellipse at 50% 50%,transparent 58%,rgba(0,0,0,.5))}
.stage::before{content:"";position:absolute;left:6%;right:6%;bottom:-16px;height:22px;background:radial-gradient(ellipse,#000d,transparent 70%);filter:blur(5px);pointer-events:none}
.dimv{position:absolute;inset:0;border-radius:12px;background:rgba(2,8,36,.55);pointer-events:none;opacity:0;transition:opacity .6s;z-index:3}.dimv.on{opacity:1}
.nv{z-index:6}
.flash{position:absolute;inset:0;background:radial-gradient(circle,#fffb,#f0c06066 40%,transparent 70%);animation:fh .8s forwards;pointer-events:none;z-index:7;border-radius:12px}@keyframes fh{from{opacity:1}to{opacity:0}}
.pt2{position:absolute;left:50%;top:50%;width:9px;height:9px;margin:-4px;border-radius:50%;background:#ffe9a0;box-shadow:0 0 10px #ffd24a;animation:pf .9s ease-out forwards;z-index:7;pointer-events:none}
@keyframes pf{to{transform:translate(var(--dx),var(--dy)) scale(.15);opacity:0}}
.rg::before{content:"";position:absolute;inset:-7%;border-radius:50%;background:radial-gradient(circle,#000a 52%,#0000 74%);box-shadow:inset 0 4px 9px #000d,0 1px 0 #ffffff44}
.rg img{filter:drop-shadow(0 3px 3px #000b)}.rg.sp img{animation:spn .28s ease-out}@keyframes spn{from{transform:rotate(-70deg)}to{transform:rotate(0)}}
.lv::before{display:none}
.lv img{position:relative;filter:drop-shadow(0 3px 3px #000b)}.lv.au img{animation:lau .22s ease-out}.lv.ad img{animation:lad .22s ease-out}
@keyframes lau{from{transform:scaleY(-1)}to{transform:scaleY(1)}}@keyframes lad{from{transform:scaleY(1)}to{transform:scaleY(-1)}}
.sl::before{content:"";position:absolute;inset:4%;border-radius:50%;background:radial-gradient(circle,#000c 50%,#0000 75%);box-shadow:inset 0 4px 9px #000d,0 1px 0 #ffffff44}
.sl img{position:relative}.sl.f img{filter:drop-shadow(0 0 8px #fff9)}
.cav.ho{animation:cin .5s ease-out}@keyframes cin{from{transform:scale(.6);filter:brightness(2.5)}to{transform:scale(1);filter:none}}
.hs2 img.pl{filter:drop-shadow(0 4px 5px #000c)}
.invb{background:linear-gradient(#2e1f13,#120b06)!important;box-shadow:inset 0 3px 10px #000,0 0 0 2px #7a5430,0 8px 14px #000a!important}
.invb .it{background:radial-gradient(circle,#ffffff2a,#0005)!important;box-shadow:inset 0 0 9px #000b}
.invb .it.sel{border-color:#f0c060;box-shadow:0 0 12px #f0c060,inset 0 0 9px #000b}
.obw .mb{background:linear-gradient(#6a4824,#2c1b0c);border:2px solid #c9962a;color:#f6e7b8;box-shadow:0 3px 0 #1a0f06}
.obw .mb:active{transform:translateY(2px);box-shadow:0 1px 0 #1a0f06}
.bx{box-shadow:0 10px 24px #000b,0 0 0 2px #c9962a66 inset!important}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

const SY=['☀','☾','★','☠','⚷','♥','♦','⚓','☘','⚡','♞','✿'];
const YF={'☀':0,'☾':1,'★':2,'⚓':3,'☘':4,'♥':5,'♦':6,'⚡':7,'♞':8,'✿':9,'⚷':10,'☠':11};
const G=t=>String(t).replace(/[\u2600-\u27BF\u2665\u2666\u265E\u26A1\u2693\u2620\u26B7]\uFE0E?/g,c=>{const k=c[0];return k in YF?'<img class="sg" src="img/ob/y'+YF[k]+'.webp" alt="" draggable="false">':c;});
const DINK={c4:'#3a2610',c5:'#f3e3b0',c6:'#3a2610',d0:'#3a2a12',d1:'#f6e7b8',d2:'#3b1d0a',d3:'#2b2418',d4:'#222',d5:'#3a2a12',d6:'#222',d7:'#fff',d8:'#123'};
const FACES=['Face avant','Côté gauche','Face arrière','Côté droit','Dessus'];
const TH={wood:{img:'p_wood',safe:[11,11,78,78]},lacque:{img:'p_lacque',safe:[19,19,62,62]},pierre:{img:'p_pierre',safe:[21,21,58,58]},jouet:{img:'p_jouet',safe:[20,20,60,60]},marbre:{img:'p_marbre',safe:[20,20,60,60]},rouille:{img:'p_rouille',safe:[14,14,72,72]},cristal:{img:'p_cristal',safe:[15,15,70,70]},sable:{img:'p_sable',safe:[14,14,72,72]},corail:{img:'p_corail',safe:[16,16,68,68]},jade:{img:'p_jade',safe:[15,15,70,70]},ice:{img:'p_ice',safe:[16,16,68,68]},clock:{img:'p_clock',safe:[19,19,62,62]},ivory:{img:'p_ivory',safe:[18,18,64,64]},obsidian:{img:'p_obsidian',safe:[15,15,70,70]},egypt:{img:'p_egypt',safe:[17,17,66,66]},steam:{img:'p_steam',safe:[11,11,78,78]},night:{img:'p_night',safe:[16,16,68,68]}};
window.OBX={SY,boxes:[]};
let OB=null;
const D=id=>!!OB.done[id],F=f=>!!OB.flags[f],H=id=>OB.inv.includes(id)||!!OB.flags['used:'+id];
window.obD=D;window.obF=F;window.obH=H;
const im=(id,c)=>'<img src="img/ob/'+id+'.webp" alt="" draggable="false"'+(c?' class="'+c+'"':'')+'>';
const stSize=()=>{const m=$('main');const w=Math.min(m.clientWidth-4,window.innerHeight-290,520);document.documentElement.style.setProperty('--st',Math.max(240,w)+'px');};
window.addEventListener('resize',()=>{if(OB&&!OB.over)stSize();});

/* ---------- liste des boîtes ---------- */
const LV=[{n:1,nm:'Facile',ic:'k1',th:'wood',st:'★',tx:'Une boîte, quelques mécanismes.'},{n:2,nm:'Moyen',ic:'k3',th:'egypt',st:'★★',tx:'Plus de mécanismes, des pièges.'},{n:3,nm:'Difficile',ic:'g2',th:'night',st:'★★★',tx:'Des boîtes retorses à fouiller.'},{n:4,nm:'Extrême',ic:'k8',th:'obsidian',st:'★★★★',tx:'La boîte la plus retorse. Courage.'}];
const lvOf=d=>({'Facile':1,'Moyen':2,'Difficile':3,'Extrême':4})[d.lab]||3;
window.obList=function(box){
  box.innerHTML='';
  box.append(el('p','muted sm','Choisis un niveau : une boîte tirée au hasard, aucun mode d’emploi. Fais-la tourner du doigt, touche, déplace.'));
  const g=el('div','lvl');
  LV.forEach(l=>{const done=(ST.ob&&ST.ob.lv&&ST.ob.lv[l.n])||0;
    const b=el('button','lc t'+l.n,'<i style="background-image:url(img/ob/p_'+l.th+'.webp)"></i><span class="st">'+l.st+'</span><div><b>'+l.nm+'</b><small>'+l.tx+'</small><small class="gold">💎 '+(OBX.boxes.filter(d=>lvOf(d)===l.n).map(d=>d.rw).reduce((a,x)=>Math.min(a,x),999)+' à '+OBX.boxes.filter(d=>lvOf(d)===l.n).map(d=>d.rw).reduce((a,x)=>Math.max(a,x),0))+(done?' · ✔ ×'+done:'')+'</small></div><img src="img/ob/'+l.ic+'.webp" alt="">');
    b.onclick=()=>obLevel(l.n);g.append(b);});
  box.append(g);
};
function obLevel(n){
  let pool=OBX.boxes.filter(d=>lvOf(d)===n);
  const last=ST.ob&&ST.ob.last;
  let ch=[];
  if(true){const p=pool.filter(d=>d.id!==last);ch=[p.length?p[Math.floor(Math.random()*p.length)]:pool[0]];}
  else{const p=pool.slice().sort(()=>Math.random()-.5);ch=p.slice(0,2);}
  const tot=ch.reduce((a,d)=>a+d.rw,0)+0;
  openOv('<div style="font-size:30px;color:var(--gold)">'+LV[n-1].st+'</div><h2>'+LV[n-1].nm+'</h2><p class="muted">'+'Une boîte mystère.'+'</p><p class="gold">Récompense : '+tot+' 💎</p><button class="ob" id="go">Ouvrir</button><button class="ob alt" id="cn">Retour</button>');
  $('cn').onclick=closeOv;$('go').onclick=()=>{closeOv();obRun(n,ch,tot);};
}
function obRun(n,ch,tot){const d=ch[0];obStart(d);OB.lv=n;OB.chain=ch.slice(1);OB.tot=tot;OB.num=1;OB.of=ch.length;}
function obIntro(d){
  openOv('<img src="img/ob/'+(d.icon||'k0')+'.webp" style="height:70px;display:block;margin:0 auto" alt=""><h2>'+d.name+'</h2><p class="muted">'+d.lab+' · '+d.parts+' mécanismes</p><p>'+d.intro+'</p><p class="gold">Récompense : '+d.rw+' 💎</p><button class="ob" id="go">Ouvrir la boîte</button><button class="ob alt" id="cn">Retour</button>');
  $('cn').onclick=closeOv;$('go').onclick=()=>{closeOv();obStart(d);};
}
/* ---------- partie ---------- */
function obStart(d,seed){
  seed=seed||Math.floor(Math.random()*1e9);const R=mkR(seed);const b=d.build(R);
  OB={d,b,seed,t0:Date.now(),face:0,ax:0,ay:0,done:{},inv:(b.inv0||[]).slice(),sel:null,st:{},flags:{},hintN:0,hints:0,over:false};
  bgSet(null);$('sc').textContent='📦 '+d.name;stSize();draw();
}
window.obLeave=function(){OB=null;};
const ORDER=[0,3,2,1],AYS=[0,90,180,-90];
const faceOfAy=ay=>ORDER[(((-ay/90)%4)+4)%4];
function setFace(f){OB.ax=f===4?-90:0;if(f!==4)OB.ay=AYS[f];OB.face=f;}
const cubeT=()=>'translateZ(calc(var(--st)/-2)) rotateX('+OB.ax+'deg) rotateY('+OB.ay+'deg)';
function setT(c,tr){c.style.transition=tr?'transform .5s cubic-bezier(.3,.7,.2,1)':'none';c.style.transform=cubeT();}
function nav(stg){stg.querySelectorAll('.nv').forEach(n=>n.remove());}
function setName(){const nm=document.querySelector('.obt span');if(nm)nm.textContent=FACES[OB.face];}
function bindDrag(stg,cube){let sx,sy,ax0,ay0,drag=false,down=false,pid;
  stg.style.touchAction='none';
  stg.addEventListener('pointerdown',e=>{down=true;drag=false;sx=e.clientX;sy=e.clientY;ax0=OB.ax;ay0=OB.ay;pid=e.pointerId;});
  stg.addEventListener('pointermove',e=>{if(!down)return;const dx=e.clientX-sx,dy=e.clientY-sy;
    if(!drag){if(Math.hypot(dx,dy)<14)return;drag=true;try{stg.setPointerCapture(pid);}catch(_){}}
    const k=90/(stg.clientWidth*.55);
    if(ax0===0||dy*0===0){}
    if(ax0===0){OB.ay=ay0+dx*k;}
    OB.ax=Math.max(-90,Math.min(0,ax0+dy*k));
    if(ax0===-90&&Math.abs(dx)>Math.abs(dy)){}
    setT(cube,false);});
  const end=()=>{if(!down)return;down=false;if(!drag)return;
    OB.ay=Math.round(OB.ay/90)*90;OB.ax=OB.ax<-45?-90:0;OB.face=OB.ax?4:faceOfAy(OB.ay);setT(cube,true);setName();
    const sup=ev=>{ev.stopPropagation();ev.preventDefault();};stg.addEventListener('click',sup,{capture:true,once:true});setTimeout(()=>stg.removeEventListener('click',sup,true),60);};
  stg.addEventListener('pointerup',end);stg.addEventListener('pointercancel',end);}
function burst(stg){const f=el('div','flash');stg.append(f);setTimeout(()=>f.remove(),800);
  for(let i=0;i<16;i++){const p=el('div','pt2');const a=Math.random()*6.28,d=60+Math.random()*110;p.style.setProperty('--dx',Math.cos(a)*d+'px');p.style.setProperty('--dy',Math.sin(a)*d+'px');p.style.animationDelay=(Math.random()*.15)+'s';stg.append(p);setTimeout(()=>p.remove(),1200);}}
function draw(){
  const m=$('main');m.innerHTML='';m.scrollTop=0;const th=TH[OB.d.theme];
  if(OB.ax===undefined||OB.face!==(OB.ax?4:faceOfAy(OB.ay)))setFace(OB.face);
  $('app').style.backgroundImage='linear-gradient(rgba(8,8,14,.55),rgba(8,8,14,.9)),url(img/ob/'+th.img+'.webp)';$('app').style.backgroundSize='cover';
  const total=OB.b.parts.filter(p=>p.key).length,dn=OB.b.parts.filter(p=>p.key&&D(p.id)).length;
  const w=el('div','obw');
  const top=el('div','obt','<span>'+FACES[OB.face]+'</span><span class="muted sm">'+(OB.of>1?'Boîte '+OB.num+'/'+OB.of+' · ':'')+dn+' / '+total+' ✔</span>');
  const hb=el('button','mb','💡 Indice (3 💎)');hb.onclick=hint;top.append(hb);w.append(top);
  const stg=el('div','stage'),sc=el('div','scene'),cube=el('div','cube');cube.style.transform=cubeT();
  const FT=['rotateY(0deg)','rotateY(-90deg)','rotateY(180deg)','rotateY(90deg)','rotateX(90deg)'];
  for(let f=0;f<5;f++){const fc=el('div','face');fc.style.transform=FT[f]+' translateZ(calc(var(--st)/2))';
    const bg=el('div','bgf f'+f);bg.style.backgroundImage='url(img/ob/'+th.img+'.webp)';fc.append(bg);
    const inn=el('div','in');inn.style.cssText='left:'+th.safe[0]+'%;top:'+th.safe[1]+'%;width:'+th.safe[2]+'%;height:'+th.safe[3]+'%';
    OB.b.parts.filter(p=>p.f===f&&(!p.need||p.need())).forEach(p=>{const n=T[p.t](p);if(!n)return;n.classList.add('p');n.style.left=p.x+'%';n.style.top=p.y+'%';n.style.width=p.w+'%';n.style.height=p.h+'%';inn.append(n);});
    fc.append(inn,el('div','shade'));cube.append(fc);}
  sc.append(cube);stg.append(sc);
  stg.append(el('div','dimv'+(OB.d.theme==='night'&&!F('lamp')?' on':'')));
  bindDrag(stg,cube);
  w.append(stg);w.append(el('div','muted sm drh','↔↕ Fais glisser le doigt sur la boîte pour la tourner'));
  const inv=el('div','invb');if(!OB.inv.length)inv.append(el('span','em','Inventaire vide'));
  OB.inv.forEach(id=>{const it=OB.b.items[id];const b=el('button','it'+(OB.sel===id?' sel':''),it.kind==='note'?'<div class="note"></div>':im(it.spr));b.onclick=()=>pick(id);inv.append(b);});
  w.append(inv);
  const r=el('div','row2');const q=el('button','mb','☰ Boîtes');q.onclick=()=>{OB=null;home();};const rs=el('button','mb','↻ Recommencer');rs.onclick=()=>{openOv('<h2>Recommencer ?</h2><p class="muted">Une nouvelle boîte du même modèle (codes différents).</p><button class="ob" id="y">Oui</button><button class="ob alt" id="n">Non</button>');$('n').onclick=closeOv;$('y').onclick=()=>{closeOv();obStart(OB.d);};};r.append(q,rs);r.style.width='var(--st)';w.append(r);
  m.append(w);
  if(OB.fx){OB.fx=0;burst(stg);}
  OB.anim=null;
}
function pick(id){const it=OB.b.items[id];
  if(it.kind==='note'){showNote(id);return;}
  if(OB.sel&&OB.sel!==id){const rc=(OB.b.recipes||[]).find(r=>(r.a===OB.sel&&r.b===id)||(r.a===id&&r.b===OB.sel));
    if(rc){OB.inv=OB.inv.filter(x=>x!==OB.sel&&x!==id);OB.inv.push(rc.out);OB.sel=null;toast('Tu assembles : '+OB.b.items[rc.out].name+'.');draw();return;}
    toast('Ces deux objets ne vont pas ensemble.');}
  OB.sel=OB.sel===id?null:id;if(OB.sel)toast(it.name);draw();}
function showNote(id){const it=OB.b.items[id],n=it.note;
  openOv('<h2>'+it.name+'</h2><div class="ovn">'+(n.marks||[]).map(mk).join('')+(n.text?'<div class="tx">'+n.text+'</div>':'')+'</div><button class="ob" id="ok">Fermer</button>');$('ok').onclick=closeOv;}
const mk=i=>'<span class="eng '+(i.c||'dk')+'" style="'+(i.col?'color:'+i.col+';':'')+'left:'+i.x+'%;top:'+i.y+'%;font-size:'+(i.s?'calc(var(--st)*'+(i.s/100)+')':'')+';'+(i.r?'transform:translate(-50%,-50%) rotate('+i.r+'deg);':'')+'letter-spacing:'+(i.ls||0)+'px">'+G(i.t)+'</span>';
function hint(){const hs=OB.b.hints||[];if(OB.hintN>=hs.length){toast('Plus d’indice pour cette boîte.');return;}if(gems()<3){toast('Il te faut 3 💎.');return;}
  addGems(-3);OB.hints++;const h=hs[OB.hintN++];openOv('<h2>💡 Indice '+OB.hintN+'</h2><p>'+h+'</p><button class="ob" id="ok">Merci</button>');$('ok').onclick=closeOv;}
function solve(p,quiet){OB.done[p.id]=true;if(!quiet){toast(p.msg||'Clic ! Quelque chose s’est débloqué.');OB.fx=1;}
  (p.give||[]).forEach(g=>{if(p.t!=='hatch')take(g);});
  if(OB.d.win&&OB.d.win(D)&&!OB.over){OB.over=true;setTimeout(win,900);}
  draw();}
window.obDraw=draw;
function take(id){if(!OB.inv.includes(id)){OB.inv.push(id);OB.flags['took:'+id]=true;toast('Tu prends : '+OB.b.items[id].name+'.');}}
function win(){const t=Date.now()-OB.t0,id=OB.d.id;ST.ob=ST.ob||{done:{},best:{}};ST.ob.lv=ST.ob.lv||{};ST.ob.last=id;ST.ob.done[id]=(ST.ob.done[id]||0)+1;if(!ST.ob.best[id]||t<ST.ob.best[id])ST.ob.best[id]=t;
  if(OB.chain&&OB.chain.length){const nx=OB.chain[0];addGems(OB.d.rw);save();
    openOv('<img src="img/coffre1.webp" alt="" style="width:50%;max-width:180px;border-radius:20px;display:block;margin:0 auto 6px"><h2>Première boîte ouverte !</h2><p class="gold" style="font-size:22px">+'+OB.d.rw+' 💎</p><p class="muted">Une deuxième boîte t’attend, plus retorse encore.</p><button class="ob" id="nx">Boîte suivante</button>');
    $('nx').onclick=()=>{closeOv();const n=OB.lv,ch=OB.chain.slice(1),tot=OB.tot,k=OB.num+1,of=OB.of;obStart(nx);OB.lv=n;OB.chain=ch;OB.tot=tot;OB.num=k;OB.of=of;};return;}
  const bonus=0;if(OB.lv)ST.ob.lv[OB.lv]=(ST.ob.lv[OB.lv]||0)+1;addGems(OB.d.rw+bonus);save();
  const lv=OB.lv;
  openOv('<img src="img/coffre2.webp" alt="" style="width:60%;max-width:220px;border-radius:20px;display:block;margin:0 auto 6px"><h2>Boîte ouverte !</h2><p class="gold" style="font-size:22px">+'+(OB.d.rw+bonus)+' 💎</p><p class="muted">'+OB.d.name+' · '+fmt(t)+(OB.hints?' · '+OB.hints+' indice'+(OB.hints>1?'s':''):'')+'</p>'+(lv?'<button class="ob" id="rp">Nouvelle boîte ('+LV[lv-1].nm+')</button>':'<button class="ob" id="rp">Rejouer</button>')+'<button class="ob alt" id="hm">Menu Openbox</button>');
  $('rp').onclick=()=>{closeOv();if(lv)obLevel(lv);else obStart(OB.d);};$('hm').onclick=()=>{closeOv();OB=null;home();};}
const shake=n=>{if(n){bad(n);}};

/* ---------- composants ---------- */
const T={};
T.ring=p=>{const s=OB.st[p.id]||(OB.st[p.id]=p.init?p.init.slice():Array(p.n).fill(0));const w=el('div','row');const done=D(p.id);
  for(let i=0;i<p.n;i++){const sy=Array.isArray(p.syms[0])?p.syms[i]:p.syms;const sp=(Array.isArray(p.spr)?p.spr[i]:p.spr)||'d0';
    const b=el('button','rg'+(OB.anim&&OB.anim.id===p.id&&OB.anim.i===i?' sp':''),im(sp)+'<span style="color:'+(DINK[sp]||'#222')+'">'+G(sy[s[i]])+'</span>');
    b.onclick=()=>{if(D(p.id))return;s[i]=(s[i]+1)%sy.length;OB.anim={id:p.id,i};if(s.every((v,k)=>v===p.code[k]))solve(p);else draw();};w.append(b);}
  if(done)w.style.filter='drop-shadow(0 0 6px #5ee6a0)';return w;};
T.lever=p=>{const s=OB.st[p.id]||(OB.st[p.id]=p.init?p.init.slice():Array(p.n).fill(0));const w=el('div','row');
  for(let i=0;i<p.n;i++){const sp=(Array.isArray(p.spr)?p.spr[i]:p.spr)||'l0';const b=el('button','lv'+(s[i]?'':' dn')+(OB.anim&&OB.anim.id===p.id&&OB.anim.i===i?(s[i]?' au':' ad'):''),im(sp));
    b.onclick=()=>{if(D(p.id))return;s[i]=s[i]?0:1;OB.anim={id:p.id,i};if(s.every((v,k)=>v===p.target[k]))solve(p);else draw();};w.append(b);}
  if(D(p.id))w.style.filter='drop-shadow(0 0 6px #5ee6a0)';return w;};
T.pads=p=>{const s=OB.st[p.id]||(OB.st[p.id]=[]);const w=el('div','row');const dots=el('div','pdots');p.seq.forEach((_,i)=>dots.append(el('i',i<s.length?'on':'')));w.append(dots);
  p.cols.forEach((c,i)=>{const b=el('button','pd','');b.style.background='radial-gradient(circle at 35% 30%,#fff9,'+c+' 40%,#0008)';
    b.onclick=()=>{if(D(p.id))return;s.push(i);if(s[s.length-1]!==p.seq[s.length-1]){OB.st[p.id]=[];toast('Raté… ça se remet à zéro.');draw();return;}
      if(s.length===p.seq.length)solve(p);else{b.classList.add('fl');setTimeout(draw,180);}};w.append(b);});return w;};
T.socket=p=>{const s=OB.st[p.id]||(OB.st[p.id]=p.slots.map(()=>false));const w=el('div','row');
  p.slots.forEach((sl,i)=>{const b=el('button','sl '+(s[i]?'f':'e'),im(sl.g));b.onclick=()=>{if(s[i])return;const it=OB.sel&&OB.b.items[OB.sel];
      if(!it||!['gem','key','part'].includes(it.kind)){toast('Il faut quelque chose à placer ici.');shake(b);return;}
      if(it.spr!==sl.g){toast('Ça ne s’emboîte pas.');shake(b);OB.sel=null;draw();return;}
      OB.flags['used:'+OB.sel]=true;OB.inv=OB.inv.filter(x=>x!==OB.sel);OB.sel=null;s[i]=true;if(s.every(x=>x))solve(p);else{toast('Ça s’emboîte parfaitement.');draw();}};w.append(b);});return w;};
T.hatch=p=>{if(!D(p.id)){const b=el('button','hs2',im(p.spr||'l7','pl'));b.onclick=()=>{if(p.open()){OB.done[p.id]=true;OB.anim={id:p.id};toast(p.msg||'Le panneau s’ouvre.');draw();}else{toast(p.locked||'Fermé.');shake(b);}};return b;}
  const w=el('div','cav'+(OB.anim&&OB.anim.id===p.id?' ho':''),'<img class="open" src="img/ob/'+(p.spr||'l7')+'.webp" alt="">');
  (p.give||[]).filter(g=>!OB.flags['took:'+g]).forEach(g=>{const it=OB.b.items[g];const b=el('button','hs2',it.kind==='note'?'<div class="note" style="margin:auto"></div>':im(it.spr));b.style.cssText='height:100%;flex:1';b.onclick=()=>{take(g);draw();};w.append(b);});return w;};
T.hot=p=>{if(D(p.id)&&(!p.spr||p.pick))return null;const w=el('button','hs2',p.spr?im(p.spr):(p.glint===false?'':'<div class="glint"></div>'));w.style.width='100%';w.style.height='100%';
  if(p.spr&&(D(p.id)||(p.toggle&&OB.flags[p.id])))w.style.filter='drop-shadow(0 0 8px #fff)';
  w.onclick=()=>{if(D(p.id)&&!p.again)return;if(p.uses&&OB.sel!==p.uses){toast(p.fail||'Il faudrait utiliser quelque chose ici.');shake(w);return;}if(p.cond&&!p.cond()){toast(p.fail||'Rien ne se passe.');shake(w);return;}if(p.toggle){OB.flags[p.id]=!OB.flags[p.id];toast(OB.flags[p.id]?'Allumé.':'Éteint.');draw();return;}solve(p);};return w;};
T.marks=p=>{const w=el('div','');w.style.pointerEvents='none';w.innerHTML=p.items.map(mk).join('');return w;};
T.tiles=p=>{const N=3;const s=OB.st[p.id]||(OB.st[p.id]=p.init.slice());const w=el('div','tg');w.style.gridTemplateColumns='repeat(3,1fr)';
  s.forEach((v,i)=>{const b=el('button','tl2'+(v?'':' e'),v?G(p.glyphs[v-1]):'');b.onclick=()=>{if(D(p.id))return;const z=s.indexOf(0),x=i%N,y=(i/N)|0,zx=z%N,zy=(z/N)|0;if(Math.abs(x-zx)+Math.abs(y-zy)!==1)return;s[z]=v;s[i]=0;
      if(s.every((q,j)=>q===(j+1)%9))solve(p);else draw();};w.append(b);});if(D(p.id))w.style.boxShadow='0 0 8px #5ee6a0';return w;};
T.knot=p=>{const n=p.n,r=OB.st[p.id]||(OB.st[p.id]=p.init.slice());const done=D(p.id);const sel=OB.st[p.id+'_s'];
  const w=el('div','kn');const Y=i=>(i+.5)*100/n;
  let svg='<svg viewBox="0 0 100 100" preserveAspectRatio="none">';
  const order=r.map((s0,pos)=>[s0,pos]);
  order.forEach(([st,pos])=>{const y0=Y(st),y1=Y(pos),d='M9 '+y0+' C 50 '+y0+' 50 '+y1+' 91 '+y1;
    svg+='<path d="'+d+'" stroke="#000a" stroke-width="5.6" fill="none" vector-effect="non-scaling-stroke" style="stroke-width:11px"/><path d="'+d+'" stroke="'+p.cols[st]+'" fill="none" vector-effect="non-scaling-stroke" style="stroke-width:7px"/><path d="'+d+'" stroke="#fff6" fill="none" vector-effect="non-scaling-stroke" style="stroke-width:2px;transform:translateY(-1.2px)"/>';});
  svg+='</svg>';w.innerHTML=svg;
  for(let i=0;i<n;i++){const l=el('i','kl');l.style.top=Y(i)+'%';l.style.background=p.cols[i];w.append(l);}
  for(let pos=0;pos<n;pos++){const b=el('button','kr'+(sel===pos?' sel':''));b.style.top=Y(pos)+'%';b.style.background=p.cols[r[pos]];
    b.onclick=()=>{if(D(p.id))return;const q=OB.st[p.id+'_s'];if(q==null||q===pos){OB.st[p.id+'_s']=q===pos?null:pos;draw();return;}
      if(Math.abs(q-pos)===1){const t=r[q];r[q]=r[pos];r[pos]=t;OB.st[p.id+'_s']=null;if(r.every((v,i)=>v===i))solve(p);else draw();}else{OB.st[p.id+'_s']=pos;draw();}};w.append(b);}
  if(done)w.style.filter='drop-shadow(0 0 6px #5ee6a0)';return w;};
T.train=p=>{const st=OB.st[p.id]||(OB.st[p.id]=p.slots.map(()=>false));const w=el('div','trn');const done=D(p.id);const turned=OB.st[p.id+'_t']||0;
  p.slots.forEach((sl,i)=>{const b=el('button','tg2'+(st[i]?' fl':''));b.style.cssText='left:'+sl.x+'%;top:'+sl.y+'%;width:'+sl.w+'%;aspect-ratio:1';
    if(st[i])b.innerHTML=im(sl.g,'spn'+(i%2?' r':''));
    b.onclick=()=>{if(st[i]||done)return;const it=OB.sel&&OB.b.items[OB.sel];if(!it||it.kind!=='part'){toast('Un axe vide. Il faut y poser un engrenage.');shake(b);return;}
      if(it.spr!==sl.g){toast('Celui-là ne s’engrène pas ici.');shake(b);OB.sel=null;draw();return;}
      OB.flags['used:'+OB.sel]=true;OB.inv=OB.inv.filter(x=>x!==OB.sel);OB.sel=null;st[i]=true;if(st.every(x=>x))solve(p);else{toast('Ça s’emboîte.');draw();}};w.append(b);});
  return w;};
T.crank=p=>{const w=el('div','crk');const s=OB.st[p.id]||(OB.st[p.id]={has:false,n:0});const done=D(p.id);
  const hub=el('button','hub'+(s.has?' on':''),s.has?im(p.item,'hd'+(OB.anim&&OB.anim.id===p.id?' sp2':'')):'<div class="ax"></div>');
  hub.onclick=()=>{if(done)return;if(!s.has){const it=OB.sel&&OB.b.items[OB.sel];if(!it||it.spr!==p.item){toast('Il manque une manivelle pour tourner ça.');shake(hub);return;}OB.flags['used:'+OB.sel]=true;OB.inv=OB.inv.filter(x=>x!==OB.sel);OB.sel=null;s.has=true;toast('La manivelle est en place. Tourne !');draw();return;}
    s.n++;OB.anim={id:p.id};if(s.n>=p.turns)solve(p);else draw();};
  w.append(hub);const pp=el('div','cp');for(let i=0;i<p.turns;i++)pp.append(el('i',i<s.n?'on':''));w.append(pp);return w;};
T.keyhole=p=>{const w=el('div','row');const f=D(p.id);const b=el('button','sl '+(f?'f':'e'),im(p.key));
  b.onclick=()=>{if(f)return;const it=OB.sel&&OB.b.items[OB.sel];if(!it||it.kind!=='key'){toast('Une serrure… il faudrait une clé.');shake(b);return;}
    if(it.spr!==p.key){toast('Cette clé ne convient pas.');shake(b);OB.sel=null;draw();return;}OB.flags['used:'+OB.sel]=true;OB.inv=OB.inv.filter(x=>x!==OB.sel);OB.sel=null;solve(p);};w.append(b);return w;};

/* ---------- robot de test ---------- */
window.obBot=function(){let g=0;while(!OB.over&&g++<80){let prog=false;
  OB.d.parts.length;
  OB.b.parts.forEach(p=>{if(D(p.id)&&p.t!=='hatch'&&p.t!=='hot')return;if(p.need&&!p.need())return;
    if(p.t==='ring'){if(!D(p.id)){OB.st[p.id]=p.code.slice();solve(p,true);prog=true;}}
    else if(p.t==='lever'){if(!D(p.id)){OB.st[p.id]=p.target.slice();solve(p,true);prog=true;}}
    else if(p.t==='pads'){if(!D(p.id)){solve(p,true);prog=true;}}
    else if(p.t==='knot'){if(!D(p.id)){OB.st[p.id]=p.cols.map((_,i)=>i);solve(p,true);prog=true;}}
    else if(p.t==='train'){if(!D(p.id)){const st=OB.st[p.id]||(OB.st[p.id]=p.slots.map(()=>false));p.slots.forEach((sl,i)=>{if(st[i])return;const id=OB.inv.find(x=>OB.b.items[x].spr===sl.g&&OB.b.items[x].kind==='part');if(id){OB.inv=OB.inv.filter(x=>x!==id);OB.flags['used:'+id]=true;st[i]=true;prog=true;}});if(st.every(x=>x)){solve(p,true);prog=true;}}}
    else if(p.t==='crank'){if(!D(p.id)){const st=OB.st[p.id]||(OB.st[p.id]={has:false,n:0});if(!st.has){const id=OB.inv.find(x=>OB.b.items[x].spr===p.item);if(id){OB.inv=OB.inv.filter(x=>x!==id);OB.flags['used:'+id]=true;st.has=true;prog=true;}}if(st.has){st.n=p.turns;solve(p,true);prog=true;}}}
    else if(p.t==='tiles'){if(!D(p.id)){OB.st[p.id]=[1,2,3,4,5,6,7,8,0];solve(p,true);prog=true;}}
    else if(p.t==='hot'){if(!D(p.id)&&(!p.cond||p.cond())&&(!p.uses||OB.inv.includes(p.uses))){solve(p,true);prog=true;}}
    else if(p.t==='hatch'){if(!D(p.id)&&p.open()){OB.done[p.id]=true;prog=true;}if(D(p.id))(p.give||[]).forEach(x=>{if(!OB.flags['took:'+x]){take(x);prog=true;}});}
    else if(p.t==='keyhole'){if(!D(p.id)){const id=OB.inv.find(i=>OB.b.items[i].kind==='key'&&OB.b.items[i].spr===p.key);if(id){OB.inv=OB.inv.filter(x=>x!==id);OB.flags['used:'+id]=true;solve(p,true);prog=true;}}}
    else if(p.t==='socket'){if(!D(p.id)){const s=OB.st[p.id]||(OB.st[p.id]=p.slots.map(()=>false));p.slots.forEach((sl,i)=>{if(s[i])return;const id=OB.inv.find(x=>OB.b.items[x].spr===sl.g&&['gem','key','part'].includes(OB.b.items[x].kind));if(id){OB.inv=OB.inv.filter(x=>x!==id);OB.flags['used:'+id]=true;s[i]=true;prog=true;}});if(s.every(x=>x)){solve(p,true);prog=true;}}}
  });
  (OB.b.recipes||[]).forEach(r=>{if(OB.inv.includes(r.a)&&OB.inv.includes(r.b)){OB.inv=OB.inv.filter(x=>x!==r.a&&x!==r.b);OB.inv.push(r.out);prog=true;}});
  if(!prog)break;}
  return OB.over;};
window.obState=()=>OB;
window.obDefine=function(d){OBX.boxes.push(d);};
window.obStartTest=function(id,seed){const d=OBX.boxes.find(x=>x.id===id);obStart(d,seed);return OB;};
})();

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
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

const SY=['☀','☾','★','♠','♣','♥','♦','⚓','☘','⚡','♞','✿'].map(s=>s+'︎');
const DINK={d0:'#3a2a12',d1:'#f6e7b8',d2:'#3b1d0a',d3:'#2b2418',d4:'#222',d5:'#3a2a12',d6:'#222',d7:'#fff',d8:'#123'};
const FACES=['Face avant','Côté gauche','Face arrière','Côté droit','Dessus'];
const TH={wood:{img:'p_wood',safe:[11,11,78,78]},egypt:{img:'p_egypt',safe:[17,17,66,66]},steam:{img:'p_steam',safe:[11,11,78,78]},night:{img:'p_night',safe:[16,16,68,68]}};
window.OBX={SY,boxes:[]};
let OB=null;
const D=id=>!!OB.done[id],F=f=>!!OB.flags[f],H=id=>OB.inv.includes(id)||!!OB.flags['used:'+id];
window.obD=D;window.obF=F;window.obH=H;
const im=(id,c)=>'<img src="img/ob/'+id+'.webp" alt="" draggable="false"'+(c?' class="'+c+'"':'')+'>';
const stSize=()=>{const m=$('main');const w=Math.min(m.clientWidth-4,window.innerHeight-290,520);document.documentElement.style.setProperty('--st',Math.max(240,w)+'px');};
window.addEventListener('resize',()=>{if(OB&&!OB.over)stSize();});

/* ---------- liste des boîtes ---------- */
window.obList=function(box){
  box.innerHTML='';
  box.append(el('p','muted sm','Chaque boîte est un objet à explorer : fais-la tourner, touche, tourne, déplace. Aucune consigne, à toi de comprendre.'));
  const g=el('div','bgrid');
  OBX.boxes.forEach(d=>{const o=ST.ob&&ST.ob.done&&ST.ob.done[d.id];
    const b=el('button','bx','<div>'+d.name+'<small>'+d.lab+' · 💎 '+d.rw+(o?' · ✔ ×'+o:'')+'</small></div>');b.style.backgroundImage='url(img/ob/p_'+d.theme+'.webp)';b.onclick=()=>obIntro(d);g.append(b);});
  box.append(g);
};
function obIntro(d){
  openOv('<img src="img/ob/'+(d.icon||'k0')+'.webp" style="height:70px;display:block;margin:0 auto" alt=""><h2>'+d.name+'</h2><p class="muted">'+d.lab+' · '+d.parts+' mécanismes</p><p>'+d.intro+'</p><p class="gold">Récompense : '+d.rw+' 💎</p><button class="ob" id="go">Ouvrir la boîte</button><button class="ob alt" id="cn">Retour</button>');
  $('cn').onclick=closeOv;$('go').onclick=()=>{closeOv();obStart(d);};
}
/* ---------- partie ---------- */
function obStart(d,seed){
  seed=seed||Math.floor(Math.random()*1e9);const R=mkR(seed);const b=d.build(R);
  OB={d,b,seed,t0:Date.now(),face:0,done:{},inv:(b.inv0||[]).slice(),sel:null,st:{},flags:{},hintN:0,hints:0,over:false};
  bgSet(null);$('sc').textContent='📦 '+d.name;stSize();draw();
}
window.obLeave=function(){OB=null;};
function nearFace(dir){const fs=[0,1,2,3];if(OB.face===4)return;const i=fs.indexOf(OB.face);OB.face=fs[(i+dir+4)%4];draw();}
function draw(){
  const m=$('main');m.innerHTML='';m.scrollTop=0;const th=TH[OB.d.theme],f=OB.face;
  const total=OB.b.parts.filter(p=>p.key).length,dn=OB.b.parts.filter(p=>p.key&&D(p.id)).length;
  const w=el('div','obw');
  const top=el('div','obt','<span>'+FACES[f]+'</span><span class="muted sm">'+dn+' / '+total+' ✔</span>');
  const hb=el('button','mb','💡 Indice (3 💎)');hb.onclick=hint;top.append(hb);w.append(top);
  const stg=el('div','stage');const bg=el('div','bgf f'+f);bg.style.backgroundImage='url(img/ob/'+th.img+'.webp)';stg.append(bg);
  const inn=el('div','in');inn.style.cssText='left:'+th.safe[0]+'%;top:'+th.safe[1]+'%;width:'+th.safe[2]+'%;height:'+th.safe[3]+'%';
  OB.b.parts.filter(p=>p.f===f&&(!p.need||p.need())).forEach(p=>{const n=T[p.t](p);if(!n)return;n.classList.add('p');n.style.left=p.x+'%';n.style.top=p.y+'%';n.style.width=p.w+'%';n.style.height=p.h+'%';inn.append(n);});
  stg.append(inn);
  if(f!==4){[['l','◀',-1],['r','▶',1]].forEach(([c,t,dd])=>{const b=el('button','nv '+c,t);b.onclick=()=>nearFace(dd);stg.append(b);});const t=el('button','nv t','▲');t.onclick=()=>{OB.face=4;draw();};stg.append(t);}
  else{const b=el('button','nv b','▼');b.onclick=()=>{OB.face=0;draw();};stg.append(b);}
  stg.append(el('div','fn',''));
  let x0=null;stg.addEventListener('touchstart',e=>{x0=e.touches[0].clientX;},{passive:true});
  stg.addEventListener('touchend',e=>{if(x0==null)return;const dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>70)nearFace(dx<0?1:-1);},{passive:true});
  w.append(stg);
  const inv=el('div','invb');if(!OB.inv.length)inv.append(el('span','em','Inventaire vide'));
  OB.inv.forEach(id=>{const it=OB.b.items[id];const b=el('button','it'+(OB.sel===id?' sel':''),it.kind==='note'?'<div class="note"></div>':im(it.spr));b.onclick=()=>pick(id);inv.append(b);});
  w.append(inv);
  const r=el('div','row2');const q=el('button','mb','☰ Boîtes');q.onclick=()=>{OB=null;home();};const rs=el('button','mb','↻ Recommencer');rs.onclick=()=>{openOv('<h2>Recommencer ?</h2><p class="muted">Une nouvelle boîte du même modèle (codes différents).</p><button class="ob" id="y">Oui</button><button class="ob alt" id="n">Non</button>');$('n').onclick=closeOv;$('y').onclick=()=>{closeOv();obStart(OB.d);};};r.append(q,rs);r.style.width='var(--st)';w.append(r);
  m.append(w);
}
window.obDraw=draw;
function pick(id){const it=OB.b.items[id];
  if(it.kind==='note'){showNote(id);return;}
  if(OB.sel&&OB.sel!==id){const rc=(OB.b.recipes||[]).find(r=>(r.a===OB.sel&&r.b===id)||(r.a===id&&r.b===OB.sel));
    if(rc){OB.inv=OB.inv.filter(x=>x!==OB.sel&&x!==id);OB.inv.push(rc.out);OB.sel=null;toast('Tu assembles : '+OB.b.items[rc.out].name+'.');draw();return;}
    toast('Ces deux objets ne vont pas ensemble.');}
  OB.sel=OB.sel===id?null:id;draw();}
function showNote(id){const it=OB.b.items[id],n=it.note;
  openOv('<h2>'+it.name+'</h2><div class="ovn">'+(n.marks||[]).map(mk).join('')+(n.text?'<div class="tx">'+n.text+'</div>':'')+'</div><button class="ob" id="ok">Fermer</button>');$('ok').onclick=closeOv;}
const mk=i=>'<span class="eng '+(i.c||'dk')+'" style="'+(i.col?'color:'+i.col+';':'')+'left:'+i.x+'%;top:'+i.y+'%;font-size:'+(i.s?'calc(var(--st)*'+(i.s/100)+')':'')+';'+(i.r?'transform:translate(-50%,-50%) rotate('+i.r+'deg);':'')+'letter-spacing:'+(i.ls||0)+'px">'+i.t+'</span>';
function hint(){const hs=OB.b.hints||[];if(OB.hintN>=hs.length){toast('Plus d’indice pour cette boîte.');return;}if(gems()<3){toast('Il te faut 3 💎.');return;}
  addGems(-3);OB.hints++;const h=hs[OB.hintN++];openOv('<h2>💡 Indice '+OB.hintN+'</h2><p>'+h+'</p><button class="ob" id="ok">Merci</button>');$('ok').onclick=closeOv;}
function solve(p,quiet){OB.done[p.id]=true;if(!quiet)toast(p.msg||'Clic ! Quelque chose s’est débloqué.');
  (p.give||[]).forEach(g=>{if(p.t!=='hatch')take(g);});
  if(OB.d.win&&OB.d.win(D)&&!OB.over){OB.over=true;setTimeout(win,700);}
  draw();}
function take(id){if(!OB.inv.includes(id)){OB.inv.push(id);OB.flags['took:'+id]=true;toast('Tu prends : '+OB.b.items[id].name+'.');}}
function win(){const t=Date.now()-OB.t0,id=OB.d.id;ST.ob=ST.ob||{done:{},best:{}};ST.ob.done[id]=(ST.ob.done[id]||0)+1;if(!ST.ob.best[id]||t<ST.ob.best[id])ST.ob.best[id]=t;save();addGems(OB.d.rw);
  openOv('<img src="img/coffre2.webp" alt="" style="width:60%;max-width:220px;border-radius:20px;display:block;margin:0 auto 6px"><h2>Boîte ouverte !</h2><p class="gold" style="font-size:22px">+'+OB.d.rw+' 💎</p><p class="muted">'+OB.d.name+' · '+fmt(t)+(OB.hints?' · '+OB.hints+' indice'+(OB.hints>1?'s':''):'')+'</p><button class="ob" id="rp">Rejouer cette boîte (codes différents)</button><button class="ob alt" id="hm">Autres boîtes</button>');
  $('rp').onclick=()=>{closeOv();obStart(OB.d);};$('hm').onclick=()=>{closeOv();OB=null;home();};}
const shake=n=>{if(n){bad(n);}};

/* ---------- composants ---------- */
const T={};
T.ring=p=>{const s=OB.st[p.id]||(OB.st[p.id]=p.init?p.init.slice():Array(p.n).fill(0));const w=el('div','row');const done=D(p.id);
  for(let i=0;i<p.n;i++){const sy=Array.isArray(p.syms[0])?p.syms[i]:p.syms;const sp=(Array.isArray(p.spr)?p.spr[i]:p.spr)||'d0';
    const b=el('button','rg',im(sp)+'<span style="color:'+(DINK[sp]||'#222')+'">'+sy[s[i]]+'</span>');
    b.onclick=()=>{if(D(p.id))return;s[i]=(s[i]+1)%sy.length;if(s.every((v,k)=>v===p.code[k]))solve(p);else draw();};w.append(b);}
  if(done)w.style.filter='drop-shadow(0 0 6px #5ee6a0)';return w;};
T.lever=p=>{const s=OB.st[p.id]||(OB.st[p.id]=p.init?p.init.slice():Array(p.n).fill(0));const w=el('div','row');
  for(let i=0;i<p.n;i++){const sp=(Array.isArray(p.spr)?p.spr[i]:p.spr)||'l0';const b=el('button','lv'+(s[i]?'':' dn'),im(sp));
    b.onclick=()=>{if(D(p.id))return;s[i]=s[i]?0:1;if(s.every((v,k)=>v===p.target[k]))solve(p);else draw();};w.append(b);}
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
T.hatch=p=>{if(!D(p.id)){const b=el('button','hs2',im(p.spr||'l7','pl'));b.onclick=()=>{if(p.open()){OB.done[p.id]=true;toast(p.msg||'Le panneau s’ouvre.');draw();}else{toast(p.locked||'Fermé.');shake(b);}};return b;}
  const w=el('div','cav','<img class="open" src="img/ob/'+(p.spr||'l7')+'.webp" alt="">');
  (p.give||[]).filter(g=>!OB.flags['took:'+g]).forEach(g=>{const it=OB.b.items[g];const b=el('button','hs2',it.kind==='note'?'<div class="note" style="margin:auto"></div>':im(it.spr));b.style.cssText='height:100%;flex:1';b.onclick=()=>{take(g);draw();};w.append(b);});return w;};
T.hot=p=>{if(D(p.id)&&!p.spr)return null;const w=el('button','hs2',p.spr?im(p.spr):(p.glint===false?'':'<div class="glint"></div>'));w.style.width='100%';w.style.height='100%';
  if(p.spr&&(D(p.id)||(p.toggle&&OB.flags[p.id])))w.style.filter='drop-shadow(0 0 8px #fff)';
  w.onclick=()=>{if(D(p.id)&&!p.again)return;if(p.cond&&!p.cond()){toast(p.fail||'Rien ne se passe.');shake(w);return;}if(p.toggle){OB.flags[p.id]=!OB.flags[p.id];toast(OB.flags[p.id]?'Allumé.':'Éteint.');draw();return;}solve(p);};return w;};
T.marks=p=>{const w=el('div','');w.style.pointerEvents='none';w.innerHTML=p.items.map(mk).join('');return w;};
T.tiles=p=>{const N=3;const s=OB.st[p.id]||(OB.st[p.id]=p.init.slice());const w=el('div','tg');w.style.gridTemplateColumns='repeat(3,1fr)';
  s.forEach((v,i)=>{const b=el('button','tl2'+(v?'':' e'),v?p.glyphs[v-1]:'');b.onclick=()=>{if(D(p.id))return;const z=s.indexOf(0),x=i%N,y=(i/N)|0,zx=z%N,zy=(z/N)|0;if(Math.abs(x-zx)+Math.abs(y-zy)!==1)return;s[z]=v;s[i]=0;
      if(s.every((q,j)=>q===(j+1)%9))solve(p);else draw();};w.append(b);});if(D(p.id))w.style.boxShadow='0 0 8px #5ee6a0';return w;};
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
    else if(p.t==='tiles'){if(!D(p.id)){OB.st[p.id]=[1,2,3,4,5,6,7,8,0];solve(p,true);prog=true;}}
    else if(p.t==='hot'){if(!D(p.id)&&(!p.cond||p.cond())){solve(p,true);prog=true;}}
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

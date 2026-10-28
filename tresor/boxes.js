(function(){
const SY=OBX.SY,GN={g0:'Rubis',g1:'Émeraude',g2:'Saphir',g3:'Topaze',g4:'Améthyste',g5:'Diamant',g6:'Opale',g7:'Aigue-marine',g8:'Grenat'};
const DG='0123456789'.split('');
const K=(n,s)=>({name:n,kind:'key',spr:s}),G=g=>({name:GN[g],kind:'gem',spr:g}),NT=(n,marks,text)=>({name:n,kind:'note',note:{marks,text}});
const mark=(t,x,y,s,c,col)=>({t,x,y,s,c:c||'gl',col});
const D=id=>obD(id),F=f=>obF(f),H=id=>obH(id);
const O=(n,s)=>({name:n,kind:'part',spr:s});
const arrows=(tg,x0,dx,y,s)=>tg.map((v,i)=>mark(v?'▲':'▼',x0+i*dx,y,s,'dk'));
const perm=(R,n)=>R.shuf(Array.from({length:n},(_,i)=>i));

/* ---------- 1. Le coffre du capitaine ---------- */
obDefine({id:'capitaine',name:'Le coffre du capitaine',lab:'Facile',theme:'wood',rw:10,parts:4,icon:'k1',
 intro:'Un vieux coffre de marin, verrouillé de partout. Fais-le tourner et fouille chaque côté.',
 win:D=>D('sock'),
 build(R){
  const cnt=[R.int(2,5),R.int(1,5),R.int(2,5)];
  const rows=cnt.map(c=>{const a=[];for(let i=0;i<c;i++)a.push(SY[7]);for(let i=R.int(2,4);i>0;i--)a.push(R.pick([SY[1],SY[2],SY[0],SY[6]]));return R.shuf(a).join(' ');});
  let tg=[R.int(0,1),R.int(0,1),R.int(0,1)];if(tg.every(v=>v===tg[0]))tg[R.int(0,2)]^=1;
  const gs=R.shuf(['g0','g1','g2','g3','g4','g8']),ga=gs[0],gb=gs[1],gd=gs[2];
  const parts=[
   {t:'marks',f:3,x:0,y:0,w:100,h:100,items:rows.map((r,i)=>mark(r,50,22+i*28,6.5))},
   {t:'ring',id:'ring',f:0,x:6,y:34,w:88,h:30,n:3,syms:DG,spr:'d0',code:cnt,key:true},
   {t:'hatch',id:'h1',f:0,x:34,y:70,w:32,h:24,open:()=>D('ring'),give:['kfer','gd'],msg:'Le panneau coulisse.',locked:'Un panneau verrouillé, il ne bouge pas.'},
   {t:'keyhole',id:'kh',f:1,x:36,y:24,w:28,h:34,key:'k1',key2:1,key:'k1',keyed:1},
   {t:'hatch',id:'h2',f:1,x:20,y:66,w:60,h:26,open:()=>D('kh'),give:['note','ga']},
   {t:'lever',id:'lev',f:2,x:10,y:26,w:80,h:42,n:3,target:tg,spr:'l0',key:true},
   {t:'hatch',id:'h3',f:2,x:30,y:72,w:40,h:22,open:()=>D('lev'),give:['gb']},
   {t:'socket',id:'sock',f:4,x:10,y:34,w:80,h:32,slots:[{g:ga},{g:gb}],key:true}];
  parts.find(p=>p.id==='kh').key='k1';parts.find(p=>p.id==='kh').keyed=1;
  return{parts,hints:['Sur le côté droit : compte seulement les ⚓ de chaque ligne.','Les trois nombres se lisent de haut en bas, comme les anneaux de gauche à droite.','La clé de fer va dans la serrure du côté gauche.','Le papier montre la position des leviers : ▲ en haut, ▼ en bas.','Les deux gemmes à poser sur le dessus se trouvent dans les panneaux de gauche et d’arrière.'],
   items:{kfer:K('Clé de fer','k1'),gd:G(gd),ga:G(ga),gb:G(gb),note:NT('Papier froissé',tg.map((v,i)=>mark(v?'▲':'▼',22+i*28,42,16,'dk')),'Dans l’ordre.')}};
 }});

/* ---------- 2. La boîte du pharaon ---------- */
obDefine({id:'pharaon',name:'La boîte du pharaon',lab:'Moyen',theme:'egypt',rw:16,parts:5,icon:'k3',
 intro:'Une boîte funéraire couverte de signes. Rien n’est écrit deux fois au même endroit.',
 win:D=>D('sock'),
 build(R){
  const gl=R.shuf(SY).slice(0,8),ks=perm(R,8).slice(0,4);
  const solved=[1,2,3,4,5,6,7,8,0],init=solved.slice();let z=8,last=-1;
  for(let t=0;t<80;t++){const x=z%3,y=(z/3)|0,c=[];if(x>0)c.push(z-1);if(x<2)c.push(z+1);if(y>0)c.push(z-3);if(y<2)c.push(z+3);const o=c.filter(q=>q!==last),q=R.pick(o.length?o:c);init[z]=init[q];init[q]=0;last=z;z=q;}
  if(init.every((v,i)=>v===solved[i])){init[8]=init[7];init[7]=0;}
  const cols=['#2f55d4','#d4342c','#2fa84f','#e0b030'],seq=Array.from({length:5},()=>R.int(0,3));
  const gg=R.shuf(['g0','g1','g2','g3','g4','g7','g8']).slice(0,3);
  const parts=[
   {t:'tiles',id:'tiles',f:0,x:10,y:6,w:80,h:80,glyphs:gl,init,key:true},
   {t:'marks',f:3,x:0,y:0,w:100,h:50,items:ks.map((k,i)=>mark(String(k+1),14+i*24,28,12,'gl'))},
   {t:'socket',id:'sock',f:3,x:8,y:56,w:84,h:32,slots:gg.map(g=>({g})),key:true},
   {t:'ring',id:'ring',f:1,x:4,y:32,w:92,h:30,n:4,syms:gl,spr:'d2',code:ks,key:true},
   {t:'hatch',id:'h1',f:1,x:32,y:68,w:36,h:24,open:()=>D('ring'),give:['kos']},
   {t:'keyhole',id:'kh',f:2,x:36,y:22,w:28,h:34,key:'k3',key2:1,keyed:1},
   {t:'hatch',id:'h2',f:2,x:18,y:64,w:64,h:28,open:()=>D('kh'),give:['pap']},
   {t:'pads',id:'pads',f:4,x:8,y:36,w:84,h:30,cols,seq,key:true},
   {t:'hatch',id:'h3',f:4,x:28,y:70,w:44,h:24,open:()=>D('pads'),give:gg.map((g,i)=>'g'+i)}];
  parts.find(p=>p.id==='kh').key='k3';
  const items={kos:K('Clé en os','k3'),pap:NT('Papyrus',seq.map((c,i)=>mark('●',10+i*20,45,16,'dk',cols[c])),'')};
  gg.forEach((g,i)=>items['g'+i]=G(g));
  return{parts,items,hints:['Sur la face avant, remets les tuiles dans l’ordre : elle montrent huit signes.','Les nombres du côté droit sont des positions dans la grille résolue (de gauche à droite, ligne par ligne).','Les quatre signes ainsi trouvés se tournent sur les anneaux du côté gauche.','La clé en os ouvre la face arrière.','Le papyrus donne l’ordre de pression des quatre pastilles du dessus.']};
 }});

/* ---------- 3. La boîte mécanique ---------- */
obDefine({id:'meca',name:'La boîte mécanique',lab:'Moyen',theme:'steam',rw:22,parts:4,icon:'d2',
 intro:'Cuivre, vapeur, rouages. Chaque mécanisme dépend d’un autre : à toi de trouver par où commencer.',
 win:D=>D('kh'),
 build(R){
  const c=[R.int(2,8),R.int(2,8)];let tg=[R.int(0,1),R.int(0,1),R.int(0,1),R.int(0,1)];if(tg.every(v=>v===tg[0]))tg[R.int(0,3)]^=1;
  const tick=n=>Array(n).fill('|').join(' ');
  const parts=[
   {t:'ring',id:'wheel',f:1,x:18,y:20,w:64,h:36,n:2,syms:DG,spr:'l8',code:c,key:true},
   {t:'hatch',id:'hA',f:1,x:18,y:64,w:64,h:28,open:()=>D('wheel'),give:['gc','nA'],spr:'l7'},
   {t:'marks',f:2,x:0,y:8,w:100,h:20,items:[mark(tick(c[0]),28,50,9,'gl'),mark('◆',50,50,6,'gl'),mark(tick(c[1]),74,50,9,'gl')]},
   {t:'socket',id:'gears',f:2,x:14,y:34,w:72,h:34,slots:[{g:'d6'},{g:'d2'}],key:true},
   {t:'hatch',id:'hC',f:2,x:30,y:73,w:40,h:22,open:()=>D('gears'),give:['kmeca']},
   {t:'lever',id:'lev',f:0,x:8,y:26,w:84,h:38,n:4,target:tg,spr:'l1',key:true},
   {t:'hatch',id:'hB',f:0,x:30,y:68,w:40,h:24,open:()=>D('lev'),give:['gs']},
   {t:'keyhole',id:'kh',f:3,x:36,y:30,w:28,h:34,key:'k5',key2:1,keyed:1},
   {t:'marks',f:3,x:0,y:62,w:100,h:20,items:[mark('| | | |',50,50,8,'gl')]}];
  parts.find(p=>p.id==='kh').key='k5';
  return{parts,items:{gc:{name:'Engrenage de cuivre',kind:'part',spr:'d2'},gs:{name:'Engrenage d’argent',kind:'part',spr:'d6'},kmeca:K('Clé d’argent','k5'),
    nA:NT('Plan du Professeur',tg.map((v,i)=>mark(v?'▲':'▼',15+i*23,42,15,'dk')),'Ordre des manettes.')},
   hints:['Au dos : deux groupes de traits séparés par un losange. Compte-les.','Les deux nombres se règlent sur les deux molettes du côté gauche.','Le plan trouvé montre les manettes de la face avant (▲ en haut).','Il faut deux engrenages, un dans chaque panneau, pour la face arrière.','La clé d’argent ouvre la serrure du côté droit.']};
 }});

/* ---------- 4. La boîte des étoiles ---------- */
obDefine({id:'etoiles',name:'La boîte des étoiles',lab:'Difficile',theme:'night',rw:30,parts:4,icon:'g2',
 intro:'Une boîte de nuit et de cristal. Certains secrets ne se voient que dans la lumière.',
 win:D=>D('sock'),
 build(R){
  const code=Array.from({length:4},()=>R.int(0,11)),cols=['#2f55d4','#d4342c','#2fa84f','#e0b030'],seq=Array.from({length:5},()=>R.int(0,3));
  const lt=(t,x,y,s)=>Object.assign(mark(t,x,y,s,'lt'),{});
  const parts=[
   {t:'hot',id:'lamp',f:0,x:40,y:4,w:20,h:18,spr:'l5',toggle:true},
   {t:'ring',id:'ring',f:0,x:4,y:30,w:92,h:30,n:4,syms:SY,spr:'d7',code,key:true},
   {t:'hatch',id:'h1',f:0,x:32,y:66,w:36,h:24,open:()=>D('ring'),give:['kcr','gdi']},
   {t:'marks',f:2,x:0,y:0,w:100,h:100,need:()=>F('lamp'),items:code.flatMap((c,i)=>[lt(SY[c],14+i*24,44+(i%2)*14,13),lt(String(i+1),14+i*24,66+(i%2)*14,6)])},
   {t:'marks',f:1,x:0,y:0,w:100,h:100,need:()=>F('lamp'),items:[lt(SY[R.int(0,11)],25,30,13),lt(SY[R.int(0,11)],70,24,13),lt('?',50,80,10)]},
   {t:'marks',f:3,x:0,y:0,w:100,h:30,need:()=>F('lamp'),items:[lt(SY[R.int(0,11)],40,20,10),lt(SY[R.int(0,11)],64,20,10)]},
   {t:'keyhole',id:'kh',f:3,x:36,y:32,w:28,h:34,key:'k6',key2:1,keyed:1},
   {t:'hatch',id:'h2',f:3,x:20,y:70,w:60,h:26,open:()=>D('kh'),give:['pap','g3']},
   {t:'pads',id:'pads',f:1,x:8,y:40,w:84,h:30,cols,seq,key:true},
   {t:'hatch',id:'h3',f:1,x:20,y:76,w:60,h:20,open:()=>D('pads'),give:['g4','g7','g8']},
   {t:'socket',id:'sock',f:4,x:6,y:30,w:88,h:36,slots:[{g:'g3'},{g:'g4'},{g:'g7'},{g:'g8'}],key:true}];
  parts.find(p=>p.id==='kh').key='k6';
  return{parts,items:{kcr:K('Clé de cristal','k6'),gdi:G('g5'),g3:G('g3'),g4:G('g4'),g7:G('g7'),g8:G('g8'),pap:NT('Parchemin céleste',seq.map((c,i)=>mark('●',10+i*20,45,16,'dk',cols[c])),'')},
   hints:['Il y a un petit bouton vert sur la face avant. Appuie dessus, puis regarde les autres côtés.','À la lumière, la face arrière montre quatre signes numérotés.','Les signes se règlent sur les anneaux de la face avant, dans l’ordre 1 à 4.','La clé de cristal ouvre la serrure du côté droit.','Le parchemin donne l’ordre des pastilles de couleur du côté gauche.','Quatre gemmes se logent sur le dessus : l’intrus (le diamant) n’y va pas.']};
 }});

/* ---------- 5. Le cabinet du collectionneur ---------- */
obDefine({id:'cabinet',name:'Le cabinet du collectionneur',lab:'Difficile',theme:'wood',rw:38,parts:6,icon:'k0',
 intro:'Un coffret de collectionneur, plein de recoins. Certaines choses ne se révèlent que si on les cherche.',
 win:D=>D('sock'),
 build(R){
  const ex=[],code=[];
  while(ex.length<4){const op=R.pick(['+','−','×']);let a,b,r;if(op==='+'){a=R.int(1,8);b=R.int(1,9-a);r=a+b;}else if(op==='−'){a=R.int(3,9);b=R.int(1,a-1);r=a-b;}else{a=R.int(2,4);b=R.int(2,4);r=a*b;}
    if(r>=1&&r<=9&&!ex.includes(a+' '+op+' '+b)){ex.push(a+' '+op+' '+b);code.push(r);}}
  let tg=Array.from({length:5},()=>R.int(0,1));if(tg.every(v=>v===tg[0]))tg[R.int(0,4)]^=1;
  const cols=['#2f55d4','#d4342c','#2fa84f','#e0b030'],seq=Array.from({length:6},()=>R.int(0,3));
  const parts=[
   {t:'ring',id:'ring',f:0,x:4,y:34,w:92,h:30,n:4,syms:DG,spr:'d4',code,key:true},
   {t:'hatch',id:'hA',f:0,x:32,y:70,w:36,h:24,open:()=>D('ring'),give:['kgold','g1','g5']},
   {t:'hot',id:'pan',f:1,x:74,y:14,w:12,h:12,msg:'Un petit panneau coulisse.'},
   {t:'keyhole',id:'kh',f:1,x:36,y:28,w:28,h:34,key:'k0',need:()=>D('pan'),key2:1},
   {t:'marks',f:1,x:0,y:8,w:100,h:20,need:()=>D('kh'),items:seq.map((c,i)=>mark('●',14+i*14.5,50,11,'gl',cols[c]))},
   {t:'hatch',id:'hB',f:1,x:16,y:68,w:68,h:26,open:()=>D('kh'),give:['k7it','nB'],need:()=>D('pan')},
   {t:'lever',id:'lev',f:2,x:6,y:24,w:88,h:40,n:5,target:tg,spr:'l1',key:true},
   {t:'hatch',id:'hC',f:2,x:28,y:70,w:44,h:24,open:()=>D('lev')&&D('pads'),locked:'Il manque quelque chose : un second verrou, ailleurs.',give:['g2','g3']},
   {t:'marks',f:3,x:0,y:6,w:100,h:44,items:ex.map((e,i)=>mark(e,50,13+i*24,8.5,'gl'))},
   {t:'keyhole',id:'kh2',f:3,x:38,y:56,w:24,h:28,key:'k7',key2:1},
   {t:'hatch',id:'hD',f:3,x:62,y:74,w:30,h:20,open:()=>D('kh2'),give:['g6']},
   {t:'pads',id:'pads',f:4,x:8,y:10,w:84,h:28,cols,seq,key:true},
   {t:'socket',id:'sock',f:4,x:6,y:56,w:88,h:34,slots:[{g:'g1'},{g:'g2'},{g:'g3'},{g:'g6'}],key:true}];
  ['kh','kh2'].forEach(i=>{const p=parts.find(q=>q.id===i);p.key=i==='kh'?'k0':'k7';p.keyed=1;});
  return{parts,items:{kgold:K('Clé dorée','k0'),k7it:K('Clé noire','k7'),g1:G('g1'),g2:G('g2'),g3:G('g3'),g5:G('g5'),g6:G('g6'),
    nB:NT('Carnet du collectionneur',tg.map((v,i)=>mark(v?'▲':'▼',12+i*19,42,14,'dk')),'Les cinq manettes.')},
   hints:['Une des faces cache un petit élément qui scintille : touche-le.','Les calculs du côté droit donnent les chiffres des anneaux de la face avant, de haut en bas.','La clé dorée va dans une serrure qui n’était pas là au départ.','Le carnet donne les cinq manettes de la face arrière (▲ en haut).','Le panneau arrière a deux verrous : manettes ET les pastilles du dessus (leur ordre est gravé sous la serrure).','La clé noire ouvre une autre serrure, sur le côté droit, sous les calculs.','Quatre gemmes sur le dessus ; le diamant est un intrus.']};
 }});

/* ---------- 6. La forge obsidienne (extrême) ---------- */
obDefine({id:'obsidienne',name:'La forge obsidienne',lab:'Extrême',theme:'obsidian',rw:80,parts:7,icon:'k8',
 intro:'Une boîte noire gravée de runes rouges. Elle ne pardonne rien : tout s’enchaîne, tout se déduit.',
 win:D=>D('sock'),
 build(R){
  const gl=R.shuf(SY).slice(0,8),ks=perm(R,8).slice(0,4);
  const solved=[1,2,3,4,5,6,7,8,0],init=solved.slice();let z=8,last=-1;
  for(let t=0;t<90;t++){const x=z%3,y=(z/3)|0,c=[];if(x>0)c.push(z-1);if(x<2)c.push(z+1);if(y>0)c.push(z-3);if(y<2)c.push(z+3);const o=c.filter(q=>q!==last),q=R.pick(o.length?o:c);init[z]=init[q];init[q]=0;last=z;z=q;}
  if(init.every((v,i)=>v===solved[i])){init[8]=init[7];init[7]=0;}
  const ex=[],code=[];
  while(ex.length<4){const op=R.pick(['+','−','×']);let a,b,r;if(op==='+'){a=R.int(1,8);b=R.int(1,9-a);r=a+b;}else if(op==='−'){a=R.int(3,9);b=R.int(1,a-1);r=a-b;}else{a=R.int(2,4);b=R.int(2,4);r=a*b;}
    if(r>=1&&r<=9&&!ex.includes(a+' '+op+' '+b)){ex.push(a+' '+op+' '+b);code.push(r);}}
  const cols=['#2f55d4','#d4342c','#2fa84f','#e0b030'],seq=Array.from({length:6},()=>R.int(0,3));
  const parts=[
   {t:'tiles',id:'tiles',f:0,x:10,y:6,w:80,h:80,glyphs:gl,init,key:true},
   {t:'marks',f:3,x:0,y:0,w:100,h:30,items:ks.map((k,i)=>mark(String(k+1),14+i*24,22,12,'gl'))},
   {t:'ring',id:'ring',f:1,x:4,y:30,w:92,h:30,n:4,syms:gl,spr:'d5',code:ks,key:true},
   {t:'hatch',id:'h1',f:1,x:32,y:68,w:36,h:24,open:()=>D('ring'),give:['kob','g0']},
   {t:'keyhole',id:'kh',f:2,x:36,y:10,w:28,h:34,key:'k8',key2:1,keyed:1},
   {t:'hatch',id:'h2',f:2,x:16,y:56,w:68,h:30,open:()=>D('kh'),give:['grim','g1']},
   {t:'ring',id:'ring2',f:3,x:4,y:34,w:92,h:28,n:4,syms:DG,spr:'d4',code,key:true},
   {t:'hatch',id:'h3',f:3,x:28,y:68,w:44,h:24,open:()=>D('ring2'),give:['rune','g2']},
   {t:'pads',id:'pads',f:4,x:8,y:6,w:84,h:26,cols,seq,key:true},
   {t:'hatch',id:'h4',f:4,x:30,y:35,w:40,h:17,open:()=>D('pads'),give:['g4']},
   {t:'socket',id:'sock',f:4,x:6,y:58,w:88,h:34,slots:[{g:'g0'},{g:'g1'},{g:'g2'},{g:'g4'}],key:true}];
  parts.find(p=>p.id==='kh').key='k8';
  return{parts,items:{kob:K('Clé d’obsidienne','k8'),g0:G('g0'),g1:G('g1'),g2:G('g2'),g4:G('g4'),
    grim:NT('Grimoire',ex.map((e,i)=>mark(e,50,14+i*19,8,'dk')),'Quatre calculs.'),
    rune:NT('Rune rouge',seq.map((c,i)=>mark('●',9+i*16.5,45,14,'dk',cols[c])),'')},
   hints:['Remets les huit tuiles de la face avant dans l’ordre. Elles montrent huit signes.','Les nombres de la face arrière sont des positions dans la grille résolue (gauche à droite, ligne par ligne).','Les quatre signes trouvés se règlent sur les anneaux d’un côté.','La clé d’obsidienne va dans la serrure de la face droite.','Le grimoire contient quatre calculs : leurs résultats sont les chiffres des anneaux de la face arrière.','La rune rouge donne l’ordre des pastilles du dessus. Les gemmes se logent aussi sur le dessus.']};
 }});

const COLS=['#2f55d4','#d4342c','#2fa84f','#e0b030'];
const mathSet=R=>{const ex=[],code=[];while(ex.length<4){const op=R.pick(['+','−','×']);let a,b,r;if(op==='+'){a=R.int(1,8);b=R.int(1,9-a);r=a+b;}else if(op==='−'){a=R.int(3,9);b=R.int(1,a-1);r=a-b;}else{a=R.int(2,4);b=R.int(2,4);r=a*b;}
  if(r>=1&&r<=9&&!ex.includes(a+' '+op+' '+b)){ex.push(a+' '+op+' '+b);code.push(r);}}return{ex,code};};
const tgt=(R,n)=>{let t=Array.from({length:n},()=>R.int(0,1));if(t.every(v=>v===t[0]))t[R.int(0,n-1)]^=1;return t;};
const tileInit=(R,k)=>{const solved=[1,2,3,4,5,6,7,8,0],init=solved.slice();let z=8,last=-1;for(let t=0;t<k;t++){const x=z%3,y=(z/3)|0,c=[];if(x>0)c.push(z-1);if(x<2)c.push(z+1);if(y>0)c.push(z-3);if(y<2)c.push(z+3);const o=c.filter(q=>q!==last),q=R.pick(o.length?o:c);init[z]=init[q];init[q]=0;last=z;z=q;}
  if(init.every((v,i)=>v===solved[i])){init[8]=init[7];init[7]=0;}return init;};

obDefine({id:'jade1',name:'La boîte de jade',lab:'Facile',theme:'jade',rw:12,parts:5,icon:'c1',
 intro:'Une boîte de jade fraîche et lisse. Quelques objets traînent, et un coquillage n’est pas là par hasard.',
 win:D=>D('sock'),
 build(R){
  const code=Array.from({length:3},()=>R.int(2,5)),tg=tgt(R,4);
  const rows=code.map(c=>{const a=[];for(let i=0;i<c;i++)a.push(SY[0]);for(let i=R.int(0,2);i>0;i--)a.push(R.pick([SY[1],SY[2]]));return R.shuf(a).join(' ');});
  const parts=[
   {t:'ring',id:'ring',f:0,x:8,y:30,w:84,h:30,n:3,syms:DG,spr:'c4',code,key:true},
   {t:'hatch',id:'h1',f:0,x:32,y:68,w:36,h:24,open:()=>D('ring'),give:['c1','o1']},
   {t:'marks',f:1,x:0,y:0,w:100,h:70,items:rows.map((r,i)=>mark(r,50,20+i*22,7,'gl'))},
   {t:'hot',id:'shell',f:1,x:40,y:72,w:20,h:20,spr:'o9',pick:true,give:['o9'],msg:'Un coquillage.'},
   {t:'keyhole',id:'kh',f:2,x:36,y:12,w:28,h:34,key:'c1',key2:1,keyed:1},
   {t:'hatch',id:'h2',f:2,x:16,y:56,w:68,h:32,open:()=>D('kh'),give:['o7','nL']},
   {t:'lever',id:'lev',f:3,x:6,y:20,w:88,h:36,n:4,target:tg,spr:'l1',key:true},
   {t:'hatch',id:'h3',f:3,x:28,y:64,w:44,h:26,open:()=>D('lev'),give:['o5']},
   {t:'socket',id:'sock',f:4,x:6,y:30,w:88,h:36,slots:[{g:'o1'},{g:'o7'},{g:'o5'},{g:'o9'}],key:true}];
  return{parts,items:{c1:K('Clé carrée','c1'),o1:O('Pièce d’or','o1'),o7:O('Cloche','o7'),o5:O('Sablier','o5'),o9:O('Coquillage','o9'),nL:NT('Petit mot',arrows(tg,14,24,45,14),'Les quatre manettes.')},
   hints:['Compte seulement les soleils de chaque rangée, sur le côté gauche.','Les trois nombres se règlent sur les anneaux de la face avant, de gauche à droite.','La clé carrée va dans la serrure de la face arrière.','Le petit mot donne la position des quatre manettes (▲ en haut).','Il faut poser quatre objets sur le dessus : pièce, cloche, sablier et coquillage.']};
 }});

obDefine({id:'ivoire1',name:'Le coffret d’ivoire',lab:'Facile',theme:'ivory',rw:14,parts:5,icon:'o10',
 intro:'Un coffret d’ivoire délicat. Certains signes sont trop petits pour l’œil nu.',
 win:D=>D('sock'),
 build(R){
  const seq=Array.from({length:4},()=>R.int(0,3)),tg=tgt(R,4);
  const parts=[
   {t:'hot',id:'lens',f:0,x:38,y:8,w:24,h:22,spr:'o2',pick:true,give:['o2'],msg:'Une loupe !'},
   {t:'pads',id:'pads',f:0,x:8,y:36,w:84,h:28,cols:COLS,seq,key:true},
   {t:'hatch',id:'h1',f:0,x:32,y:70,w:36,h:22,open:()=>D('pads'),give:['c2','o10']},
   {t:'marks',f:1,x:0,y:0,w:100,h:100,need:()=>H('o2'),items:seq.map((c,i)=>mark('●',16+i*22,46,16,'gl',COLS[c]))},
   {t:'keyhole',id:'kh',f:2,x:36,y:12,w:28,h:34,key:'c2',key2:1,keyed:1},
   {t:'hatch',id:'h2',f:2,x:16,y:56,w:68,h:32,open:()=>D('kh'),give:['o3','nL']},
   {t:'lever',id:'lev',f:3,x:6,y:20,w:88,h:36,n:4,target:tg,spr:'l1',key:true},
   {t:'hatch',id:'h3',f:3,x:28,y:64,w:44,h:26,open:()=>D('lev'),give:['o11']},
   {t:'socket',id:'sock',f:4,x:6,y:30,w:88,h:36,slots:[{g:'o10'},{g:'o3'},{g:'o11'},{g:'o2'}],key:true}];
  return{parts,items:{c2:K('Petite clé','c2'),o10:O('Boîte à musique','o10'),o3:O('Bougeoir','o3'),o11:O('Montre','o11'),o2:O('Loupe','o2'),nL:NT('Billet plié',arrows(tg,14,24,45,14),'Quatre manettes.')},
   hints:['Ramasse la loupe sur la face avant.','Avec la loupe, le côté gauche montre quatre pastilles colorées dans l’ordre.','Appuie sur les pastilles de la face avant dans cet ordre.','La petite clé ouvre la face arrière.','Le billet donne les manettes de la face droite (▲ en haut).','Sur le dessus : boîte à musique, bougeoir, montre et loupe.']};
 }});

obDefine({id:'horloger',name:'La boîte d’horloger',lab:'Moyen',theme:'clock',rw:24,parts:6,icon:'c9',
 intro:'Cuivre, laiton, engrenages. Une pièce manque pour que la mécanique tourne.',
 win:D=>D('sock'),
 build(R){
  const gl=R.shuf(SY).slice(0,8),ks=perm(R,8).slice(0,4),seq=Array.from({length:5},()=>R.int(0,3));
  const parts=[
   {t:'tiles',id:'tiles',f:0,x:10,y:6,w:80,h:80,glyphs:gl,init:tileInit(R,90),key:true},
   {t:'marks',f:3,x:14,y:4,w:72,h:15,plate:1,items:ks.map((k,i)=>mark(String(k+1),12.5+i*25,52,9,'gl'))},
   {t:'ring',id:'ring',f:1,x:4,y:26,w:92,h:28,n:4,syms:gl,spr:'c5',code:ks,key:true},
   {t:'hatch',id:'h1',f:1,x:28,y:62,w:44,h:28,open:()=>D('ring'),give:['c9','o4']},
   {t:'socket',id:'gs',f:2,x:30,y:8,w:40,h:34,slots:[{g:'c9'}],key:true},
   {t:'hatch',id:'h2',f:2,x:16,y:52,w:68,h:36,open:()=>D('gs'),give:['c0','nR']},
   {t:'keyhole',id:'kh',f:3,x:36,y:32,w:28,h:30,key:'c0',key2:1,keyed:1},
   {t:'hatch',id:'h3',f:3,x:20,y:68,w:60,h:24,open:()=>D('kh'),give:['o5','o6']},
   {t:'pads',id:'pads',f:4,x:8,y:6,w:84,h:26,cols:COLS,seq,key:true},
   {t:'hatch',id:'h4',f:4,x:30,y:35,w:40,h:17,open:()=>D('pads'),give:['c10']},
   {t:'socket',id:'sock',f:4,x:6,y:58,w:88,h:34,slots:[{g:'o4'},{g:'o5'},{g:'o6'},{g:'c10'}],key:true}];
  return{parts,items:{c9:O('Engrenage','c9'),o4:O('Boussole','o4'),c0:K('Clé ouvragée','c0'),o5:O('Sablier','o5'),o6:O('Miroir','o6'),c10:O('Médaillon','c10'),nR:NT('Fiche d’horloger',seq.map((c,i)=>mark('●',9+i*20,45,15,'dk',COLS[c])),'')},
   hints:['Remets les tuiles de la face avant dans l’ordre : huit signes.','Les nombres du côté droit sont des positions dans la grille résolue.','Les signes trouvés se règlent sur les anneaux de la face gauche.','L’engrenage se pose dans le logement de la face arrière.','La clé ouvragée va dans la serrure du côté droit.','La fiche donne l’ordre des pastilles du dessus.']};
 }});

obDefine({id:'glaciere',name:'La glacière',lab:'Moyen',theme:'ice',rw:26,parts:6,icon:'o3',
 intro:'Un bloc de glace scellé. Tu as sur toi de quoi faire fondre ce qui doit l’être.',
 win:D=>D('sock'),
 build(R){
  const code=Array.from({length:4},()=>R.int(0,11)),tg=tgt(R,5),seq=Array.from({length:5},()=>R.int(0,3));
  const parts=[
   {t:'hot',id:'melt',f:0,x:22,y:14,w:56,h:40,uses:'o3',fail:'La glace est trop dure. Il faudrait de la chaleur.',msg:'La glace fond : des signes apparaissent.'},
   {t:'marks',f:0,x:0,y:0,w:100,h:100,need:()=>D('melt'),items:code.map((c,i)=>mark(SY[c],20+i*20,34,13,'dk'))},
   {t:'ring',id:'ring',f:1,x:4,y:30,w:92,h:30,n:4,syms:SY,spr:'d6',code,key:true},
   {t:'hatch',id:'h1',f:1,x:32,y:68,w:36,h:24,open:()=>D('ring'),give:['c1','g2']},
   {t:'keyhole',id:'kh',f:2,x:36,y:12,w:28,h:34,key:'c1',key2:1,keyed:1},
   {t:'hatch',id:'h2',f:2,x:16,y:56,w:68,h:32,open:()=>D('kh'),give:['nL','g5']},
   {t:'lever',id:'lev',f:3,x:6,y:20,w:88,h:36,n:5,target:tg,spr:'l2',key:true},
   {t:'hatch',id:'h3',f:3,x:28,y:64,w:44,h:26,open:()=>D('lev'),give:['g7','nP']},
   {t:'pads',id:'pads',f:4,x:8,y:6,w:84,h:26,cols:COLS,seq,key:true},
   {t:'hatch',id:'h4',f:4,x:30,y:35,w:40,h:17,open:()=>D('pads'),give:['g1']},
   {t:'socket',id:'sock',f:4,x:6,y:58,w:88,h:34,slots:[{g:'g2'},{g:'g5'},{g:'g7'},{g:'g1'}],key:true}];
  return{parts,items:{c1:K('Clé carrée','c1'),g2:G('g2'),g5:G('g5'),g7:G('g7'),g1:G('g1'),o3:O('Bougeoir','o3'),nL:NT('Carnet givré',arrows(tg,10,19,45,14),'Cinq manettes.'),nP:NT('Feuillet gelé',seq.map((c,i)=>mark('●',9+i*20,45,15,'dk',COLS[c])),'')},inv0:['o3'],
   hints:['Le bougeoir que tu as dans l’inventaire sert à quelque chose : sélectionne-le puis touche le bloc de glace.','Les quatre signes révélés se règlent sur les anneaux d’un côté.','La clé carrée ouvre la face arrière.','Le carnet donne les cinq manettes (▲ en haut).','Le feuillet trouvé derrière la face droite donne l’ordre des pastilles du dessus.']};
 }});

obDefine({id:'jade2',name:'Le reliquaire de jade',lab:'Difficile',theme:'jade',rw:34,parts:6,icon:'o2',
 intro:'Un reliquaire où rien ne se lit à l’œil nu. Un objet traîne quelque part, et un autre est inutile.',
 win:D=>D('sock'),
 build(R){
  const {ex,code}=mathSet(R),tg=tgt(R,5),seq=Array.from({length:5},()=>R.int(0,3));
  const parts=[
   {t:'ring',id:'ring',f:0,x:4,y:30,w:92,h:30,n:4,syms:DG,spr:'c5',code,key:true},
   {t:'hatch',id:'h1',f:0,x:32,y:68,w:36,h:24,open:()=>D('ring'),give:['c0','o1']},
   {t:'hot',id:'lens',f:1,x:66,y:16,w:20,h:18,spr:'o2',pick:true,give:['o2'],msg:'Une loupe.'},
   {t:'marks',f:3,x:0,y:4,w:100,h:90,need:()=>H('o2'),items:ex.map((e,i)=>mark(e,50,18+i*20,9,'gl'))},
   {t:'keyhole',id:'kh',f:2,x:36,y:10,w:28,h:34,key:'c0',key2:1,keyed:1},
   {t:'hatch',id:'h2',f:2,x:16,y:56,w:68,h:32,open:()=>D('kh'),give:['o7','nL']},
   {t:'lever',id:'lev',f:4,x:6,y:6,w:88,h:26,n:5,target:tg,spr:'l1',key:true},
   {t:'hatch',id:'h3',f:4,x:28,y:34,w:44,h:18,open:()=>D('lev'),give:['o5','o11','nP']},
   {t:'pads',id:'pads',f:1,x:8,y:48,w:84,h:26,cols:COLS,seq,key:true},
   {t:'hatch',id:'h4',f:1,x:30,y:78,w:40,h:16,open:()=>D('pads'),give:['o9']},
   {t:'socket',id:'sock',f:4,x:6,y:58,w:88,h:34,slots:[{g:'o1'},{g:'o7'},{g:'o5'},{g:'o9'}],key:true}];
  return{parts,items:{c0:K('Clé ouvragée','c0'),o1:O('Pièce d’or','o1'),o2:O('Loupe','o2'),o7:O('Cloche','o7'),o5:O('Sablier','o5'),o9:O('Coquillage','o9'),o11:O('Montre','o11'),
    nL:NT('Mot de jade',arrows(tg,10,19,45,14),'Cinq manettes.'),nP:NT('Feuille fine',seq.map((c,i)=>mark('●',9+i*20,45,15,'dk',COLS[c])),'')},
   hints:['Une loupe est posée sur la face gauche.','Avec la loupe, la face droite montre quatre calculs : leurs résultats sont les anneaux de la face avant.','La clé ouvragée va dans la serrure de la face arrière.','Le mot de jade donne les cinq manettes du dessus (▲ en haut).','La feuille fine donne l’ordre des pastilles de la face gauche.','Sur le dessus : pièce, cloche, sablier, coquillage. La montre est inutile.']};
 }});

obDefine({id:'carillon',name:'Le carillon d’ivoire',lab:'Difficile',theme:'ivory',rw:36,parts:7,icon:'o6',
 intro:'Un carillon silencieux. Ce qu’on ne peut pas lire en face, un miroir peut le montrer.',
 win:D=>D('sock'),
 build(R){
  const code=Array.from({length:4},()=>R.int(0,11)),tg=tgt(R,5);
  const parts=[
   {t:'hot',id:'mir',f:0,x:38,y:6,w:24,h:22,spr:'o6',pick:true,give:['o6'],msg:'Un miroir à main.'},
   {t:'ring',id:'ring',f:0,x:4,y:30,w:92,h:30,n:4,syms:SY,spr:'c4',code,key:true},
   {t:'hatch',id:'h1',f:0,x:32,y:68,w:36,h:24,open:()=>D('ring'),give:['c1','o10']},
   {t:'hot',id:'refl',f:3,x:16,y:10,w:68,h:40,uses:'o6',fail:'Rien d’écrit ici… peut-être faut-il le regarder autrement.',msg:'Dans le miroir, des signes apparaissent.'},
   {t:'marks',f:3,x:0,y:0,w:100,h:100,need:()=>D('refl'),items:code.map((c,i)=>mark(SY[c],20+i*20,30,13,'dk'))},
   {t:'keyhole',id:'kh',f:1,x:36,y:12,w:28,h:34,key:'c1',key2:1,keyed:1},
   {t:'hatch',id:'h2',f:1,x:16,y:56,w:68,h:32,open:()=>D('kh'),give:['o3','nL']},
   {t:'lever',id:'lev',f:2,x:6,y:20,w:88,h:36,n:5,target:tg,spr:'l0',key:true},
   {t:'hatch',id:'h3',f:2,x:28,y:64,w:44,h:26,open:()=>D('lev'),give:['c2','o7']},
   {t:'keyhole',id:'kh2',f:4,x:38,y:4,w:24,h:28,key:'c2',key2:1,keyed:1},
   {t:'hatch',id:'h4',f:4,x:30,y:34,w:40,h:18,open:()=>D('kh2'),give:['o11']},
   {t:'socket',id:'sock',f:4,x:6,y:58,w:88,h:34,slots:[{g:'o10'},{g:'o3'},{g:'o7'},{g:'o11'}],key:true}];
  return{parts,items:{c1:K('Clé en fer','c1'),c2:K('Petite clé','c2'),o10:O('Boîte à musique','o10'),o3:O('Bougeoir','o3'),o7:O('Cloche','o7'),o11:O('Montre','o11'),o6:O('Miroir','o6'),nL:NT('Billet d’ivoire',arrows(tg,10,19,45,14),'Cinq manettes.')},
   hints:['Ramasse le miroir sur la face avant.','Sélectionne le miroir dans l’inventaire, puis touche la grande surface vide de la face droite.','Les quatre signes se règlent sur les anneaux de la face avant.','La clé en fer ouvre la serrure de la face gauche.','Le billet donne les cinq manettes de la face arrière.','La petite clé ouvre la serrure du dessus.']};
 }});

obDefine({id:'abime',name:'La chambre d’engrenages',lab:'Extrême',theme:'clock',rw:110,parts:8,icon:'c10',
 intro:'Une chambre de cuivre et de laiton, vivante et tendue. Chaque pièce que tu trouves sert à autre chose qu’à ce que tu crois.',
 win:D=>D('sock'),
 build(R){
  const gl=R.shuf(SY).slice(0,8),ks=perm(R,8).slice(0,4),{ex,code}=mathSet(R);
  const parts=[
   {t:'tiles',id:'tiles',f:0,x:10,y:6,w:80,h:80,glyphs:gl,init:tileInit(R,110),key:true},
   {t:'marks',f:3,x:14,y:4,w:72,h:15,plate:1,items:ks.map((k,i)=>mark(String(k+1),12.5+i*25,52,9,'gl'))},
   {t:'ring',id:'ring',f:1,x:4,y:26,w:92,h:28,n:4,syms:gl,spr:'c5',code:ks,key:true},
   {t:'hatch',id:'h1',f:1,x:28,y:62,w:44,h:28,open:()=>D('ring'),give:['c9','o2','r0','r3']},
   {t:'socket',id:'gs',f:2,x:30,y:8,w:40,h:34,slots:[{g:'c9'}],key:true},
   {t:'hatch',id:'h2',f:2,x:16,y:52,w:68,h:36,open:()=>D('gs'),give:['c0','o4','m0']},
   {t:'keyhole',id:'kh',f:3,x:36,y:32,w:28,h:30,key:'c0',key2:1,keyed:1},
   {t:'hatch',id:'h3',f:3,x:20,y:68,w:60,h:24,open:()=>D('kh'),give:['nE','o5']},
   {t:'ring',id:'ring2',f:4,x:4,y:4,w:92,h:22,n:4,syms:DG,spr:'c4',code,key:true},
   {t:'hatch',id:'h4',f:4,x:30,y:29,w:40,h:20,open:()=>D('ring2'),give:['o6','r1']},
   {t:'socket',id:'sock',f:4,x:6,y:58,w:88,h:34,slots:[{g:'o2'},{g:'o4'},{g:'o5'},{g:'o6'},{g:'o7'}],key:true},
   {t:'train',id:'train',f:5,x:4,y:4,w:92,h:58,slots:[{x:30,y:48,w:46,g:'r0'},{x:68,y:30,w:28,g:'r1'},{x:72,y:72,w:36,g:'r3'}],key:true},
   {t:'crank',id:'crank',f:5,x:28,y:66,w:44,h:30,item:'m0',turns:6,need:()=>D('train'),key:true,give:['o7']}];
  return{parts,items:{c9:O('Engrenage','c9'),c0:K('Clé ouvragée','c0'),o2:O('Loupe','o2'),o4:O('Boussole','o4'),o5:O('Sablier','o5'),o6:O('Miroir','o6'),o7:O('Cloche','o7'),r0:O('Grand engrenage','r0'),r1:O('Petit engrenage','r1'),r3:O('Engrenage de fer','r3'),m0:O('Manivelle','m0'),
    nE:NT('Carnet d’équations',ex.map((e,i)=>mark(e,50,14+i*19,8,'dk')),'Quatre calculs.')},
   hints:['Remets les tuiles de la face avant dans l’ordre.','Les nombres du côté droit sont des positions dans la grille résolue.','Les quatre signes se règlent sur les anneaux de la face gauche.','L’engrenage se pose dans le logement de la face arrière.','La clé ouvragée va dans la serrure du côté droit.','Les résultats des quatre calculs du carnet sont les chiffres des anneaux du dessus (de gauche à droite).','Le dessous cache un mécanisme : trois axes vides attendent trois engrenages, dispersés dans les cavités des autres faces.','Une fois les engrenages posés, place la manivelle et tourne-la : elle libère la cloche, dernière pièce du logement du dessus.']};
 }});

obDefine({id:'circuit',name:'La boîte à câbles',lab:'Moyen',theme:'steam',rw:28,parts:5,icon:'w0',
 intro:'Une boîte parcourue de fils emmêlés. Des bouts de câble traînent : certains se retrouvent, d’autres se raboutent.',
 win:D=>D('sock'),
 build(R){
  const n=5,cols=['#d4342c','#2f55d4','#2fa84f','#e0b030','#9a45c8'];
  let init;do{init=R.shuf([0,1,2,3,4]);}while(init.reduce((a,v,i)=>a+init.slice(i+1).filter(x=>x<v).length,0)<4);
  const gg=R.shuf(['g0','g1','g2','g3','g4','g7','g8']).slice(0,4);
  const parts=[
   {t:'knot',id:'knot',f:0,x:6,y:8,w:88,h:50,n,cols,init,key:true},
   {t:'hatch',id:'h1',f:0,x:30,y:66,w:40,h:24,open:()=>D('knot'),give:['w0a','c1']},
   {t:'hot',id:'wb',f:1,x:56,y:56,w:30,h:30,spr:'w0b',pick:true,give:['w0b'],msg:'Un bout de câble rouge.'},
   {t:'keyhole',id:'kh',f:1,x:36,y:12,w:28,h:34,key:'c1',key2:1,keyed:1},
   {t:'hatch',id:'h2',f:1,x:12,y:48,w:44,h:26,open:()=>D('kh'),give:['w1a']},
   {t:'hot',id:'wd',f:3,x:30,y:30,w:36,h:36,spr:'w1b',pick:true,give:['w1b'],need:()=>D('kh'),msg:'Un bout de câble bleu.'},
   {t:'socket',id:'plug',f:2,x:10,y:12,w:80,h:40,slots:[{g:'w0'},{g:'w1'}],key:true},
   {t:'hatch',id:'h3',f:2,x:20,y:60,w:60,h:28,open:()=>D('plug'),give:gg},
   {t:'socket',id:'sock',f:4,x:6,y:30,w:88,h:36,slots:gg.map(g=>({g})),key:true}];
  const items={c1:K('Clé de laiton','c1'),w0a:O('Câble rouge (1/2)','w0a'),w0b:O('Câble rouge (2/2)','w0b'),w1a:O('Câble bleu (1/2)','w1a'),w1b:O('Câble bleu (2/2)','w1b'),w0:O('Câble rouge','w0'),w1:O('Câble bleu','w1')};
  gg.forEach(g=>items[g]=G(g));
  return{parts,items,recipes:[{a:'w0a',b:'w0b',out:'w0'},{a:'w1a',b:'w1b',out:'w1'}],
   hints:['Sur la face avant, les fils sont emmêlés : échange deux extrémités voisines à droite jusqu’à ce qu’aucun fil ne se croise.','Un bout de câble rouge traîne sur la face gauche. Prends-le.','Sélectionne un demi-câble dans l’inventaire, puis touche l’autre moitié : ils s’assemblent.','Le deuxième bout de câble bleu est sur la face droite, mais il n’apparaît qu’après un déclic.','Les deux câbles se branchent sur la face arrière.','Les quatre gemmes se logent sur le dessus.']};
 }});

/* ---- variantes (même mécanique, autre univers et autres objets) ---- */
const boxA=c=>obDefine({id:c.id,name:c.name,lab:c.lab||'Facile',theme:c.theme,rw:c.rw,parts:5,icon:c.icon,intro:c.intro,win:D=>D('sock'),
 build(R){
  const code=Array.from({length:3},()=>R.int(2,5)),tg=tgt(R,4),sy=c.sym||0,dc=c.decoy||[1,2];
  const rows=code.map(k=>{const a=[];for(let i=0;i<k;i++)a.push(SY[sy]);for(let i=R.int(0,2);i>0;i--)a.push(R.pick(dc.map(x=>SY[x])));return R.shuf(a).join(' ');});
  const [a1,a2,a3,a4]=c.objs;
  const parts=[
   {t:'ring',id:'ring',f:0,x:8,y:30,w:84,h:30,n:3,syms:DG,spr:c.dial||'c4',code,key:true},
   {t:'hatch',id:'h1',f:0,x:32,y:68,w:36,h:24,open:()=>D('ring'),give:[c.key,a1]},
   {t:'marks',f:1,x:0,y:0,w:100,h:70,items:rows.map((r,i)=>mark(r,50,20+i*22,7,c.mk||'gl'))},
   {t:'hot',id:'pk',f:1,x:40,y:72,w:20,h:20,spr:a4,pick:true,give:[a4],msg:'Tu trouves quelque chose.'},
   {t:'keyhole',id:'kh',f:2,x:36,y:12,w:28,h:34,key:c.key,key2:1,keyed:1},
   {t:'hatch',id:'h2',f:2,x:16,y:56,w:68,h:32,open:()=>D('kh'),give:[a2,'nL']},
   {t:'lever',id:'lev',f:3,x:6,y:20,w:88,h:36,n:4,target:tg,spr:c.lev||'l1',key:true},
   {t:'hatch',id:'h3',f:3,x:28,y:64,w:44,h:26,open:()=>D('lev'),give:[a3]},
   {t:'socket',id:'sock',f:4,x:6,y:30,w:88,h:36,slots:[a1,a2,a3,a4].map(g=>({g})),key:true}];
  const items={nL:NT('Petit mot',arrows(tg,14,24,45,14),'Les quatre manettes.')};items[c.key]=K(c.keyName||'Clé',c.key);
  c.objs.forEach((o,i)=>items[o]=O(c.names[i],o));
  return{parts,items,hints:['Compte seulement les '+(c.symName||'soleils')+' de chaque rangée, sur le côté gauche.','Les trois nombres se règlent sur les anneaux de la face avant, de gauche à droite.','La clé va dans la serrure de la face arrière.','Le petit mot donne la position des quatre manettes de la face droite (▲ en haut).','Quatre objets se posent sur le dessus : '+c.names.join(', ')+'.']};}});
const boxB=c=>obDefine({id:c.id,name:c.name,lab:c.lab||'Facile',theme:c.theme,rw:c.rw,parts:5,icon:c.icon,intro:c.intro,win:D=>D('sock'),
 build(R){
  const seq=Array.from({length:4},()=>R.int(0,3)),tg=tgt(R,4);const [a1,a2,a3,a4]=c.objs;
  const parts=[
   {t:'hot',id:'lens',f:0,x:38,y:8,w:24,h:22,spr:a4,pick:true,give:[a4],msg:c.lensMsg||'Une loupe !'},
   {t:'pads',id:'pads',f:0,x:8,y:36,w:84,h:28,cols:COLS,seq,key:true},
   {t:'hatch',id:'h1',f:0,x:32,y:70,w:36,h:22,open:()=>D('pads'),give:[c.key,a1]},
   {t:'marks',f:1,x:0,y:0,w:100,h:100,need:()=>H(a4),items:seq.map((k,i)=>mark('●',16+i*22,46,16,'gl',COLS[k]))},
   {t:'keyhole',id:'kh',f:2,x:36,y:12,w:28,h:34,key:c.key,key2:1,keyed:1},
   {t:'hatch',id:'h2',f:2,x:16,y:56,w:68,h:32,open:()=>D('kh'),give:[a2,'nL']},
   {t:'lever',id:'lev',f:3,x:6,y:20,w:88,h:36,n:4,target:tg,spr:c.lev||'l1',key:true},
   {t:'hatch',id:'h3',f:3,x:28,y:64,w:44,h:26,open:()=>D('lev'),give:[a3]},
   {t:'socket',id:'sock',f:4,x:6,y:30,w:88,h:36,slots:[a1,a2,a3,a4].map(g=>({g})),key:true}];
  const items={nL:NT('Billet plié',arrows(tg,14,24,45,14),'Quatre manettes.')};items[c.key]=K(c.keyName||'Clé',c.key);
  c.objs.forEach((o,i)=>items[o]=O(c.names[i],o));
  return{parts,items,hints:[c.lensHint||'Ramasse l’objet sur la face avant : il t’aidera à lire les signes.','Avec lui, le côté gauche montre quatre pastilles colorées dans l’ordre.','Appuie sur les pastilles de la face avant dans cet ordre.','La clé ouvre la face arrière.','Le billet donne les manettes de la face droite (▲ en haut).','Sur le dessus : '+c.names.join(', ')+'.']};}});

boxA({id:'lacque',name:'Le coffret de laque',theme:'lacque',rw:12,icon:'q3',sym:2,symName:'étoiles',decoy:[0,1],key:'c2',keyName:'Petite clé',objs:['q3','q4','q5','q7'],names:['Dés','Carte','Tour d’échecs','Bague'],
 intro:'Une laque rouge et or. Quatre objets de jeu dorment quelque part dans la boîte.'});
boxA({id:'jouet',name:'La boîte à jouets',theme:'jouet',rw:12,icon:'q2',sym:2,symName:'étoiles',decoy:[0,1],dial:'c4',key:'c1',keyName:'Clé carrée',objs:['q2','q9','q8','q11'],names:['Fiole','Couronne','Crochets','Carte'],mk:'dk',
 intro:'Une boîte de jeu aux couleurs pastel. Facile ? Pas si sûr.'});
boxB({id:'pierre',name:'La stèle moussue',theme:'pierre',rw:14,icon:'q6',key:'c0',keyName:'Clé ouvragée',objs:['q6','q0','q1','o2'],names:['Tablette d’argile','Lanterne','Livre','Loupe'],
 intro:'Une pierre couverte de mousse et de signes. Une loupe y est cachée.'});
boxB({id:'marbre',name:'Le coffre de marbre',theme:'marbre',rw:16,lab:'Moyen',icon:'q10',key:'c1',keyName:'Clé carrée',objs:['q10','q7','q11','o2'],names:['Chronomètre','Bague','Carte pliée','Loupe'],lev:'l2',
 intro:'Un marbre blanc veiné d’or. Il faut de l’œil.'});

obDefine({id:'rouages',name:'La boîte à rouages',lab:'Moyen',theme:'steam',rw:30,parts:5,icon:'r0',
 intro:'Une mécanique à remonter : il manque des engrenages et la manivelle pour les faire tourner.',
 win:D=>D('sock'),
 build(R){
  const code=Array.from({length:3},()=>R.int(1,9)),gg=R.shuf(['g0','g1','g2','g3','g4','g7','g8']).slice(0,3);
  const parts=[
   {t:'train',id:'train',f:0,x:4,y:4,w:92,h:58,slots:[{x:30,y:48,w:46,g:'r0'},{x:68,y:30,w:28,g:'r1'},{x:72,y:72,w:36,g:'r3'}],key:true},
   {t:'crank',id:'crank',f:0,x:28,y:66,w:44,h:30,item:'m0',turns:5,need:()=>D('train'),key:true,give:['c1']},
   {t:'hot',id:'g1h',f:1,x:62,y:52,w:26,h:26,spr:'r1',pick:true,give:['r1'],msg:'Un petit engrenage.'},
   {t:'keyhole',id:'kh',f:1,x:36,y:10,w:28,h:34,key:'c1',key2:1,keyed:1},
   {t:'hatch',id:'h2',f:1,x:14,y:46,w:44,h:26,open:()=>D('kh'),give:gg},
   {t:'marks',f:2,x:0,y:0,w:100,h:50,items:code.map((c,i)=>mark(String(c),22+i*28,26,14,'gl'))},
   {t:'hot',id:'hm',f:2,x:38,y:56,w:24,h:30,spr:'m0',pick:true,give:['m0'],msg:'Une manivelle de laiton.'},
   {t:'ring',id:'ring',f:3,x:6,y:26,w:88,h:30,n:3,syms:DG,spr:'c5',code,key:true},
   {t:'hatch',id:'h1',f:3,x:28,y:64,w:44,h:26,open:()=>D('ring'),give:['r0','r3']},
   {t:'socket',id:'sock',f:4,x:6,y:30,w:88,h:36,slots:gg.map(g=>({g})),key:true}];
  const items={r0:O('Grand engrenage','r0'),r1:O('Petit engrenage','r1'),r3:O('Engrenage de fer','r3'),m0:O('Manivelle','m0'),c1:K('Clé de laiton','c1')};
  gg.forEach(g=>items[g]=G(g));
  return{parts,items,hints:['Sur la face avant, trois axes vides attendent des engrenages.','Un petit engrenage traîne sur la face gauche.','La face arrière montre trois chiffres et une manivelle.','Les trois chiffres se règlent sur les anneaux de la face droite.','Les engrenages posés, mets la manivelle en place puis tourne-la plusieurs fois.','La clé obtenue ouvre la serrure de la face gauche.']};
 }});

obDefine({id:'moteur',name:'Le petit moteur',lab:'Difficile',theme:'rouille',rw:36,parts:5,icon:'n0',
 intro:'Un moteur démonté dans une boîte rouillée. Il faut le remonter, le lancer, puis fouiller ce qu’il libère.',
 win:D=>D('sock'),
 build(R){
  const tg=tgt(R,4),gg=R.shuf(['g1','g2','g3','g4','g8']).slice(0,3);
  const parts=[
   {t:'socket',id:'eng',f:0,x:6,y:4,w:88,h:34,slots:[{g:'n2'},{g:'n0'},{g:'n1'},{g:'n4'}],key:true},
   {t:'crank',id:'start',f:0,x:28,y:42,w:44,h:28,item:'m1',turns:7,need:()=>D('eng'),key:true},
   {t:'hatch',id:'h0',f:0,x:22,y:74,w:56,h:20,open:()=>D('start'),give:gg},
   {t:'hot',id:'cyl',f:1,x:60,y:8,w:28,h:24,spr:'n2',pick:true,give:['n2'],msg:'Un cylindre de laiton.'},
   {t:'lever',id:'lev',f:1,x:6,y:38,w:88,h:28,n:4,target:tg,spr:'l1',key:true},
   {t:'hatch',id:'hA',f:1,x:28,y:70,w:44,h:22,open:()=>D('lev'),give:['n0','n1']},
   {t:'marks',f:2,x:0,y:0,w:100,h:50,items:arrows(tg,14,24,28,16)},
   {t:'hot',id:'hm',f:2,x:38,y:56,w:24,h:30,spr:'m1',pick:true,give:['m1'],msg:'Une manivelle de fer.'},
   {t:'hot',id:'fly',f:3,x:20,y:20,w:60,h:50,spr:'n4',pick:true,give:['n4'],need:()=>D('lev'),msg:'Un lourd volant d’inertie.'},
   {t:'socket',id:'sock',f:4,x:6,y:30,w:88,h:36,slots:gg.map(g=>({g})),key:true}];
  const items={n2:O('Cylindre','n2'),n0:O('Piston','n0'),n1:O('Vilebrequin','n1'),n4:O('Volant','n4'),m1:O('Manivelle de fer','m1')};
  gg.forEach(g=>items[g]=G(g));
  return{parts,items,hints:['Le moteur se remonte sur la face avant : il faut quatre pièces.','Un cylindre est posé sur la face gauche, avec quatre manettes sous lui.','Les manettes se règlent d’après les flèches de la face arrière (▲ en haut).','La face arrière cache aussi une manivelle.','Un volant apparaît sur la face droite quand les manettes sont bonnes.','Une fois le moteur remonté, mets la manivelle et tourne jusqu’au démarrage.']};
 }});

obDefine({id:'dynamo',name:'La dynamo',lab:'Difficile',theme:'cristal',rw:40,parts:6,icon:'e0',
 intro:'Un cœur de cristal alimenté par des câbles. Tout est débranché, et les fils sont en désordre.',
 win:D=>D('sock'),
 build(R){
  const n=6,cols=['#d4342c','#2f55d4','#2fa84f','#e0b030','#9a45c8','#e8e8e8'];
  let init;do{init=R.shuf([0,1,2,3,4,5]);}while(init.reduce((a,v,i)=>a+init.slice(i+1).filter(x=>x<v).length,0)<7);
  const gg=R.shuf(['g0','g1','g2','g3','g4','g7','g8']).slice(0,4);
  const parts=[
   {t:'knot',id:'knot',f:0,x:4,y:6,w:92,h:52,n,cols,init,key:true},
   {t:'hatch',id:'h1',f:0,x:30,y:66,w:40,h:24,open:()=>D('knot'),give:['w2a','c2']},
   {t:'hot',id:'wb',f:1,x:56,y:58,w:32,h:30,spr:'w2b',pick:true,give:['w2b'],msg:'Un bout de câble vert.'},
   {t:'keyhole',id:'kh',f:1,x:36,y:10,w:28,h:34,key:'c2',key2:1,keyed:1},
   {t:'hatch',id:'h2',f:1,x:10,y:48,w:46,h:26,open:()=>D('kh'),give:['w3a','e0']},
   {t:'hot',id:'wd',f:3,x:30,y:30,w:38,h:38,spr:'w3b',pick:true,give:['w3b'],need:()=>D('kh'),msg:'Un bout de câble jaune.'},
   {t:'socket',id:'plug',f:2,x:8,y:12,w:84,h:40,slots:[{g:'w2'},{g:'w3'},{g:'e0'}],key:true},
   {t:'hatch',id:'h3',f:2,x:20,y:60,w:60,h:28,open:()=>D('plug'),give:gg},
   {t:'socket',id:'sock',f:4,x:6,y:30,w:88,h:36,slots:gg.map(g=>({g})),key:true}];
  const items={c2:K('Petite clé','c2'),w2a:O('Câble vert (1/2)','w2a'),w2b:O('Câble vert (2/2)','w2b'),w3a:O('Câble jaune (1/2)','w3a'),w3b:O('Câble jaune (2/2)','w3b'),w2:O('Câble vert','w2'),w3:O('Câble jaune','w3'),e0:O('Ampoule','e0')};
  gg.forEach(g=>items[g]=G(g));
  return{parts,items,recipes:[{a:'w2a',b:'w2b',out:'w2'},{a:'w3a',b:'w3b',out:'w3'}],
   hints:['Six fils emmêlés sur la face avant : échange deux extrémités voisines à droite jusqu’à ce qu’aucun ne se croise.','Un bout de câble vert traîne sur la face gauche.','Sélectionne un demi-câble, puis touche l’autre moitié dans l’inventaire.','La petite clé ouvre la serrure de la face gauche. Le second câble apparaît ensuite ailleurs.','Les câbles et l’ampoule se branchent sur la face arrière.']};
 }});

/* ---------- Nouveaux systèmes (extrêmes) ---------- */
const lightsInit=(R,N,k)=>{const s=Array(N*N).fill(1);const used=[];const tap=i=>{const x=i%N,y=(i/N)|0;[[0,0],[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{const X=x+dx,Y=y+dy;if(X>=0&&X<N&&Y>=0&&Y<N)s[Y*N+X]^=1;});};
  while(used.length<k){const i=R.int(0,N*N-1);if(!used.includes(i)){used.push(i);tap(i);}}if(s.every(v=>v))tap(0);return s;};
const slidersInit=(R,n)=>{const t=Array.from({length:n},()=>R.int(1,9));const i=t.map(v=>{let x;do{x=R.int(0,9);}while(x===v);return x;});return{t,i};};
const simonSeq=(R,L)=>{let q;do{q=Array.from({length:L},()=>R.int(0,3));}while(q.every(v=>v===q[0]));return q;};
const digitMarks=(t,x0,dx,y,s,c)=>t.map((v,i)=>mark(String(v),x0+i*dx,y,s,c||'gl'));

obDefine({id:'planetarium',name:'Le planétarium',lab:'Extrême',theme:'cristal',rw:110,parts:11,icon:'g5',
 intro:'Des lampes, des curseurs, une mélodie de lumières. Rien ne se lit tant qu’on n’a pas regardé de près.',
 win:D=>D('sock'),
 build(R){
  const {t,i}=slidersInit(R,4),seq=simonSeq(R,6),cols=['#2f55d4','#d4342c','#2fa84f','#e0b030'];
  const parts=[
   {t:'lights',id:'L',f:0,x:20,y:4,w:60,h:62,n:3,init:lightsInit(R,3,5),col:'#ffd060',key:true},
   {t:'hatch',id:'h0',f:0,x:28,y:70,w:44,h:24,open:()=>D('L'),give:['o2','g1']},
   {t:'hot',id:'hv',f:3,x:34,y:20,w:32,h:26,uses:'o2',fail:'On ne voit rien à l’œil nu…',msg:'Des chiffres minuscules apparaissent.'},
   {t:'marks',f:3,x:6,y:50,w:88,h:24,plate:1,need:()=>D('hv'),items:digitMarks(t,12.5,25,52,9)},
   {t:'sliders',id:'S',f:1,x:6,y:6,w:88,h:52,init:i,target:t,key:true},
   {t:'hatch',id:'h1',f:1,x:28,y:64,w:44,h:28,open:()=>D('S'),give:['c1','g3']},
   {t:'keyhole',id:'kh',f:2,x:36,y:10,w:28,h:34,key:'c1',key2:1,keyed:1},
   {t:'hatch',id:'h2',f:2,x:20,y:54,w:60,h:32,open:()=>D('kh'),give:['g5']},
   {t:'simon',id:'sim',f:4,x:6,y:8,w:88,h:34,cols,seq,key:true},
   {t:'hatch',id:'h4',f:4,x:30,y:50,w:40,h:24,open:()=>D('sim'),give:['g7']},
   {t:'socket',id:'sock',f:5,x:6,y:30,w:88,h:36,slots:[{g:'g1'},{g:'g3'},{g:'g5'},{g:'g7'}],key:true}];
  return{parts,items:{o2:O('Loupe','o2'),c1:K('Clé de cristal','c1'),g1:G('g1'),g3:G('g3'),g5:G('g5'),g7:G('g7')},
   hints:['Sur la face avant, touche une lampe : elle change aussi ses voisines. Il faut toutes les allumer.','La loupe sert sur la face droite : une zone brille, regarde-la de près.','Les quatre chiffres révélés règlent les quatre curseurs de la face gauche (de haut en bas).','La clé de cristal va dans la serrure de la face arrière.','Sur le dessus, appuie sur ▶ : observe la mélodie de couleurs et reproduis-la.','Les quatre gemmes se logent sous la boîte.']};
 }});

obDefine({id:'mine',name:'Le coffre de la mine',lab:'Extrême',theme:'rouille',rw:120,parts:12,icon:'r1',
 intro:'Un coffre de mineur : câbles, engrenages et manivelle. Chaque pièce manque quelque part ailleurs.',
 win:D=>D('sock'),
 build(R){
  const n=5,cols=['#d4342c','#2f55d4','#2fa84f','#e0b030','#9a45c8'];
  let init;do{init=R.shuf([0,1,2,3,4]);}while(init.reduce((a,v,k)=>a+init.slice(k+1).filter(x=>x<v).length,0)<5);
  const {t,i}=slidersInit(R,3),gg=R.shuf(['g0','g2','g4','g7','g8']).slice(0,3);
  const parts=[
   {t:'knot',id:'knot',f:0,x:6,y:6,w:88,h:52,n,cols,init,key:true},
   {t:'hatch',id:'h0',f:0,x:30,y:64,w:40,h:26,open:()=>D('knot'),give:['r0','r3']},
   {t:'marks',f:5,x:10,y:20,w:80,h:24,plate:1,items:digitMarks(t,20,30,50,10)},
   {t:'sliders',id:'S',f:1,x:6,y:6,w:88,h:42,init:i,target:t,key:true},
   {t:'hatch',id:'h1',f:1,x:20,y:54,w:60,h:32,open:()=>D('S'),give:['r1','m0']},
   {t:'lights',id:'L',f:2,x:22,y:6,w:56,h:58,n:3,init:lightsInit(R,3,4),col:'#7be0ff',key:true},
   {t:'hatch',id:'h2',f:2,x:28,y:68,w:44,h:24,open:()=>D('L'),give:[gg[0]]},
   {t:'train',id:'train',f:3,x:4,y:4,w:92,h:58,slots:[{x:30,y:48,w:46,g:'r0'},{x:68,y:30,w:28,g:'r1'},{x:72,y:72,w:36,g:'r3'}],key:true},
   {t:'crank',id:'crank',f:3,x:28,y:66,w:44,h:30,item:'m0',turns:6,need:()=>D('train'),key:true,give:['c2']},
   {t:'keyhole',id:'kh',f:4,x:36,y:8,w:28,h:34,key:'c2',key2:1,keyed:1},
   {t:'hatch',id:'h4',f:4,x:16,y:50,w:68,h:34,open:()=>D('kh'),give:[gg[1],gg[2]]},
   {t:'socket',id:'sock',f:5,x:6,y:58,w:88,h:34,slots:gg.map(g=>({g})),key:true}];
  const items={r0:O('Grand engrenage','r0'),r1:O('Petit engrenage','r1'),r3:O('Engrenage de fer','r3'),m0:O('Manivelle','m0'),c2:K('Petite clé','c2')};
  gg.forEach(g=>items[g]=G(g));
  return{parts,items,
   hints:['Face avant : échange deux extrémités voisines à droite jusqu’à ce qu’aucun fil ne se croise.','Sous la boîte, trois chiffres sont gravés. Ils règlent les curseurs de la face gauche (de haut en bas).','Le côté droit : allume toutes les lampes (chacune change aussi ses voisines).','Sur la face arrière, trois axes vides attendent des engrenages.','Une fois les engrenages posés, place la manivelle et tourne-la : elle libère une clé.','La clé va dans la serrure du dessus. Les gemmes se logent sous la boîte.']};
 }});

obDefine({id:'sablier',name:'Le sablier d’ébène',lab:'Extrême',theme:'egypt',rw:130,parts:13,icon:'k4',
 intro:'Une boîte au sable fin qui garde ses secrets en couches : un papyrus, une loupe, une mélodie, un code.',
 win:D=>D('sock'),
 build(R){
  const {t,i}=slidersInit(R,5),seq=simonSeq(R,7),cols=['#d4342c','#2f55d4','#2fa84f','#e0b030'],{ex,code}=mathSet(R);
  const parts=[
   {t:'lights',id:'L',f:0,x:18,y:4,w:64,h:68,n:4,init:lightsInit(R,4,6),col:'#ffb030',key:true},
   {t:'hatch',id:'h0',f:0,x:28,y:76,w:44,h:18,open:()=>D('L'),give:['pap','o2']},
   {t:'sliders',id:'S',f:1,x:6,y:6,w:88,h:56,init:i,target:t,key:true},
   {t:'hatch',id:'h1',f:1,x:28,y:68,w:44,h:24,open:()=>D('S'),give:['c3','g2']},
   {t:'keyhole',id:'kh',f:2,x:36,y:10,w:28,h:34,key:'c3',key2:1,keyed:1},
   {t:'hatch',id:'h2',f:2,x:16,y:54,w:68,h:32,open:()=>D('kh'),give:['g4']},
   {t:'hot',id:'hv',f:3,x:30,y:14,w:40,h:30,uses:'o2',fail:'Il y a quelque chose, mais trop fin pour l’œil nu.',msg:'Des signes minuscules se révèlent.'},
   {t:'marks',f:3,x:6,y:50,w:88,h:24,plate:1,need:()=>D('hv'),items:ex.map((e,k)=>mark(e,12.5+k*25,52,6,'gl'))},
   {t:'ring',id:'ring',f:4,x:4,y:4,w:92,h:22,n:4,syms:DG,spr:'c4',code,key:true},
   {t:'hatch',id:'h4',f:4,x:30,y:30,w:40,h:20,open:()=>D('ring'),give:['g6']},
   {t:'simon',id:'sim',f:4,x:6,y:56,w:88,h:34,cols,seq,need:()=>D('ring'),key:true},
   {t:'hatch',id:'h5',f:5,x:30,y:8,w:40,h:20,open:()=>D('sim'),give:['g8']},
   {t:'socket',id:'sock',f:5,x:6,y:40,w:88,h:36,slots:[{g:'g2'},{g:'g4'},{g:'g6'},{g:'g8'}],key:true}];
  return{parts,items:{pap:NT('Papyrus',digitMarks(t,12,19,45,9,'dk'),'Cinq niveaux.'),o2:O('Loupe','o2'),c3:K('Clé d’ébène','c3'),g2:G('g2'),g4:G('g4'),g6:G('g6'),g8:G('g8')},
   hints:['Sur la face avant, 16 lampes : en toucher une change aussi ses voisines. Allume-les toutes.','Le papyrus donne cinq chiffres : ce sont les positions des cinq curseurs de la face gauche (de haut en bas).','La clé d’ébène va dans la serrure de la face arrière.','La loupe (trouvée derrière les lampes) sert sur la face droite : une zone brille.','Les signes révélés sont quatre calculs : leurs résultats règlent les quatre anneaux du dessus (de gauche à droite).','Le dessus cache ensuite une mélodie (appuie sur ▶). Les gemmes se logent sous la boîte.']};
 }});

/* ================= GÉNÉRATEUR DE BOÎTES ================= */
const FN=['la face avant','le côté gauche','la face arrière','le côté droit','le dessus','le dessous'];
const GTH=['noyer','cuir','lave','verre','nacre','beton','wood','lacque','pierre','jouet','marbre','rouille','cristal','sable','corail','jade','ice','clock','ivory','obsidian','egypt','steam'];
const KEYSPR=['k0','k1','k2','k3','k4','k5','k6','k7','k8'];
const KEYNM=['Clé de laiton','Clé d’argent','Clé ancienne','Clé de bronze','Clé noire','Clé dorée','Clé fine','Clé massive','Clé ouvragée'];
const BOXN=['Le coffre','La boîte','Le coffret','Le cabinet','Le reliquaire'];
const BOXQ=['de l’explorateur','du horloger','du capitaine','de l’alchimiste','du collectionneur','du voyageur','de l’inventeur','du bibliothécaire','de l’orfèvre','du mage'];
const DECOY=[['Aimant','tl_mag'],['Boussole de laiton','tl_comp'],['Lampe à huile','tl_oil'],['Compas','tl_dv'],['Pièces d’or','tl_gold'],['Boussole','o4'],['Sablier','o5'],['Miroir','o6'],['Cloche','o7'],['Coquillage','o9'],['Bougeoir','o3']];

const MREF=(o,dx,dy)=>o===0?[-dy,-dx]:[dy,dx];
function genMir(R,cols,rows,nm,nd,no){
 for(let t=0;t<500;t++){
  const proj=R.int(0,rows-1);let r=proj,c=0,dx=1,dy=0;const used=new Set([r+','+c]),mir=[];let ok=true;
  const ins=(rr,cc)=>rr>=0&&rr<rows&&cc>=1&&cc<=cols&&!used.has(rr+','+cc);
  for(let m=0;m<=nm&&ok;m++){
   const k=R.int(1,3);let moved=0;
   for(let q=0;q<k;q++){if(!ins(r+dy,c+dx))break;r+=dy;c+=dx;used.add(r+','+c);moved++;}
   if(moved===0){ok=false;break;}
   if(m===nm)break;
   // turn: choose a perpendicular direction with room
   const opts=[[-dy,dx],[dy,-dx]].filter(([ndx,ndy])=>ins(r+ndy,c+ndx));if(!opts.length){ok=false;break;}
   const[ndx,ndy]=R.pick(opts);const o=[0,1].find(oo=>{const[a,b]=MREF(oo,dx,dy);return a===ndx&&b===ndy;});
   mir.push({r,c,o});dx=ndx;dy=ndy;
  }
  if(!ok||mir.length!==nm)continue;
  const tgt={r,c};const free=[];for(let rr=0;rr<rows;rr++)for(let cc=1;cc<=cols;cc++)if(!used.has(rr+','+cc))free.push([rr,cc]);
  const fs=R.shuf(free);if(fs.length<nd+no)continue;
  const pathMir=mir.map(m=>({r:m.r,c:m.c}));const dec=fs.slice(0,nd).map(([rr,cc])=>({r:rr,c:cc}));const obs=fs.slice(nd,nd+no).map(([rr,cc])=>({r:rr,c:cc}));
  const all=pathMir.concat(dec),sol=mir.map(m=>m.o).concat(dec.map(()=>R.int(0,1)));
  let init;for(let a=0;a<30;a++){init=sol.map((v,i)=>i<nm?(R.int(0,1)?1-v:v):R.int(0,1));if(init.some((v,i)=>i<nm&&v!==sol[i])){break;}}
  if(!init.some((v,i)=>i<nm&&v!==sol[i]))continue;
  return{proj,tgt,mir:all,obs,init,sol};
 }
 throw new Error('mirrors impossible');
}

const VCOLS=['#d4342c','#2f55d4','#2fa84f','#e0b030','#9a45c8','#e07a30'],PCOLS=['#d4342c','#2f55d4','#2fa84f','#e0b030','#222'];
const colMarks=cols=>(d,x0,dx,y,s,c)=>d.map((v,i)=>mark('●',x0+i*dx,y,s,c||'gl',cols[v]));
const moonMarks=(d,x0,dx,y,s,c)=>d.map((v,i)=>mark('<img class="sg" src="img/ob/mn'+v+'.webp" alt="">',x0+i*dx,y,s+2,c||'gl'));
const bulbMarks=(a,b)=>(d,x0,dx,y,s,c)=>d.map((v,i)=>mark('<img class="sg" src="img/ob/'+(v?b:a)+'.webp" alt="">',x0+i*dx,y,s+4,c||'gl'));
const TOOLS=[['chain','chain',null,'tl_pl','Pince',88,12,'Une chaîne barre le passage : il faut en couper un maillon.'],['bolt_c','bolt_c','bolt_o','tl_wr','Clé à molette',52,20,'Un verrou rouillé est serré à fond : il faut le desserrer.'],['pl_st_c','pl_st_c','pl_st_o','tl_ha','Marteau',32,32,'Un vieux cadenas noir est rouillé : il faut le fracasser.'],['lk_cast','lk_cast',null,'tl_sd','Tournevis',32,32,'Une plaque de fonte est coincée : il faut la forcer.']];
const cm=(m,x0,dx,y,s,c)=>m.marksFn?m.marksFn(m.d,x0,dx,y,s,c):digitMarks(m.d,x0,dx,y,s,c);
const PIPEB={tp_t:[0,1,1,1],tp_t2:[0,1,1,1],tp_t3:[0,1,1,1],tp_x3:[1,1,1,1],tp_vx:[1,1,1,1],tp_s3:[1,0,1,0],tp_s4:[1,0,1,0],tp_g:[1,0,1,0],tp_f:[1,0,1,0],tp_r:[1,0,1,0],tp_e3:[0,1,1,0],tp_e4:[0,1,1,0],tp_e5:[0,1,1,0],tp_s:[1,0,1,0],tp_s2:[1,0,1,0],tp_v:[1,0,1,0],tp_e:[0,1,1,0],tp_e2:[0,1,1,0],tp_x:[1,1,1,1],tp_c:[0,0,0,1],tp_z:[0,0,0,0]};
const popn=(spr,r)=>{const bb=PIPEB[spr];return[0,1,2,3].map(d=>bb[((d-r)%4+4)%4]);};
const PDIR=[[0,-1],[1,0],[0,1],[-1,0]];
function genPipes(R,cols,rows){
 for(let t=0;t<300;t++){
  const sr=R.int(0,rows-1),tr=R.int(0,rows-1);const path=[[sr,1]];const seen=new Set([sr*100+1]);
  let ok=false;
  const dfs=()=>{const[r,c]=path[path.length-1];if(r===tr&&c===cols-2)return true;
   const ds=R.shuf([0,1,1,1,2,3].filter((v,i,a)=>a.indexOf(v)===i||v===1)).slice(0,4);
   for(const d of [1,...R.shuf([0,2,3])].sort(()=>R.int(0,1)-.5)){const nr=r+PDIR[d][1],nc=c+PDIR[d][0];if(nr<0||nr>=rows||nc<1||nc>cols-2||seen.has(nr*100+nc))continue;seen.add(nr*100+nc);path.push([nr,nc]);if(dfs())return true;path.pop();}
   return false;};
  ok=dfs();if(!ok||path.length<cols-1)continue;
  const cells=Array(rows*cols).fill(null),sol=Array(rows*cols).fill(0);
  cells[sr*cols]='tp_src';cells[tr*cols+cols-1]='tp_snk';
  path.forEach(([r,c],i)=>{const prev=i===0?[sr,0]:path[i-1],next=i===path.length-1?[tr,cols-1]:path[i+1];
    const dIn=PDIR.findIndex(([dx,dy])=>r+dy===prev[0]&&c+dx===prev[1]),dOut=PDIR.findIndex(([dx,dy])=>r+dy===next[0]&&c+dx===next[1]);
    const straight=(dIn+2)%4===dOut;const spr=straight?R.pick(['tp_s','tp_s','tp_s2','tp_v','tp_s3','tp_g','tp_f','tp_r']):R.pick(['tp_e','tp_e2','tp_e3','tp_e4','tp_e5']);
    cells[r*cols+c]=spr;for(let rot=0;rot<4;rot++){const o=popn(spr,rot);if(o[dIn]&&o[dOut]&&o.filter(Boolean).length===2){sol[r*cols+c]=rot;break;}}});
  for(let i=0;i<rows*cols;i++)if(!cells[i]){cells[i]=R.pick(['tp_s','tp_e','tp_e2','tp_c','tp_z','tp_x','tp_s2','tp_v','tp_e','tp_t','tp_t2','tp_t3','tp_x3','tp_vx','tp_e3','tp_s3']);sol[i]=R.int(0,3);}
  const init=sol.map((v,i)=>R.int(0,3));
  // ensure not solved
  const p0={cells,rows,cols,sr,tr};
  const trace=s=>{const seen2=new Set([sr*100]),q=[[sr,0]];let hit=false;while(q.length){const[r,c]=q.pop();if(r===tr&&c===cols-1)hit=true;const o=(cells[r*cols+c]==='tp_src')?[0,1,0,0]:(cells[r*cols+c]==='tp_snk'?[0,0,0,1]:popn(cells[r*cols+c],s[r*cols+c]));for(let d=0;d<4;d++){if(!o[d])continue;const nr=r+PDIR[d][1],nc=c+PDIR[d][0];if(nr<0||nc<0||nr>=rows||nc>=cols||seen2.has(nr*100+nc))continue;const o2=(cells[nr*cols+nc]==='tp_src')?[0,1,0,0]:(cells[nr*cols+nc]==='tp_snk'?[0,0,0,1]:popn(cells[nr*cols+nc],s[nr*cols+nc]));if(o2[(d+2)%4]){seen2.add(nr*100+nc);q.push([nr,nc]);}}}return hit;};
  if(trace(init))continue;if(!trace(sol))continue;
  init[sr*cols]=0;init[tr*cols+cols-1]=0;
  return{cells,init,sol,sr,tr};
 }
 throw new Error('pipes impossible');
}
function mod(kind,R,L){
 const digits=n=>Array.from({length:n},()=>R.int(1,9));
 switch(kind){
 case 'lights':{const N=L>=3?4:3,init=lightsInit(R,N,N===3?R.int(3,5):R.int(5,8)),col=R.pick(['#ffb030','#7be0ff','#ff6a6a','#9dff7a']);
  return{kind,big:1,h:62,hh:24,parts:P=>[{t:'lights',id:P,x:19,y:0,w:62,h:62,n:N,init,col,key:true}],hint:f=>'Sur '+FN[f]+', des lampes : en toucher une change aussi ses voisines. Il faut toutes les allumer.'};}
 case 'simon':{const seq=simonSeq(R,[3,4,5,7][L-1]),cols=['#2f55d4','#d4342c','#2fa84f','#e0b030'],skin=R.pick(['pads','bells','xylo']);
  return{kind,h:24,hh:20,parts:P=>[{t:'simon',id:P,x:4,y:0,w:92,h:24,cols,seq,skin,key:true}],hint:f=>'Sur '+FN[f]+', appuie sur ▶ : observe la séquence de couleurs puis reproduis-la.'};}
 case 'knot':{const n=[3,4,5,6][L-1],cols=['#d4342c','#2f55d4','#2fa84f','#e0b030','#9a45c8','#e07a30'].slice(0,n);let init;do{init=R.shuf(cols.map((_,i)=>i));}while(init.reduce((a,v,k)=>a+init.slice(k+1).filter(x=>x<v).length,0)<n-1);
  return{kind,h:50,hh:24,parts:P=>[{t:'knot',id:P,x:6,y:0,w:88,h:50,n,cols,init,key:true}],hint:f=>'Sur '+FN[f]+', des fils emmêlés : échange deux extrémités voisines à droite jusqu’à ce qu’aucun ne se croise.'};}
 case 'tiles':{const gl=R.shuf(SY).slice(0,8),init=tileInit(R,70+L*14);
  return{kind,big:1,h:58,hh:24,parts:P=>[{t:'tiles',id:P,x:21,y:0,w:58,h:58,glyphs:gl,init,key:true}],hint:f=>'Sur '+FN[f]+', un taquin : fais glisser les tuiles pour les remettre dans l’ordre.'};}
 case 'sliders':{const n=[3,3,4,5][L-1],{t,i}=slidersInit(R,n),h=n*10+4;
  return{kind,h,hh:20,digits:n,parts:(P,d)=>[{t:'sliders',id:P,x:6,y:0,w:88,h,init:i,target:d,key:true}],hint:f=>'Sur '+FN[f]+', des curseurs à régler sur les bons chiffres (de haut en bas).'};}
 case 'ring':{const n=[3,3,4,5][L-1];
  return{kind,h:26,hh:20,digits:n,parts:(P,d)=>[{t:'ring',id:P,x:4,y:0,w:92,h:26,n,syms:DG,spr:'c4',code:d,key:true}],hint:f=>'Sur '+FN[f]+', des molettes à tourner du doigt sur le bon code.'};}
 case 'gauges':{const n=L>=4?4:3,DL=[{spr:'xg0',dark:0},{spr:'xg1',dark:1},{spr:'xg2',dark:1},{spr:'xg4',dark:0}];
  const dials=Array.from({length:n},()=>{const d=R.pick(DL);return{spr:d.spr,dark:d.dark,nd:d.dark?R.pick(['xn0','xn2']):R.pick(['xn1','xn3','xn0'])};});
  return{kind,h:n>3?24:30,hh:20,digits:n,range:[0,9],parts:(P,d)=>[{t:'gauges',id:P,x:3,y:0,w:94,h:n>3?24:30,n,dials,init:d.map(v=>(v+R.int(2,7))%10),target:d,key:true}],hint:f=>'Sur '+FN[f]+', des jauges : fais tourner chaque aiguille du doigt sur le bon chiffre.'};}
 case 'balance':{const k=L>=3?5:4,vals=R.shuf([1,2,3,4,5,6,7,8,9]).slice(0,k),sp=R.shuf(['xw0','xw1','xw3','xw4','xw5','xw6']).slice(0,k);
  const ns=L>=3?3:2,sol=sp.slice(0,ns),target=vals.slice(0,ns).reduce((a,v)=>a+v,0),defs={};sp.forEach((id,i)=>defs[id]={name:'Poids',kind:'part',spr:id,wv:vals[i]});
  return{kind,big:1,h:64,hh:18,needItems:sp,itemDefs:defs,parts:P=>[{t:'balance',id:P,x:8,y:0,w:84,h:64,target,sol,key:true}],hint:f=>'Sur '+FN[f]+', une balance : pose des poids sur le plateau de gauche (touche le plateau) pour égaler la pierre de droite.'};}
 case 'memory':{const rows=L<=1?2:3,pairs=rows*2,syms=R.shuf([0,1,2,3,4,5,6,7]).slice(0,pairs),deck=R.shuf(syms.concat(syms)),h=rows===2?36:52;
  return{kind,h,hh:20,parts:P=>[{t:'memory',id:P,x:14,y:0,w:72,h,cols:4,deck,back:R.int(0,1),key:true}],hint:f=>'Sur '+FN[f]+', des tuiles à retourner : retrouve toutes les paires.'};}
 case 'dial':{const n=L>=4?4:3;
  return{kind,h:52,hh:20,digits:n,range:[1,39],parts:(P,d)=>[{t:'dial',id:P,x:22,y:0,w:56,h:52,n,code:d,key:true}],hint:f=>'Sur '+FN[f]+', un cadran de coffre : tourne-le du doigt sur chaque nombre dans l’ordre et touche « Valider ».'};}
 case 'mirrors':{const cfg=[[4,3,2,0,0],[4,3,3,0,0],[5,4,3,1,1],[5,4,4,2,2]][L-1],cols=cfg[0],rows=cfg[1],g=genMir(R,cols,rows,cfg[2],cfg[3],cfg[4]),h=rows*(90/(cols+1));
  return{kind,big:1,h:Math.round(h),hh:20,parts:P=>[{t:'mirrors',id:P,x:5,y:0,w:90,h:Math.round(h),cols,rows,proj:g.proj,tgt:g.tgt,mir:g.mir,obs:g.obs,init:g.init,sol:g.sol,key:true}],hint:f=>'Sur '+FN[f]+', un projecteur et un cristal : tourne les miroirs (touche-les) pour que le rayon atteigne le cristal.'};}
 case 'pipes':{const cols=L>=3?4:3,g=genPipes(R,cols,3),cw=cols===3?54:72;
  return{kind,big:1,h:54,hh:20,parts:P=>[{t:'pipes',id:P,x:(100-cw)/2,y:0,w:cw,h:54,cols,rows:3,cells:g.cells,init:g.init,sol:g.sol,sr:g.sr,tr:g.tr,key:true}],hint:f=>'Sur '+FN[f]+', des tuyaux : touche une tuile pour la tourner afin de relier la source (hublot vert) à l’arrivée (hublot ambré).'};}
 case 'hanoi':{const n=[3,3,4,5][L-1];
  return{kind,h:44,hh:20,parts:P=>[{t:'hanoi',id:P,x:5,y:0,w:90,h:44,n,key:true}],hint:f=>'Sur '+FN[f]+', des disques sur des tiges : déplace toute la pile sur la tige de droite, un disque à la fois, jamais un grand sur un petit.'};}
 case 'clock':{const dial=R.int(0,3),skin=R.int(0,2);
  return{kind,h:52,hh:20,digits:2,gen:R=>[R.int(1,12),R.int(0,11)],marksFn:(d,x0,dx,y,s,c)=>[mark(String(d[0]),x0,y,s+2,c||'gl'),mark(String(d[1]*5).padStart(2,'0'),x0+dx,y,s+2,c||'gl')],
   parts:(P,d)=>[{t:'clock',id:P,x:22,y:0,w:56,h:52,dial,skin,init:[d[0]%12+1,(d[1]+5)%12],target:d,key:true}],hint:f=>'Sur '+FN[f]+', une horloge : touche près du centre pour l’aiguille des heures, plus loin pour celle des minutes. Les deux nombres trouvés sont l’heure puis les minutes.'};}
 case 'vials':{const n=[3,3,4,5][L-1];
  return{kind,h:46,hh:20,digits:n,gen:R=>R.shuf([0,1,2,3,4,5]).slice(0,n),marksFn:colMarks(VCOLS),parts:(P,d)=>[{t:'vials',id:P,x:5,y:0,w:90,h:46,target:d,key:true}],hint:f=>'Sur '+FN[f]+', un chaudron et des fioles : verse-les dans l’ordre des couleurs de la recette.'};}
 case 'patch':{const n=[3,3,4,4][L-1];
  return{kind,h:40,hh:20,digits:n,gen:R=>R.shuf([0,1,2,3,4]).slice(0,n),marksFn:colMarks(PCOLS),parts:(P,d)=>[{t:'patch',id:P,x:5,y:0,w:90,h:40,n,target:d,key:true}],hint:f=>'Sur '+FN[f]+', des prises et des fiches colorées : branche chaque fiche sur la prise indiquée par la recette (de gauche à droite).'};}
 case 'rings':{const n=[2,3,3,3][L-1],orn=R.int(0,1),spr=orn?['dc_o0','dc_o1','dc_o2']:['dc_r0','dc_r1','dc_r2'],cen=R.int(0,1),frame=R.int(0,1);
  return{kind,big:1,h:56,hh:20,digits:n,range:[1,8],parts:(P,d)=>{const tg=d.map(v=>v-1);return[{t:'rings',id:P,x:22,y:0,w:56,h:56,n,spr:spr.slice(0,n),cen,frame,target:tg,init:tg.map(v=>(v+R.int(1,7))%8),key:true}];},hint:f=>'Sur '+FN[f]+', des anneaux concentriques : tourne chacun du doigt pour que son repère triangulaire pointe le numéro indiqué (de l’extérieur vers l’intérieur).'};}
 case 'moons':{const n=[3,3,4,5][L-1];
  return{kind,h:22,hh:20,digits:n,range:[0,3],marksFn:moonMarks,parts:(P,d)=>[{t:'moons',id:P,x:5,y:0,w:90,h:22,target:d,init:d.map(v=>(v+R.int(1,3))%4),key:true}],hint:f=>'Sur '+FN[f]+', des lunes : touche chaque lune pour changer sa phase jusqu’à reproduire la séquence trouvée.'};}
 case 'torn':{let a;do{a=R.shuf([0,1,2,3]);}while(a.some((v,i)=>v===i));
  return{kind,h:44,hh:20,parts:P=>[{t:'torn',id:P,x:28,y:0,w:44,h:44,init:a,key:true}],hint:f=>'Sur '+FN[f]+', un parchemin déchiré : échange les morceaux (touches-en deux) pour reconstituer la feuille.'};}

 case 'runes':{const k=[4,5,6,8][L-1],n=[3,3,4,4][L-1],sy=R.shuf([0,1,2,3,4,5,6,7,8,9,10,11]).slice(0,k),sprs=sy.map(v=>'sy'+v);
  return{kind,h:24,hh:20,digits:n,range:[0,k-1],marksFn:(d,x0,dx,y,s,c)=>d.map((v,i)=>mark('<img class="sg" src="img/ob/'+sprs[v]+'.webp" alt="">',x0+i*dx,y,s+2,c||'gl')),
   parts:(P,d)=>[{t:'cycle',id:P,x:5,y:0,w:90,h:24,sprs,target:d,init:d.map(v=>(v+R.int(1,k-1))%k),key:true}],hint:f=>'Sur '+FN[f]+', des pierres gravées : touche chacune pour changer son symbole jusqu’à reproduire la séquence trouvée.'};}
 case 'switches':{const n=[3,3,4,5][L-1],sk=R.pick([{l0:'bu_off',l1:'bu_on',s0:'sw_a',s1:'sw_b'},{l0:'ld_r0',l1:'ld_g1',s0:'lv_up',s1:'lv_dn'},{l0:'bu_off',l1:'bu_on',s0:'lv_up',s1:'lv_dn'},{l0:'ld_r0',l1:'ld_g1',s0:'sw_a',s1:'sw_b'}]);let perm;do{perm=R.shuf(Array.from({length:n},(_,i)=>i));}while(perm.every((v,i)=>v===i));
  return{kind,h:34,hh:20,digits:n,range:[0,1],gen:R=>{let d;do{d=Array.from({length:n},()=>R.int(0,1));}while(d.every(v=>!v)||d.every(v=>v));return d;},marksFn:bulbMarks(sk.l0,sk.l1),
   parts:(P,d)=>[{t:'switches',id:P,x:10,y:0,w:80,h:34,perm,target:d,sk,key:true}],hint:f=>'Sur '+FN[f]+', des lampes et des interrupteurs : chaque interrupteur est relié à une lampe, mais pas forcément celle du dessus. Essaie, puis reproduis le motif trouvé.'};}
 case 'fuses':{const nb=[1,2,2,3][L-1],n=nb+(nb===1?1:(nb===3?1:2)),bad=R.shuf(Array.from({length:n},(_,i)=>i<nb)),v=bad.map(()=>R.int(0,1)),ids=Array.from({length:nb},(_,i)=>'fz'+i),defs={};ids.forEach(id=>defs[id]={name:'Fusible neuf',kind:'part',spr:'fu_ok'});
  return{kind,h:n>2?36:22,hh:20,needItems:ids,itemDefs:defs,itemHint:'Les fusibles neufs sont cachés dans les cavités ou ramassés sur les faces.',parts:P=>[{t:'fuses',id:P,x:8,y:0,w:84,h:n>2?36:22,bad,v,key:true}],hint:f=>'Sur '+FN[f]+', un tableau de fusibles : remplace ceux qui sont grillés (noircis) par des fusibles neufs.'};}
 case 'tool':{let o;do{o=R.pick(TOOLS);}while(mod.usedT.includes(o[3]));mod.usedT.push(o[3]);const[spr,s1,sD,tid,tn,w,h,txt]=o,defs={};defs[tid]={name:tn,kind:'part',spr:tid};
  return{kind,h:h+2,hh:20,needItems:[tid],itemDefs:defs,itemHint:'L’outil (« '+tn.toLowerCase()+' ») est dans une cavité ou posé sur une face.',parts:P=>[{t:'hot',id:P,x:(100-w)/2,y:0,w,h,spr:s1,sprD:sD||undefined,fade:sD?0:1,pick:false,uses:tid,fail:'Il faudrait un outil adapté.',msg:'Ça cède.',key:true}],hint:f=>'Sur '+FN[f]+' : '+txt.toLowerCase().replace(/^./,c=>c.toUpperCase())+' Il faut utiliser le bon outil dessus (touche-le dans l’inventaire puis sur l’obstacle).'};}
 case 'gate':{let k;do{k=R.int(0,8);}while(mod.used.includes(k));mod.used.push(k);
  return{kind,h:30,hh:26,needKey:KEYSPR[k],keyName:KEYNM[k],parts:(P)=>{const L2=R.pick([['pl_br',1],['pl_st',1],['pl_go',1],['lk_orn',0],['lk_iris',0],[null,0]]);return[{t:'keyhole',id:P,x:36,y:0,w:28,h:30,key:KEYSPR[k],key2:1,keyed:1,lock:L2[0]||undefined,lockO:L2[1]}];},hint:f=>'Une serrure sur '+FN[f]+' attend '+KEYNM[k].toLowerCase().replace('clé','une clé')+'.'};}
 case 'train':{const turns=R.int(4,8);
  return{kind,big:1,h:86,hh:0,inline:1,needItems:['r0','r1','r3','m0'],parts:(P,d,give)=>[{t:'train',id:P+'t',x:4,y:0,w:92,h:54,slots:[{x:30,y:48,w:46,g:'r0'},{x:68,y:30,w:28,g:'r1'},{x:72,y:72,w:36,g:'r3'}],key:true},
    {t:'crank',id:P,x:28,y:57,w:44,h:28,item:'m0',turns,need:()=>D(P+'t'),key:true,give}],hint:f=>'Sur '+FN[f]+', trois axes vides : pose les trois engrenages, place la manivelle, puis tourne-la.'};}
 }}
const needsOfX=0;
const needsOf=m=>m.digits?'d':(m.needKey?'k':(m.needItems?'i':''));
function genBox(R,L){
 const CFG={1:{n:3,pool:['lights','simon','knot','sliders','ring','gauges','memory','moons','torn','patch'],max:{sliders:1,ring:1,gauges:1,memory:1,moons:1,torn:1,patch:1}},
  2:{n:4,pool:['lights','simon','knot','sliders','ring','gate','gauges','memory','dial','mirrors','balance','pipes','hanoi','clock','vials','patch','moons','torn','runes','switches','fuses','tool'],max:{}},
  3:{n:5,pool:['lights','simon','knot','sliders','ring','gate','tiles','train','gauges','memory','dial','mirrors','balance','pipes','hanoi','clock','vials','patch','rings','moons','torn','runes','switches','fuses','tool'],max:{gate:2,tool:2}},
  4:{n:6,pool:['lights','simon','knot','sliders','ring','gate','tiles','train','gauges','memory','dial','mirrors','balance','pipes','hanoi','clock','vials','patch','rings','moons','torn','runes','switches','fuses','tool'],max:{gate:2,tool:2,runes:2,switches:2,sliders:2,ring:2,knot:2,simon:2,gauges:2,dial:2,clock:2,vials:2,patch:2,moons:2}}}[L];
 for(let tryN=0;tryN<400;tryN++){
  const kinds=[],cnt={};let g=0;while(kinds.length<CFG.n&&g++<200){const k=R.pick(CFG.pool);if((cnt[k]||0)>=(CFG.max[k]||1))continue;cnt[k]=(cnt[k]||0)+1;kinds.push(k);}
  if(kinds.length<CFG.n)continue;
  if(kinds.filter(k=>['lights','tiles','train','balance','mirrors','pipes','rings'].includes(k)).length>(L>=4?2:(L===3?3:1)))continue;
  mod.used=[];mod.usedT=[];let ms=R.shuf(kinds).map(k=>mod(k,R,L));
  ms.forEach(m=>{if(m.hh&&!m.inline){m.sk=R.pick([null,'dr','dw','tr','vt','pn','cf','ca','dr','dw','tr','ca']);if(m.sk)m.hh+=9;}});
  const fi=ms.findIndex(m=>!m.needKey&&!m.needItems);if(fi<0)continue;if(fi>0){const t=ms[0];ms[0]=ms[fi];ms[fi]=t;}
  const gems=R.shuf(['g0','g1','g2','g3','g4','g5','g6','g7','g8']);let gi=0;
  const items={},rewards=ms.map(()=>[]),extra=[];let nid=0;
  ms.forEach((m,i)=>{m.i=i;m.P='P'+i;m.gem=gems[gi++];items[m.gem]=G(m.gem);rewards[i].push(m.gem);});
  const loose=[];
  const supply=(id,j,force)=>{if(j>0&&!(L>=2&&R.int(1,100)<=22)&&!force){const i=R.int(0,j-1);rewards[i].push(id);return;}
    loose.push(id);};
  let loupe=false;
  const carriers=[];
  ms.forEach((m,j)=>{
   if(m.needKey){items[m.needKey]=K(m.keyName,m.needKey);supply(m.needKey,j);}
   if(m.needItems){const nm={r0:'Grand engrenage',r1:'Petit engrenage',r3:'Engrenage de fer',m0:'Manivelle'};m.needItems.forEach(id=>{items[id]=m.itemDefs?m.itemDefs[id]:O(nm[id],id);supply(id,j);});}
   if(m.digits){m.d=m.gen?m.gen(R):Array.from({length:m.digits},()=>R.int(m.range?m.range[0]:1,m.range?m.range[1]:9));
     const w=L===1?[['plate',60],['note',40]]:L===2?[['plate',30],['note',40],['loupe',30]]:[['plate',15],['note',40],['loupe',45]];let r=R.int(1,100),ty='plate';for(const [t,p] of w){if(r<=p){ty=t;break;}r-=p;}
     if(ty!=='plate'&&j===0)ty='plate';
     if(ty==='plate')carriers.push({type:'plate',m,h:14});
     else if(ty==='note'){const id='nt'+(nid++);const nn=R.pick(['Papyrus','Billet plié','Carnet','Parchemin','Feuille volante']);items[id]=NT(nn,cm(m,(100/m.digits)/2,100/m.digits,45,m.digits>4?8:10,'dk'),'Chiffres à reporter.');m.clue={id,nn};supply(id,j);}
     else{if(!loupe){loupe=true;items.o2=O('Loupe','o2');supply('o2',j);}carriers.push({type:'loupe',m,h:42,id:'LV'+j});}
   }
  });
  // decoys
  const deco=L>=3?R.shuf(DECOY).slice(0,L-1):[];deco.forEach(([n,s])=>{items[s]=O(n,s);const i=R.int(0,ms.length-1);rewards[i].push(s);});
  // element list for packing
  const els=[];
  ms.forEach(m=>els.push({m,H:m.h+(m.hh?4+m.hh:0)}));
  carriers.forEach(c=>els.push({c,H:c.h}));
  loose.forEach(id=>els.push({loose:id,H:20}));
  els.push({sock:1,H:34});
  let lay=null;
  for(let a=0;a<80&&!lay;a++){
   const cap=Array(6).fill(94),fa=Array.from({length:6},()=>[]);let ok=true;
   const ord=R.shuf(els).sort((x,y)=>(y.H>60)-(x.H>60));
   for(const e of ord){const c=[0,1,2,3,4,5].filter(f=>cap[f]>=e.H);if(!c.length){ok=false;break;}const f=R.pick(c);cap[f]-=e.H;fa[f].push(e);}
   if(ok)lay={fa};
  }
  if(!lay)continue;
  // build parts
  const parts=[];
  lay.fa.forEach((arr,f)=>{arr=R.shuf(arr);const sum=arr.reduce((a,e)=>a+e.H,0),gap=Math.min(10,(94-sum)/(arr.length+1));let y=2+gap;
   arr.forEach(e=>{const Y=y;y+=e.H+gap;
    const add=p=>{p.f=f;p.y=Math.round((p.y+Y)*10)/10;parts.push(p);};
    if(e.m){const m=e.m,P=m.P,giv=rewards[m.i].slice();
      const ps=m.parts(P,m.d,giv);ps.forEach(add);
      if(m.hh&&!m.inline){const sk=m.sk;add({t:'hatch',id:'H'+m.i,x:sk?18:28,y:m.h+(sk?2:4),w:sk?64:44,h:m.hh+(sk?-2:0),open:()=>D(P),give:giv,sk:sk||undefined});}
      m.f=f;}
    else if(e.c){const c=e.c,m=c.m;
      if(c.type==='plate')add({t:'marks',x:14,y:0,w:72,h:14,plate:1,items:cm(m,(100/m.digits)/2,100/m.digits,52,m.digits>4?8:9)});
      else{add({t:'hot',id:c.id,x:30,y:0,w:40,h:22,uses:'o2',fail:'Il y a quelque chose, mais trop fin pour l’œil nu.',msg:'Des chiffres minuscules apparaissent.'});
        add({t:'marks',x:14,y:26,w:72,h:14,plate:1,need:()=>D(c.id),items:cm(m,(100/m.digits)/2,100/m.digits,52,m.digits>4?8:9)});}
      c.f=f;}
    else if(e.loose){const id=e.loose;add({t:'hot',id:'LS'+id,x:34,y:0,w:32,h:20,spr:items[id].spr||(items[id].kind==='note'?'pp_scroll':id),pick:true,give:[id],msg:'Tu ramasses : '+items[id].name.toLowerCase()+'.'});e.f=f;}
    else if(e.sock){add({t:'socket',id:'sock',x:6,y:0,w:88,h:34,slots:ms.map(m=>({g:m.gem})),key:true});e.f=f;}
   });});
  // hints in solving order
  const hints=[];
  ms.forEach((m,j)=>{
    if(m.digits){const c=carriers.find(c=>c.m===m);
      if(c&&c.type==='plate')hints.push('Les chiffres pour '+FN[m.f]+' sont gravés sur '+FN[c.f]+'.');
      else if(c)hints.push('La loupe (trouvée dans une cavité) sert sur '+FN[c.f]+' : une zone brille. Les chiffres révélés servent sur '+FN[m.f]+'.');
      else if(m.clue)hints.push('Le '+m.clue.nn.toLowerCase()+' que tu trouves donne les chiffres à régler sur '+FN[m.f]+'.');}
    hints.push(m.hint(m.f));
    if(m.needKey)hints.push('La clé qu’il faut est cachée dans une cavité d’une autre face.');
    if(m.needItems)hints.push(m.itemHint?m.itemHint:m.kind==='balance'?'Les poids sont éparpillés dans les cavités ou sur les faces : chacun porte sa valeur. Il faut une combinaison qui égale la pierre.':'Engrenages et manivelle sont éparpillés dans les cavités ou ramassés sur les faces.');
  });
  hints.push('Chaque mécanisme résolu libère une gemme : toutes se logent sur '+FN[els.find(e=>e.sock).f]+'.');
  const th=R.pick(GTH);
  return{parts,items,hints,theme:th,name:R.pick(BOXN)+' '+R.pick(BOXQ)};
 }
 throw new Error('gen impossible');
}
const digits2=(R,n)=>Array.from({length:n},()=>R.int(1,9));
[['Facile',1,12,3,'k1'],['Moyen',2,35,4,'k3'],['Difficile',3,60,5,'g2'],['Extrême',4,110,6,'k8']].forEach(([lab,L,rw,np,ic])=>
 obDefine({id:'gen'+L,gen:1,name:'Boîte mystère',lab,rw,parts:np,icon:ic,intro:'Une boîte jamais vue : chaque mécanisme cache ce qu’il faut pour un autre.',win:D=>D('sock'),build(R){return genBox(R,L);}}));
})();

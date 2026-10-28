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
})();

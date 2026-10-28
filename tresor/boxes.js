(function(){
const SY=OBX.SY,GN={g0:'Rubis',g1:'Émeraude',g2:'Saphir',g3:'Topaze',g4:'Améthyste',g5:'Diamant',g6:'Opale',g7:'Aigue-marine',g8:'Grenat'};
const DG='0123456789'.split('');
const K=(n,s)=>({name:n,kind:'key',spr:s}),G=g=>({name:GN[g],kind:'gem',spr:g}),NT=(n,marks,text)=>({name:n,kind:'note',note:{marks,text}});
const mark=(t,x,y,s,c,col)=>({t,x,y,s,c:c||'gl',col});
const D=id=>obD(id),F=f=>obF(f);
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
})();

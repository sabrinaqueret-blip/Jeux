/* Jeux de cartes illustrés partagés (Alice par défaut + autres achetables, portefeuille cartes-v1) */
(function(){
const mk=()=>{const o={};for(let k=2;k<=10;k++)o[k]='m'+k;return o;};
const T=(ci,n,p,dir,paper,edge,inner,red,black,minis,op)=>({ci,n,p,dir,paper,edge,inner,red,black,minis:minis||mk(),op:op||.3});
const capP=p=>p<=100?p:Math.min(200,Math.round((100+(p-100)*100/1000)/5)*5);
const DECKS=[
 T(10,'Alice au pays des merveilles',0,'alice','#f2e6c9','#6a4426','#b8944a','#b0382c','#2a2a36',{2:'m_tweedledum',3:'m_twins',4:'m_dormouse',5:'m_cook',6:'m_dodo',7:'m_hare1',8:'m_hatter',9:'m_hare2',10:'m_cheshire'},.32),
 T(11,'Chats victoriens',780,'chats','#f4ead2','#5a4030','#b09060','#a8322c','#26262e'),
 T(12,'Renards des bois',820,'renards','#f6ead0','#6a3a1c','#c08a48','#b0381c','#2a2622'),
 T(13,'Dragons et licornes',900,'dragons','#f6ecd4','#8a6420','#d0a840','#b0302c','#26263a'),
 T(14,'Carnaval de Venise',960,'venise','#f6ecd6','#6a4a22','#c9a24a','#b0302c','#24242c',0,.32),
 T(15,'Égypte des pharaons',1000,'egypte','#f6ebd0','#6a4a22','#c9a030','#b0302c','#1c1c24',0,.32),
 T(16,'Japon des estampes',1100,'japon','#f6ead2','#3a2a2a','#b8903a','#b02a2a','#1c1c28',0,.32),
 T(17,'Astronaute rétro',940,'astro','#f6ecd6','#3a4a6a','#c0a060','#b8342c','#1c2030'),
 T(18,'Baroque doré',1050,'baroque','#f6efdc','#6a1c26','#c0983c','#9a1c2c','#1c1c20',0,.34),
 T(19,'Art déco',880,'deco','#f8f0dc','#2a2a3a','#c9a030','#b0282c','#16161e',0,.32),
 T(20,'Royaume enchanté',820,'fee','#f4e8cc','#5a4026','#b8944a','#a8342c','#26242a'),
 T(21,'Steampunk',930,'steampunk','#f2e4c8','#4a3020','#b07838','#a8402a','#241c18',0,.32),
 T(22,'Monde des fées',960,'feesbois','#f4ead0','#4a5a3a','#b8944a','#b0383c','#242a2a',0,.34),
 T(23,'Aventuriers des mers',900,'marins','#f6e8cc','#5a3a22','#b8883c','#a8342c','#22242a',0,.32)
];
DECKS.forEach(d=>{d.p=capP(d.p);if(!d.minis)d.minis=mk();});
const PIPD={heart:'M50 92C8 58 0 32 20 15C34 4 46 12 50 26C54 12 66 4 80 15C100 32 92 58 50 92z',diamond:'M50 3L90 50L50 97L10 50z',club:'<circle cx="50" cy="29" r="23"/><circle cx="26" cy="64" r="23"/><circle cx="74" cy="64" r="23"/><path d="M50 50L38 98H62z"/>',spade:'M50 4C8 40 4 64 22 76C35 84 46 78 50 68C54 78 65 84 78 76C96 64 92 40 50 4zM50 64L38 98H62z'};
const SU=['spade','heart','diamond','club'];
const f1=x=>Math.round(x*10)/10;
function pip(su,x,y,sz,col,rot){const d=PIPD[su],b=d[0]==='<'?d:'<path d="'+d+'"/>';return '<g fill="'+col+'" transform="translate('+f1(x)+' '+f1(y)+') rotate('+(rot||0)+') scale('+f1(sz/100)+') translate(-50 -50)">'+b+'</g>';}
const PL={7:[[0,0],[2,0],[1,1.5],[0,3],[2,3],[0,6],[2,6]],8:[[0,0],[2,0],[1,1.5],[0,3],[2,3],[1,4.5],[0,6],[2,6]],9:[[0,0],[2,0],[0,2],[2,2],[1,3],[0,4],[2,4],[0,6],[2,6]],10:[[0,0],[2,0],[1,1],[0,2],[2,2],[0,4],[2,4],[1,5],[0,6],[2,6]]};
/* suit: 0 pique 1 cœur 2 carreau 3 trèfle ; rank: 7..10, 11 V, 12 D, 13 R, 1 As */
function face(D,suit,rank,base){
  const su=SU[suit],red=suit===1||suit===2,col=red?D.red:D.black;
  const im=(f,x,y,w,h,al,op)=>'<image href="'+base+D.dir+'/'+f+'.webp" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" preserveAspectRatio="'+(al||'xMidYMid meet')+'"'+(op?' opacity="'+op+'"':'')+'/>';
  let s='<rect width="169.075" height="244.64" fill="'+D.paper+'"/><rect x="7" y="7" width="155" height="230.6" rx="9" fill="none" stroke="'+D.edge+'" stroke-width="2.2"/><rect x="11.5" y="11.5" width="146" height="221.6" rx="6" fill="none" stroke="'+D.inner+'" stroke-width=".8"/>';
  if(rank>=11)s+=im(su+'_'+({11:'jack',12:'queen',13:'king'})[rank],19,18,131,210,'xMidYMax meet');
  else if(rank===1)s+=im('ace_'+su,20,40,129,165);
  else{const m=D.minis[rank];if(m)s+=im(m,26,48,117,152,'xMidYMid meet',D.op);for(const [cx,r] of PL[rank]){s+=pip(su,[54,84.5,115][cx],48+r*25,rank>8?23:26,col,r>3?180:0);}}
  const L=({1:'A',11:'V',12:'D',13:'R'})[rank]||String(rank);
  const ix=(x,y,rot)=>'<g transform="translate('+x+' '+y+') rotate('+rot+')"><text text-anchor="middle" y="0" font-family="Georgia,\'Times New Roman\',serif" font-weight="700" font-size="'+(L==='10'?25:30)+'" fill="'+col+'">'+L+'</text>'+pip(su,0,22,17,col)+'</g>';
  return '<svg class="dkf" viewBox="0 0 169.075 244.64" preserveAspectRatio="none">'+s+ix(22,34,0)+ix(147,210.6,180)+'</svg>';
}
window.DECKS=DECKS;window.deckFace=face;
})();

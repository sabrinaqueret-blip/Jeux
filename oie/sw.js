const CACHE='jeux-oie-v10';
const FILES=["./", "./index.html", "./peerjs.min.js", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./img/board.webp", "./img/i_goose.webp", "./img/i_bridge.webp", "./img/i_inn.webp", "./img/i_well.webp", "./img/i_maze.webp", "./img/i_prison.webp", "./img/i_skull.webp", "./img/i_dice.webp", "./img/i_crown.webp", "./img/pw0.webp", "./img/pw1.webp", "./img/pw2.webp", "./img/pw3.webp", "./img/pw4.webp", "./img/pw5.webp", "./img/d1.webp", "./img/d2.webp", "./img/d3.webp", "./img/d4.webp", "./img/d5.webp", "./img/d6.webp"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('jeux-oie-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{});return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});

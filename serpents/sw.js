const CACHE='jeux-serpents-v1';
const FILES=['./','./index.html','./peerjs.min.js','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./img/board.webp','./img/sn0.webp','./img/sn1.webp','./img/sn2.webp','./img/sn3.webp','./img/la0.webp','./img/la1.webp','./img/pw0.webp','./img/pw1.webp','./img/pw2.webp','./img/pw3.webp','./img/pw4.webp','./img/pw5.webp'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('jeux-serpents-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{});return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});

const CACHE='jeux-chevaux-v3';
const FILES=["./", "./index.html", "./peerjs.min.js", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./img/yr.webp", "./img/yb.webp", "./img/yy.webp", "./img/yg.webp", "./img/ctr.webp", "./img/h0.webp", "./img/h1.webp", "./img/h2.webp", "./img/h3.webp", "./img/d1.webp", "./img/d2.webp", "./img/d3.webp", "./img/d4.webp", "./img/d5.webp", "./img/d6.webp"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('jeux-chevaux-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{});return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});

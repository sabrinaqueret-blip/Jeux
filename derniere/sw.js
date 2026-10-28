const CACHE='jeux-derniere-v1';
const FILES=['./','./index.html','./peerjs.min.js','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./img/u_0.webp','./img/u_1.webp','./img/u_2.webp','./img/u_3.webp','./img/u_W.webp','./img/u_A.webp','./img/u_B.webp','./img/u_dos.webp'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('jeux-derniere-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{});return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});

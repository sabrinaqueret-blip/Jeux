const CACHE='jeux-hub-v3';
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','index.html','icon-192.png','icon-512.png'])).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE&&x.startsWith('jeux-hub')).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin||u.pathname.split('/').length>3&&!u.pathname.endsWith('/'))return;
  if(!/\/(index\.html)?$|icon-192/.test(u.pathname))return;
  e.respondWith(caches.open(CACHE).then(async c=>{const m=await c.match(e.request,{ignoreSearch:true});const n=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r;}).catch(()=>m);return m||n;}));});

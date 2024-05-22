const cacheName = "cache-v1";
const precachedResources = ["index.html", "init.js", "script.js", "edit.js", "classes.js", "tiles.png", "gdicons/ball.png", "gdicons/cubeportal.png", "gdicons/icon.png", "gdicons/jetpackl.png", "gdicons/jetpackr.png", "gdicons/wave.png", "https://cdn.jsdelivr.net/npm/p5@1.4.1/lib/p5.js", "gd.jpg", "style.css"];

async function precache() {
  const cache = await caches.open(cacheName);
  return cache.addAll(precachedResources);
}

self.addEventListener("install", (event) => {
  event.waitUntil(precache());
});

async function cacheFirstWithRefresh(request) {
  const fetchResponsePromise = fetch(request).then(async (networkResponse) => {
    if (networkResponse.ok) {
      const cache = await caches.open("cache-v1");
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });

  return (await caches.match(request)) || (await fetchResponsePromise);
}

self.addEventListener("fetch", (event) => {  
  event.respondWith(cacheFirstWithRefresh(event.request));
});
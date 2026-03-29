const CACHE_NAME = "pret-wallet-v20";
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./qr-wallet.png",
  "./assets/fonts/sofia_pro_regular.otf",
  "./assets/fonts/sofia_pro_semi_bold.otf",
  "./assets/fonts/sofia_pro_bold.otf",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/tab-home.png",
  "./assets/icons/tab-order.png",
  "./assets/icons/tab-order-active.png",
  "./assets/icons/tab-wallet.png",
  "./assets/icons/tab-shops.png",
  "./assets/icons/tab-account.png",
  "./assets/icons/tab-account-active.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const isNavigation = event.request.mode === "navigate";
  if (isNavigation) {
    // Always prefer fresh HTML so UI updates appear immediately.
    event.respondWith(
      fetch(event.request)
        .then((response) => response)
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
          return response;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});

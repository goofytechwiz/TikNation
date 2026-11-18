const CACHE_NAME = "tiknation-shell-v60-new-home-force-refresh";
const APP_SHELL = [
  "./",
  "./index.html",
  "./next/",
  "./manifest.json",
  "./icons/tiknation.svg"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) { return cache.addAll(APP_SHELL); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Always send the app's root entry to the new TikNation experience.
  const rootPath = new URL("./", self.location.href).pathname;
  if (request.mode === "navigate" &&
      (url.pathname === rootPath || url.pathname === rootPath + "index.html")) {
    event.respondWith(Response.redirect(new URL("./next/", self.location.href).href, 302));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).then(function (response) {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(request, copy);
          });
        }
        return response;
      }).catch(function () {
        return caches.match(request).then(function (cachedPage) {
          if (cachedPage) return cachedPage;
          return caches.match("./next/").then(function (home) {
            return home || caches.match("./index.html");
          });
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(function (cached) {
      if (cached) return cached;
      return fetch(request).then(function (response) {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(request, copy);
          });
        }
        return response;
      });
    })
  );
});

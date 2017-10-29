
const CACHE_NAME = "sw-cache-v3";
const CACHED_URLS = ["/index-offline.html", "/intern/js/app.js", "/intern/css/style.css", "/intern/images/cage-200x300.jpg", "/intern/images/cage-200x300-color.jpg"];

self.addEventListener("install", function(event) {
	event.waitUntil(
			caches.open(CACHE_NAME).then(function(cache) {
				return cache.addAll(CACHED_URLS);
			})
		)
});

self.addEventListener("activate", function(event) {
	event.waitUntil(
			caches.keys().then(function(cacheNames) {
				return Promise.all(cacheNames.map(function(cacheName) {
					if (CACHE_NAME !== cacheName && cacheName.startsWith("sw-cache") {
						return caches.delete(cacheName);
					})
				})
				);
			})
		)
});

self.addEventListener("fetch", function(event) {
	event.respondWith(
			fetch(event.request).catch(function() {
				return caches.match(event.request).then(function(response) {
					if(response) {
						return response;
					} else if(event.request.headers.get("accept").includes("text/html")) {
						return caches.match("/index-offline.html");
					}
				})
			})
		)
})
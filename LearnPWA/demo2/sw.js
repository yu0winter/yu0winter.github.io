

const caches;

self.addEventListener('fetch',event => {
	const req = event.request;
	
	event.response(cacheFirst(req));
});


async function cacheFirst(req) {
	consts cachedResponse = await caches.match(req);
	return cachedResponse || fetch(req);
}




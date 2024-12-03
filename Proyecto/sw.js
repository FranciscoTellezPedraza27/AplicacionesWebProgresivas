//Aignar nombre y versiónd de la cache
const CACHE_NAME = 'v1_cache_FJTP';

//Ficheros a cachear en la aplicación
var urlsToCache = [
    './',
    'style.css',
    'imagenes/DePWA.jpeg',
    'imagenes/Facebook.png',
    'imagenes/Instagram.png',
    'imagenes/movil.jpeg',
    'imagenes/PWA.jpg',
    'imagenes/Twitter.png',
    'imagenes/Web.jpeg',
    'favicones/favicon_16.png',
    'favicones/favicon_32.png',
    'favicones/favicon_64.png',
    'favicones/favicon_96.png',
    'favicones/favicon_128.png',
    'favicones/favicon_192.png',
    'favicones/favicon_256.png',
    'favicones/favicon_384.png',
    'favicones/favicon_512.png',
    'favicones/favicon_1024.png'
]

//Evento install
//Instalacion del service worker y guarda en cache los recursos
self.addEventListener('install', e => {
    e.waitUntill(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => {
                    self.skipWaiting();
                });
        })
        .catch(err => console.log('No se ha registrado el cache', err))
    );
});

//Evento activate
// Que la app funcione sin conexión
self.addEventListener('activate', e => {
	const cacheWhitelist =[CACHE_NAME];

	e.waitUntil(
		caches.keys()
			.then(cacheNames => {
				return Promise.all(
					cacheNames.map(cacheName => {

						if(cacheWhitelist.indexOf(cacheName) === -1){
							// Borrar elementos que no se necesitan
							return caches.delete(cacheName);
						}

					})
				);
			})
		.then(() => {
			//Activar cache
			self.clients.claim();
		})
	);
});

//Evento fetch
self.addEventListener('fetch', e => {

	e.respondWith(
		caches.match(e.request)
		.then(res =>{
			if(res){
				return res;
			}
			return fetch(e.request);
		})
	);
});
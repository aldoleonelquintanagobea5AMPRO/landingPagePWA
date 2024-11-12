//nombre y versión de la caché constante
const CACHE_NAME = "v1_cache_PWA";

//ficheros a guardar en la aplicación offline
var urlsToCache = [
    './',
    './images/16x16.png',
    './images/32x32.png',
    './images/64x64.png',
    './images/96x96.png',
    './images/128x128.png',
    './images/192x192.png',
    './images/256x256.png',
    './images/384x384.png',
    './images/512x512.png',
    './images/1024x1024.png',
    './images/foto.jpg'
];

//evento para instalar
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => {
                        self.skipWaiting();
                    })
                    .catch(err => {
                        console.log('No se ha cargado la caché', err);
                    })
            })
    );
});

self.addEventListener('activate', e=>{
    //Añadir todos los elementos en la caché
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
            .then(cacheNames=>{
                return Promise.all(
                    cacheNames.map(cacheName=>{
                        if(cacheWhiteList.indexOf(cacheName)=== -1){
                            //Borra los elementos que ya no existen en la caché
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(()=>{
                //Activas cache en el dispositivo
                self.clients.claim();
            })
    );
})

self.addEventListener('fetch', e=>{
    e.respondWith(
        caches.match(e.request)
            .then(res=>{
                if(res){
                    //devuelve datos desde cache
                    return res;
                }
                return fetch(e.request);
            })
    );
})
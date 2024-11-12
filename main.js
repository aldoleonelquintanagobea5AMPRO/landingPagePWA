//Service worker

if("serviceWorker" in navigator){
    console.log("existe el Service Worker");

    navigator.serviceWorker.register('./sw.js')
        .then(res => console.log("serviceWorker cargado correctamente", res))
        .catch(err => console.log("ServiceWorker no se pudo registrar", err));
}
else{
    console.log("el serviceWorker no se pudo localizar");
}
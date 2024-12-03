if('serviceWorker' in navigator) {
    console.log('Puedes usar los serviceWorkers del navegador');

    navigator.serviceWorker.register('./sw.js')
                            .then(res => console.log('Service cargado', res))
                            .catch(err => console.log('Servide no', err))
}else {
    console.log('No puedes usar los service worker')
}

$(document).ready(function(){
    $("#menu a").click(function(e){
        //Cancela el evento si este es cancelable
        e.preventDefault();
        //Animate es un metodo de instancia crea una nueva animación
        $("html, body").animate({
            //Establece el numero de pixeles que el contenido de un elec
            //ha sido desplazado
            scrollTop: $($(this).attr('href')).offset().top
        });
        return false
    });
});
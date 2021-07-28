
$(document).ready(function(){
    // socket //
    const socket = io("localhost:2400");
    // feature 1 //
    socket.on('QR', (res) =>{(res != false) ? document.querySelector('.cd-ct img').setAttribute('src', `data:image/png;base64,${res}`) : document.querySelector('.cd-ct img').setAttribute('src', 'null');(res != false) ? document.querySelector('.cd-ct a#dl').setAttribute('href', `data:image/png;base64,${res}`) || document.querySelector('.cd-ct a#dl').classList.remove('disabled') : document.querySelector('.cd-ct a#dl').classList.add('disabled'); document.querySelector('.input-group input#qr-input').value = document.querySelector('.input-group input#qr-input').defaultValue;});
    $('.input-group button#qr-btn').click(function(){socket.emit('QR', {qr: document.querySelector('.input-group input#qr-input').value});});
    // feature 2 //
    socket.on('MAL', (res) =>{
        // const mal_p = document.querySelector('.row div#mal-r');
        if(res != false){
            const ch = (res.success == true) ? res.data : document.querySelector('.row div#mal-r').innerHTML = `<hr><div id="ntf" class="text-muted text-center" style="font-size: 14px;"><i>${res.e.message}</i></div><hr>`
            // console.log(ch)
        }else{
            document.querySelector('.row div#mal-r').innerHTML = '<hr><div id="ntf" class="text-muted text-center" style="font-size: 14px;"><i>Input kosong!.</i></div><hr>'
        }
        $(res).ready(function(){
            document.querySelector('.mb-3 input#mal-s').value = document.querySelector('.mb-3 input#mal-s').defaultValue;
            document.querySelector('.col button#mal-btn0').classList.toggle('d-none');
            document.querySelector('.col button#mal-btn1').classList.toggle('d-none');    
        })
    })
    $('.col button#mal-btn0').click(function(){
        socket.emit('MAL', {mal: document.querySelector('.mb-3 input#mal-s').value});
        document.querySelector('.col button#mal-btn0').classList.toggle('d-none');
        document.querySelector('.col button#mal-btn1').classList.toggle('d-none');
    })
})
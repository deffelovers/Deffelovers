
$(document).ready(function(){
    // socket //
    const socket = io("localhost:2400");
    // feature 1 //
    const dl = document.querySelector('.cd-ct a#dl');
    const img = document.querySelector('.cd-ct img');
    socket.on('QR', (res) =>{(res != false) ? img.setAttribute('src', `data:image/png;base64,${res}`) : img.setAttribute('src', 'null');(res != false) ? dl.setAttribute('href', `data:image/png;base64,${res}`) || dl.classList.remove('disabled') : dl.classList.add('disabled')});
    $('.input-group button').click(function(){
        const msg = document.querySelector('.input-group input');
        socket.emit('QR', {qr: msg.value});
        msg.value = msg.defaultValue;
    });
    // feature 2 //
})
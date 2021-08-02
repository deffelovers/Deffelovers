$(document).ready(function(){
    $(".input-group button#qr-btn").click(function() {
      $.get(`/api/v1/qr?text=${document.querySelector(".input-group input#qr-input").value}`, function(res) {
          document.querySelector(".input-group input#qr-input").value = document.querySelector(".input-group input#qr-input").defaultValue;
          res.success == true
            ? document
                .querySelector(".cd-ct img")
                .setAttribute("src", res.data64) ||
              document
                .querySelector(".cd-ct a#dl")
                .classList.remove("disabled") ||
              document
                .querySelector(".cd-ct a#dl")
                .setAttribute("href", res.data64)
            : document.querySelector(".cd-ct img").setAttribute("src", "null");
        });
    });
});

// $(document).ready(function(){
//     // socket //
//     const socket = io("localhost:2400");
//     // feature 1 //
//     socket.on('QR', (res) =>{(res != false) ? document.querySelector('.cd-ct img').setAttribute('src', `data:image/png;base64,${res}`) : document.querySelector('.cd-ct img').setAttribute('src', 'null');(res != false) ? document.querySelector('.cd-ct a#dl').setAttribute('href', `data:image/png;base64,${res}`) || document.querySelector('.cd-ct a#dl').classList.remove('disabled') : document.querySelector('.cd-ct a#dl').classList.add('disabled'); document.querySelector('.input-group input#qr-input').value = document.querySelector('.input-group input#qr-input').defaultValue;});
    // $('.input-group button#qr-btn').click(function(){socket.emit('QR', {qr: document.querySelector('.input-group input#qr-input').value});});
//     // feature 2 //
//     socket.on('MAL', (res) =>{
//         // const mal_p = document.querySelector('.row div#mal-r');
//         if(res != false){
//             const ch = (res.success == true) ? res.data : res.data
//             console.log(ch)
//             // ch.map(e =>{
//             //     console.log(e)
//             // })
            
//         }else{
//             document.querySelector('.row div.mal-data').innerHTML = '<hr><div id="ntf" class="text-muted text-center" style="font-size: 14px;"><i>Input kosong!.</i></div>'
//         }
//         $(res).ready(function(){
//             document.querySelector('.mb-3 input#mal-s').value = document.querySelector('.mb-3 input#mal-s').defaultValue;
//             document.querySelector('.col button#mal-btn0').classList.toggle('d-none');
//             document.querySelector('.col button#mal-btn1').classList.toggle('d-none');    
//         })
//     })
//     $('.col button#mal-btn0').click(function(){
//         socket.emit('MAL', {mal: document.querySelector('.mb-3 input#mal-s').value});
//         document.querySelector('.col button#mal-btn0').classList.toggle('d-none');
//         document.querySelector('.col button#mal-btn1').classList.toggle('d-none');
//     })
// })
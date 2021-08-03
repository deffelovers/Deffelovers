$(document).ready(function() {
  $(".input-group button#qr-btn").click(function() {
    document.querySelector(".input-group button#qr-btn i.bi").setAttribute("class", "bi bi-arrow-repeat");
    document.querySelector(".input-group button#qr-btn").classList.add('disabled');
    $.get(`/api/v1/qr?text=${document.querySelector(".input-group input#qr-input").value}`,function(res) {
      document.querySelector(".input-group input#qr-input").value = document.querySelector(".input-group input#qr-input").defaultValue;
      res.success == true ? document.querySelector(".cd-ct img").setAttribute("src", res.data64) ||
      document.querySelector(".input-group button#qr-btn").classList.remove('disabled') ||
      document.querySelector(".input-group button i.bi").setAttribute("class", "bi bi-hammer") ||
      document.querySelector(".cd-ct a#dl").classList.remove("disabled") ||
      document.querySelector(".cd-ct a#dl").setAttribute("href", res.data64) : document.querySelector(".cd-ct img").setAttribute("src", "null") ||
      document.querySelector(".input-group button i.bi").setAttribute("class", "bi bi-hammer") ||
      document.querySelector(".cd-ct a#dl").classList.add("disabled") ||
      document.querySelector(".input-group button#qr-btn").classList.remove('disabled');
    });
  });
  $(".input-group button#mal-btn").click(function(){
    document.querySelector(".input-group button#mal-btn i.bi").setAttribute("class", "bi bi-arrow-repeat");
    document.querySelector(".input-group button#mal-btn").classList.add('disabled');
    $.get(`/api/v1/mal?search=${document.querySelector(".input-group input#mal-input").value}`, function(res){
      if(res.success == true){
        let mal_d = ""
        for (let i = 0; i < res.data.length; i++) {mal_d += `<div><div class="mal-item" style="padding: 5px;"><div class="card text-white"><img src="${res.data[i].thumb}" class="card-img" alt="${res.data[i].title}"><div class="card-io"><B><i>${res.data[i].title}</i></B><hr><p><li><b>Type:</b><i>\t${res.data[i].type}</i></li><li><b>Score:</b><i>\t${res.data[i].score}</i></li><li><b>Aired:</b><i>\t${res.data[i].aired}</i></li></p></div></div></div><div class="col" style="padding-top: 10px; padding: 5px;"><a href="${res.data[i].url}" target="_blank" class="btn btn-primary" style="width: 100%; font-size: 14px;">Lihat di <b>MAL</b></a></div></div>`}
        document.querySelector('.card div.mal-data').innerHTML = mal_d
        document.querySelector(".input-group input#mal-input").value = document.querySelector(".input-group input#mal-input").defaultValue; document.querySelector(".input-group button#mal-btn i.bi").setAttribute("class", "bi bi-search");  document.querySelector(".input-group button#mal-btn").classList.remove('disabled')
      }else document.querySelector('.card div.mal-data').innerHTML = `<i class="text-muted">${res.msg}</i>`; document.querySelector(".input-group button#mal-btn i.bi").setAttribute("class", "bi bi-search"); document.querySelector(".input-group button#mal-btn").classList.remove('disabled');
    })
  })
});
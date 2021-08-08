$(document).ready(function () {
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="mal-items"]'))
  popoverTriggerList.map(function (popoverTriggerEl, i) {
    const obj_ = JSON.parse(popoverTriggerEl.getAttribute('data-bs-obj'))
    return new bootstrap.Popover(popoverTriggerEl, { trigger: 'hover', html: true, title: obj_.title, content: `<li><b>Type:</b><i> ${obj_.type}</i></li><li><b>Score Self:</b><i> ${obj_.score}</i></li><li><b>Total Eps:</b><i> ${obj_.eps}</i></li><li><b>On Watch Eps:</b><i> ${obj_.eps_watch}</i></li><li><b>Fin Watch:</b><i> ${obj_.finish_date}</i></li><li><b>End Of Date:</b><i> ${obj_.end_date}</i></li>` })
  })
})
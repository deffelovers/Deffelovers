const express = require('express')
const app = express()
const path = require('path')
const server = require('http').createServer(app)
const port = process.env.PORT || 2400
// 
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'web'))
app.use(express.urlencoded({ extended: false }))
app.use('/root', express.static(path.join(__dirname, 'web/root')))
app.use('/favicon.ico', express.static(path.join(__dirname, 'web/favicon.ico')))
// web services //
app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.get('/tools', (req, res) => {
  res.render('tools.ejs')
})

app.get('/mal', (req, res) => {
  require('request')('https://myanimelist.net/animelist/deffelovers_', (err, response, html) => {
    if (!err && response.statusCode == 200) {
      const mal_d = JSON.parse(require('cheerio').load(html)('table').attr('data-items')).map(e => {
        return {
          id: e.anime_id,
          score: e.score,
          url: e.anime_url,
          title: e.anime_title,
          eps: e.anime_num_episodes,
          end_date: e.anime_end_date_string,
          eps_watch: e.num_watched_episodes,
          finish_date: e.finish_date_string,
          type: e.anime_media_type_string + ', ' + e.anime_mpaa_rating_string,
          thumb: `https://cdn.myanimelist.net/images/${e.anime_image_path.split('/')[6]}/${e.anime_image_path.split('/')[7]}/${e.anime_image_path.split('/')[8]}`,
        }
      })
      res.render('mal.ejs', { success: true, data: mal_d })
    } else res.render('mal.ejs', { success: false, data: err })
  })
})

app.get('/projects', (req, res) => {
  res.render('projects.ejs')
})

app.get('/tes', (req, res) => {
  io.on('tes', (socket) => {
    console.log(socket)
  })
  res.render('tes.ejs')
})

// API services

app.get('/api/v1/qr', (req, res) => {
  (req.query.text == undefined || req.query.text == '') ? res.send({ success: false, msg: 'Input salah!!' }) : res.send({ success: true, data64: 'data:image/png;base64,' + require('qr-image').imageSync(req.query.text, { type: 'png' }).toString('base64') })
})

app.get('/api/v1/mal', async (req, res) => {
  (req.query.search == undefined || req.query.search == '') ? res.send({ success: false, msg: 'Metode yang digunakan salah.' }) :
  require('request')(`https://myanimelist.net/search/prefix.json?type=anime&keyword=${req.query.search}`, (err, response, html) => {
    if (!err && response.statusCode == 200){
      const mal_s = JSON.parse(html).categories[0].items.map(e =>{
        return {
          id: e.id,
          type: e.payload.media_type,
          score: e.payload.score,
          title: e.name,
          aired: e.payload.aired,
          url: e.url,
          thumb: `https://cdn.myanimelist.net/images/${e.image_url.split('/')[6]}/${e.image_url.split('/')[7]}/${e.image_url.split('/')[8]}`,
        }
      })
      res.send({ success: true, data: mal_s})
    }else res.send({ succes: false, msg:  `Gagal menghubungkan ke server ${err.hostname}` })
  })
})

app.get('/*', (req, res) => {
  res.redirect('/')
})

server.listen(port, () => {
  console.log('Server start on: http://localhost:' + port)
})
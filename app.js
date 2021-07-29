const express = require('express')
const app = express()
const path = require('path')
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: '*'}})
const port = process.env.PORT || 2400
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'web'))
app.use(express.urlencoded({extended: false}))
app.use('/root', express.static(path.join(__dirname, 'web/root')))
app.use('/favicon.ico', express.static(path.join(__dirname, 'web/favicon.ico')))
// socket.io //
io.on('connection', (socket) =>{
    console.log('user connected!: ' + socket.id)
    socket.on('QR', async(req) =>{
        const proc = (req.qr == '') ? false : qr = require('qr-image').imageSync(req.qr, {type: 'png'}).toString('base64')
        socket.emit('QR', proc)
    })
    socket.on('MAL', async(req) =>{
        const mal_d = (req.mal == '') ? false : await (axios = require('axios').get(`https://myanimelist.net/search/prefix.json?type=anime&keyword=${req.mal}`).then((res) => {return {succes: true, data: res.data.categories[0].items}}).catch((e) =>{return{succes: false, e}}))
        socket.emit('MAL', mal_d)
    })
})
// web services //
app.get('/', (req, res) =>{
    res.render('index.ejs')
})

app.get('/tools', (req, res) =>{
    res.render('tools.ejs')
})

app.get('/mal', (req, res) =>{
    require('request')('https://myanimelist.net/animelist/deffelovers_', (err, response, html) =>{
        if(!err && response.statusCode == 200){
            const mal_d = JSON.parse(require('cheerio').load(html)('table').attr('data-items')).map(e =>{
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
            res.render('mal.ejs', {success: true, data: mal_d})
        }else res.render('mal.ejs', {success: false, data: err})
    })
})

app.get('/projects', (req, res) =>{
    res.render('projects.ejs')
})

app.get('/*', (req, res) =>{
    res.redirect('/')
})

server.listen(port, () =>{
    console.log('Server start on: http://localhost:' + port)
})
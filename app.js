const express = require('express')
const app = express()
const path = require('path')
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: '*'}})
const port = process.env.PORT || 2400
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'web'))
app.use(express.urlencoded({extended: false}))
app.use('/config', express.static(path.join(__dirname, 'web')))
app.use('/favicon.ico', express.static(path.join(__dirname, 'web/favicon.ico')))
// socket.io //
io.on('connection', async(socket) =>{
    console.log(socket.id)
    socket.on('QR', async(req) =>{
        const proc = (req.qr == '') ? false : qr = require('qr-image').imageSync(req.qr, {type: 'png'}).toString('base64')
        socket.emit('QR', proc)
    })
    socket.on('MAL', async(req) =>{
        const mal_d = (req.mal == '') ? false : await (axios = require('axios').get(`https://myanimelist.net/search/prefix.json?type=anime&keyword=${req.mal}`).then((res) => {return {success: true, data: res.data.categories[0].items}}).catch((e) =>{return{succes: false, e}}))
        socket.emit('MAL', mal_d)
    })
})
// web services //
app.get('/', (req, res) =>{
    res.render('index.ejs')
})

app.get('/mal', (req, res) =>{
    require('request')('https://myanimelist.net/animelist/Deffelovers_', (error, response, html) =>{
        if(!error && response.statusCode == 200){
            const $ = require('cheerio').load(html)
            const mal_map = JSON.parse($('table').attr('data-items')).map(el =>{
                return{
                    id: el.anime_id,
                    score: el.score,
                    url: el.anime_url,
                    title: el.anime_title,
                    eps: el.anime_num_episodes,
                    eps_watch: el.num_watched_episodes,
                    thumb: `https://cdn.myanimelist.net/images/${el.anime_image_path.split('/')[6]}/${el.anime_image_path.split('/')[7]}/${el.anime_image_path.split('/')[8]}`,
                    finish_date: el.finish_date_string,
                    end_date: el.anime_end_date_string,
                    media_type: el.anime_media_type_string+', '+el.anime_mpaa_rating_string ,
                }
            })
            res.render('mal.ejs', {data: mal_map})
        }else console.log(error)
    })
})

app.get('/projects', (req, res) =>{
    res.render('projects.ejs')
})

app.get('/tools', (req, res) =>{
    res.render('tools.ejs')
})

app.get('/tes', (req, res) =>{
    res.render('tes.ejs')
})

app.get('/*', (req, res) =>{
    res.redirect('/')
})

server.listen(port, () =>{
    console.log('Server start on: http://localhost:' + port)
})
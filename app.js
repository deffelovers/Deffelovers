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
io.on('connection', (socket) =>{
    console.log(socket.handshake.headers.cookie)
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
    res.render('mal.ejs')
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
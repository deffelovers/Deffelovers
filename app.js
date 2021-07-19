const express = require('express')
const app = express()
const path = require('path')
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: '*'}})
const port = process.env.PORT || 2400
app.use('/config', express.static(path.join(__dirname, 'web')))


app.get('/', (req, res) =>{
    res.sendFile('index.html', {root: 'web'})
})

app.get('/*', (req, res) =>{
    res.redirect('/')
})

server.listen(port, () =>{
    console.log('Server start on: ' + port)
})

const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 2405;
//
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'web'))

app.get('/', (req, res) =>{
    res.render('index.ejs')
})

app.use('/config', express.static(path.join(__dirname, 'web')))

// app.get('/tes/:text', (req, res) => {
//     let text = req.params.text
//     res.send(`Text: ${text}!`)
// })

app.get('/*', (req, res) =>{
    res.redirect('/')
})

app.listen(port, () =>{
    console.log('[notHUMMAN] Virtual web: http://localhost:2405' )
})


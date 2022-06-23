const express  = require('express')
const app =express()
const productos = require('./routes/index.js')
const {engine} = require('express-handlebars')
const path = require('path')


app.use(express.json())
app.use(express.urlencoded({extended: true})) 
// app.use('/', express.static('public')) //_dirname path absoluto

app.set('view engine','hbs')
app.set('views', path.join(__dirname,'./views'))//path absoluto path.join
app.engine('hbs',engine({
    extname:".hbs",
    defaultLayout:'index.hbs',
    layoutDir:__dirname+"/views/layouts"
}))



app.use('/',productos)

app.listen(8080,()=>[
    console.log('server escuchando puerto 8080')
])
const express  = require('express')
const app =express()
const productos = require('./routes/index.js')
const path = require('path')


app.use(express.json())
app.use(express.urlencoded({extended: true})) 
// app.use('/', express.static('public')) //_dirname path absoluto

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"./views") );


app.use('/',productos)

app.listen(8080,()=>[
    console.log('server escuchando puerto 8080')
])
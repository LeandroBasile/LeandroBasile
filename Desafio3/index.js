const express  = require('express')
const app =express()
const productos = require('./routes/index.js')

app.use(express.json())
app.use(express.urlencoded({extended: true})) 
app.use('/api', express.static(__dirname+'/public')) //_dirname path absoluto


app.use('/api',productos)

app.listen(8080,()=>[
    console.log('server escuchando puerto 8080')
])
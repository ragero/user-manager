const express = require('express')
const rotasUsuario = require('../app/rotas-usuario')
const estrategiaAutenticacao = require('../app/estrategias-autenticacao')
const app = express()
const cors = require('cors')


app.use('/public', express.static('./public'))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization']
  }))

app.use((req,resp,next)=>{
    console.log('Interceptando ===================================')
    console.log(req.body)
    console.log('Headers ===================================')
    console.log(req.headers)
    next()
})

rotasUsuario(app)

module.exports = app
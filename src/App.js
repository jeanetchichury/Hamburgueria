const express = require('express')
const app = express()
const cors = require('cors')

// Importando Controllers
const pedido = require('./controller/pedido-controller')
// (OPCIONAL) Importando rota raiz
const index = require('./controller/index-controller')

// Importando o Banco de Dados SQLite
const bd = require('./infra/sqlite-db')

// Middlewares
app.use(express.json())
app.use((req, res, next)=>{
  console.log("Rodei o middleware")
  next()
})
// CORS
// Da forma que está configurado o cors, ele permite o acesso de
// qualquer origem
app.use(cors())
// É possível configurar o cors() por rota, basta colocar:
// app.verboHTTP('/caminho', cors(), callback)

// Rotas das Entidades
pedido(app,bd)
index(app)


module.exports = app
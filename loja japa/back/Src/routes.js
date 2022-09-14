const express = require('express')
const router = express.Router()

const produtos = require('./controllers/produtos')

router.get("/produtos", produtos.listarLancamentos)
router.get("/produto/:n_lancamento", produtos.listaLancamento)
router.post("/produtos", produtos.cadastrarLancamento)

module.exports = router
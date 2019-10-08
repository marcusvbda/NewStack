
var express = require('express')
var router = express.Router()
const Mailer = require("../helpers/Mailer")

router.get('/', async(req, res) => {
    let link = "http://www.loremipsum.com.br"
    let name = "Vinicius"
    let html = `
        <p>Olá <b>${name}</b>,</p>
        <p>Obrigado por cadastrar-se no <b>App</b>Name. Sua conta foi criada com sucesso e está pendente de confirmação.</p>
        <p>Para ativar sua conta basta clicar no link abaixo.</p>
        <a href="${link}" target="_BLANK">${link}</a>
        <p style="margin-top:30px">Obrigado, <b>App</b>Name</p>
    `
    await Mailer.send({subject:"Confirmação de email", to:"bda.vinicius@gmail.com",html:html},(error,info) => {
        res.json(error ? error : info)
    })
})
  
module.exports = router

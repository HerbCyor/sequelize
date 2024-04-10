const { Router } = require("express")
const Aluno = require("../models/aluno")

const routes = new Router()

routes.get("/bem_vindo", (req, res) => {
    res.send('Bem-Vindo')
})


routes.post("/alunos", async (req, res) => {
    const aluno = await Aluno.create({
        nome: "Herbert Martins Cardozo",
        data_nascimento: "1988-09-10",
        celular: "123456789"
    })
    res.json({ aluno })
})

module.exports = routes
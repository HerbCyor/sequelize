const { Router } = require("express")
const Aluno = require("../models/aluno")

const routes = new Router()

routes.get("/alunos", async (req, res) => {

    const alunos = await Aluno.findAll()
    res.json(alunos)
})


routes.post("/alunos", async (req, res) => {
    const { nome, data_nascimento, celular } = req.body

    const aluno = await Aluno.create({
        nome: nome,
        data_nascimento: data_nascimento,
        celular: celular
    })
    res.json({ aluno })
})

routes.post("/cursos", async (req, res) => {

})
module.exports = routes
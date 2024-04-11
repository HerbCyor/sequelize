const { Router } = require("express")
const Aluno = require("../models/aluno")
const Curso = require("../models/curso")

const routes = new Router()


routes.post("/alunos", async (req, res) => {
    const { nome, data_nascimento, celular } = req.body

    const novoAluno = await Aluno.create({
        nome: nome,
        data_nascimento: data_nascimento,
        celular: celular
    })
    res.json({ novoAluno })
})

routes.get("/alunos", async (req, res) => {

    const alunos = await Aluno.findAll()
    res.json(alunos)
})

routes.post("/cursos", async (req, res) => {

    const { nome, duracao_horas } = req.body

    const novoCurso = await Curso.create({
        nome: nome,
        duracao_horas: duracao_horas
    })
    res.json({ novoCurso })
})


routes.get("/cursos", async (req, res) => {

    const cursos = await Curso.findAll()
    res.json(cursos)
})


module.exports = routes
const { Router } = require('express')

const alunosRoutes = new Router()
const { auth } = require('../middlewares/auth')
const AlunoController = require('../controllers/aluno.controller')

alunosRoutes.post("/", AlunoController.cadastrarAluno)

alunosRoutes.get("/", auth, AlunoController.listarAlunos)

alunosRoutes.post('/modificarSenha', auth, AlunoController.modificarSenha)

module.exports = alunosRoutes
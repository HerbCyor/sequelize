const { Router } = require('express')
const cursosRoutes = new Router()
const { auth } = require('../middlewares/auth')

const CursoController = require('../controllers/curso.controller')

cursosRoutes.post("/", auth, CursoController.cadastrarCurso)

cursosRoutes.get("/", auth, CursoController.listarCursos)

cursosRoutes.put("/:id", CursoController.atualizarCurso)

cursosRoutes.delete("/:id", CursoController.deletarCurso)

module.exports = cursosRoutes
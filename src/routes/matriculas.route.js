const { Router } = require('express')
const { auth } = require('../middlewares/auth')
const MatriculaRoutes = new Router()
const MatriculaController = require('../controllers/matricula.controller')

MatriculaRoutes.post('/', auth, MatriculaController.cadastrarMatricula)

module.exports = MatriculaRoutes
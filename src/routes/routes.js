const { Router } = require("express")
const alunosRoutes = require('./alunos.route')
const cursoRoutes = require('./cursos.route')
const loginRoutes = require("./login.route")
const professoresRoutes = require("./professores.route")
const matriculasRoutes = require("../routes/matriculas.route")
const routes = new Router()

routes.use('/alunos', alunosRoutes)
routes.use('/cursos', cursoRoutes)
routes.use('/login', loginRoutes)
routes.use('/professores', professoresRoutes)
routes.use('/matriculas', matriculasRoutes)

module.exports = routes
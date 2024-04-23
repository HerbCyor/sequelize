const { Router } = require("express")
const professoresRoutes = new Router()
const { auth } = require('../middlewares/auth')

const ProfessorController = require('../controllers/professor.controller')

professoresRoutes.post("/", auth, ProfessorController.cadastrarProfessor)

professoresRoutes.get("/", auth, ProfessorController.listarProfessores)

professoresRoutes.put("/:id", auth, ProfessorController.atualizarProfessor
)
professoresRoutes.delete("/:id", auth, ProfessorController.deletarProfessor)

// professoresRoutes.post("/curso-professor", auth, async (req, res) => {
//     const { cursoId, professorId } = req.body

//     const curso = await Curso.findByPk(parseInt(cursoId))
//     const professor = await Professor.findByPk(parseInt(professorId))

//     if (curso && professor) {
//         CursoProfessor.create({
//             cursoId: cursoId,
//             professorId: professorId
//         })
//     }

//     res.status(201).json({
//         curso: curso.nome,
//         professores: professor.nome
//     })


// })

module.exports = professoresRoutes
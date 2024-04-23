const Matricula = require('../models/Matricula')
const Aluno = require('../models/Aluno')
const Curso = require('../models/Curso')

class MatriculaController {
    async cadastrarMatricula(req, res) {
        try {
            const curso_id = req.body.curso_id
            const aluno_id = req.body.aluno_id

            if (!curso_id || !aluno_id) {
                return res
                    .status(400)
                    .json({ message: "O ID do curso de o ID do aluno são obrigatórios." })
            }
            ///
            const curso = await Curso.findByPk(parseInt(curso_id))
            if (!curso) return res.status(404).jason({ message: "Curso não encontrado" })
            ///
            const aluno = await Aluno.findByPk(parseInt(aluno_id))
            if (!aluno) return res.status(404).jason({ message: "Aluno não encontrado" })
            ///
            const checarMatricula = Matricula.findOne({
                where: {
                    curso_id,
                    aluno_id
                }
            })

            if (checarMatricula) return res.status(400).json({ message: "Aluno já matriculado no curso" })

            const novaMatricula = await Matricula.create({
                curso_id,
                aluno_id
            })

            res.status(201).json(novaMatricula)
        } catch (error) {
            res.stauts(500).json({ message: "Matricula não processada", error: error.message })
        }

    }
}

module.exports = new MatriculaController()
const Professor = require('../models/Professor')

class ProfessorController {
    async cadastrarProfessor(req, res) {
        const { nome, salario_hora, carga_horaria } = req.body

        const novoProfessor = await Professor.create({
            nome: nome,
            salario_hora: salario_hora,
            carga_horaria: carga_horaria
        })

        res.status(201).json(novoProfessor)
    }

    async listarProfessores(req, res) {
        const professores = await Professor.findAll()
        res.status(200).json({ professores })
    }
    async atualizarProfessor(req, res) {
        const { nome, salario_hora, carga_horaria } = req.body

        if (!await Professor.findByPk(parseInt(req.params.id))) {
            return res.status(404).json({ message: "Professor não encontrado" })
        }
        await Professor.update({
            nome: nome,
            carga_horaria: carga_horaria,
            salario_hora: salario_hora
        }, {
            where: {
                id: req.params.id
            }
        })
        res.status(201).json({ message: "Professor atualizado" })
    }
    async deletarProfessor(req, res) {
        const professorId = req.params.id

        if (!await Professor.findByPk(parseInt(professorId))) {
            return res.status(404).json({ message: "Professor não encontrado" })
        }

        Professor.destroy({
            where: {
                id: professorId
            }
        })
        res.status(200).json({ message: "Deletado com sucesso" })
    }

}

module.exports = new ProfessorController()
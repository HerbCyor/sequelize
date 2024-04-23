const Curso = require('../models/Curso')
const { Op } = require('sequelize')

class CursoController {
    async cadastrarCurso(req, res) {
        try {

            const { nome, duracao_horas } = req.body
            if (!nome) {
                return res.status(400).json({
                    error: "O nome é obrigatório."
                })
            }
            if (!(duracao_horas >= 40 && duracao_horas <= 2000)) {
                return restart.status(400).json({
                    error: "A duração do curso deve ser entre 40 e 2000 horas."
                })
            }

            const novoCurso = await Curso.create({
                nome: nome,
                duracao_horas: duracao_horas
            })
            res.status(201).json({ novoCurso })

        } catch (error) {
            res.status(500).json({ error: "Não foi possível cadastrar o curso." })
        }
    }
    async listarCursos(req, res) {
        try {

            if (req.query.curso || req.query.duracao) {

                const curso = req.query.curso ? req.query.curso : "none";
                const duracao = req.query.duracao ? req.query.duracao : 0;
                // let params
                // params = {...params, nome:req.query.nome}
                // findAll(where:params)

                let cursos = await Curso.findAll({
                    where: {
                        [Op.or]: [{ nome: curso }, { duracao_horas: duracao }]
                    }
                })
                return res.json(cursos)
            }
        } catch (error) {
            console.log(error.message)
        }

        let cursos = await Curso.findAll()
        res.json(cursos)
    }
    async atualizarCurso(req, res) {

        try {
            const id = req.params.id
            const curso = req.body

            if (!nome) {
                return res.status(400).json({
                    error: "O nome é obrigatório."
                })
            }
            if (!(duracao_horas >= 40 && duracao_horas <= 2000)) {
                return restart.status(400).json({
                    error: "A duração do curso deve ser entre 40 e 2000 horas."
                })
            }

            await Curso.update(
                {
                    nome: curso.nome,
                    duracao_horas: curso.duracao_horas
                }, {
                where: {
                    id: id
                }
            }
            )
            res.status(201).json("curso atualizado com sucesso")

        } catch (error) {
            res.status(500).json({ error: "Não foi possível atualizar o curso." })
        }
    }
    async deletarCurso(req, res) {
        try {
            const id = req.params.id

            const curso = await Curso.findByPk(id)
            if (!curso) {
                return res.status(404).json({
                    message: "Curso não encontrado"
                })
            }
            await Curso.destroy({
                where: {
                    id: id
                }
            })
            res.status(200).json({
                message: "Curso deletado com sucesso."
            })
        } catch (error) {
            res.status(500).json({ error: "Não foi possível atualizar o curso." })
        }
    }
}

module.exports = new CursoController()
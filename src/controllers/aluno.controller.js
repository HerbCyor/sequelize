const Aluno = require('../models/Aluno')

class AlunoController {
    async cadastrarAluno(req, res) {

        try {
            const { nome, data_nascimento, celular, email, password } = req.body

            if (!nome) {
                return res.status(400).json({
                    error: "O nome é obrigatório"
                })
            }

            if (!data_nascimento) {
                return res.status(400).json({
                    error: "A Data de Nascimento é obrigatória"
                })
            }

            if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
                return res.status(400).json({
                    error: "A Data de Nascimento não está no formato correto"
                })

            }
            const novoAluno = await Aluno.create({
                nome,
                data_nascimento,
                celular,
                email,
                password
            })

            res.status(201).json({ novoAluno })
        } catch (error) {
            res.status(500).json({ error: "Não foi possível cadastrar o aluno." })
        }
    }
    async listarAlunos(req, res) {
        const alunos = await Aluno.findAll()
        res.status(200).json(alunos)
    }
    async modificarSenha(req, res) {
        try {
            const { password } = req.body
            const { email } = req.payload

            const aluno = await Aluno.findOne({
                where: {
                    email: email,
                    paranoid: true
                }
            })

            if (!aluno) {
                return response.status(404).json({ message: "Aluno não encontrado" })
            }

            await Aluno.update({
                password
            }, {
                where: {
                    email
                },
                individualHooks: true
            })
            res.status(200).send({ message: "Senha atualizada" })
        } catch (error) {

        }
    }
}

module.exports = new AlunoController()
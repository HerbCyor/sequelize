const { sign } = require('jsonwebtoken')
const Aluno = require('../models/Aluno')
const { compare } = require('bcryptjs')

class LoginController {
    async login(req, res) {
        try {
            const email = req.body.email
            const password = req.body.password

            if (!email) {
                return res.status(400).json({ message: "O email é obrigatório" })
            }
            if (!password) {
                return res.status(400).jason({ message: "A senha é obrigatória" })
            }
            const aluno = await Aluno.findOne({
                where: {
                    email: email

                }
            })
            if (!aluno) {
                return res.status(404).json({ error: "Usuário ou senha inválidos" })
            }

            const hashSenha = await compare(password.toString(), aluno.password)

            if (hashSenha === false) {
                return res.status(403).json({ mensagem: 'Aluno não encontrada' })
            }

            const payload = { sub: aluno.id, email: aluno.email, nome: aluno.nome }
            const token = sign(payload, process.env.JWT_SECRET)

            res.status(200).json({ Token: token })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error, message: "Login Indisponível. Tente novamente mais tarde." })
        }
    }
}

module.exports = new LoginController()
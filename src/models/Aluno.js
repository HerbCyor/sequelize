const { connection } = require("../database/connection")
const { DataTypes } = require("sequelize")
const { hash } = require('bcryptjs')

const Aluno = connection.define('alunos', {
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    nome: {
        type: DataTypes.STRING
    },
    data_nascimento: {
        type: DataTypes.DATE
    },
    celular: {
        type: DataTypes.STRING
    }

})

Aluno.beforeSave(async (aluno) => {

    aluno.password = await hash(aluno.password.toString(), 8)
    return aluno
})

module.exports = Aluno
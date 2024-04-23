const Professor = require('./professor')
const Curso = require('./curso')// relação many-to-many Professor:Curso
const { connection } = require("../database/connection")
const { DataTypes } = require('sequelize')

const CursoProfessor = connection.define('CursoProfessor', {
    cursoId: {
        type: DataTypes.INTEGER,
        references: {
            model: Curso,
            key: 'id',
        },
    },
    professorId: {
        type: DataTypes.INTEGER,
        references: {
            model: Professor,
            key: 'id',
        },
    },
})

Curso.belongsToMany(Professor, { through: 'CursoProfessor' })
Professor.belongsToMany(Curso, { through: "CursoProfessor" })

module.exports = CursoProfessor
// relação many-to-many Professor:Aluno

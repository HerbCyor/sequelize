const { Router } = require("express")
const Aluno = require("../models/aluno")
const Curso = require("../models/curso")
const { Op } = require("sequelize")
const Professor = require("../models/professor")
const CursoProfessor = require("../models/cursoprofessor")
const routes = new Router()


routes.post("/alunos", async (req, res) => {


    try {
        const { nome, data_nascimento, celular } = req.bodys

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
            nome: nome,
            data_nascimento: data_nascimento,
            celular: celular
        })

        res.status(201).json({ novoAluno })
    } catch (error) {
        res.status(500).json({ error: "Não foi possível cadastrar o aluno." })
    }



})

routes.get("/alunos", async (req, res) => {

    const alunos = await Aluno.findAll()
    res.status(200).json(alunos)
})

routes.post("/cursos", async (req, res) => {

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
})


routes.get("/cursos", async (req, res) => {
    try {

        if (req.query.curso || req.query.duracao) {

            const curso = req.query.curso ? req.query.curso : "none";
            const duracao = req.query.duracao ? req.query.duracao : 0;

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
})

routes.put("/cursos/:id", async (req, res) => {

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

})

routes.delete("/cursos/:id", async (req, res) => {

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
})

routes.post("/professores", async (req, res) => {
    const { nome, salario_hora, carga_horaria } = req.body

    const novoProfessor = await Professor.create({
        nome: nome,
        salario_hora: salario_hora,
        carga_horaria: carga_horaria
    })

    res.status(201).json(novoProfessor)
})

routes.get("/professores", async (req, res) => {
    const professores = await Professor.findAll()
    res.status(200).json({ professores })
})

routes.put("/professores/:id", async (req, res) => {
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
)
routes.delete("/professores/:id", async (req, res) => {
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

})

routes.post("/curso-professor", async (req, res) => {
    const { cursoId, professorId } = req.body

    const curso = await Curso.findByPk(parseInt(cursoId))
    const professor = await Professor.findByPk(parseInt(professorId))

    if (curso && professor) {
        CursoProfessor.create({
            cursoId: cursoId,
            professorId: professorId
        })
    }

    res.status(201).json({
        curso: curso.nome,
        professores: professor.nome
    })


})

module.exports = routes
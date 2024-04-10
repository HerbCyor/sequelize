const { Router } = require("express")

const routes = new Router()

routes.get("/bem_vindo", (req, res) => {
    res.send('Bem-Vindo')
})

module.exports = routes
const { config } = require('dotenv')
const { verify } = require('jsonwebtoken')
config()

async function auth(req, res, next) {
    try {
        const { authorization } = req.headers
        req['payload'] = verify(authorization, process.env.JWT_SECRET)
        next()
    } catch (error) {
        return res.status(401).send({
            message: 'Authorization failed',
            cause: error.message
        })
    }
}

module.exports = { auth }
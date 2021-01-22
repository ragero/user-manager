const fs = require('fs')

const validacoesUsuarios = require('./modelo-usuarios')

const ControladorUsuario = require('./controlador-usuarios')
const contoladorUsuario = new ControladorUsuario()

const passport = require('passport')
const middlewareAutenticacao = require('./middleware-autenticacao')

const multer = require('multer')
const { Console } = require('console')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/${req.body.email}`

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        const data = new Date()
        cb(null, `${data.getFullYear()}-${data.getMonth()}-${data.getDay()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

module.exports = (app) => {

    app.route(contoladorUsuario.rotas().base)
        .get(middlewareAutenticacao.bearear, contoladorUsuario.obterTodos())
        .post(upload.single('imagem'), validacoesUsuarios.validacoes(), contoladorUsuario.adicionar())
        .put(middlewareAutenticacao.bearear, upload.single('imagem'), validacoesUsuarios.validacoes(), contoladorUsuario.atualizar())

    app.route(contoladorUsuario.rotas().id)
        .get(validacoesUsuarios.validacoes()[0][0], contoladorUsuario.obter())
        .delete(middlewareAutenticacao.bearear, validacoesUsuarios.validacoes()[0][0], contoladorUsuario.remover())

    app.route(contoladorUsuario.rotas().login)
        .post(middlewareAutenticacao.local, contoladorUsuario.login())

    app.route(contoladorUsuario.rotas().logout)
        .get(middlewareAutenticacao.bearear, contoladorUsuario.logout())
}
const passport = require('passport')

module.exports = {
    local:
        (req, resp, next) => {
            passport.authenticate('local', { session: false }, (erro, usuario, info) => {
                if (erro) {
                    resp.status(401).json({ erro: 'Usuário ou senha inválido' })
                }

                if (!usuario) {
                    resp.status(401).json({ erro: 'Houve um problema na autenticação' })
                }
                req.user = usuario
                return next()
            })(req, resp, next)
        },
    bearear: (req, resp, next) => {
        passport.authenticate('bearer', { session: false }, (erro, usuario, info) => {
            if (erro) {
                resp.status(401).json({ erro: 'JWT mal formatado' })
            }
            if (!usuario) {
                resp.status(401).json({ erro: 'Requisição não autorizada' })
            }
            req.token = info.token
            req.user = usuario
            return next()
        })(req, resp, next)
    },
}
const passport = require('passport')
const BearerStrategy = require('passport-http-bearer').Strategy
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const UsuarioDao = require('./dao-usuario')
const usuarioDao = new UsuarioDao()

async function comparaSenha(senha, senhaHash) {
    const resposta = await bcrypt.compare(senha, senhaHash)
    if (resposta) {
        return resposta
    } else {
        throw new Error("Usuário ou Senha Inválidos")
    }
}

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, async (email, senha, done) => {
        try {
            console.log("Imprimindo os campos da autenticação")
            console.log('Email: ' + email)
            console.log('Senha: ' + senha)
            const usuario = await usuarioDao.getUsuario(email)
            console.log('Aqui!!!! ============')
            console.log(usuario)
            console.log(usuario[0].senha)
            console.log('Aqui!!!! ============')
            if (await comparaSenha(senha, usuario[0].senha)) {
                done(null, usuario)
            } else {
                done('errrou')
            }

        } catch (erro) {
            done(erro)
        }


    })
)

passport.use(
    new BearerStrategy(
        async (token, done) => {
            try {
                const payload = jwt.verify(token, process.env.CHAVE_JWT)
                const usuario = await usuarioDao.getUsuario(payload.id)
                done(null, usuario, {token})
            } catch (error) {
                done(error)
            }

        }
    )
)
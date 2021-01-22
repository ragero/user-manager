const { validationResult } = require('express-validator')
const UsuarioDao = require('./dao-usuario')
const usuarioDao = new UsuarioDao()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class ControladorUsuario {
    rotas() {
        return {
            base: '/usuarios',
            id: '/usuarios/:email',
            login: '/usuarios/login',
            logout: '/usuarios/logout'
        }
    }

    criaTokenJWT(usuario){
        const payload = {
            id: usuario.email
        }

        const token = jwt.sign(payload, process.env.CHAVE_JWT)

        return token 
    }

    login(){
        return (req, resp) => {
            console.log('Conferindo se o usuário setou o passaporte')
            console.log(req.user)
            const token = this.criaTokenJWT(req.user)
            console.log('Conferindo o token gerado')
            console.log(token)
            resp.setHeader('Authorization', token)
            const resposta = {user: {email:req.user[0].email, nome:req.user[0].nome}, token: token}
            console.log(resposta)
            console.log({token})
            resp.json(resposta)
        }
    }

    logout(){
        return (req,resp) => {
            const token = req.token 
            //add em uma blacklist
            resp.status(204).send()
        }
    }

    obterTodos(){
        return (req, resp) => {
            const errosVal = validationResult(req).array();
            console.log(errosVal)
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                usuarioDao.obterTodosUsuarios()
                    .then(result => resp.json(result))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    obter(){
        return (req, resp) => {
            const errosVal = validationResult(req).array();
            console.log(errosVal)
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                usuarioDao.obterUsuario(req.params.email)
                    .then(result => resp.json(result))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    adicionar() {
        return async (req, resp) => {
            console.log('imprimindo informações do arquivo')
            console.log(req.file)
            const errosVal = validationResult(req).array();
            req.body.senha = await this._gerarSenhaHash(req.body.senha)
            console.log(req.body)
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                usuarioDao.addUsuario({...req.body, file: req.file})
                    .then(result => resp.json(result))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    atualizar(){
        
        return (req,resp) => {
            const errosVal = validationResult(req).array();
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                usuarioDao.atualizarUsuario(req.body)
                    .then(result => resp.json(result))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    remover() {
        return (req, resp) => {
            const errosVal = validationResult(req).array();
            console.log(errosVal)
            if (errosVal.length != 0) {
                resp.json({ erros: errosVal })
            } else {
                usuarioDao.removerUsuario(req.params.email)
                    .then(result => resp.json(result))
                    .catch(erro => resp.json(erro))
            }
        }
    }

    async _gerarSenhaHash(senha){
        const custo = 12
        let senhaHash = ''
        senhaHash = await bcrypt.hash(senha, custo)
        console.log(senhaHash)
        return senhaHash
    }

    
}

module.exports = ControladorUsuario
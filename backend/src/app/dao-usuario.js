const con = require('../config/database')

class UsuarioDAO{
    
    constructor(){
        this.obj_erro = {status : 'erro'}
        this.obj_sucesso = {status : 'sucesso'}
    }

    getUsuario(id){ 
        return new Promise((resolve, reject) => {
            con.query(`select * from usuarios where email = "${id}";`,(erro, resultado) => {
                    if (erro) return reject(this.obj_erro);
                    return resolve(resultado);
                }
            )
        })
    }

    addUsuario(dados){
        console.log('Adicionando usuário novo')
        console.log(dados)
        console.log(`insert into usuarios (email,nome,senha,path_imagem) values ("${dados.email}","${dados.nome}", "${dados.senha}", "${dados.file.path}");`)
        return new Promise((resolve, reject) => {
            con.query(`insert into usuarios (email,nome,senha,path_imagem) values ("${dados.email}","${dados.nome}", "${dados.senha}", "${dados.file.path}");`, (erro, resultado) => {
                if (erro) return reject(this.obj_erro)
                return resolve(this.obj_sucesso)
            })
        })
    }

    obterTodosUsuarios(){
        return new Promise((resolve,reject) => {
                        
            con.query(`select * from usuarios order by nome`, (erro, resultados) => {
                if (erro) return reject(this.obj_erro)
                return resolve(resultados)
            }
        )
        })
    }

    obterUsuario(email){
        return new Promise((resolve,reject) => {
            con.query(`select * from usuarios where email = "${email}";`, (erro, resultados) => {
                if (erro) return reject(this.obj_erro)
                return resolve(resultados)
            }
        )
        })
    }

    removerUsuario(email){
        return new Promise((resolve,reject) => {
            con.query(`delete from usuarios where email = "${email}";`, (erro, resultados) => {
                if (erro) return reject(this.obj_erro)
                return resolve(resultados)
            }
        )
        })
    }

    atualizarUsuario(dados){
        let caminho_imagem = ''
        if(dados.file.path){
            caminho_imagem = dados.file.path
        }
        return new Promise((resolve, reject) => {
            con.query(`UPDATE usuarios SET email = "${dados.email}", nome = "${dados.nome}", senha = "${dados.senha}", ${caminho_imagem != '' ? 'path_imagem = ' + caminho_imagem : ''} where email = "${dados.email}"`, (erro, resultados) =>{
                if (erro) return reject(this.obj_erro)
                return resolve(resultados)
            })
        })
        
    }

}

module.exports = UsuarioDAO
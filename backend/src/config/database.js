var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root@"
});

//Função para fazer a conexão
con.connect(function(err) {
    if (err) throw err;
    console.log("Conectado ao Banco de Dados");
});

//Definindo o esquema a ser utilizado
con.query('use teste_autenticacao;', function (err, result) {
    if (err) throw err;
    console.log('use teste_autenticacao')
});
  
module.exports = con 

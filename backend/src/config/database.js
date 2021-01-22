var mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.BD_ADDRESS,
  user: process.env.BD_USER,
  password: process.env.BD_PASSWORD,
  multipleStatements: true
});

console.log(process.env.BD_ADRESS)
console.log(process.env.BD_USER)
console.log(process.env.BD_PASSWORD)

//Função para fazer a conexão
con.connect(function(err) {
    if (err) throw err;
    console.log("Conectado ao Banco de Dados");
    //Definindo o esquema a ser utilizado
    con.query(`use ${process.env.BD_SCHEMA};`, function (err, result) {
      if (err) throw err;
      console.log(`use ${process.env.BD_SCHEMA};`)
    });
});

con.end((err) => {
  if(err) {
      console.log('Erro ao fechar a conexão com o bd...', err)
      return 
  }
  console.log('A conexão com o BD foi finalizada')
})
  
module.exports = con 

// importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose() //configurei com o método verbose() o sqlite
// para que apareça as msgs do banco no terminal 

const db = new sqlite3.Database("./src/database/database.db") //Outra forma de criar um objeto,
// new inicia um outro objeto desde que o que se está sendo retornar seja um construtor/classe
 // cria o bando de dados no caminho designado

 // Exportando o arquivo do banco de dados para a possibilidade de uso da aplicação:
module.exports = db
// o module.exports consegue disponibiizar a variável db para uso de arquivos externos

 // utilizando o objeto banco de dados para as operações:

//  db.serialize(() => {
//      // com comandos SQL eu vou:

//         // crase me permite fazer quebra de linha dentro do argumento do método
//      // 1 Criar uma tabela
//         db.run(`
//             CREATE TABLE IF NOT EXISTS places (
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 image TEXT,
//                 name TEXT,
//                 address TEXT,
//                 address2 TEXT,
//                 state TEXT,
//                 city TEXT,
//                 items TEXT
//             );
     
//      `) //template-nitrous //os places são os campos da tabela

//      // 2 Inserir dados na tabela
//         // db.run(`
//         //         INSERT INTO places (
//         //             image,
//         //             name,
//         //             address,
//         //             address2,
//         //             state,
//         //             city,
//         //             items
//         //         ) VALUES (?,?,?,?,?,?,?);
//         // `)

//         const query = 
//             `INSERT INTO places (
//                 image,
//                 name,
//                 address,
//                 address2,
//                 state,
//                 city,
//                 items
//             ) VALUES (?,?,?,?,?,?,?);
//         `
//         const values = [
//             // "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
//             // "Colectoria",
//             // "Guilherme Gemballa, Jardim América",
//             // "N° 260",
//             // "Santa Catarina",
//             // "Rio do Sul",
//             // "Resíduos Eletrônicos, Lâmpadas"

//             "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
//             "Papersider",
//             "Guilherme Gemballa, Jardim América",
//             "N° 260",
//             "Santa Catarina",
//             "Rio do Sul",
//             "Resíduos Eletrônicos, Lâmpadas"
//         ]

//         function afterInsertData(err) {
//             if(err) {
//                 return console.log(err)
//             }
//              console.log("Cadastrado com sucesso")
//              console.log(this)
//         } //recebe um possível erro no cadastro
         
//         db.run(query, values, afterInsertData) //como 3° argumento é passada uma função,
//         //callback que irá rodar assim que a run terminar de rodar
        

//     // 3 Consultar os dados da tabela
//     // db.all(`SELECT name FROM places`, function(err, rows) {
//     //     if (err) {
//     //         return console.log(err)
//     //     }
//     //     console.log("Aqui estão seus registros: ")
//     //     console.log(rows)
//     //     } )

//     // 4 Deletar um dado da tabela
    // // db.run(`DELETE FROM places WHERE id = ?`, [3], function(err) {
    // //     if (err) {
    // //         return console.log(err)
    // //     }
    // //     console.log("Registro deletado com sucesso!")
    // //     })

// })
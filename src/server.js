const express = require("express") // Forma de usar o Express, estou fazendo a requisição do mesmo,
// e à armazaenando numa variável

const server = express() // A variável express recebeu uma função Express, que está sendo executada
// e atribuída ao server

// Acessando o Bando de Dados
const db = require("./database/db") // Nesse caso não precisa colocar db.js

// Configurar pasta public
server.use(express.static("public"))

// Habilitar o uso do req.body no servidor
server.use(express.urlencoded({ extended: true }))

// Utilizando template-engine Nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
}) 

// Para configurar o nunjucks devo passar 2 argumentos: a pasta onde se encontram os html, um objeto 
// (que no caso contém o nome do servidor e a opção de não usar cache, pois pode fazer a aplicação 
// apresentar bugs no desenvolvimento)

// req: Requisição
// res: Resposta

// Configurar caminhos da minha aplicação página inicial
server.get("/", (req, res) => {

    // res.send("Alo")
    // res.sendFile(__dirname + "/views/index.html") //__dirname é uma variável global já existente 
    // que guarda o nome do diretório atual.

    return res.render("index.html", {
        title: "Seu marketplace de coleta de resíduos"
    } ) 
    // antes de devolver a página em html puro, ela deve ser renderizada pela template-engine. 
    // Posso retirar o caminho anterior, à página, pois já configurei no Nunjucks.

// O segundo argumento passado é um objeto contendo um par "key" e "value", cuja a 
// "key deve corresponder à que está sendo usada no html"

})

server.get("/create-point", (req, res) => {
    // res.sendFile(__dirname + "/views/create-point.html")

    // É essa rota que recebe os dados do formulário, portanto vamos
    // enviar os dados para o banco
    
    // req.query: acesso aos Query Strings da url
    // console.log(req.query)

    return res.render("create-point.html")
})

// o método .post usa  o parâmetro POST na rota para enviar as iformações de uma maneira diferente,
// mais segura. Não deixa os dados aparecerem na url.

// server.post("/create-point") poderia ser a mesma rota de antes, mas com o POST. Mas, para treinar:
server.post("/savepoint", (req,res) => {

    // console.log(req.query) //Eu não consigo mais pegar os dados do formulário pelo req.query com o POST

    // req.body:  é o corpo do formulário
    // console.log(req.body) // por padrão o Express não está habilitado a receber o .body, o corpo da req
    // por isso dá undefined. Basta habilitar em cima

    // inserindo os dados no banco:
        const query = 
            `INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (?,?,?,?,?,?,?);
        `
        const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items //nesse caso, a vírgula final pode, só não pode no SQL
        ]

        // recebe um possível erro no cadastro:
        function afterInsertData(err) {
            if(err) {
                return console.log(err)
            }
             console.log("Cadastrado com sucesso")
             console.log(this)

            // return res.send("ok") // Agora ele retorna a confirmação de cadastro no banco só depois
            // de terminar a execução da callback.

            return res.render("create-point.html", { saved: true }) // renderizar a create-point
            // para que o modal de confirmação possa aparecer.


        }
         
        db.run(query, values, afterInsertData) //como 3° argumento é passada uma função, callback que irá 
        // rodar assim que a run terminar de rodar.


    // return res.send("ok") //no navegar aparece Cannot GET /savepoint, pois o navegador e o
    // formulário por padrão usam o GET.
})

server.get("/search", (req, res) => {
    // return res.render("search-results.html")

    // Escrevendo a lógica do formulário de pesquisa
    const search = req.query.search // Retorna as Querys da pesquisa

    // Se pesquisa estiver com campo vazio:
    if (search == "") {
        return res.render("search-results.html", { total: 0 })
    }

    // Para procurar e apresentar os dados de forma dinâmica, devemos primeiro ter acesso ao banco de dados

    // Acessando o banco:
    // db.all(`SELECT * FROM places`, function(err, rows) {
    // db.all(`SELECT * FROM places WHERE city = '${search}'`, function(err, rows) {
    // como estamos usando Query Literals, pode-se interpolar uma variável na Query,
    // bastando usar '${variável}'. Deve estar entre aspas simples para que no SQL
    // ela seja interpretada como string.

    // Utilizar o LIKE e o % dentro dos aspas permite a busca por strings que contenham a string comparada 
    // no antes ou depois.

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro de cadastro") 
            // para que a msg de erro apareça para o usuário também, não só no console.
        }
        console.log("Aqui estão seus registros: ")
        console.log(rows)

        const total = rows.length 
        //Conta a quatidade de colunas da tabela, e consequentemente quantas pontos cadastrados.

        // Monstrando a página html com os dados do banco:

        // return res.render("search-results.html", { places: rows })
        // return res.render("search-results.html", { places: rows, total: total })
        return res.render("search-results.html", { places: rows, total })
        // no JS, quando a key e o value são iguais, possa passar só um.
    })

    // return res.render("search-results.html", {places: rows}) //Aqui está fora do escopo de rows,
    // Deve-se retornar dentro da função que recebe rows.

})

// "ligando" o servidor
server.listen(3000) //listen é uma função que "ouve" a porta especificada quando o arquivo JS for executado


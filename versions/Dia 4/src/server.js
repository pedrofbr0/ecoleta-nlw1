const express = require("express") //Forma de usar o express, estou fazendo a requisição do mesmo,
// e à armazaenando numa variável

const server = express() // A variável express recebeu uma função express,
// que está sendo executada e atribuída ao server

// configurar pasta public
server.use(express.static("public"))

// utilizando template-engine Nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
}) // para configurar o nunjucks devo passar 2 argumentos: a pasta onde se encontram os
// html, um objeto (que no caso contém o nome do servidor e a opção de não usar cache, 
// pois pode fazer a aplicação apresentar bugs no desenolvimento)

// configurar caminhos da minha aplicação
// página inicial
server.get("/", (req, res) => {
    // res.send("Alo")
    // res.sendFile(__dirname + "/views/index.html") //__dirname é uma variável global
    //já existente que guarda o nome do diretório atual
    return res.render("index.html", {
        title: "Seu marketplace de coleta de resíduos"
    } ) // antes de devolver a página em html puro,
    // ela deve ser renderizada pela template-engine. Posso retirar o caminho anterior,
    // à página, pois já configurei no Nunjucks

// O segundo argumento passado é um objeto contendo um par "key" e "value", cuja a 
// "key deve corresponder à que está sendo usada no html"
})

server.get("/create-point", (req, res) => {
    // res.sendFile(__dirname + "/views/create-point.html")
    return res.render("create-point.html")
})
// req: Requisão
// res: Resposta

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

// "ligando" o servidor
server.listen(3000) //listen é uma função que "ouve" a porta especificada quando o arquivo JS for executado


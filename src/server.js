const express = require("express");
const server = express();
const database = require("./database/db.js");

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//Usando a Pasta public 
server.use(express.static("public"));

//Habilitando o uso do req.body;
server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
    return res.render("index.html", { title: "Hello World" });
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html");
})

server.post("/save-point", (req, res) => {

    const param = req.body;

    const inputQuery = `INSERT INTO places(
        name,
        image,
        cep,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?,?)`;

    const inputQueryValues = [
        param.name,
        param.image,
        param.cep,
        param.address,
        param.address2,
        param.state,
        param.city,
        param.items
    ];

    database.run(inputQuery, inputQueryValues, function (err) {
        if (err) {
            return console.log(err)
        }

        return console.log('Cadastrado com Sucesso');
    })

    console.log(req.body);
    return res.render("create-point.html", { saved: true });
})

server.get("/search", (req, res) => {

    let selectQuery;

    if (req.query.search === "") {
        selectQuery = "SELECT * FROM places WHERE city LIKE '%" + req.query.search + "%'";
    } else {
        selectQuery = "SELECT * FROM places";
    }

    database.all(selectQuery, function (err, rows) {
        if (err) {
            return console.log(err);
        }

        return res.render("search-results.html", { places: rows });
    })

})

// Porta que sera escutada no servidor
server.listen('7777');
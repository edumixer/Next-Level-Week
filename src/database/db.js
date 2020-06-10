//Importando o SQlite3
const sqlite3 = require('sqlite3').verbose();

//Colocando o Objeto do banco de dados dentro da constante
const db = new sqlite3.Database("./src/database/database.db")

db.serialize(() => {
    //Criar uma Tabele
    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            cep TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        )
    `);

    const insert = `
        INSERT INTO places(
            name,
            image,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?)
    `

    const values = [
        "Colectoria",
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1474&q=80",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos "
    ];

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }

        console.log("Cadastrado com Sucesso")
        console.log(this);
    }

    //db.run(insert, values, afterInsertData)

    // db.run(`DELETE FROM places WHERE id = ?`,[], function (err) {
    //     if (err) {
    //         return console.log(err);
    //     }

    //     console.log("Registro deletado com sucesso");
    //     console.log(this);
    // })

    // db.all(`SELECT * FROM places`, function (err, rows) {
    //     if (err) {
    //         return console.log(err);
    //     }

    //     console.log("Registros:")
    //     console.log(rows);
    // })
});

module.exports = db;



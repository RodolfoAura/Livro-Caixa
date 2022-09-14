const mysql = require('mysql');

const conDB = mysql.createConnection({
    "host": "localhost",
    "user": "root",
    "database": "loja_japa"
});

function listarLancamentos(req, res) {
    let query = "SELECT * FROM produtos";

    conDB.query(query, (err, result) => {
        if(err == null) {
            res.json(result).status(200).end();
        }else {
            res.json(err).status(400).end();
        }
    })
};

function listaLancamento(req, res) {
    let query = `SELECT * FROM produtos WHERE data = '${req.params.data_lancamento}'`;
    
    conDB.query(query, (err, result) => {
        if(err == null) {
            res.status(200).json(result).end();
        }else {
            res.status(400).json(err).end();
        }
    })
};

function cadastrarLancamento(req, res) {
    let data = new Date()
    let query = `INSERT INTO produtos VALUES (DEFAULT, '${(data.getFullYear() + "-" + ((data.getMonth() + 1)) + "-" + (data.getDate() ))}', '${req.body.descricao}', ${req.body.valor}, '${req.body.tipo}')`;
    conDB.query(query, (err, result) => {
        if(err == null) {
            res.status(201).json(req.body).end();
        }else {
            res.status(400).json(err).end();
        }
    });
};


module.exports = {
    listarLancamentos,
    listaLancamento,
    cadastrarLancamento,
}
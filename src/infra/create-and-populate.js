/*
Esse arquivo deve ser executado apenas uma vez para que a o banco seja criado e populado
*/
// Arquivo responsável por criar a tabela e popular nosso bd
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const caminhoArq = path.resolve(__dirname,'database.db')
// Importante que o caminho abaixo seja o mesmo que o indicado no arquivo
// que exporta o bd (sqlite-db.js)
const db = new sqlite3.Database(caminhoArq);

//==== Usuários
const PEDIDO_SCHEMA = `
CREATE TABLE IF NOT EXISTS "PEDIDO" (
    "ID"  INTEGER PRIMARY KEY AUTOINCREMENT,
    "CLIENTE" varchar(64)
    "DATA/HORA" datetime [default: ${now()}]
    "STATUS_PG" varchar (12)
    "item1" varchar(20)
    "qntd_item1" int
    "item2" varchar(20)
    "qntd_item2" int
    "item3" varchar(20)
    "qntd_item3" int
  );`;
  

const ADD_PEDIDO_DATA = `
INSERT INTO PEDIDO (ID, NOME, EMAIL, SENHA)
VALUES `
//     (1, 'Eugênio Oliveira', 'eugenio.oliveira@bol.com.br', '*******'),
//     (2, 'Olívia Ribeiro', 'olivia.ribeiro@gmail.com', '********'),
//     (3, 'Mirtes Faria Lima', 'mirtes_fl@yahoo.com', '********')
// `

function criaTabelaUsr() {
    db.run(PEDIDO_SCHEMA, (error)=> {
       if (error) console.log("Erro ao criar tabela de usuários");
    });
}


function populaTabelaUsr() {
    db.run(ADD_PEDIDO_DATA, (error)=> {
       if (error) console.log("Erro ao popular tabela de usuários");
    });
}
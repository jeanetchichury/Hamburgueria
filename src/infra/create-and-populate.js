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
    "CLIENTE" varchar(64),
    "DATA" datetime,
    "STATUS_PG" varchar (12),
    "ITEM1" varchar(20),
    "QNTD_ITEM1" int,
    "ITEM2" varchar(20),
    "QNTD_ITEM2" int,
    "ITEM3" varchar(20),
    "QNTD_ITEM3" int
  );`;
  
  const TRIGGER_DATA_CRIADA = `
CREATE TRIGGER IF NOT EXISTS insert_Timestamp_Trigger
    AFTER INSERT ON PEDIDO
        BEGIN
    UPDATE PEDIDO SET DATA =STRFTIME('%d-%m-%Y', 'NOW') WHERE id = NEW.id;
    END;`

const ADD_PEDIDO_DATA = `
INSERT INTO PEDIDO (CLIENTE, STATUS_PG, ITEM1, QNTD_ITEM1, ITEM2, QNTD_ITEM2, ITEM3, QNTD_ITEM3)
VALUES
    ('Wesley Danadão', 'pago', 'X-triplo', 2, 'x-bacon', 2, 'Coca-Cola 2 LT', 1),
    ('Gustavo Limão', 'aguardando pg', 'Mega-Burguer', 1, 'Coca-Cola lata', 1, '', null),
    ('Wesley Danadão', 'aguardando pg', 'X-triplo', 2, 'x-bacon', 2, 'Coca-Cola 2 LT', 1),
    ('Zé Bisneto', 'pago', 'x-salada', 1, 'suco uva greenpeople', 1, '', null),
    ('Cristian', 'no carrinho', 'X-triplo', 1, 'x-bacon', 1, 'Coca-Cola lata', 2)
`

function criaTabelaPedido() {
    db.run(PEDIDO_SCHEMA, (error)=> {
       if (error) console.log("Erro ao criar tabela de usuários. "+error);
    });
}

function editaData(){
    db.run(TRIGGER_DATA_CRIADA, (error)=>{
        if (error) console.log("Erro ao editar DATA. "+error);
    })
}

function populaTabelaPedido() {
    db.run(ADD_PEDIDO_DATA, (error)=> {
       if (error) console.log("Erro ao popular tabela de usuários. "+error);
    });
}

db.serialize( ()=> {
    criaTabelaPedido();
    editaData();
    populaTabelaPedido();
});
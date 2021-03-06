class PedidoDAO{
    constructor(bd){
        this.bd = bd
    }

    pegaTodosPedidos(){
        return new Promise((resolve, reject)=>{
            this.bd.all('SELECT * FROM PEDIDO', (error, rows)=>{
                if(error){
                    reject({
                        "mensagem" : error.message,
                        "error" : true
                    }) 
                } else{
                    resolve({
                        "pedido" : rows,
                        "count": rows.length,
                        "error" : false
                    })
                }
            })
        })  
    }

    inserePedido(novoPedido){
        return new Promise((resolve, reject)=>{
            this.bd.run(`INSERT INTO PEDIDO (CLIENTE, STATUS_PG, ITEM1, QNTD_ITEM1, ITEM2, QNTD_ITEM2, ITEM3, QNTD_ITEM3) VALUES (?,?,?,?,?,?,?,?)`,
            [novoPedido.cliente, novoPedido.status_pg, novoPedido.item1, novoPedido.qntd_item1, novoPedido.item2, novoPedido.qntd_item2, novoPedido.item3, novoPedido.qntd_item3], 
            (error)=>{
                if(error){
                    reject({
                        "mensagem" : error.message,
                        "erro" : true 
                    })
                } else {
                    resolve({
                        "requisicao" : novoPedido,
                        "erro" : false 
                    })
                }
            })
        })
    }

    pegaPedidoPorcliente(cliente){
        const SELECT_BY_CLIENTE = `
        SELECT * FROM PEDIDO
        WHERE CLIENTE = ?`
        return new Promise((resolve, reject)=>{
            this.bd.all(SELECT_BY_CLIENTE, cliente, (error, rows)=>{
                if(error){
                    reject({
                        "mensagem" : error.message,
                        "erro" : true 
                    })
                } else {
                    resolve({
                        "requisicao" : rows,
                        "erro" : false 
                    })
                }
            })
        })
    }
    
    pegaPedidoPorId(id){
        const SELECT_BY_ID = `
        SELECT * FROM PEDIDO
        WHERE ID = ?`
        return new Promise((resolve, reject)=>{
            this.bd.all(SELECT_BY_ID, id, (error, rows)=>{
                if(error) {
                    reject({
                        "mensagem" : error.message,
                        "erro" : true 
                    })
                } else {
                    resolve({
                        "requisicao" : rows,
                        "erro" : false 
                    })
                }
            })
        })
    }

    async deletaPedido(id){
        try {
            const pedido = await this.pegaPedidoPorId(id)
            if(pedido.requisicao.length){
                const DELETE = `
                DELETE FROM PEDIDO
                WHERE ID = ?`
                return new Promise((resolve, reject)=>{
                    this.bd.run(DELETE, id, (error)=>{
                        if(error){
                            reject(error.message)
                        } else {
                            resolve({
                                "mensagem" : `Usu??rio de id ${id} deletado`,
                                "erro" : false 
                            })
                        }
                    })
                })
            } else {
                throw new Error(`Usu??rio de id ${id} n??o existe`)
            }
        } catch (error) {
            throw new Error(error.message)
        }   
    }

    async atualizaPedido(id, novoPedido){
        try {
            const UPDATE = `
            UPDATE PEDIDO
            SET CLIENTE = ?, STATUS_PG = ?, ITEM1 = ?, QNTD_ITEM1 = ?, ITEM2 = ?, QNTD_ITEM2 = ?, ITEM3 = ?, QNTD_ITEM3 = ?
            WHERE ID = ?`
            return new Promise((resolve, reject)=>{
                this.bd.run(UPDATE,
                    [novoPedido.cliente, novoPedido.status_pg, novoPedido.item1, novoPedido.qntd_item1, novoPedido.item2, novoPedido.qntd_item2, novoPedido.item3, novoPedido.qntd_item3, id], 
                    (error)=>{
                    if(error){
                        reject(error)
                    } else {
                        resolve({
                            "mensagem" : `Pedido de id ${id} atualizado`,
                            "pedido": novoPedido,
                            "erro" : false 
                        })
                    }
                })
            })
        } catch (error) {
            throw new Error(error.message)
        }   
    }

    maisPedidos(){
        const soma = `
        SELECT cliente, item1, sum(qntd_item1) AS total
        FROM PEDIDO
        GROUP BY cliente
        ORDER BY total desc`
        return new Promise((resolve, reject)=>{
            this.bd.all(soma, (error, rows)=>{
                if (error){
                    reject({
                        "mensagem": error.message,
                        "error":true
                    })
                }
                else{
                    console.log(rows)
                    resolve({
                        "Os mais pedidos:" : rows,
                        "error":false
                    })
                }
            })
        })
    }
    
}



module.exports = PedidoDAO
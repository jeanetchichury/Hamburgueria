const Pedido = require('../model/Pedido')
const PedidoDAO = require('../DAO/PedidoDAO')

const pedido = (app,bd) =>{
    const novoPedidoDAO = new PedidoDAO(bd)

    app.get('/pedido', async (req, res)=> {
        try {
            const resposta = await novoPedidoDAO.pegaTodosPedidos()
            res.json(resposta)

        } catch (error) {
            res.json(error)
        }
    })

    app.get('/maisPedido', async (req, res)=> {
        try {
            const resposta = await novoPedidoDAO.maisPedidos()
            res.json(resposta)

        } catch (error) {
            res.json(error)
        }
    })

    app.post('/pedido', async (req, res)=> {
        // Usar o try-catch para pegar o erro, caso a validacao
        // do model de erro, ou outro erro apareça
        try {
            const body = req.body
            const novoPedido = new Pedido(body.cliente, body.status_pg, body.item1, body.qntd_item1, body.item2, body.qntd_item2, body.item3, body.qntd_item3)
            
            //Logica de inserção da entidade no bd
            const resposta = await novoPedidoDAO.inserePedido(novoPedido)
            res.json(resposta)
            //--------------------------------
            
        } catch (error) {
            // Resposta em caso de erro
            res.json({
                "mensagem" : error.message,
                "erro" : true 
            })
        }
                
    })

    app.get('/pedido/:cliente', async (req, res)=> {
        const cliente = req.params.cliente

        //  Logica de busca do usuário no bd
        try {
            const resposta = await novoPedidoDAO.pegaPedidoPorcliente(cliente)
            res.json(resposta)
        } catch (error) {
            res.status(404).json(error)
        }
    })

    app.delete('/pedido/:id', async (req, res)=> {
        const id = parseInt(req.params.id)
        try {
            const resposta = await novoPedidoDAO.deletaPedido(id)
            res.json(resposta)
        } catch (error) {
            res.status(404).json({
                "mensagem" : error.message,
                "erro" : true
            })
        }
    })

    app.put('/pedido/:id', async (req, res)=>{
        const id = req.params.id
        const body = req.body

        // Logica de atualizaçao da entidade no bd
        try {
            const respostaGet = await novoPedidoDAO.pegaPedidoPorId(id)
            const pedidoAntigo = respostaGet.requisicao[0]
            
            if(pedidoAntigo){
                console.log(pedidoAntigo)
                const pedidoAtualizado = new Pedido (
                    body.cliente || pedidoAntigo.CLIENTE,
                    body.status_pg || pedidoAntigo.STATUS_PG,
                    body.item1 || pedidoAntigo.ITEM1,
                    body.qntd_item1 || pedidoAntigo.QNTD_ITEM1,
                    body.item2 || pedidoAntigo.ITEM2,
                    body.qntd_item2 || pedidoAntigo.QNTD_ITEM2,
                    body.item3 || pedidoAntigo.ITEM3,
                    body.qntd_item3 || pedidoAntigo.QNTD_ITEM3,
                )
                const resposta = await novoPedidoDAO.atualizaPedido(id, pedidoAtualizado)
                res.json(resposta)               
            } else {
                res.json({
                    "mensagem": `Pedido com id "${id}" não existe`,
                    "error" : true
                })
            }
        } catch (error) {
            res.json({
                "mensagem" : error.message,
                "error" : true
            })
        }
    })
    
}

module.exports = pedido
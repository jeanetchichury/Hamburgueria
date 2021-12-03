const index = (app)=>{
    
    app.get('/', (req, res)=> {
        console.log("Cheguei na rota")
        res.send(`<h1>Bem vindo a Hamburgueria Resiliente, o hamburguer que se adapta à sua fome!</h1>
                <p>Acesse o repositório https://github.com/jeanetchichury/Hamburgueria</p>`)
    })
}

module.exports = index
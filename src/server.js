import express from "express"

const app = express()
app.use(express.json())
const PORT = 5000


// Criar tres rotas : 
// Rota Publica 1- Cadastrar Usuario - Rota Publica 2-Logar Usuario  
// Rota Privada 3- Listar Usuarios - Rota Privada 

app.listen(PORT, () => {
    console.log(`O servidor esta rodando na PORTA: ${PORT}`)
})
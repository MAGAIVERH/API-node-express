import express from "express"

import publicRoutes from "./routes/public.js"
import privateRoutes from "./routes/private.js"
import auth from "../middlewares/auth.js"

const app = express()
app.use(express.json())
const PORT = 5000


// Criar tres rotas : 
// Rota Publica 1- Cadastrar Usuario - Rota Publica 2-Logar Usuario 
app.use('/', publicRoutes) 


// Rota Privada 3- Listar Usuarios - Rota Privada 
app.use('/', auth,  privateRoutes)

app.listen(PORT, () => {
    console.log(`O servidor esta rodando na PORTA: ${PORT}`)
})
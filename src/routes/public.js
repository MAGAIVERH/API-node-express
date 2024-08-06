import express from "express"
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()
const router = express.Router()


// Rota Cadastro
router.post('/cadastro', async (req, res) => {
   
    try { 
        const user = req.body

        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(user.password , salt)

        const usersDB = await prisma.user.create({
        data: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: hashpassword,
        }
    })

    return res.status(201).json(usersDB)

    } catch (error) {
       res.status(500).json({ message: "Erro no serbidor, tente novamente..."})
    }
  
})
// Rota Login

export default router;
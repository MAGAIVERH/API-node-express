import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()
const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET


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
       return res.status(409).json({ message: "E-mail já existente, tente novamente com outro email."})
    }
})


// Rota Login
router.post('/login', async (req, res) => {
    try {
        const userInfo = req.body

        // Busca o usuario no banco de dados
        const user = await prisma.user.findUnique({
             where: 
             {email : userInfo.email}
            })

        // Verifica se o usuario existe no banco de dados
        if(!user) {
            return res.status(404).json({message: "E-mail não encontrado."})
        }

        const isMatch = await bcrypt.compare(userInfo.password, user.password)

        // Compara a senha do banco com a que o usuario digitou.
        if(!isMatch){
            return res.status(400).json({ message: "Senha Incorreta, tente novamente."})
        }

        // Gerar o token jwt (jsonwebtoken)
        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '2m'})

        return res.status(200).json(token)


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error no servidor, tente novamente!"})
    }


})

export default router;
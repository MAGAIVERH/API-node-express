import express from "express"
import { PrismaClient } from "@prisma/client";

const router = express.Router()
const prisma = new PrismaClient()

router.get('/listar-usuarios', async (req, res) => {
  try {
    
    const users = await prisma.user.findMany()

    return res.status(200).json({ message: "Usuarios encontrados com sucesso!!!", users})
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error do servidor."})
  }
})



export default router;
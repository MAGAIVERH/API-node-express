import express from "express"

const router = express.Router()
// Rota Cadastro
router.post('/cadastro', (req, res) => {
    const user = req.body

    return res.status(200).json({message: "Cadastro Feito com Sucesso!!!"})
})
// Rota Login

export default router;
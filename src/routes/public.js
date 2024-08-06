import express from "express"

const router = express.Router()
// Rota Cadastro
router.post('/cadastro', (req, res) => {
    const user = req.body

    return res.status(201).json(user)
})
// Rota Login

export default router;
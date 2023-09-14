const { Router } =require('express')

const router = Router()

//Crear Usuario
router.post('/new', (req, res) => {
    return res.json({
        ok: true,
        msg: 'Crear Usuario'
    })
})

//Login
router.post('/', (req, res) => {
    return res.json({
        ok: true,
        msg: 'Login'
    })
})

//Validar Token
router.post('/renew', (req, res) => {
    return res.json({
        ok: true,
        msg: 'Renovar'
    })
})


module.exports = router
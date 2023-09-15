const { Router } =require('express')
const { crearUsuario, login, renewToken } = require('../controller/auth')
const { check } = require('express-validator')
const { validar } = require('../middlewares/validar')
const { validarJwt } = require('../middlewares/validarjwt')

const router = Router()

//Crear Usuario
router.post('/new', [
    check('name', 'El nombre es obligatorio').isString(), 
    check('email', 'El Email es obligatorio').isEmail(), 
    check('password', 'El Password es obligatorio').isLength({min:6}),
    validar
], crearUsuario)

//Login
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(), 
    check('password', 'La contraseña es obligatoria').isLength({min:6}),
    validar
] ,login)

//Validar Token
router.get('/renew', validarJwt, renewToken)


module.exports = router
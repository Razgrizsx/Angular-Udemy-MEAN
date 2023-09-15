const {response, request} = require('express')
const  User  = require('../models/User')
const bcrypt = require('bcryptjs')
const {genJwt} = require('../helpers/jwt')

const crearUsuario = async (req = request, res = response) => {
    const {name,email,password} = req.body

    try {
        //Verificar Email
        let user = await User.findOne({
            email: email
        })
        if(user){
            return res.status(400).json({msg: 'Usuario ya esxiste'})
        }

        //Crear Usuario

        const dbUser = new User( req.body)

        //Hashear contraseña

        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt)

        //Generar JWT

        const token = await genJwt(dbUser.uid, name)

        //Guardar Usuario

        await dbUser.save()

        //Generar Respuesta
        return res.status(200).json({uid: dbUser.id, name, token})
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador"
        })
    }
}

const login = async (req = request, res = response) => {
    const {email, password} = req.body
    try {
        const dbUser = await User.findOne({email})

        if(!dbUser){
            res.status(400).json({
                msg: "Correo o contraseña incorrectas1"
            })
        }

        const validPass = bcrypt.compareSync(password, dbUser.password)

        if(!validPass){
            res.status(400).json({
                msg: "Correo o contraseña incorrectas2"
            })
        }else{
            const token = await genJwt(dbUser.uid, dbUser.name)
            return res.status(200).json({
                token,
                name: dbUser.name
            })
        }

    } catch (error) {
       return res.status(400).json({
        msg: "Hable con el Administrador"
       })
    }
}

const renewToken = (req = request, res = response) => {
    const {uid, name} = req
    return res.json({
        uid, name
    })
}


module.exports = {
    crearUsuario,
    login,
    renewToken
}
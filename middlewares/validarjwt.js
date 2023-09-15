const { response, request } = require("express");
const jwt = require('jsonwebtoken')

const validarJwt = (req= request, res= response, next) => {

    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            msg: "Token Error"
        })
    }
    try {
       const {uid, name} = jwt.verify(token, process.env.SECRET_JWT)
       req.uid = uid
       req.name = name

    } catch (error) {
        return res.status(401).json({
            msg:"Token no Valido"
        })
    }
    next()
}


module.exports = {
    validarJwt
}
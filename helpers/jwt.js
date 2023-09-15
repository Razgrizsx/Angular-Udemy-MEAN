const jwt = require('jsonwebtoken')

const genJwt = (uid, name) => {
    const payload = {
        uid,
        name
    }

    return new Promise((res, rej) => {
        jwt.sign(payload, process.env.SECRET_JWT, {
        expiresIn: '24h'
    }, (err, token) => {
        if(err){
            console.log(err)
            rej(err)
        }else{
            res(token)
        }
    })
    })   
}

module.exports = {
    genJwt
}
const mongoose = require('mongoose')

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology:true
        })
        console.log('Mongo Online')

    } catch (error) {
        console.log(error)
        throw new Error('Error inicializando Mongo')
    }
}

module.exports = {
    db
}
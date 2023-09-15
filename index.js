const express = require('express')
const cors = require('cors')
require('dotenv').config()
const {db} = require('./db/config')

//Crear Servidor

const app = express()

//Database
db()

//Directorio Publico
app.use( express.static('public') )

//CORS
app.use(cors())

//Parseo
app.use(express.json())

//Socket
app.listen(4000, ( ) => {console.log(`Servidor corriendo en puerto ${4000}`)})

//Rutas
app.use('/api/auth', require('./routes/auth'))
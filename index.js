const express = require('express')


//Crear Servidor

const app = express()

//Socket
app.listen(4000, ( ) => {console.log(`Servidor corriendo en puerto ${4000}`)})

//Rutas
app.use('/api/auth', require('./routes/auth'))
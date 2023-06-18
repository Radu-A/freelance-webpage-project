const express = require('express');
const app = express()
const port = 3000

// Módulos de Rutas
const indexRoute= require('/routes/indexRoutes');

// Template engine
app.set('view engine', 'pug');
app.set('views', './views');

// Middlewares
app.use(express.json()); // Habilitar tipo de dato a recibir
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));

//Public folder
app.use(express.static('public'))

// Docummentando con swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Rutas 
app.use('/',indexRoute); //  Vista de inicio de la app

app.use(error404); // Middleware Para ruta no encontrada (404)

const server = app.listen(port, () => {
    console.log(`****Conected in port ${port}`)
})

module.exports = server;

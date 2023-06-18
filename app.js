const express = require('express');
const app = express();
const port = 3000;

// DDBB conection
require("./utils/db_mongo");

// Módulos de Rutas
const indexRoutes = require('./routes/indexRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Template engine
app.set('view engine', 'pug');
app.set('views', './views');

// Middlewares
app.use(express.json()); // Habilitar tipo de dato a recibir
app.use(express.urlencoded({ extended: true }));

//Public folder
app.use(express.static('public'));

//Rutas 
app.use('/',indexRoutes); //  Vista de inicio de la app
app.use('/api/',apiRoutes);


const server = app.listen(port, () => {
    console.log(`****Conected in port ${port}`);
})

module.exports = server;

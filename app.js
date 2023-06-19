const express = require('express');
const jwt = require("jsonwebtoken");
const passport = require("passport");
const logger = require("./utils/morgan");
const session = require("express-session");
require("./utils/auth.js");

// Initialize server
const app = express();
const port = 3000;

//Passport and session
app.use(session({
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// DDBB conection
require("./utils/db_mongo");

// Módulos de Rutas
const indexRoutes = require('./routes/indexRoutes');
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');

// Template engine
app.set('view engine', 'pug');
app.set('views', './views');

// Middlewares
app.use(express.json()); // Habilitar tipo de dato a recibir
app.use(express.urlencoded({ extended: true }));
app.use(logger(':method :host :status :param[id] - :response-time ms :body'));

//Public folder
app.use(express.static('public'));

//Rutas 
app.use('/',indexRoutes); // Vista de inicio de la app
app.use('/api/',apiRoutes);
app.use('/',authRoutes);


const server = app.listen(port, () => {
    console.log(`****Conected in port ${port}`);
})

module.exports = server;

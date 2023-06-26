const express = require('express');
const jwt = require("jsonwebtoken");
const passport = require("passport");
//const logger = require("./utils/morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("./utils/auth.js");
require("dotenv").config();
const error404 = require('./middlewares/error404');


// Initialize server
const app = express();
const port = 3000;

//Passport and session
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// DDBB conection
require("./utils/db_mongo");

// Módulos de Rutas
const viewsRoutes = require('./routes/viewsRoutes');
const projectsApiRoutes = require('./routes/projectsApiRoutes');
const usersApiRoutes = require('./routes/usersApiRoutes');
const authRoutes = require('./routes/authRoutes');

// Template engine
app.set('view engine', 'pug');
app.set('views', './views');


// Middlewares
app.use(express.json()); // Habilitar tipo de dato a recibir
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //Better access to cookies
//app.use(logger(':method :host :status :param[id] - :response-time ms :body'));

//Public folder
app.use(express.static('public'));

//Rutas 
app.use('/',viewsRoutes); // App views
app.use('/api/projects',projectsApiRoutes); // Project routes
app.use('/api/users',usersApiRoutes); // Users routes
app.use('/',authRoutes); // Passport + Google routes

app.use(error404);

const server = app.listen(port, () => {
    console.log(`****Conected in port ${port}`);
})

module.exports = server;

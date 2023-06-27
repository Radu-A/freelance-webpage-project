const express = require('express');
const authRouter = express.Router();
const authController = require ('../controllers/authController');
const authMiddleware = require("../middlewares/authMiddleware");


//GOOGLE - PASSPORT OAUTH
//Ruta que renderiza el prompt de Google con las cuentas
authRouter.get("/auth/google",authController.promptGoogleAccounts);
//Esta ruta tiene dos funciones, la primera es en caso de fallo nos redirecciona a /auth/failure, y la segunda, en caso de éxito realiza la función siguiente.
authRouter.get("/google/callBack", authController.redirectBecauseOfFailure, authController.createAndStoreTokenViaGoogle);
//Definimos una ruta en caso de que la autenticación falle.
authRouter.get('/auth/failure', authController.notifyOfAuthFailure);
//Definimos la ruta de logout, donde eliminamos la sesión y limpiamos el token de las cookies.
authRouter.get('/logout', authMiddleware.authCheck, authController.destroySessionAndClearCookies);

//EMAIL AND PASSWORD - PASSPORT OAUTH 
authRouter.post("/auth/login", authMiddleware.checkEmailLogIn, authController.createAndStoreTokenViaEmail);
authRouter.post("/auth/signup", authMiddleware.signUpUser, authController.createAndStoreTokenViaEmail);

module.exports = authRouter
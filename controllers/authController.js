const passport = require('passport');
const jwt = require("jsonwebtoken");
require("dotenv").config();
let jwtSecret = process.env.JWT_SECRET;
let users = require("../models/users");



//Esta ruta tiene dos funciones, la primera es en caso de fallo nos redirecciona a /auth/failure, y la segunda, en caso de éxito realiza la función siguiente.
const promptGoogleAccounts = passport.authenticate("google", { scope: ['email', 'profile'], prompt: "select_account" });

//Función de fallo
const redirectBecauseOfFailure = passport.authenticate('google', { failureRedirect: '/auth/failure' });


//Función exitosa
const createAndStoreToken = (req,res)=>{
    // Because the user is logging in, we have to change the user state in the table "users": 
    users.changeUserState(req.user.email);

    //En el cuerpo de esta función podemos almacenar usuarios en nuestra bbdd con el objeto que nos proporciona req.user (Para ello es necesario hacer la función asíncrona)

    //Estos son los pasos para crear un token si la autenticación es exitosa
    const payload = {
        //save here data
        check: true,
        email: req.user.email
    };
    
    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: "20m"
    });

    //Almacenamos el token en las cookies
    res.cookie("access-token", token, {
        httpOnly: true,
        sameSite: "strict",
    }).redirect("/");
}

//Authentification failure
const notifyOfAuthFailure = (req, res) => {
    res.send('Something went wrong..')
}

//Destroy session and clear cookies
const destroySessionAndClearCookies = (req, res) => {
    // Now we have to change the user state because he is logging out:
    let email = req.decoded.email;
    users.changeUserState(email);

    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.clearCookie("access-token").redirect('/login');
    });
}




module.exports = {
    promptGoogleAccounts,
    redirectBecauseOfFailure,
    createAndStoreToken,
    notifyOfAuthFailure,
    destroySessionAndClearCookies
}
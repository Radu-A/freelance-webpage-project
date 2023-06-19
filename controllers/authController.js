const passport = require('passport');
const jwt = require("jsonwebtoken");



//Esta ruta tiene dos funciones, la primera es en caso de fallo nos redirecciona a /auth/failure, y la segunda, en caso de éxito realiza la función siguiente.
const promptGoogleAccounts = passport.authenticate("google", { scope: ['email', 'profile'], prompt: "select_account" });

//Función de fallo
const redirectBecauseOfFailure = passport.authenticate('google', { failureRedirect: '/auth/failure' });


//Función exitosa
const createAndStoreToken = (req,res)=>{
    //En el cuerpo de esta función podemos almacenar usuarios en nuestra bbdd con el objeto que nos proporciona req.user (Para ello es necesario hacer la función asíncrona)
  
    //Estos son los pasos para crear un token si la autenticación es exitosa
    const payload = {
        //save here data
        check: true
    };
    const token = jwt.sign(payload, `secret_key`, {
        expiresIn: "20m"
    });
  
    //Almacenamos el token en las cookies
    res.cookie("access-token", token, {
        httpOnly: true,
        sameSite: "strict",
    }).send("Welcome! You are now authenticated with google! <br><br> <a href='/logout'>Click here to logout!</a>");
}

//Authentification failure
const notifyOfAuthFailure = (req, res) => {
    res.send('Something went wrong..')  
}

//Destroy session and clear cookies
const destroySessionAndClearCookies = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.clearCookie("access-token").send('Goodbye! <br><br> <a href="/auth/google">Authenticate again</a>');
    });
}




module.exports = {
    promptGoogleAccounts,
    redirectBecauseOfFailure,
    createAndStoreToken,
    notifyOfAuthFailure,
    destroySessionAndClearCookies
}
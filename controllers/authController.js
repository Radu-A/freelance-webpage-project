const passport = require('passport');
const jwt = require("jsonwebtoken");
require("dotenv").config();
let users = require("../models/users");
const transporter = require('../utils/nodemailer');
const regex = require('../utils/regex');
const bcrypt = require('bcrypt');
let jwtSecret = process.env.JWT_SECRET;
let domain = process.env.DOMAIN;
const saltRounds = 10;

//GOOGLE OAUTH
//Esta ruta tiene dos funciones, la primera es en caso de fallo nos redirecciona a /auth/failure, y la segunda, en caso de éxito realiza la función siguiente.
const promptGoogleAccounts = passport.authenticate("google", { scope: ['email', 'profile'], prompt: "select_account" });

//Función de fallo
const redirectBecauseOfFailure = passport.authenticate('google', { failureRedirect: '/auth/failure' });

//Función exitosa
const createAndStoreTokenViaGoogle = (req,res)=>{
    //En el cuerpo de esta función podemos almacenar usuarios en nuestra bbdd con el objeto que nos proporciona req.user (Para ello es necesario hacer la función asíncrona)

    //Estos son los pasos para crear un token si la autenticación es exitosa
    const payload = {
        //save here data
        check: true,
        email: req.user.email
    };
    
    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: "365d"
    });

    //Almacenamos el token en las cookies
    res.status(201).cookie("access-token", token, {
        httpOnly: true,
        sameSite: "lax"
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
    users.logInUserFalse(email);

    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.clearCookie("access-token").redirect('/login');
    });
}


//EMAIL AND PASSWORD AUTH
const createAndStoreTokenViaEmail = (req,res)=>{
    //En el cuerpo de esta función podemos almacenar usuarios en nuestra bbdd con el objeto que nos proporciona req.user (Para ello es necesario hacer la función asíncrona)

    //Estos son los pasos para crear un token si la autenticación es exitosa
    const payload = {
        //save here data
        check: true,
        email: req.user.email
    };
    
    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: "365d"
    });

    //Almacenamos el token en las cookies
    res.status(201).cookie("access-token", token, {
        httpOnly: true,
        sameSite: "lax"
    }).json({"success": true, "msj":"Welcome, you are logged in"});
}


//RECOVER - RESET PASSWORD
const recoverPassword = async(req, res) => {
    try {
        const recoverToken = jwt.sign({email: req.params.email}, jwtSecret, {expiresIn: '60m'});
        const url = domain + `/resetpassword/` + recoverToken;
        await transporter.sendMail({
            to: req.params.email,
            subject: 'Recover Password',
            html: `<h3>Recover Password</h3>
                <a href = ${url}>Click to recover password</a>
                <p>Link will expire in 60 minutes</p>`
        });
        res.status(200).json({"success": true, "msj":'A link for reset your password has been send to your email'})
    } catch (error) {
        console.log('Error:', error)
        res.status(400).json({"success": false, "msj":'Something went wrong...'});
    }
};

const resetPassword = async(req, res) => {
    try {
        const recoverToken = req.headers.token;
        console.log("reseting password")
        const payload = jwt.verify(recoverToken, jwtSecret);
        const password = req.body.password;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        await users.updateUserPassword(payload.email, hashPassword);
        res.status(200).json({"success": true, "msj":'Password actualized'});
    } catch (error) {
        console.log('Error:', error);
        res.status(400).json({"success": false, "msj":'Something went wrong...'});
    }
}




module.exports = {
    promptGoogleAccounts,
    redirectBecauseOfFailure,
    createAndStoreTokenViaGoogle,
    notifyOfAuthFailure,
    destroySessionAndClearCookies,
    createAndStoreTokenViaEmail,
    recoverPassword,
    resetPassword
}
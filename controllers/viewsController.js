const users = require("../models/users");

// GETs
const getIndexView = (req,res) => {
    try {
        
        res.render("index.pug");
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

const getSignUpView = (req,res) => {
    try {
        // check if user is logged in 
        res.render("signup.pug");
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

const getLoginView = (req,res) => {
    try {
        // check if user is logged in 
        // Authentification needs something to be added to "login.pug" : <h1>Sign in</h1> <a class="button google" href="/api/login/federated/google">Sign in with Google</a>
        res.render("login.pug"); 
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

const getFavsView = async(req,res) => {
    try {
        // check if user is logged in
        res.render("favs.pug");
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

const getProfileView = async (req,res) => {
    try {
        // the user email is passed from the "authCheck" Middleware in the request (req.decoded.email);
        console.log("print email", req.decoded)
        let userEmail = req.decoded.email; // Depends on login

        // check if user is logged in 
        let data = await users.getUserByEmail(userEmail);
        console.log(data);
        res.render("profile.pug",{"userInfo": data});
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

const getRecoverPasswordView = async (req, res) => {
    try {
        res.render("recoverPassword.pug");
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

const getResetPasswordView = async (req, res) => {
    try {
        res.render("resetPassword.pug");
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}
 
const getUsersView = (req,res) => {
    //ADMIN exclusive
    try {
        // check if ADMIN is logged in
        res.render("users.pug");
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

const getDashboardView = (req,res) => {
    //ADMIN exclusive
    try {
        // check if ADMIN is logged in
        res.render("dashboard.pug");
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};


module.exports = {
    getIndexView,
    getSignUpView,
    getLoginView,
    getFavsView,
    getProfileView,
    getRecoverPasswordView,
    getResetPasswordView,
    getUsersView,
    getDashboardView
}
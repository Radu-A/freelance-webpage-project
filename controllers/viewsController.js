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
        // Some function that gets User id when logged in (user_id)
        let user_id = 7; // Depends on login
        console.log("profile.pug - rendered")
        // check if user is logged in 
        let data = await users.getUsersById(user_id);

        res.render("profile.pug",{"userInfo": data});
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};
 
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
    getProfileView ,
    getUsersView,
    getDashboardView
}
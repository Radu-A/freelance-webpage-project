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
        // Authentification needs to be added to "login.pug" : <h1>Sign in</h1> <a class="button google" href="/api/login/federated/google">Sign in with Google</a>
        res.render("login.pug"); 
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

const getFavsView = (req,res) => {
    try {
        // check if user is logged in 
        res.render("favs.pug");
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

const getProfileView = (req,res) => {
    try {
        // check if user is logged in 
        res.render("profile.pug");
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};
/* 
const getUsersView = () => {
    //ADMIN exclusive
    try {
        // check if ADMIN is logged in
        res.render("users.pug");
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

const getDashboardView = () => {
    //ADMIN exclusive
    try {
        // check if ADMIN is logged in
        res.render("dashboard.pug");
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

 */
module.exports = {
    getIndexView,
    getSignUpView,
    getLoginView,
    getFavsView,
    getProfileView/* ,
    getUsersView,
    getDashboardView */
}
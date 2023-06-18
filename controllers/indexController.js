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
        res.render("signup.pug");
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

const getLoginView = (req,res) => {
    try {
        res.render("login.pug");
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

const getFavsView = (req,res) => {
    try {
        res.render("favs.pug");
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

const getProfileView = (req,res) => {
    try {
        res.render("profile.pug");
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};


module.exports = {
    getIndexView,
    getSignUpView,
    getLoginView,
    getFavsView,
    getProfileView
}
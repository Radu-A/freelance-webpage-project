const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const users = require("../models/users");

//Check if google user is in the data base; if not, add it.
async function addGoogleUserToDDBB(profile){
  let {sub, given_name, family_name, email, picture} = profile._json;
  users.getUserByEmail(email).then(user => {
    //Check if user exists in DDBB
    console.log("DATA BASE",user)
    if(user[0]){
      console.log("User already exists in DDBB");
      console.log(email, null, given_name+sub, false, given_name, family_name)
    } else {
      console.log("Adding new user into data base");
      // users.createUser(email, password, user_name, admin, firstname, surename);
      users.createUser(email, "not_needed/GoogleOAuth", given_name+sub, false, given_name, family_name);
    }
  })
}

//Establecemos la estrategia de Google con los credenciales de nuestro proyecto
passport.use(new GoogleStrategy({
    clientID: `${process.env.CLIENT_ID}`,
    clientSecret: `${process.env.CLIENT_SECRET}`,
    callbackURL: `http://localhost:3000/google/callBack`,
    proxy: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    addGoogleUserToDDBB(profile);
    return done(null, profile);
  }
));

//Esta función determina los datos que se van a guardar en la sesión de google: user
passport.serializeUser(function (user, done) {
    done(null,user)
});
//Determina que objeto borrar de la sesión: user
passport.deserializeUser(function (user, done) {
    done(null,user)
});
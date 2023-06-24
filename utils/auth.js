const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const users = require("../models/users");

//Check if google user is in the data base; if not, add it.
async function addGoogleUserToDDBB(profile, done){
  let {sub, given_name, family_name, email, picture} = profile;
  users.getUserByEmail(email).then(user => {
    //Check if user exists in DDBB
    if(user){
      console.log("User already exists in DDBB");
      done(null, user);
    } else {
      console.log("Adding new user into data base");
      // users.createUser(email, password, user_name, admin, firstname, surename);
      users.createUser(email, "not_needed/GoogleOAuth", given_name+sub, false, given_name, family_name);
      let newUser = {
        "email": email,
        "password": "not_needed/GoogleOAuth",
        "user_name": `${given_name}${sub}`,
        "admin": false,
        "firstname": given_name,
        "surename": family_name
      }
      done(null, newUser);
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
    let user = profile._json;
    addGoogleUserToDDBB(user, done);
    return done(null, user);
  }
));

//Esta función determina los datos que se van a guardar en la sesión de google: user
passport.serializeUser((user, done) => {
  console.log("Serialize user: ",user);
  done(null,user);
});
//Determina que objeto borrar de la sesión: user
passport.deserializeUser(async(user, done) => {
  console.log("Deserialize user: ",user);
  done(null,user);
});
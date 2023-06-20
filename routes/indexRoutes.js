const express = require('express');
const indexRouter = express.Router();
const indexController = require ('../controllers/indexController');

//GETs
// Users and admin
indexRouter.get("/", indexController.getIndexView);
indexRouter.get("/user", indexController.getIndexView);
indexRouter.get("/signup", indexController.getSignUpView);
indexRouter.get("/login", indexController.getLoginView);
indexRouter.get("/favs", indexController.getFavsView);
indexRouter.get("/profile", indexController.getProfileView);
// Admin
/* indexRouter.get("/users", indexController.getUsers);
indexRouter.get("/dashboard", indexController.getDashboard); */

module.exports = indexRouter;
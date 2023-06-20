const express = require('express');
const viewsRouter = express.Router();
const viewsController = require ('../controllers/viewsController');

//GETs
// Users and admin
viewsRouter.get("/user", viewsController.getIndexView);
viewsRouter.get("/signup", viewsController.getSignUpView);
viewsRouter.get("/login", viewsController.getLoginView);
viewsRouter.get("/favs", viewsController.getFavsView);
viewsRouter.get("/profile", viewsController.getProfileView);
// Admin
/* indexRouter.get("/users", viewsController.getUsersView);
indexRouter.get("/dashboard", viewsController.getDashboardView); */

module.exports = viewsRouter;
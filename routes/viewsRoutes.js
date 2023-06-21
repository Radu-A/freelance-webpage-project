const express = require('express');
const viewsRouter = express.Router();
const viewsController = require ('../controllers/viewsController');

//GETs
// Users and admin
viewsRouter.get("/", viewsController.getIndexView);
viewsRouter.get("/signup", viewsController.getSignUpView);
viewsRouter.get("/login", viewsController.getLoginView);
viewsRouter.get("/favs", viewsController.getFavsView);
viewsRouter.get("/profile", viewsController.getProfileView);

// Admin
viewsRouter.get("/users", viewsController.getUsersView);
viewsRouter.get("/dashboard", viewsController.getDashboardView);

module.exports = viewsRouter;
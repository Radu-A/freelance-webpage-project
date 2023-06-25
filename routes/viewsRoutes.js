const express = require('express');
const viewsRouter = express.Router();
const viewsController = require ('../controllers/viewsController');
const authMiddleware = require("../middlewares/authMiddleware"); // Middlewares related to token uses

//GETs
// Users and admin
viewsRouter.get("/", viewsController.getIndexView);
viewsRouter.get("/signup", viewsController.getSignUpView);
viewsRouter.get("/login", viewsController.getLoginView);
viewsRouter.get("/favs", authMiddleware.authCheck, viewsController.getFavsView);
viewsRouter.get("/profile", authMiddleware.authCheck, viewsController.getProfileView);

// Admin
viewsRouter.get("/users", viewsController.getUsersView);
viewsRouter.get("/dashboard", authMiddleware.authCheck, authMiddleware.adminAuthCheck, viewsController.getDashboardView);

module.exports = viewsRouter;
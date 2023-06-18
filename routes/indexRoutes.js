const express = require('express');
const indexRouter = express.Router();
const indexController = require ('../controllers/indexController');

//GETs
indexRouter.get("/", indexController.getIndexView);
indexRouter.get("/signup", indexController.getSignUpView);
indexRouter.get("/login", indexController.getLoginView);
indexRouter.get("/favs", indexController.getFavsView);
indexRouter.get("/profile", indexController.getProfileView);

module.exports = indexRouter;
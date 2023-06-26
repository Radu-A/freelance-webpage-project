const express = require('express');
const usersApiRouter = express.Router();
const usersApiController = require ('../controllers/usersApiController');
const authMiddleware = require("../middlewares/authMiddleware")

//GETs
usersApiRouter.get("/user", authMiddleware.isUserLoggedCheck, usersApiController.getUserInfo); // Gets user's info
usersApiRouter.get("/favs", authMiddleware.authCheck, usersApiController.getUserFavouritesIds); // Gets user's favourite projects ids
usersApiRouter.get("/recoverpassword", usersApiController.recoverPassword);// recover password (user and admin)
usersApiRouter.get("/restorepassword", usersApiController.restorePassword);// restorepassword (user and admin)
//POSTs
usersApiRouter.post("/user", usersApiController.createUser);// Create user
usersApiRouter.post("/favs", authMiddleware.authCheck, usersApiController.saveFav);// Save porject to fav list (user)
//PUTs
usersApiRouter.put("/user", authMiddleware.authCheck, usersApiController.editUserProfile); // Edit user profile (user and admin)
//DELETEs
usersApiRouter.delete("/user", usersApiController.deleteUser); // Delete a user from DDBB (admin)
usersApiRouter.delete("/favs", authMiddleware.authCheck, usersApiController.deleteFavorite); // Delete user's favorite project from DDBB (user)


module.exports = usersApiRouter;
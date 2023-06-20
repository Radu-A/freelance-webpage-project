const express = require('express');
const usersApiRouter = express.Router();
const usersApiController = require ('../controllers/usersApiController');

//GETs
usersApiRouter.get("/recoverpassword", usersApiController.recoverPassword);// recover password (user and admin)
usersApiRouter.get("/restorepassword", usersApiController.restorePassword);// restorepassword (user and admin)
//POSTs
usersApiRouter.post("/favs", usersApiController.saveFav);// Save porject to fav list (user)
//PUTs
usersApiRouter.put("/user", usersApiController.editUserProfile); // Edit user profile (user and admin)
//DELETEs
usersApiRouter.delete("/user", usersApiController.deleteUser); // Delete a user from DDBB (admin)
usersApiRouter.delete("/favs", usersApiController.deleteFavorite); // Delete user's favorite project from DDBB (user)


module.exports = usersApiRouter;
const express = require('express');
const apiRouter = express.Router();
const apiController = require ('../controllers/apiController');

//GETs
apiRouter.get("/search", apiController.getSearchResults);// search results list (user and admin)
apiRouter.get("/recoverpassword", apiController.recoverPassword);// recover password (user and admin)
apiRouter.get("/restorepassword", apiController.restorePassword);// restorepassword (user and admin)

//POSTs
apiRouter.post("/project", apiController.createNewProject);//create new project (admin)
apiRouter.post("/favs", apiController.saveFav);//save porject to fav list (user)

//PUTs
apiRouter.put("/user", apiController.editUserProfile); // Edit user profile (user and admin)
apiRouter.put("/project", apiController.editProject); // Edit project (admin)

//DELETEs
apiRouter.delete("/user", apiController.deleteUser); // Delete a user from DDBB (admin)
apiRouter.delete("/project", apiController.deleteProject); // Delete a project from DDBB (admin)
apiRouter.delete("/favs", apiController.deleteFavorite); // Delete user's favorite project from DDBB (user)


module.exports = apiRouter;
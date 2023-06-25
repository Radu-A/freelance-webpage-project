const express = require('express');
const projectsApiRouter = express.Router();
const projectsApiController = require ('../controllers/projectsApiController');
const authMiddleware = require("../middlewares/authMiddleware");

//GETs
projectsApiRouter.get("/search?", projectsApiController.getProjects);// search results list (user and admin)
// projectsApiRouter.get("/search?", projectsApiController.getProjects);// search results list (user and admin)
projectsApiRouter.get("/:ids?", projectsApiController.getProjectsById);// search results list (user and admin)
projectsApiRouter.get("/search/scrap", projectsApiController.scrapProjects);// search results list (user and admin)
//POSTs
projectsApiRouter.post("/project", authMiddleware.authCheck, authMiddleware.adminAuthCheck, projectsApiController.createNewProject);//create new project (admin)
//PUTs
projectsApiRouter.put("/project", authMiddleware.authCheck, authMiddleware.adminAuthCheck, projectsApiController.editProject); // Edit project (admin)
//DELETEs
projectsApiRouter.delete("/project/:id", authMiddleware.authCheck, authMiddleware.adminAuthCheck, projectsApiController.deleteProjectById); // Delete a project from DDBB (admin)



module.exports = projectsApiRouter;
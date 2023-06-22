const express = require('express');
const projectsApiRouter = express.Router();
const projectsApiController = require ('../controllers/projectsApiController');

//GETs
//projectsApiRouter.get("/search", projectsApiController.getAllProjects);// search results list (user and admin)
projectsApiRouter.get("/search?", projectsApiController.getProjects);// search results list (user and admin)
//POSTs
projectsApiRouter.post("/project", projectsApiController.createNewProject);//create new project (admin)
//PUTs
projectsApiRouter.put("/project", projectsApiController.editProject); // Edit project (admin)
//DELETEs
projectsApiRouter.delete("/project/:id", projectsApiController.deleteProjectById); // Delete a project from DDBB (admin)



module.exports = projectsApiRouter;
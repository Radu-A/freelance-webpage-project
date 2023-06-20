const Project = require('../models/projects'); // Models from Mongo(Atlas);

//GETs
// search results list (user and admin)
const getSearchResults = async (req,res) => {
    let {title} = req.query;
    try {
        let projects = await Project.find({"title":title},'-_id -__v'); //[{}]
        if(projects[0]){
            res.status(200).json(projects); // Respuesta de la API para 1 producto {}
        } else {
            res.status(200).json({}); // Respuesta de la API cuando no hay productos
        }
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
            res.status(400).json({
                msj: `ERROR: ${error}`
        });
    }
};

//POSTs
//create new project (admin)
const createNewProject = () => {

}

//PUTs
// Edit project (admin)
const editProject = () => {
}; 

//DELETEs
//Delete a project from DDBB (admin)
const deleteProject = () => {
};



module.exports = {
    getSearchResults,
    createNewProject,
    editProject,
    deleteProject
}

const Project = require('../models/projects'); // Models from Mongo(Atlas);

//GETs
// search results list (user and admin)
//example: http://localhost:3000/api/projects/search?title=hello&budget=900&date=1234
//Query is supposed to be added to the endpoint from the search "form";
const getSearchResults = async (req,res) => {
    let query = Object.keys(req.query); 
    let value = Object.values(req.query); 

    if(query) {
        try {
            let projects = await Project.find({[query]:value},'-_id -__v'); //[{}]
            console.log(projects);
    
            if(projects[0]){
                res.status(200).json(projects); // Respuesta de la API para 1 producto {}
            } else {
                console.log("We could not find any project by those search values.")
                res.status(200).json({}); // Respuesta de la API cuando no hay productos
            }
        } catch (error) {
            console.log(`ERROR: ${error.stack}`);
                res.status(400).json({
                    msj: `ERROR: ${error}`
            });
        };
    } else {
        try {
            let projects = await Project.find({},'-_id -__v'); //[{}]
            console.log(projects);
    
            if(projects[0]){
                res.status(200).json(projects); // Respuesta de la API para 1 producto {}
            } else {
                console.log("We could not find any project.")
                res.status(200).json({}); // Respuesta de la API cuando no hay productos
            }
        } catch (error) {
            console.log(`ERROR: ${error.stack}`);
                res.status(400).json({
                    msj: `ERROR: ${error}`
            });
        };
    };
};

//POSTs
//create new project (admin)
const createNewProject = async (req,res) => {
    console.log("Check new project data: ", req.body);
    const newProject = req.body;
    
    // The form must check that every field is complete and with the correct data type.

    try {
        let response = await new Project (newProject);
        let answer = await response.save();
    
        res.status(201).json({
            msj: `Producto ${answer.title} guardado en el sistema con ID: ${answer.id}`,
            "product": answer
        });
    }        
    
    catch (error) {
        console.log(`ERROR: ${error}`);
        res.status(400).json({
            msj: `ERROR: ${error}`
        });
    }
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

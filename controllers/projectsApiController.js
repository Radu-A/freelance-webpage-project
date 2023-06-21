const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const Project = require('../models/projects');
require('../utils/db_mongo');

//GETs
// search results list (user and admin)
const getProyects = async (req, res) => {
    try {
        const data = await Project.find({});
        res.status(200).json(data);
        console.log(data);
    } catch (error) {
        res.status(404).json({
            "Error": `${error}`
        })
        console.log(error);
    }
};
// Get project by matching a word in the title
const getProyectsByKeyword = async (req, res) => {
    try {
        console.log(req.params.keyword)
        // It shoud be able to search by isolated word
        const re = new RegExp(req.params.keyword, 'i');
        // const re = new RegExp(`\b(?:${req.params.keyword})\b`, "i");
        const data = await Project.find( { $or: [ { title: re }, { description: re } ] } )
        res.status(200).json(data);
        console.log(data);
    } catch (error) {
        res.status(404).json({
            "Error": `${error}`
        })
        console.log(error);
    }
}


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
    getProyects,
    getProyectsByKeyword,
    createNewProject,
    editProject,
    deleteProject
}

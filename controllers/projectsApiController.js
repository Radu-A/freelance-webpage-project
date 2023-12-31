const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const Project = require('../models/projects');
const scrap = require('../scraper/indexScraper');
require('../utils/db_mongo');

//GETs
// Get projects
const getProjects = async (req, res) => {
        if (req.query.keyword) {
            getProjectsByKeyword(req, res);
        } else if (req.query.skill) {
            getProjectsBySkill(req, res);
        } else {
            getAllProjects(req, res);
        }
}

// Get results list (user and admin)
const getAllProjects = async (req, res) => {
    try {
        console.log('You have searched all');
        const data = await Project.find({});
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({
            "Error": `${error}`
        })
        console.log(error);
    }
};
// Get project by matching a word on title or description
const getProjectsByKeyword = async (req, res) => {
    try {
        // It shoud be able to search by isolated word
        console.log('You have searched by keyword');
        console.log(req.query.keyword)
        const re = new RegExp(req.query.keyword, 'i');
        const data = await Project.find( { $or: [ { title: re }, { description: re }, {skills: re} ] } )
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({
            "Error": `${error}`
        })
        console.log(error);
    }
}
// Get project by "skill"
const getProjectsBySkill = async (req, res) => {
    try {
        console.log('You have searched by skill');
        console.log(req.query.skill);
        const skill = req.query.skill
        const data = await Project.find({skills: skill});
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({
            "Error": `${error}`
        })
        console.log(error);
    }
}
//Get projects by Id
const getProjectsById = async(req, res) => {
    let param = req.params.ids;
    console.log("PARAM: ",param);
    let projectIds = param.split(",");
    console.log("projects id",projectIds);
    try {
        const data = await Project.find().where("_id").in(projectIds).exec(); 
        console.log("favourite projects: ", data)
        res.status(200).json(data);
        console.log(data);
    } catch (error) {
        res.status(404).json({
            "Error": `${error}`
        })
        console.log(error);
    }
}
// Scrap projects
async function scrapProjects() {
    try {
        scrap();
    } catch (error) {
        res.status(404).json({
            "Error": `${error}`
        })
        console.log(error);
    }
}


//POSTs
//create new project (admin)
const createNewProject = async (req,res) => {
    console.log("Check new project data: ", req.body);
    // The form must check that every field is complete and with the correct data type.
    try {
        let newProject = await new Project ({
            "title": req.body.title,
            "date": new Date(),
            "source": "manual",
            "budget": req.body.budget,
            "description": req.body.description,
            "url": "none"
          });
        const data = await newProject.save();
        console.log({
            msj: `Proyecto ${data.title} guardado en el sistema con ID: ${data.id}`,
            "product": data
        });
        res.status(201).json({
            msj: `Proyecto ${data.title} guardado en el sistema con ID: ${data.id}`,
            "product": data
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
const editProject = async (req, res) => {
    try {
        const data = await Project.replaceOne( {"_id": new ObjectId(req.body._id)}, { "title": req.body.title, "budget": req.body.budget, "description": req.body.description});
        res.status(200).json(data);
        console.log(json(data));

    } catch (error) {
        console.log(`ERROR: ${error}`);
        res.status(400).json({
            msj: `ERROR: ${error}`
        });
    }
}; 

//DELETEs
//Delete a project from DDBB (admin)
const deleteProjectById = async (req, res) => {
    try {
        console.log(req.params.id);
        const data = await Project.deleteOne({_id : req.params.id});
        res.status(200).json(data);
        console.log(data);
    } catch (error) {
        res.status(404).json({
            "Error": `${error}`
        })
        console.log(error);
    }
};

module.exports = {
    getProjects,
    getProjectsById,
    createNewProject,
    scrapProjects,
    editProject,
    deleteProjectById
}

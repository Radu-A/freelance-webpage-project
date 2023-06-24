const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const Project = require('../models/projects');
const Skill = require('../models/skills');
require('../utils/db_mongo');

// GETs

// search results list (user and admin
// const getSkillByTitle = async (req, res) => {
//     try {
//         const data = await Skill.find({ title:  });
//         res.status(200).json(data);
//     } catch (error) {
//         res.status(404).json({
//             "Error": `${error}`
//         })
//         console.log(error);
//     }
// };
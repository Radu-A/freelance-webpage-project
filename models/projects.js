const mongoose = require('mongoose');
require('../utils/db_mongo');

// Diseñamos esquema
const objectSchema = {
    title: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    skills: {
        type: Array,
        required: true
    }
}
// Creamos el esqueña
const projectSchema = mongoose.Schema(objectSchema);

// Creamos el modelo
const Project = mongoose.model('Project', projectSchema);

// const newProject = new Project({
//     title: "Desarrollador Web",
//     budget: "Sueldazo",
//     description: "No tendrá que hacer nada"
// });

// newProject.save().then((data)=>console.log(data));

module.exports = Project;
const mongoose = require('mongoose');
require('../utils/db_mongo');

// Diseñamos esquema
const objectSchema = {
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    source: {
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
        type: Array
    }
}
// Creamos el esqueña
const projectSchema = mongoose.Schema(objectSchema);

// Creamos el modelo
const Project = mongoose.model('Project', projectSchema);

const newProject = new Project({
    "title": "Desarrollador Web",
    "date": '2023-06-27T19:23:07.948Z',
    "source": "manual",
    "budget": "Sueldazo",
    "desciption": 'no hay que hacer nada',
    "url": "none"
  });



// newProject.save().then((data)=>console.log(data));

module.exports = Project;
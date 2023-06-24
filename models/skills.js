const mongoose = require('mongoose');
require('../utils/db_mongo');

// Diseñamos esquema
const objectSchema = {
    title: {
        type: String,
        required: true
    }
}
// Creamos el esqueña
const skillSchema = mongoose.Schema(objectSchema);

// Creamos el modelo
const Skill = mongoose.model('Skill', skillSchema);

// const newProject = new Project({
//     title: "Desarrollador Web",
//     budget: "Sueldazo",
//     description: "No tendrá que hacer nada"
// });

// newProject.save().then((data)=>console.log(data));

module.exports = Skill;
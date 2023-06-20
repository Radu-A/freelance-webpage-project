// mongoose.connect("mongodb://localhost:27017/local", { useNewUrlParser: true, useUnifiedTopology: true});
const mongoose = require("mongoose");
require('dotenv').config();

// Local DB
//mongoose.set('strictQuery', false);
//const DATABASE_URL = "mongodb://localhost:27017/fakeshop";

// DB on Atlas
// With this string you can enter throw Compass: `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASS}@cluster0.lhlyvrl.mongodb.net/`
mongoose.connect(`mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASS}@cluster0.lhlyvrl.mongodb.net/freelance?retryWrites=true&w=majority`)
    .catch(error => handleError(error)); // Error handling recommended by documentation

const db = mongoose.connection;

// Eventos
db.on("error", error => console.log(error));
db.once("open", () => console.log("Estás conectado a MongoDB"));

module.exports = mongoose;
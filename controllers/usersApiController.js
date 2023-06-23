const users = require("../models/users");

//GETs
// get favourites Ids with user id:
const getUserFavouritesIds = async (req,res) => {
    let id_user = req.params.id_user;
    try {
        let data = await users.getAllFavouritesIds(id_user);
        let projectIdArr = data.map(item => item.id_project);
        console.log("from Favs views controller: ", projectIdArr);

        res.status(200).json({
            "project_ids": projectIdArr,
            "msj": "Favourite projects ids supplied"
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

// recover password (user and admin)
const recoverPassword = () => {

};
// restorepassword (user and admin)
const restorePassword = () => {

};

//POSTs
//create user
const createUser = async (req,res) => {
    let {email, password, user_name, admin, firstname, surename} = req.body; // {email, password, user_name, admin, firstname, surename}
    try {
        // "user_id" is automatically added by SQL DDBB
        let createInfo = await users.createUser(email, password, user_name, admin, firstname, surename);

        res.status(200).json({
            "user created": createInfo,
            "msj": "User created successfully"
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};
//save porject to fav list (user)
const saveFav = async(req,res) => {
    let {id_user, id_project} = req.body;
    try {
        let savedInfo = await users.addFavourite(id_user, id_project);

        res.status(200).json({
            "saved favourite": `user id:${id_user} saved project id:${id_project}`,
            "msj": "Project added to favourites"
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

//PUTs
// Edit user profile (user and admin)
const editUserProfile = async (req,res) => {
    try {
        console.log(req.body)
        let {id_user, email, password, userName, firstName, sureName} = req.body;
        // "user_id" goes in "userInfo" to search the user row in the DDBB.
        let editedInfo = await users.updateUser(id_user, email, password, userName, firstName, sureName);

        res.status(200).json({
            "items_updated": editedInfo,
            "msj": "Items edited successfully"
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}; 

//DELETEs
// Delete a user from DDBB (admin)
const deleteUser = async (req,res) => {
    let {id_user} = req.body; // delete by user by id
    try {
        let deleteInfo = await users.deleteUser(id_user);

        res.status(200).json({
            "user deleted": deleteInfo,
            "msj": "User deleted successfully"
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};
// Delete user's favorite project from DDBB (user)
const deleteFavorite = async(req, res) => {
    let {id_user, id_project} = req.body;
    try {
        let deletedInfo = await users.deleteFavourite(id_user, id_project);
        console.log(deletedInfo)
        res.status(200).json({
            "deleted favourite": `user id:${id_user} deleted project id:${id_project}`,
            "msj": "Project deleted from favourites"
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};


 
 module.exports = {
    getUserFavouritesIds,
    recoverPassword,
    restorePassword,
    createUser,
    saveFav,
    editUserProfile,
    deleteUser,
    deleteFavorite
}
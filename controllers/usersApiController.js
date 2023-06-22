const users = require("../models/users");

//GETs
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
const saveFav = () => {

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
 const deleteFavorite = () => {
    
 };


 
 module.exports = {
    recoverPassword,
    restorePassword,
    createUser,
    saveFav,
    editUserProfile,
    deleteUser,
    deleteFavorite
}
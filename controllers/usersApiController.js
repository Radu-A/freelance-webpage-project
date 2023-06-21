const users = require("../models/users");

//GETs
// recover password (user and admin)
const recoverPassword = () => {

};
// restorepassword (user and admin)
const restorePassword = () => {

};

//POSTs
//save porject to fav list (user)
const saveFav = () => {

}

//PUTs
// Edit user profile (user and admin)
const editUserProfile = async (req,res) => {
    let userInfo = req.body; // {user_id, name, surname, ...}
    try {
        console.log(userInfo)
        // "user_id" goes in "userInfo" to search the user row in the DDBB
        let editedInfo = await users.updateUser(userInfo);

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
const deleteUser = () => {
}; 
 // Delete user's favorite project from DDBB (user)
 const deleteFavorite = () => {
    
 };


 
 module.exports = {
    recoverPassword,
    restorePassword,
    saveFav,
    editUserProfile,
    deleteUser,
    deleteFavorite
}
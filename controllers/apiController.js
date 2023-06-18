//GETs
// search results list (user and admin)
const getSearchResults = () => {

};
// recover password (user and admin)
const recoverPassword = () => {

};
// restorepassword (user and admin)
const restorePassword = () => {

};


//POSTs
// signup (user)
const userSignUp = () => {
    
};
//login (user and admin)
const userLogin = () => {

}
//logout (user and admin)
const logOut = () => {

}
//create new project (admin)
const createNewProject = () => {

}
//save porject to fav list (user)
const saveFav = () => {

}


//PUTs
// Edit user profile (user and admin)
const editUserProfile = () => {
}; 

// Edit project (admin)
const editProject = () => {
}; 

//DELETEs
// Delete a user from DDBB (admin)
const deleteUser = () => {
}; 

//Delete a project from DDBB (admin)
const deleteProject = () => {
};


 // Delete user's favorite project from DDBB (user)
const deleteFavorite = () => {
    
};


module.exports = {
    getSearchResults,
    recoverPassword,
    restorePassword,
    userSignUp,
    userLogin,
    logOut,
    createNewProject,
    saveFav,
    editUserProfile,
    editProject,
    deleteUser,
    deleteProject,
    deleteFavorite
}

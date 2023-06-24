const pool = require('../utils/db_pgsql');
const usersQueries = require('../queries/users.queries');
const favouritesQueries = require("../queries/favourites.queries");

// This will be used when "admin" load "users view"
const getAllUsers = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(usersQueries.getAllUsers);
        result = data.rows;
        console.log(result);
    } catch(err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
}

// It will be need it... I dont know
const getUsersById = async (id_user) => {
    let client, result;
    try {
        client = await pool.connect();
        let data = await client.query(usersQueries.getUserById, [id_user]);
        result = data.rows;
        //console.log(result);
    } catch(err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// get user by email to check if an user already exists
const getUserByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        let data = await client.query(usersQueries.getUserByEmail, [email]);
        result = data.rows;
        //console.log(result);
    } catch(err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result[0]
}


// Users will be created in the sign in
const createUser = async(email, password, user_name, admin, firstname, surename) => {
    let client, result;
    try{
        console.log("INFO FROM CREATEUSER", email, password, user_name, admin, firstname, surename)
        client = await pool.connect();
        const data = await client.query(usersQueries.createUser,
            [email, password, user_name, admin, firstname, surename]);
        result = data.rowCount;
        console.log(result);
    }catch(err){
        console.log(err);
        throw(err);
    }finally{
        client.release()
    }
    return result
};

// Update user will be done by users in their profile page
const updateUser = async(id_user, email, password, user_name, firstname, surename) => {
    let client, result;
    try{
        client = await pool.connect();
        // Admin field is not here cause the user is not allowed to change it
        const data = await client.query(usersQueries.updateUser,
        [id_user, email, password, user_name, firstname, surename]);
        result = data.rowCount;
        console.log(result);
    }catch(err){
        console.log(err);
        throw(err);
    }finally{
        client.release()
    }
    return result
};

// Delete user will be done by admin in "users view" AND could be donde by the user himself
const deleteUser = async(id_user) => {
    let client, result;
    try{
        client = await pool.connect();
        // Admin field is not here cause the user is not allowed to change it
        const data = await client.query(usersQueries.deleteUser,[id_user]);
        result = data.rowCount;
        console.log(result);
    }catch(err){
        console.log(err);
        throw(err);
    }finally{
        client.release()
    }
    return result
};

// Add a project to user's favourite list (user)
const addFavourite = async(id_user, id_project) => {
    let client, result;
    try{
        client = await pool.connect();
        const data = await client.query(favouritesQueries.addFavourite,[id_user, id_project]);
        result = data.rowCount;
        console.log(result);
    }catch(err){
        console.log(err);
        throw(err);
    }finally{
        client.release()
    }
    return result
};

// Delete a project from user's favourite list (user)
const deleteFavourite = async(id_user, id_project) => {
    let client, result;
    try{
        client = await pool.connect();
        const data = await client.query(favouritesQueries.deleteFavourite,[id_user, id_project]);
        result = data.rowCount;
        if(result==0){
            console.log("Warning: id_user or id_project not found in SQL DDBB");
        }
    }catch(err){
        console.log(err);
        throw(err);
    }finally{
        client.release()
    }
    return result
};

const getAllFavouritesIds = async(id_user) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(favouritesQueries.getAllFavouritesIDs, [id_user]);
        result = data.rows;
        console.log(result);
    } catch(err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
}

const changeUserState = async(email) => {
    let client, result;
    try {
        client = await pool.connect();
        let data = await client.query(usersQueries.changeUserState, [email]);
        result = data.rows;
        //console.log(result);
    } catch(err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// createUser('admin@gmail.com', 'abc123', 'admin', true, 'john', 'doe');
// createUser('user@gmail.com', 'abc123', 'user', false, 'jane', 'dee');
// getAllUsers()
// getUsersById(6)
// updateUser(6, 'jane@gmail.com', 'abc123', false, 'jane', 'dee');
// deleteUser(4)
console.log("SQL DDBB Conected")

module.exports = {
    getAllUsers,
    getUsersById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    addFavourite,
    deleteFavourite,
    getAllFavouritesIds,
    changeUserState
}
const pool = require('../utils/db_pgsql');
const usersQueries = require('../queries/users.queries');

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
        console.log(result);
    } catch(err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// Users will be created in the sign in
const createUser = async(email, password, user_name, admin, firstname, surename) => {
    let client, result;
    try{
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

// Update user will be done by admin in "users view"
const deleteUser = async(id_user) => {
    let client, result;
    try{
        client = await pool.connect();
        // Admin field is not here cause the user is not allowed to change it
        const data = await client.query(usersQueries.deleteUser,
        [id_user]);
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

// createUser('admin@gmail.com', 'abc123', 'admin', true, 'john', 'doe');
// createUser('user@gmail.com', 'abc123', 'user', false, 'jane', 'dee');
getAllUsers()
// getUsersById(6)
// updateUser(6, 'jane@gmail.com', 'abc123', false, 'jane', 'dee');
// deleteUser(4)

module.exports = {
    getAllUsers,
    getUsersById,
    createUser,
    updateUser,
    deleteUser
}
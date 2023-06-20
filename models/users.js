const pool = require('../utils/db_pgsql');

const getAllUsers = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(
            `SELECT 
                email, 
                password, 
                user_name, 
                admin, 
                firstname, 
                surename
            FROM public.users;`);
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

const getUsersById = async (id_user) => {
    let client, result;
    try {
        client = await pool.connect();
        let data = await client.query(
            `SELECT 
                id_user, 
                email, 
                password, 
                user_name, 
                admin, 
                firstname, 
                surename
            FROM public.users
            WHERE id_user = $1`,
            [id_user]);
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

const createUser = async(email, password, user_name, admin, firstname, surename) => {
    let client, result;
    try{
        client = await pool.connect();
        const data = await client.query(`
        INSERT INTO users(
            email, 
            password, 
            user_name, 
            admin, 
            firstname, 
            surename)
        VALUES ($1, $2, $3, $4, $5, $6)`,
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

// createUser('admin@gmail.com', 'abc123', 'admin', true, 'john', 'doe');
// createUser('user@gmail.com', 'abc123', 'user', false, 'jane', 'dee');
// getAllUsers()
// getUsersById(2)
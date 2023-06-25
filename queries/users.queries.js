const usersQueries = {
    getAllUsers:`SELECT 
        id_user, 
        email, 
        password, 
        user_name, 
        admin, 
        firstname, 
        surename
    FROM public.users;`,
    getUserById:`SELECT 
        id_user, 
        email, 
        password, 
        user_name, 
        admin, 
        firstname, 
        surename
    FROM public.users
    WHERE id_user = $1`,
    getUserByEmail:`SELECT 
        id_user, 
        email, 
        password, 
        user_name, 
        admin, 
        firstname, 
        surename,
        logged
    FROM public.users
    WHERE email = $1`,
    createUser:`INSERT INTO users(
        email, 
        password, 
        user_name, 
        admin, 
        firstname, 
        surename,
        logged)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    updateUser:`
    UPDATE users
    SET email=$2, 
        password=$3, 
        user_name=$4, 
        firstname=$5, 
        surename=$6
    WHERE id_user=$1;`,
    deleteUser:`
    DELETE FROM users
    WHERE id_user=$1;`,
    changeUserState:`
    UPDATE users
    SET logged = NOT logged
    WHERE email=$1;`,
    loggedTrue:`
    UPDATE users
    SET logged = true
    WHERE email=$1;`,
    loggedFalse:`
    UPDATE users
    SET logged = false
    WHERE email=$1;`,
}

module.exports = usersQueries;
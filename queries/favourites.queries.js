const favouritesQueries = {
    addFavourite:`INSERT INTO favourites(
        id_user,
        id_project)
    VALUES ($1, $2)`,
    deleteFavourite:`DELETE FROM favourites
    WHERE id_user=$1 AND id_project=$2`,
    getAllFavouritesIDs:`SELECT id_project
    FROM public.favourites
    WHERE id_user = $1`
}

module.exports = favouritesQueries;
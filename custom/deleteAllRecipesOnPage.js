// delete all items if access
//  Write number of pagination

const deleteAllRecipesOnPage = async (paginationNumber) => {
    const res = await request(`https://stage-api.lifebase.solutions/api/recipes?owners=all&page=${paginationNumber - 1}`, {
        method: 'GET',
        headers: {
            cookie: config.cookieToAccess
        }
    })
    const recipesItems = (await res.body.json()).items;

    for(const item of recipesItems) {
        const res = await request(` https://stage-api.lifebase.solutions/api/recipe/${item.id}`, {
            method: 'DELETE',
            headers: {
                cookie: config.cookieToAccess
            }
        })
        console.log(`ITEM ID{${item.id}} STATUS DELETED:::`, res.statusCode);
    }
}

module.exports = {
    deleteAllRecipesOnPage
}
const db = require('../data/db');

async function getBookmarkList(req, res) {
    // const userId = req.query.userId;
    // const page = req.query.page;
    // const pageSize = req.query.pageSize;
    // const queryStr = "select * from manganime where is_manga = 'true' limit $1 offset $2"
    // const rows = await db.query(queryStr, [pageSize, pageSize * page]);
    // console.log(rows[0].title);
    // res.send(JSON.stringify(rows));
}

async function getRecipeDetail(req, res) {
    try {
        const recipeId = req.body.recipeId;
        const queryIngredientStr = "SELECT ingredient_id, ingredient_name, ingredient_image, amount FROM recipe JOIN recipe_ingredient ON recipe.id = recipe_ingredient.recipe_id JOIN ingredient ON recipe_ingredient.ingredient_id = ingredient.id where recipe.id = $1"
        const ingredients = await db.query(queryIngredientStr, [recipeId]);
        const recipeDetail = await db.query("select * from recipe where id = $1", [recipeId]);
        res.status(200).json({ mess: "success", code: 200, data: { ...recipeDetail[0] , ingredients }});
    } catch (error) {
        res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function getFavorite(req, res) {

}

module.exports = {
    getBookmarkList: getBookmarkList,
    getRecipeDetail: getRecipeDetail,
    getFavorite: getFavorite
}
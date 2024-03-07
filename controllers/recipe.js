const db = require('../data/db');
const dateTime = require('../utils/date_time'); 
const firebase = require('../utils/firebase');

async function getBookmarkList(req, res) {
    try {
        const userId = req.body.userId;
        const page = req.body.page;
        const pageSize = req.body.pageSize;
        const queryStr = "select * from (select * from recipe order by id desc) as sort_recipe where id in (select recipe_id from recipe_account_save where account_id = $1) limit $2 offset $3"
        const rows = await db.query(queryStr, [userId, pageSize, pageSize * page]);
        const recipeWithImageUrl = await Promise.all(rows.map(async (recipe) => {
            if (recipe.recipe_image !== null) {
                const imageUrl = await firebase.getImageUrl(recipe.recipe_image);
                return { ...recipe, imageUrl: imageUrl[0] };
            }

            return { ...recipe, imageUrl: null };
        }));

        res.status(200).json({ mess: "success", code: 200, data: recipeWithImageUrl});
    } catch (error) {
        res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function getRecipeDetail(req, res) {
    try {
        const recipeId = req.body.recipeId;
        const queryIngredientStr = "SELECT ingredient_id, ingredient_name, ingredient_image, amount FROM recipe JOIN recipe_ingredient ON recipe.id = recipe_ingredient.recipe_id JOIN ingredient ON recipe_ingredient.ingredient_id = ingredient.id where recipe.id = $1 ORDER BY ingredient_id ASC"
        const ingredients = await db.query(queryIngredientStr, [recipeId]);
        const recipeDetail = await db.query("select * from recipe where id = $1", [recipeId]);
        if (recipeDetail[0].recipe_image !== null) {
            const imageUrl = await firebase.getImageUrl(recipeDetail[0].recipe_image);
            return res.status(200).json({ mess: "success", code: 200, data: { ...recipeDetail[0], imageUrl: imageUrl[0], ingredients }});
        }

        res.status(200).json({ mess: "success", code: 200, data: { ...recipeDetail[0], imageUrl: null, ingredients }});
    } catch (error) {
        res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function getNewRecipe(req, res) {
    try {
        const page = req.body.page;
        const pageSize = req.body.pageSize;
        const newRecipeQuery = "select * from (select * from recipe order by id desc) as sort_recipe ORDER BY ABS(EXTRACT(EPOCH FROM create_at - CURRENT_TIMESTAMP)) DESC limit $1 offset $2"
        const rows = await db.query(newRecipeQuery, [pageSize, pageSize * page]);

        const recipeWithImageUrl = await Promise.all(rows.map(async (recipe) => {
            if (recipe.recipe_image !== null) {
                const imageUrl = await firebase.getImageUrl(recipe.recipe_image);
                return { ...recipe, imageUrl: imageUrl[0] };
            }

            return { ...recipe, imageUrl: null };
        }));

        res.status(200).json({ mess: "success", code: 200, data: recipeWithImageUrl});
    } catch (error) {
        res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function getTopRecipe(req, res) {
    try {
        const page = req.body.page;
        const pageSize = req.body.pageSize;
        const newRecipeQuery = "select * from recipe where num_of_rating >= 4 and rating >= 3 order by (num_of_rating*rating) desc limit $1 offset $2"
        const rows = await db.query(newRecipeQuery, [pageSize, pageSize * page]);

        const recipeWithImageUrl = await Promise.all(rows.map(async (recipe) => {
            if (recipe.recipe_image !== null) {
                const imageUrl = await firebase.getImageUrl(recipe.recipe_image);
                return { ...recipe, imageUrl: imageUrl[0] };
            }

            return { ...recipe, imageUrl: null };
        }));

        res.status(200).json({ mess: "success", code: 200, data: recipeWithImageUrl});
    } catch (error) {
        res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function getRecipeOfUser(req, res) {
    try {
        const userId = req.body.userId;
        const page = req.body.page;
        const pageSize = req.body.pageSize;
        const newRecipeQuery = "select * from recipe where account_id = $1 order by (num_of_rating*rating) desc limit $2 offset $3"
        const rows = await db.query(newRecipeQuery, [userId, pageSize, pageSize * page]);

        const recipeWithImageUrl = await Promise.all(rows.map(async (recipe) => {
            if (recipe.recipe_image !== null) {
                const imageUrl = await firebase.getImageUrl(recipe.recipe_image);
                return { ...recipe, imageUrl: imageUrl[0] };
            }

            return { ...recipe, imageUrl: null };
        }));

        res.status(200).json({ mess: "success", code: 200, data: recipeWithImageUrl});
    } catch (error) {
        res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function createNewRecipe(req, res) {
    try {
        const recipeName = req.body.recipeName;
        const recipeDescription = req.body.recipeDescription;
        const recipeInstruction = req.body.recipeInstruction;
        const createdUserId = req.body.userId;

        const file = req.file;

        const imageID = uuidv4();
        const fileName = imageID;

        const insertRecipeQuery = "insert into recipe (account_id, recipe_name, description, instruction, rating, follower, num_of_rating, num_of_comments, update_at, create_at, recipe_image) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)"
        await db.query(insertRecipeQuery, [createdUserId, recipeName, recipeDescription, recipeInstruction, 0, 0, 0, 0, dateTime.currentDateDMY_HM(), dateTime.currentDateDMY_HM(), `test/${fileName}`]); //!qa test
        
        await firebase.uploadFile({
            file: file,
            fileName: fileName,
            onSuccess: () => {
                console.log('File uploaded to Firebase Storage');
                res.status(200).json({ mess: "success", code: 200});
            },
            onFail: async (err) => {
                try {
                    const queryStr = "UPDATE recipe SET recipe_image = NULL WHERE recipe_image = $1"
                    await db.query(queryStr, [fileName]);
                    console.log('File fail to set recipe image name in Firebase Storage' + err);
                } catch (error) {
                    console.log('File fail to reset recipe image name in Firebase Storage' + error);
                }
                res.status(500).json({ mess: 'Error uploading to Firebase Storage ' + err, code: 500 });
            },
        });
    } catch (error) {
        res.status(500).json({ mess: error.message, code: 500 });
    }
}

module.exports = {
    getBookmarkList: getBookmarkList,
    getRecipeDetail: getRecipeDetail,
    getNewRecipe: getNewRecipe,
    getTopRecipe: getTopRecipe,
    getRecipeOfUser: getRecipeOfUser,
    createNewRecipe: createNewRecipe,
}
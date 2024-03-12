const db = require('../data/db');
const dateTime = require('../utils/date_time');
const firebase = require('../utils/firebase');
const { v4: uuidv4 } = require('uuid');

async function getBookmarkList(req, res) {
    try {
        const userId = req.body.userId;
        const page = req.body.page;
        const pageSize = req.body.pageSize;
        const queryStr = "select * from (select * from recipe order by id desc) as sort_recipe where id in (select recipe_id from recipe_account_save where account_id = $1) limit $2 offset $3"
        const rows = await db.query(queryStr, [userId, pageSize, pageSize * page]);
        const recipeWithImageUrl = await Promise.all(rows.map(async (recipe) => {
            const queryUserInfo = "SELECT * from account where id = $1"
            const userInfo = await db.query(queryUserInfo, [recipe.account_id]);
            delete recipe.recipe_image;
            delete userInfo[0].user_password;

            var isBookmark = 0;
            const queryCheckBookmark = "SELECT * from recipe_account_save where account_id = $1 and recipe_id = $2"
            const checkBookmark = await db.query(queryCheckBookmark, [userId, recipe.id]);
            if (checkBookmark.length === 1) {
                isBookmark = 1;
            }
            
            try {
                const imageUrl = await firebase.getImageUrl(recipe.recipe_image);
                return { ...recipe, imageUrl: imageUrl[0], owner: userInfo[0] ?? null };
            } catch (error) {
                return { ...recipe, isBookmark: isBookmark, imageUrl: null, owner: userInfo[0] ?? null };
            }
        }));

        res.status(200).json({ mess: "success", code: 200, data: recipeWithImageUrl });
    } catch (error) {
        res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function getRecipeDetail(req, res) {
    try {
        const recipeId = req.body.recipeId;
        const currentUserId = req.body.userId;

        const queryIngredientStr = "SELECT ingredient_id, ingredient_name, ingredient_image, amount FROM recipe JOIN recipe_ingredient ON recipe.id = recipe_ingredient.recipe_id JOIN ingredient ON recipe_ingredient.ingredient_id = ingredient.id where recipe.id = $1 ORDER BY ingredient_id ASC"
        const ingredients = await db.query(queryIngredientStr, [recipeId]);
        const recipeDetail = await db.query("select * from recipe where id = $1", [recipeId]);

        const queryUserInfo = "SELECT * from account where id = $1"
        const userInfo = await db.query(queryUserInfo, [recipeDetail[0].account_id]);
        delete userInfo[0].user_password;


        var isBookmark = 0;
        const queryCheckBookmark = "SELECT * from recipe_account_save where account_id = $1 and recipe_id = $2"
        const checkBookmark = await db.query(queryCheckBookmark, [currentUserId, recipeId]);
        if (checkBookmark.length === 1) {
            isBookmark = 1;
        }

        if (recipeDetail[0].recipe_image !== null) {
            const imageUrl = await firebase.getImageUrl(recipeDetail[0].recipe_image);
            delete recipeDetail[0].recipe_image;
            return res.status(200).json({ mess: "success", code: 200, data: { ...recipeDetail[0], isBookmark: isBookmark, imageUrl: imageUrl[0], owner: userInfo[0] ?? null, ingredients } });
        }

        res.status(200).json({ mess: "success", code: 200, data: { ...recipeDetail[0], isBookmark: isBookmark, imageUrl: null, owner: userInfo[0] ?? null, ingredients } });
    } catch (error) {
        res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function getNewRecipe(req, res) {
    try {
        const userId = req.body.userId;
        const page = req.body.page;
        const pageSize = req.body.pageSize;
        const newRecipeQuery = "select * from (select * from recipe order by id desc) as sort_recipe ORDER BY ABS(EXTRACT(EPOCH FROM create_at - CURRENT_TIMESTAMP)) DESC limit $1 offset $2"
        const rows = await db.query(newRecipeQuery, [pageSize, pageSize * page]);

        const recipeWithImageUrl = await Promise.all(rows.map(async (recipe) => {
            const queryUserInfo = "SELECT * from account where id = $1"
            const userInfo = await db.query(queryUserInfo, [recipe.account_id]);
            delete recipe.recipe_image;
            delete userInfo[0].user_password;


            var isBookmark = 0;
            const queryCheckBookmark = "SELECT * from recipe_account_save where account_id = $1 and recipe_id = $2"
            const checkBookmark = await db.query(queryCheckBookmark, [userId, recipe.id]);
            if (checkBookmark.length === 1) {
                isBookmark = 1;
            }

            try {
                const imageUrl = await firebase.getImageUrl(recipe.recipe_image);
                return { ...recipe, isBookmark: isBookmark, imageUrl: imageUrl[0], owner: userInfo[0] ?? null };
            } catch (error) {
                return { ...recipe, isBookmark: isBookmark, imageUrl: null, owner: userInfo[0] ?? null };
            }
        }));

        res.status(200).json({ mess: "success", code: 200, data: recipeWithImageUrl });
    } catch (error) {
        res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function getTopRecipe(req, res) {
    try {
        const userId = req.body.userId;
        const page = req.body.page;
        const pageSize = req.body.pageSize;
        const newRecipeQuery = "select * from recipe where num_of_rating >= 4 and rating >= 3 order by (num_of_rating*rating) desc limit $1 offset $2"
        const rows = await db.query(newRecipeQuery, [pageSize, pageSize * page]);

        const recipeWithImageUrl = await Promise.all(rows.map(async (recipe) => {
            const queryUserInfo = "SELECT * from account where id = $1"
            const userInfo = await db.query(queryUserInfo, [recipe.account_id]);
            delete recipe.recipe_image;
            delete userInfo[0].user_password;

            var isBookmark = 0;
            const queryCheckBookmark = "SELECT * from recipe_account_save where account_id = $1 and recipe_id = $2"
            const checkBookmark = await db.query(queryCheckBookmark, [userId, recipe.id]);
            if (checkBookmark.length === 1) {
                isBookmark = 1;
            }

            try {
                const imageUrl = await firebase.getImageUrl(recipe.recipe_image);
                return { ...recipe, isBookmark: isBookmark, imageUrl: imageUrl[0], owner: userInfo[0] ?? null };
            } catch (error) {
                return { ...recipe, isBookmark: isBookmark, imageUrl: null, owner: userInfo[0] ?? null };
            }
        }));

        res.status(200).json({ mess: "success", code: 200, data: recipeWithImageUrl });
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
            const queryUserInfo = "SELECT * from account where id = $1"
            const userInfo = await db.query(queryUserInfo, [recipe.account_id]);
            delete recipe.recipe_image;
            delete userInfo[0].user_password;

            var isBookmark = 0;
            const queryCheckBookmark = "SELECT * from recipe_account_save where account_id = $1 and recipe_id = $2"
            const checkBookmark = await db.query(queryCheckBookmark, [userId, recipe.id]);
            if (checkBookmark.length === 1) {
                isBookmark = 1;
            }

            try {
                const imageUrl = await firebase.getImageUrl(recipe.recipe_image);
                return { ...recipe, isBookmark: isBookmark, imageUrl: imageUrl[0], owner: userInfo[0] ?? null };
            } catch (error) {
                return { ...recipe, isBookmark: isBookmark, imageUrl: null, owner: userInfo[0] ?? null };
            }
        }));

        res.status(200).json({ mess: "success", code: 200, data: recipeWithImageUrl });
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
        await db.query(insertRecipeQuery, [createdUserId, recipeName, recipeDescription, recipeInstruction, 0, 0, 0, 0, dateTime.currentDateDMY_HM(), dateTime.currentDateDMY_HM(), `test/${fileName}`]); //test/ is the folder name in Firebase Storage

        const getFirebaseTokenQuery = "select firebase_token from firebase_messaging_token join subscription_account on firebase_messaging_token.account_id = subscription_account.follower_account_id where subscription_account.account_id = $1";
        const getFirebaseTokenResult = await db.query(getFirebaseTokenQuery, [createdUserId]);
        const firebaseTokens = getFirebaseTokenResult.map((item) => {
            return item.firebase_token;
        });


        const userQuery = "SELECT user_name FROM account WHERE id = $1";
        const userResult = await db.query(userQuery, [createdUserId]);

        //!qa test
        // const insertRecipeQuery = "insert into recipe (account_id, recipe_name, description, instruction, rating, follower, num_of_rating, num_of_comments, update_at, create_at) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)"
        // await db.query(insertRecipeQuery, [createdUserId, recipeName, recipeDescription, recipeInstruction, 0, 0, 0, 0, dateTime.currentDateDMY_HM(), dateTime.currentDateDMY_HM()]); 
        // console.log(firebaseTokens);
        // await firebase.sendNotificationTo(
        //     firebaseTokens,
        //     "New recipe " + recipeName + " has been created by " + userResult[0].user_name,
        //     "New recipe has been created",
        // );
        // res.status(200).json({ mess: "create new recipe success", code: 200 });
        //!qa test
        await firebase.uploadFile({
            file: file,
            fileName: fileName,
            onSuccess: async () => {
                firebase.sendNotificationTo(
                    firebaseTokens,
                    "New recipe " + recipeName + " has been created by " + userResult[0].user_name,
                    "New recipe has been created",
                );
                res.status(200).json({ mess: "success", code: 200 });
            },
            onFail: async (err) => {
                try {
                    const queryStr = "delete from recipe WHERE recipe_image = $1 and account_id = $2"
                    await db.query(queryStr, [imageID, createdUserId]);
                    await firebase.sendNotificationTo({
                        deviceTokenList: firebaseTokens,
                        title: "New recipe " + recipeName + " has been created by " + userResult[0].user_name,
                        body: "New recipe has been created",
                    });
                    res.status(200).json({ mess: "success but upload image to firebase fail because" + err, code: 200 });
                } catch (error) {
                    res.status(500).json({ mess: 'fail to insert recipe data, upload recipe image to firebase and removing wrong data' + err + 'and ' + error, code: 500 });
                }
            },
        });
    } catch (error) {
        res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function bookmarkRecipe(req, res) {
    try {
        const userId = req.body.userId;
        const recipeId = req.body.recipeId;
        const isBookmark = req.body.isBookmark;
        if (isBookmark == 1) {
            const bookmarkRecipeQuery = "INSERT INTO recipe_account_save (recipe_id, account_id) values ($1,$2);"
            await db.query(bookmarkRecipeQuery, [recipeId, userId]);
            res.status(200).json({ mess: "success", code: 200 });
        } else {
            const unbookmarkRecipeQuery = "DELETE FROM recipe_account_save WHERE recipe_id = $1 and account_id = $2"
            await db.query(unbookmarkRecipeQuery, [recipeId, userId]);
            res.status(200).json({ mess: "success", code: 200 });
        }
    } catch (error) {
        res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function rateRecipe(req, res) {
    try {
        const userId = req.body.userId;
        const recipeId = req.body.recipeId;
        const rating = req.body.rating;
        const checkRatingQuery = "select count(*) from recipe_account_rating where recipe_id = $1 and account_id = $2"
        const existed = await db.query(checkRatingQuery, [recipeId, userId]);
        if (existed[0].count === 1) {
            const updateRatingQuery = "update recipe_account_rating set rating = $1 where recipe_id = $2 and account_id = $3"
            await db.query(updateRatingQuery, [rating, recipeId, userId]);
            res.status(200).json({ mess: "success", code: 200 });
        } else {
            const insertRatingQuery = "insert into recipe_account_rating (recipe_id, account_id, rating) values ($1, $2, $3)"
            await db.query(insertRatingQuery, [recipeId, userId, rating]);
            res.status(200).json({ mess: "success", code: 200 });
        }
    } catch (error) {
        res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function searchRecipeAndUser(req, res) {
    try {
        const searchKey = req.body.searchKey;
        const userId = req.body.userId;
        const page = req.body.page;
        const pageSize = req.body.pageSize;
        const recipeSearchQuery = "select * from recipe where recipe_name ilike $1 limit $2 offset $3"
        const recipeRows = await db.query(recipeSearchQuery, [`%${searchKey}%`, pageSize, pageSize * page]);

        const recipeWithImageUrl = await Promise.all(recipeRows.map(async (recipe) => {
            const queryUserInfo = "SELECT * from account where id = $1"
            const userInfo = await db.query(queryUserInfo, [recipe.account_id]);
            delete recipe.recipe_image;
            delete userInfo[0].user_password;

            var isBookmark = 0;
            const queryCheckBookmark = "SELECT * from recipe_account_save where account_id = $1 and recipe_id = $2"
            const checkBookmark = await db.query(queryCheckBookmark, [userId, recipe.id]);
            if (checkBookmark.length === 1) {
                isBookmark = 1;
            }

            try {
                const imageUrl = await firebase.getImageUrl(recipe.recipe_image);
                return { ...recipe, isBookmark: isBookmark, imageUrl: imageUrl[0], owner: userInfo[0] ?? null };
            } catch (error) {
                return { ...recipe, isBookmark: isBookmark, imageUrl: null, owner: userInfo[0] ?? null };
            }
        }));

        if (page == 0) {
            const userSearchQuery = "select * from account where user_name ilike $1 order by id asc limit $2";
            const userRows = await db.query(userSearchQuery, [`%${searchKey}%`, pageSize]);
            return res.status(200).json({ mess: "success", code: 200, data: { recipe: recipeWithImageUrl, user: userRows } });
        }

        return res.status(200).json({ mess: "success", code: 200, data: { recipe: recipeWithImageUrl } });

    } catch (error) {
        return res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function getPersonalRatingForRecipe(req, res) {
    try {
        const userId = req.body.userId;
        const recipeId = req.body.recipeId;
        const queryStr = "select rating from recipe_account_rating where recipe_id = $1 and account_id = $2"
        const rows = await db.query(queryStr, [recipeId, userId]);
        res.status(200).json({ mess: "success", code: 200, data: rows[0].rating });
    } catch (error) {
        res.status(500).json({ mess: error.message, code: 500 });
    }
}


//get new recipe of users that followed by choosen user
async function getUserFollowingNewRecipe(req, res) {
    try {
        const userId = req.body.userId;
        const page = req.body.page;
        const pageSize = req.body.pageSize;

        const getFollowingUserRecipeQuery = "select * from recipe where account_id in (SELECT id FROM subscription_account join account on subscription_account.account_id = account.id WHERE follower_account_id = $1) order by create_at asc limit $2 offset $3";
        const followingUserRecipe = await db.query(getFollowingUserRecipeQuery, [userId, pageSize, pageSize * page]);
        const recipeWithImageUrl = await Promise.all(followingUserRecipe.map(async (recipe) => {
            const queryUserInfo = "SELECT * from account where id = $1"
            const userInfo = await db.query(queryUserInfo, [recipe.account_id]);
            delete recipe.recipe_image;
            delete userInfo[0].user_password;
            try {
                const imageUrl = await firebase.getImageUrl(recipe.recipe_image);
                return { ...recipe, imageUrl: imageUrl[0], owner: userInfo[0] ?? null };
            } catch (error) {
                return { ...recipe, imageUrl: null, owner: userInfo[0] ?? null };
            }
        }));

        res.status(200).json({ mess: "success", code: 200, data: recipeWithImageUrl });
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
    bookmarkRecipe: bookmarkRecipe, //!qa unbookmark
    searchRecipeAndUser: searchRecipeAndUser,
    getPersonalRatingForRecipe: getPersonalRatingForRecipe,
    rateRecipe: rateRecipe,
    getUserFollowingNewRecipe: getUserFollowingNewRecipe, //get recipe of users that followed by choosen user
}
const e = require('express');
const db = require('../data/db');
const dateTime = require('../utils/date_time');
const firebase = require('../utils/firebase');
const { v4: uuidv4 } = require('uuid');

const recipeDirectory = 'recipe';
const reviewDirectory = 'review';

async function getBookmarkList(req, res) {
    try {
        const userId = req.body.userId;
        const page = req.body.page;
        const pageSize = req.body.pageSize;
        const recipeQuery = "select id, account_id, recipe_name, recipe_image, create_at, update_at, num_of_comments, num_of_rating, num_of_followers, rating from (select * from recipe order by id desc) as sort_recipe where id in (select recipe_id from recipe_account_save where account_id = $1) order by update_at desc, id desc limit $2 offset $3"
        const recipes = await db.query(recipeQuery, [userId, pageSize, pageSize * page]);
        const recipeWithImageUrl = await Promise.all(recipes.map(async (recipe) => {
            const queryUserInfo = "SELECT id, user_image, user_name from account where id = $1"
            const userInfo = await db.query(queryUserInfo, [recipe.account_id]);

            return { ...recipe, owner: userInfo[0] };
        }));

        return res.status(200).json({ mess: "success", code: 200, data: recipeWithImageUrl });
    } catch (error) {
        return res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function getRecipeDetail(req, res) {
    try {
        const recipeId = req.body.recipeId;
        const currentUserId = req.body.userId;
        try {
            const queryIngredientStr = "SELECT ingredient_id, ingredient_name, ingredient_image, quantity FROM recipe JOIN recipe_ingredient ON recipe.id = recipe_ingredient.recipe_id JOIN ingredient ON recipe_ingredient.ingredient_id = ingredient.id where recipe.id = $1 ORDER BY ingredient_id ASC"
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
        } catch (error) {
            console.log(error);
        }
        const queryIngredientStr = "SELECT ingredient_id, ingredient_name, ingredient_image, quantity FROM recipe JOIN recipe_ingredient ON recipe.id = recipe_ingredient.recipe_id JOIN ingredient ON recipe_ingredient.ingredient_id = ingredient.id where recipe.id = $1 ORDER BY ingredient_id ASC"
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

        return res.status(200).json({ mess: "success", code: 200, data: { ...recipeDetail[0], isBookmark: isBookmark, ingredients, owner: userInfo[0] } });
    } catch (error) {
        return res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function getNewRecipe(req, res) {
    try {
        const page = req.body.page;
        const pageSize = req.body.pageSize;
        const newRecipeQuery = "select id, account_id, recipe_name, recipe_image, create_at, update_at, num_of_comments, num_of_rating, num_of_followers, rating from (select * from recipe order by id desc) as sort_recipe ORDER BY ABS(EXTRACT(EPOCH FROM create_at - CURRENT_TIMESTAMP)) DESC, id desc limit $1 offset $2"
        const rows = await db.query(newRecipeQuery, [pageSize, pageSize * page]);

        const recipeWithImageUrl = await Promise.all(rows.map(async (recipe) => {
            const queryUserInfo = "SELECT id, user_image, user_name from account where id = $1"
            const userInfo = await db.query(queryUserInfo, [recipe.account_id]);

            return { ...recipe, owner: userInfo[0] };
        }));

        return res.status(200).json({ mess: "success", code: 200, data: recipeWithImageUrl });
    } catch (error) {
        return res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function getTopRecipe(req, res) {
    try {
        const page = req.body.page;
        const pageSize = req.body.pageSize;
        const newRecipeQuery = "select id, account_id, recipe_name, recipe_image, create_at, update_at, num_of_comments, num_of_rating, num_of_followers, rating from recipe where num_of_rating >= 0 and rating >= 0 order by (num_of_rating*rating) desc, id desc limit $1 offset $2"
        const rows = await db.query(newRecipeQuery, [pageSize, pageSize * page]);

        const recipeWithImageUrl = await Promise.all(rows.map(async (recipe) => {
            const queryUserInfo = "SELECT id, user_image, user_name from account where id = $1"
            const userInfo = await db.query(queryUserInfo, [recipe.account_id]);

            return { ...recipe, owner: userInfo[0] };
        }));

        return res.status(200).json({ mess: "success", code: 200, data: recipeWithImageUrl });
    } catch (error) {
        return res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function getRecipeOfUser(req, res) {
    try {
        const userId = req.body.userId;
        const page = req.body.page;
        const pageSize = req.body.pageSize;
        const newRecipeQuery = "select id, account_id, recipe_name, recipe_image, create_at, update_at, num_of_comments, num_of_rating, num_of_followers, rating from recipe where account_id = $1 order by (num_of_rating*rating) desc, id desc limit $2 offset $3"
        const rows = await db.query(newRecipeQuery, [userId, pageSize, pageSize * page]);

        const recipeWithImageUrl = await Promise.all(rows.map(async (recipe) => {
            const queryUserInfo = "SELECT id, user_image, user_name from account where id = $1"
            const userInfo = await db.query(queryUserInfo, [recipe.account_id]);

            return { ...recipe, owner: userInfo[0] };
        }));

        return res.status(200).json({ mess: "success", code: 200, data: recipeWithImageUrl });
    } catch (error) {
        return res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function createNewRecipe(req, res) {
    try {
        const recipeName = req.body.recipeName;
        const createdUserId = req.body.userId;
        const recipeDescription = req.body.recipeDescription;
        const recipeInstruction = req.body.recipeInstruction;
        const ingredients = req.body.ingredients;

        const file = req.file;

        const imageID = uuidv4();
        const fileName = imageID;

        const currentDate = dateTime.currentDateDMY_HM()

        //insert recipe info
        const recipeQuery = "insert into recipe (account_id, recipe_name, description, instruction, rating, num_of_followers, num_of_rating, num_of_comments, update_at, create_at, recipe_image) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id;"
        const recipeId = await db.query(recipeQuery, [createdUserId, recipeName, recipeDescription, recipeInstruction, 0, 0, 0, 0, currentDate, currentDate, `${recipeDirectory}/${fileName}`]); //test/ is the folder name in Firebase Storage
        console.log(recipeId);

        for (let i = 0; i < ingredients.length; i++) {
            //insert ingredients of this recipe
            const ingredientQuery = "insert into ingredient (ingredient_name) values ($1)"
            await db.query(ingredientQuery, [ingredients[i].ingredient_name]);

            // get recipe id
            const recipeIdQuery = "select id from recipe where account_id = $1 and recipe_name = $2 and create_at = $3"
            const recipeId = await db.query(recipeIdQuery, [createdUserId, recipeName, currentDate]);

            // get ingredient id
            const ingredientIdQuery = "select id from ingredient where ingredient_name = $1"
            const ingredientId = await db.query(ingredientIdQuery, [ingredients[i].ingredient_name]);

            //insert ingredients / recipe
            const ingredientRecipeQuery = "insert into recipe_ingredient (recipe_id, ingredient_id, quantity) values ($1, $2, $3)"
            await db.query(ingredientRecipeQuery, [recipeId[0].id, ingredientId[0].id, ingredients[i].quantity]);
        }

        //get firebase token for notification messaging
        const getFirebaseTokenQuery = "select firebase_token from firebase_messaging_token join subscription_account on firebase_messaging_token.account_id = subscription_account.follower_account_id where subscription_account.account_id = $1";
        const getFirebaseTokenResult = await db.query(getFirebaseTokenQuery, [createdUserId]);
        const firebaseTokens = getFirebaseTokenResult.map((item) => {
            return item.firebase_token;
        });

        const userQuery = "SELECT user_name FROM account WHERE id = $1";
        const userResult = await db.query(userQuery, [createdUserId]);

        //insert notification without image 
        const followNotiQuery = "INSERT INTO notification (title, notification_content, on_click_type, relevant_data, create_at) values ($1,$2,$3,$4,$5) on conflict (title, notification_content) do nothing;"
        await db.query(followNotiQuery, ["New recipe has been created", "New recipe " + recipeName + " has been created by " + userResult[0].user_name, 'recipe', recipeId[0].id, currentDate]);
        //get list of following users's id
        const followingUserQuery = "SELECT follower_account_id FROM subscription_account WHERE account_id = $1";
        const followingUsersId = await db.query(followingUserQuery, [createdUserId]);
        //insert notification-users relation (1-many)
        const notiIdQuery = "select id from notification where notification_content = $1 and title = $2"
        const notiId = await db.query(notiIdQuery, ["New recipe " + recipeName + " has been created by " + userResult[0].user_name, "New recipe has been created"]);
        for (let index = 0; index < followingUsersId.length; index++) {
            const userId = followingUsersId[index];
            const notiToAccountQuery = "INSERT INTO notification_to_account (notification_id, account_id, is_seen) values ($1,$2,$3);"
            await db.query(notiToAccountQuery, [notiId[0].id, userId.follower_account_id, 0]);
        }

        //upload recipe image to firebase, delete recipe data if fail, then send notification
        if (file != null) {
            return await firebase.uploadFile({
                file: file,
                fileName: fileName,
                directory: recipeDirectory,
                onSuccess: async () => {
                    if (firebaseTokens.length > 0) {
                        await firebase.sendNotificationTo(
                            firebaseTokens,
                            "New recipe has been created",
                            "New recipe " + recipeName + " has been created by " + userResult[0].user_name,
                        );
                        await firebase.sendInAppNotification(
                            firebaseTokens,
                            JSON.stringify({
                                id: notiId[0].id,
                                title: "New recipe has been created",
                                notification_content: "New recipe " + recipeName + " has been created by " + userResult[0].user_name,
                                notification_image: `${recipeDirectory}/${fileName}`,
                                on_click_type: 'recipe',
                                relevant_data: recipeId[0].id,
                                create_at: new Date(),//? QA
                            })
                        );
                    }
                    return res.status(200).json({ mess: "success", code: 200 });

                },
                onFail: async (err) => {
                    try {
                        const queryStr = "delete from recipe WHERE recipe_image = $1 and account_id = $2"
                        await db.query(queryStr, [imageID, createdUserId]);
                        if (firebaseTokens.length > 0) {
                            await firebase.sendNotificationTo(
                                firebaseTokens,
                                "New recipe has been created",
                                "New recipe " + recipeName + " has been created by " + userResult[0].user_name,
                            );
                            await firebase.sendInAppNotification(
                                firebaseTokens,
                                JSON.stringify({
                                    id: notiId[0].id,
                                    title: "New recipe has been created",
                                    notification_content: "New recipe " + recipeName + " has been created by " + userResult[0].user_name,
                                    notification_image: `${recipeDirectory}/${fileName}`,
                                    on_click_type: 'recipe',
                                    relevant_data: recipeId[0].id,
                                    create_at: new Date(),//? QA
                                })
                            );
                        }
                        return res.status(200).json({ mess: "success but upload image to firebase fail because" + err, code: 200 });
                    } catch (error) {
                        return res.status(500).json({ mess: 'fail to insert recipe data, upload recipe image to firebase and removing wrong data' + err + 'and ' + error, code: 500 });
                    }
                },
            });
        } else {
            try {
                console.log("send in app noti " + firebaseTokens)
                //!qa 8/5
                //alter recipe image name if file is null
                if (firebaseTokens.length > 0) {
                    await firebase.sendNotificationTo(
                        firebaseTokens,
                        "New recipe has been created",
                        "New recipe " + recipeName + " has been created by " + userResult[0].user_name,
                    );
                    await firebase.sendInAppNotification(
                        firebaseTokens,
                        JSON.stringify({
                            id: notiId[0].id,
                            title: "New recipe has been created",
                            notification_content: "New recipe " + recipeName + " has been created by " + userResult[0].user_name,
                            notification_image: null,
                            on_click_type: 'recipe',
                            relevant_data: recipeId[0].id,
                            create_at: new Date()
                        })
                    );
                }
            } catch (error) {
                console.log("error when send notification to " + firebaseTokens + " because " + error.message);
            }
            return res.status(200).json({ mess: "success", code: 200 });
        }

    } catch (error) {
        return res.status(500).json({ mess: error.message, code: 500 });
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
            return res.status(200).json({ mess: "success", code: 200 });
        } else {
            const unbookmarkRecipeQuery = "DELETE FROM recipe_account_save WHERE recipe_id = $1 and account_id = $2"
            await db.query(unbookmarkRecipeQuery, [recipeId, userId]);
            return res.status(200).json({ mess: "success", code: 200 });
        }
    } catch (error) {
        return res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function rateRecipe(req, res) {
    try {
        const userId = req.body.userId;
        const recipeId = req.body.recipeId;
        const rating = req.body.rating;
        const review = req.body.review;
        const currentDate = dateTime.currentDateDMY_HM()
        const file = req.file;

        const imageID = uuidv4();
        const fileName = imageID;

        //check if user has rated this recipe before
        const checkRatingQuery = "select recipe_id from recipe_account_rating where recipe_id = $1 and account_id = $2"
        const existed = await db.query(checkRatingQuery, [recipeId, userId]);
        if (existed.length == 1) {
            const updateRatingQuery = "update recipe_account_rating set rating = $1, review = $2, update_at = $3 where recipe_id = $4 and account_id = $5"
            await db.query(updateRatingQuery, [rating, review, currentDate, recipeId, userId]);
        } else {
            const insertRatingQuery = "insert into recipe_account_rating (recipe_id, account_id, rating, review, create_at, update_at) values ($1, $2, $3, $4, $5, $6)"
            await db.query(insertRatingQuery, [recipeId, userId, rating, review, currentDate, currentDate]);
        }

        //get firebase token for notification messaging
        const getFirebaseTokenQuery = "select firebase_token from firebase_messaging_token join recipe on firebase_messaging_token.account_id = recipe.account_id  where recipe.id = $1";
        const getFirebaseTokenResult = await db.query(getFirebaseTokenQuery, [recipeId]);
        const firebaseTokens = getFirebaseTokenResult.map((item) => {
            return item.firebase_token;
        });


        const userNameQuery = "select user_name from account where id = $1"
        const userName = await db.query(userNameQuery, [userId]);

        const recipeNameQuery = "select recipe_name, recipe_image, account_id from recipe where id = $1"
        const recipeName = await db.query(recipeNameQuery, [recipeId]);

        //insert notification
        const followNotiQuery = "INSERT INTO notification (title, notification_content, notification_image, on_click_type, relevant_data, create_at) values ($1,$2,$3,$4,$5,$6) on conflict (title, notification_content) do nothing;"
        await db.query(followNotiQuery, ["New Rating !!!", "User " + userName[0].user_name + " has rated your recipe " + recipeName[0].recipe_name + "with " + rating + " stars\nReview: " + review, recipeName[0].recipe_image, 'recipe', recipeId, currentDate]);
        //insert notification-user relation
        const notiIdQuery = "select id from notification where notification_content = $1 and title = $2"
        const notiId = await db.query(notiIdQuery, ["User " + userName[0].user_name + " has rated your recipe " + recipeName[0].recipe_name + "with " + rating + " stars\nReview: " + review, "New Rating !!!"]);
        const notiToAccountQuery = "INSERT INTO notification_to_account (notification_id, account_id, is_seen) values ($1,$2,$3);"
        await db.query(notiToAccountQuery, [notiId[0].id, recipeName[0].account_id, 0]);


        if (file != null) {
            //insert review image name into table
            if (existed.length == 1) {
                const updateRatingQuery = "update recipe_account_rating set review_recipe_image = $1 where recipe_id = $2 and account_id = $3"
                await db.query(updateRatingQuery, [`${reviewDirectory}/${fileName}`, recipeId, userId]);
            } else {
                const insertRatingQuery = "insert into recipe_account_rating (recipe_id, account_id, review_recipe_image) values ($1, $2, $3)"
                await db.query(insertRatingQuery, [recipeId, userId, `${reviewDirectory}/${fileName}`]);
            }

            if (firebaseTokens.length > 0) {
                await firebase.sendNotificationTo(
                    firebaseTokens,
                    "New Rating !!!",
                    "User " + userName[0].user_name + " has rated your recipe " + recipeName[0].recipe_name + "with " + rating + " stars\nReview: " + review,
                );
                await firebase.sendInAppNotification(
                    firebaseTokens,
                    JSON.stringify({
                        id: notiId[0].id,
                        title: "New Rating !!!",
                        notification_content: "User " + userName[0].user_name + " has rated your recipe " + recipeName[0].recipe_name + "with " + rating + " stars\nReview: " + review,
                        notification_image: `${reviewDirectory}/${fileName}`,
                        on_click_type: 'recipe',
                        relevant_data: +recipeId,
                        create_at: new Date(),//? QA
                    })
                );
            }

            //upload review image to firebase
            return await firebase.uploadFile({
                file: file,
                fileName: fileName,
                directory: reviewDirectory,
                onSuccess: async () => res.status(200).json({ mess: "success", code: 200 }),
                onFail: async (err) => {
                    try {
                        const queryStr = "delete from recipe WHERE recipe_image = $1 and account_id = $2"
                        await db.query(queryStr, [imageID, createdUserId]);
                        return res.status(200).json({ mess: "success but upload image to firebase fail because" + err, code: 200 });
                    } catch (error) {
                        return res.status(500).json({ mess: 'fail to insert recipe data, upload recipe image to firebase and removing wrong data' + err + 'and ' + error, code: 500 });
                    }
                },
            });
        } else {
            if (firebaseTokens.length > 0) {
                await firebase.sendNotificationTo(
                    firebaseTokens,
                    "New Rating !!!",
                    "User " + userName[0].user_name + " has rated your recipe " + recipeName[0].recipe_name + " with " + rating + " stars\nReview: " + review,
                );
                console.log("send in app noti " + firebaseTokens)
                await firebase.sendInAppNotification(
                    firebaseTokens,
                    JSON.stringify({
                        id: notiId[0].id,
                        title: "New Rating !!!",
                        notification_content: "User " + userName[0].user_name + " has rated your recipe " + recipeName[0].recipe_name + " with " + rating + "  stars\nReview: " + review,
                        notification_image: null,
                        on_click_type: 'recipe',
                        relevant_data: +recipeId,
                        create_at: new Date()
                    })
                );
            }
        }

        return res.status(200).json({ mess: "success", code: 200 });

    } catch (error) {
        return res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function searchRecipeAndUser(req, res) {
    try {
        const searchKey = req.body.searchKey;
        const page = req.body.page;
        const pageSize = req.body.pageSize;
        const isRecipe = req.body.isRecipe;

        if (isRecipe == 1) {
            const recipeSearchQuery = "select id, account_id, recipe_name, recipe_image, create_at, update_at, num_of_comments, num_of_rating, num_of_followers, rating from recipe where recipe_name ilike $1 limit $2 offset $3"
            const recipeRows = await db.query(recipeSearchQuery, [`%${searchKey}%`, pageSize, pageSize * page]);
            const recipeWithImageUrl = await Promise.all(recipeRows.map(async (recipe) => {
                const queryUserInfo = "SELECT user_image, user_name from account where id = $1"
                const userInfo = await db.query(queryUserInfo, [recipe.account_id]);

                return { ...recipe, owner: userInfo[0] };
            }));
            return res.status(200).json({ mess: "success", code: 200, data: recipeWithImageUrl });
        } else {
            const userSearchQuery = "select id, user_image, user_name, user_email from account where user_name ilike $1 order by id asc limit $2 offset $3";
            const userRows = await db.query(userSearchQuery, [`%${searchKey}%`, pageSize, pageSize * page]);
            return res.status(200).json({ mess: "success", code: 200, data: userRows });
        }
    } catch (error) {
        return res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function getPersonalRatingForRecipe(req, res) {
    try {
        const userId = req.body.userId;
        const recipeId = req.body.recipeId;
        const queryStr = "select rating, review, update_at, create_at, review_recipe_image from recipe_account_rating where recipe_id = $1 and account_id = $2"
        const rows = await db.query(queryStr, [recipeId, userId]);
        if (rows.length != 0) {
            rows[0].rating = parseFloat(rows[0].rating)
        }
        return res.status(200).json({ mess: "success", code: 200, data: rows[0] });
    } catch (error) {
        return res.status(500).json({ mess: error.message, code: 500 });
    }
}


//get new recipe of users that followed by choosen user
async function getUserFollowingNewRecipe(req, res) {
    try {
        const userId = req.body.userId;
        const page = req.body.page;
        const pageSize = req.body.pageSize;

        const getFollowingUserRecipeQuery = "select id, account_id, recipe_name, recipe_image, create_at, update_at, num_of_comments, num_of_rating, num_of_followers, rating from recipe where account_id in (SELECT id FROM subscription_account join account on subscription_account.account_id = account.id WHERE follower_account_id = $1) order by create_at desc, id desc limit $2 offset $3";
        const followingUserRecipe = await db.query(getFollowingUserRecipeQuery, [userId, pageSize, pageSize * page]);
        const recipeWithImageUrl = await Promise.all(followingUserRecipe.map(async (recipe) => {
            const queryUserInfo = "SELECT id, user_image, user_name from account where id = $1"
            const userInfo = await db.query(queryUserInfo, [recipe.account_id]);

            return { ...recipe, owner: userInfo[0] };
        }));

        return res.status(200).json({ mess: "success", code: 200, data: recipeWithImageUrl });
    } catch (error) {
        return res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function getReviewOnRecipe(req, res) {
    try {
        const recipeId = req.body.recipeId;
        const page = req.body.page;
        const pageSize = req.body.pageSize;

        const getReviewQuery = "select * from recipe_account_rating where recipe_id = $1 order by update_at desc limit $2 offset $3"
        const reviewRows = await db.query(getReviewQuery, [recipeId, pageSize, pageSize * page]);
        const reviewWithUserInfo = await Promise.all(reviewRows.map(async (review) => {
            const queryUserInfo = "SELECT user_image, user_name from account where id = $1"
            const userInfo = await db.query(queryUserInfo, [review.account_id]);

            const queryRecipeInfo = "SELECT recipe_name, recipe_image from recipe where id = $1"
            const recipeInfo = await db.query(queryRecipeInfo, [review.recipe_id]);
            review.rating = parseFloat(review.rating)

            return { ...recipeInfo[0], ...userInfo[0], ...review };
        }));

        return res.status(200).json({ mess: "success", code: 200, data: reviewWithUserInfo });
    } catch (error) {
        return res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function removeRecipeOfUser(req, res) {
    try {
        const recipeId = req.body.recipeId;
        // const recipeName = req.body.recipeName;
        // const userId = req.body.userId;
        const queryStr = "delete from recipe where id = $1"
        await db.query(queryStr, [recipeId]);
        return res.status(200).json({ mess: "success", code: 200 });
    } catch (error) {
        return res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function editRecipe(req, res) {
    try {
        const recipeId = req.body.recipeId;
        const recipeName = req.body.recipeName
        const recipeDescription = req.body.recipeDescription;
        const recipeInstruction = req.body.recipeInstruction;

        const file = req.file;

        const imageID = uuidv4();
        const fileName = imageID;

        const currentDate = dateTime.currentDateDMY_HM()

        //insert recipe info
        const recipeQuery = "update recipe set recipe_name = $1, description = $2, instruction = $3, update_at = $4 where id = $5 RETURNING recipe_image;"
        const recipeImage = await db.query(recipeQuery, [recipeName, recipeDescription, recipeInstruction, currentDate, recipeId]); //test/ is the folder name in Firebase Storage

        if (file != null) {
            //delete image in firebase
            await firebase.deleteFile({
                fileName: recipeImage[0].recipe_image, 
                onSuccess: async () => {
                    console.log("deleteFile success");
                    return;
                },
                onFail: async (err) => {
                    console.log("fail" + err);
                    return;
                },
            });

            //update image in firebase
            return await firebase.uploadFile({
                file: file,
                fileName: fileName,
                directory: recipeDirectory,
                onSuccess: async () => {
                    console.log("success");
                    //set new image in database
                    const deleteImageQuery = "update recipe set recipe_image = $1 where id = $2"
                    await db.query(deleteImageQuery, [`${recipeDirectory}/${fileName}`, recipeId]);
                    return res.status(200).json({ mess: "success", code: 200 });
                },
                onFail: async (err) => {
                    console.log("fail" + err);
                    return res.status(200).json({ mess: "success but upload image to firebase fail because" + err, code: 200 });
                },
            });
        } else {
            return res.status(200).json({ mess: "success", code: 200 });
        }
    } catch (error) {
        return res.status(500).json({ mess: error.message, code: 500 });

    }
}

async function getRecipeNameInstructionDescription(req, res) {
    try {
        const recipeId = req.body.recipeId;
        const queryStr = "select id, recipe_name, description, instruction from recipe where id = $1"
        const rows = await db.query(queryStr, [recipeId]);
        return res.status(200).json({ mess: "success", code: 200, data: rows[0] });
    } catch (error) {
        return res.status(500).json({ mess: error.message, code: 500 });
    }

}

module.exports = {
    getBookmarkList: getBookmarkList,
    getRecipeDetail: getRecipeDetail,
    getNewRecipe: getNewRecipe,
    getTopRecipe: getTopRecipe,
    getRecipeOfUser: getRecipeOfUser,
    createNewRecipe: createNewRecipe,
    bookmarkRecipe: bookmarkRecipe,
    searchRecipeAndUser: searchRecipeAndUser,
    getPersonalRatingForRecipe: getPersonalRatingForRecipe,
    rateRecipe: rateRecipe,
    getUserFollowingNewRecipe: getUserFollowingNewRecipe, //get recipe of users that followed by choosen user
    getReviewOnRecipe: getReviewOnRecipe,
    removeRecipeOfUser: removeRecipeOfUser,
    editRecipe: editRecipe,
    getRecipeNameInstructionDescription: getRecipeNameInstructionDescription,
}
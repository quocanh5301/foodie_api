const express = require('express');
const recipeController = require('../controllers/recipe');
const router = express.Router();

router.post("/getUserBookmarkRecipe", recipeController.getBookmarkList);

router.post("/getRecipeDetail", recipeController.getRecipeDetail);

router.post("/getNewRecipe", recipeController.getNewRecipe);

router.post("/getTopRecipe", recipeController.getTopRecipe);

router.post("/getRecipeOfUser", recipeController.getRecipeOfUser);

router.post("/createNewRecipe", recipeController.createNewRecipe);

router.post("/bookmarkRecipe", recipeController.bookmarkRecipe);

router.post("/searchRecipeAndUser", recipeController.searchRecipeAndUser);

router.post("/getPersonalRatingForRecipe", recipeController.getPersonalRatingForRecipe);

router.post("/rateRecipe", recipeController.rateRecipe);

router.post("/getUserFollowingNewRecipe", recipeController.getUserFollowingNewRecipe);

module.exports = router;
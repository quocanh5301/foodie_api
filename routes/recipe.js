const express = require('express');
const recipeController = require('../controllers/recipe');
const router = express.Router();

const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.post("/getUserBookmarkRecipe", recipeController.getBookmarkList);

router.post("/getRecipeDetail", recipeController.getRecipeDetail);

router.post("/getNewRecipe", recipeController.getNewRecipe);

router.post("/getTopRecipe", recipeController.getTopRecipe);

router.post("/getRecipeOfUser", recipeController.getRecipeOfUser);

router.post("/createNewRecipe", upload.single('recipeImage'), recipeController.createNewRecipe);

router.post("/bookmarkRecipe", recipeController.bookmarkRecipe);

router.post("/searchRecipeAndUser", recipeController.searchRecipeAndUser);

router.post("/getPersonalRatingForRecipe", recipeController.getPersonalRatingForRecipe);

router.post("/rateRecipe", upload.single('reviewRecipeImage'), recipeController.rateRecipe);

router.post("/getUserFollowingNewRecipe", recipeController.getUserFollowingNewRecipe);

router.post("/getReviewOnRecipe", recipeController.getReviewOnRecipe);

router.post("/removeRecipeOfUser", recipeController.removeRecipeOfUser);

router.post("/editRecipe",upload.single('recipeImage'), recipeController.editRecipe);

router.post("/getRecipeNameInstructionDescription", recipeController.getRecipeNameInstructionDescription);

module.exports = router;
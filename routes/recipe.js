const express = require('express');
const recipeController = require('../controllers/recipe');
const router = express.Router();

router.get("/getUserBookmarkRecipe", recipeController.getBookmarkList);
router.get("/getRecipeDetail", recipeController.getRecipeDetail)
router.get("/getNewRecipe", recipeController.getNewRecipe)
router.get("/getTopRecipe", recipeController.getTopRecipe)
router.get("/getRecipeOfUser", recipeController.getRecipeOfUser)
router.post("/createNewRecipe", recipeController.createNewRecipe)
router.post("/bookmarkRecipe", recipeController.bookmarkRecipe)

module.exports = router;
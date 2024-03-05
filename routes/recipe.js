const express = require('express');
const recipeController = require('../controllers/recipe');
const router = express.Router();

router.get("/getUserBookmarkRecipe", recipeController.getBookmarkList);
router.get("/getRecipeDetail", recipeController.getRecipeDetail)
// router.post

module.exports = router;
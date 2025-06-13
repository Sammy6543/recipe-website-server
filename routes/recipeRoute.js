const route = require('express').Router();

const { createRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe } = require('../controllers/recipeController')
const auth = require('../middleware/Auth')
const { upload, uploadToCloudinary } = require('../middleware/upload')


route.post('/', auth, upload.single("image"), uploadToCloudinary, createRecipe)
route.get('/', getRecipes)
route.get('/:id', getRecipeById)
route.put('/:id', auth, upload.single("image"), uploadToCloudinary, updateRecipe)
route.delete('/:id', auth, deleteRecipe)

module.exports = route; 
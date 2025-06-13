const Recipe = require('../models/recipes')

// create recipes
const createRecipe = async (req, res) => {
    try {
        const { title, description, ingredients, steps, tags, author } = req.body;

        console.log(req.body);

        if (!title || !description || !ingredients || !steps) {
            return res.status(400).json({ error: "Missing required fields." })
        }
        const newRecipe = new Recipe({
            title,
            description,
            image: req.file.cloudinaryUrl,
            ingredients,
            steps,
            tags,
            author: req.user.id
        });

        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);

    } catch (error) {
        console.log(error);

        res.status(500).json({ error: 'Server Error' });
    }
};

// Get /api/recipes
const getRecipes = async = (req, res) => {

};

// get recipe by id
const getRecipeById = async (req, res) => {

};

// update recipe API
const updateRecipe = async (req, res) => {

};

// delete recipe
const deleteRecipe = async (req, res) => {

};

module.exports = { createRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe }
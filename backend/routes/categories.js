const express = require('express');
const  {Category, Subcategory} = require('../models/categorymodel');
const router = express.Router();

// get all categories
router.get('/', (req, res) => {
    res.json({msg: "GET all categories."});
});

// get single category
router.get('/:id', (req, res) => {
    res.json({msg: "GET single category."});
});

// post a new category
router.post('/', async (req, res) => {
    const {categoryName, subcategoryName} = req.body;
    try{
        let category = await Category.findOne({catname: categoryName});

        if(!category){
            category = await Category.create({catname: categoryName});
        }

        let subcategory = await Subcategory.findOne({subcatname: subcategoryName});

        if (!subcategory) {
        subcategory = await Subcategory.create({subcatname: subcategoryName});
        }
        
        category.subcategories.push(subcategory);
        await category.save();

        res.status(200).json(category);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
    // res.json({msg: "POST a new category."});
});

// delete a category
router.delete('/:id', (req, res) => {
    res.json({msg: "DELETE a category."});
});

// update a category
router.patch('/:id', (req, res) => {
    res.json({msg: "UPDATE a category."});
});
module.exports = router;
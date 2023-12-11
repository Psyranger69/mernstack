const  {Category, Subcategory} = require('../models/categorymodel');
const mongoose = require('mongoose');

// get all categories
const getCategories = async (req,res) => {
    const categories = await Category.find({}).sort({createdAt: -1});
    
    res.status(200).json(categories);
}


// get a single category
const getcategory = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Invalid Id"});
    }

    const category = await Category.findById(id);

    if(!category){
        return res.status(400).json({error: "No Such Category"});
    }

    res.status(200).json(category);
}



// create a new category
const createCategory = async (req,res) => {
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
}



// delete a category
const deleteCategory = async (req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "invalid id"});
    }

    const category = await Category.findOneAndDelete({_id: id});

    if(!category){
        return req.status(400).json({error: "Error While Deleting!!"});
    }
    res.status(200).json(category);

}



// update a category
const updateCategory = async (req, res) => {
    const { id } = req.params;


    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "invalid id"});
    }

    const category = await Category.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if(!category){
        return req.status(400).json({error: "Error While Updating!!"});
    }

    res.status(200).json(category);
     
}




module.exports = {createCategory, getCategories, getcategory, deleteCategory, updateCategory};
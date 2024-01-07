const  {Category, Subcategory} = require('../models/categorymodel');
const mongoose = require('mongoose');

// for update all category, existing field which don't have description field
// Category.find({
//     $or: [
//       { description: { $exists: false } },
//     //   { field2: { $exists: false } },
//     //   { field3: { $exists: false } }
//       // Add more field checks as needed
//     ]
//   })
//   .then(async categories => {
//     for (const category of categories) {
//       try {
//         const updateFields = {
//           description: 'Default Description',
//         //   field2: 'Value for Field 2',
//         //   field3: 12345
//         };
  
//         await Category.updateOne(
//           { _id: category._id },
//           { $set: updateFields }
//         );
  
//         console.log(`Category updated: ${category._id}`);
//       } catch (updateError) {
//         console.error(`Error updating category ${category._id}:`, updateError);
//       }
//     }
//   })
//   .catch(error => {
//     console.error('Error finding categories:', error);
//   });

// for update all subcategory, existing field which don't have description field

// Category.find({ "subcategories": { $elemMatch: { $or: [{ description: { $exists: false } }] } } })
//     .then(async categories => {
//         for (const category of categories) {
//             for (const subcategory of category.subcategories) {
//                 if (!subcategory.description) {
//                     subcategory.description = "this is default subcategory value";
//                     // subcategory.notes = "this is default subcategory value";
//                 }
//             }
//             await category.save();
//             console.log(`Category ${category._id} updated.`);
//         }
//     })
//     .catch(error => {
//         console.log(`Error finding categories:`, error);
//     });


  


// get all categories
const getCategories = async (req,res) => {
    const categories = await Category.find({}).sort({catname: 1});
    
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
    console.log(req.body);
    const {categoryName, description, subcategoryName} = req.body;
    try{
        let category = await Category.findOne({catname: categoryName});

        if(!category){
            category = await Category.create({catname: categoryName, description: description});
        }else if(category && (subcategoryName == "" || !subcategoryName)){
            return res.status(400).json({ error: "Category already exists." });
        }else{
            let subcategory = category.subcategories.find(sub => sub.subcatname === subcategoryName);

            if (!subcategory) {
                subcategory = await Subcategory.create({ subcatname: subcategoryName });
            }else{
                return res.status(400).json({ error: "Subcategory already exists in this category." });
            }
            
            category.subcategories.push(subcategory);
            await category.save();

            res.status(200).json(category);
        }

        
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
    // res.json({msg: "POST a new category."});
}



// delete a category
const deleteCategory = async (req,res) => {
    const { id, subcatid } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "invalid id"});
    }

    if(subcatid != 0){
        if(!mongoose.Types.ObjectId.isValid(subcatid)){
            return res.status(404).json({error: "invalid subcatid"});
        }
        const category = await Category.findOneAndUpdate(
            { _id: id },
            { $pull: { subcategories: { _id: subcatid } } },
            { new: true }
        );

        if (!category) {
            return res.status(400).json({ error: "Error while deleting subcategory" });
        }
        res.status(200).json(category);

    }else{
        const category = await Category.findOneAndDelete({_id: id},{ new: true});

        if(!category){
            return req.status(400).json({error: "Error While Deleting!!"});
        }
        res.status(200).json(category);
    }

}



// update a category
const updateCategory = async (req, res) => {
    const { id, subcatid } = req.params;


    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "invalid id"});
    }

    if(subcatid != 0){
        
        if(!mongoose.Types.ObjectId.isValid(subcatid)){
            return res.status(404).json({error: "invalid subcatid"});
        }

        const category = await Category.findOne({ _id: id });

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        const getSubcategory = category.subcategories.find(sub => sub._id == subcatid);

        if (!getSubcategory) {
            return res.status(404).json({ error: "Subcategory not found" });
        }
        Object.assign(getSubcategory, req.body);

        try {
            await category.save();
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ error: "Error while updating subcategory" });
        }
        
    }else{
        const category = await Category.findOneAndUpdate({_id: id}, {
            ...req.body
        },{ new: true});
    
        if(!category){
            return req.status(400).json({error: "Error While Updating!!"});
        }
    
        res.status(200).json(category);
    }
     
}




module.exports = {createCategory, getCategories, getcategory, deleteCategory, updateCategory};
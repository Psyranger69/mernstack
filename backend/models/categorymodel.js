const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// schema for new subcateogry
const subcategoryschema = new Schema({
    subcatname:{
        type: String,
        // required: true,
    },
    
}, {timestamps:true});

const Subcategory = mongoose.model('Subcategory', subcategoryschema);

// schema for new category

const categoryschema = new Schema({
    catname:{
        type: String,
        required: true,
    },
    description:{
        type: String
    },
    subcategories: [subcategoryschema],
}, {timestamps:true});

const Category = mongoose.model('Category', categoryschema);

module.exports = {Subcategory, Category};
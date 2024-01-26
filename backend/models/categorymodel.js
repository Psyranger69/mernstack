const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// scheme for new subsubcategory
const subsubcategoryschema = new Schema(
  {
    subsubcatname: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);
const Subsubcategory = mongoose.model("Subsubcategory", subsubcategoryschema);

// schema for new subcategory
const subcategoryschema = new Schema(
  {
    subcatname: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    status: {
      type: String,
    },
    subsubcategories: [subsubcategoryschema],
  },
  { timestamps: true }
);

const Subcategory = mongoose.model("Subcategory", subcategoryschema);

// schema for new category

const categoryschema = new Schema(
  {
    catname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    status: {
      type: String,
    },
    subcategories: [subcategoryschema],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categoryschema);

module.exports = { Subsubcategory, Subcategory, Category };

const mongoose = require('mongoose');

// Define the schema for the accessories_category
const accessoriesCategorySchema = new mongoose.Schema({
  
  category_name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: false, // Nullable
  },
});

// Create the model
const AccessoriesCategory = mongoose.model('AccessoriesCategory', accessoriesCategorySchema);

module.exports = AccessoriesCategory;
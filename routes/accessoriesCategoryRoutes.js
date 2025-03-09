const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
} = require('../controllers/accessoriesCategoryController'); // Adjust the path to your controller

// Routes
router.post('/', createCategory); // Create a new category
router.get('/', getAllCategories); // Get all categories
router.get('/:id', getCategoryById); // Get a single category by ID
router.delete('/:id', deleteCategory); // Delete a category by ID

module.exports = router;
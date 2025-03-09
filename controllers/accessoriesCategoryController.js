const AccessoriesCategory = require('../models/accessories_category'); // Adjust the path to your model

// Create a new category (POST)
const createCategory = async (req, res) => {
  try {
    const { category_name, description } = req.body;

    // Validate required fields
    if (!category_name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    // Create a new category
    const newCategory = new AccessoriesCategory({
      category_name,
      description,
    });

    // Save the category to the database
    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error: error.message });
  }
};

// Get all categories (GET)
const getAllCategories = async (req, res) => {
  try {
    const categories = await AccessoriesCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};

// Get a single category by ID (GET)
const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Find the category by ID
    const category = await AccessoriesCategory.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error: error.message });
  }
};

// Delete a category by ID (DELETE)
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Find and delete the category by ID
    const deletedCategory = await AccessoriesCategory.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully', deletedCategory });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
};
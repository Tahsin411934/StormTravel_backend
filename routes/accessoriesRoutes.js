const express = require('express');
const { createAccessories, getAccessories, getAccessoriesById, getAccessoriesByCategory } = require('../controllers/accessariesController');

const router = express.Router();

router.post('/', createAccessories);
router.get('/', getAccessories);
router.get('/:id', getAccessoriesById);
router.get('/:id/:category', getAccessoriesByCategory);

module.exports = router;

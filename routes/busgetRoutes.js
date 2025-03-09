const express = require('express');
const router = express.Router();
const busController = require('../controllers/busgetController'); // Adjust the path as necessary

// Create a new bus
router.post('/buses', busController.createBus);

// Get all buses
router.get('/buses', busController.getAllBuses);

// Get a single bus by ID
router.get('/buses/:id', busController.getBusById);

// Update a bus by ID
router.put('/buses/:id', busController.updateBus);

// Delete a bus by ID
router.delete('/buses/:id', busController.deleteBus);

module.exports = router;
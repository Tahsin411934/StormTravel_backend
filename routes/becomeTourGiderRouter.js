const express = require('express');
const router = express.Router();
const { addBecomeTourGuide, getTourGuider, getTourGuiderById } = require('../controllers/becomeTourGiderController'); // Adjust path if needed

// Define the route and use the controller function
router.post('/add', addBecomeTourGuide);
router.get('/', getTourGuider);
router.get('/:id', getTourGuiderById);
router.get('/booking/:id', getTourGuiderById);

module.exports = router;
 
const express = require('express');
const router = express.Router();
const { addBecomeTourGuide, getTourGuider } = require('../controllers/becomeTourGiderController'); // Adjust path if needed

// Define the route and use the controller function
router.post('/add', addBecomeTourGuide);
router.get('/', getTourGuider);

module.exports = router;
 
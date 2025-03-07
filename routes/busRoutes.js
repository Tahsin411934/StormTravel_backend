const express = require('express');
const { addBusSchedule, getBusSchedulesByDate, getBusById, getBusSchedule } = require('../controllers/busController');

const router = express.Router();

// Route for bus schedule
router.post('/', addBusSchedule);
router.get('/', getBusSchedule);
router.get('/by-date', getBusSchedulesByDate);
router.get('/:id', getBusById);

module.exports = router;

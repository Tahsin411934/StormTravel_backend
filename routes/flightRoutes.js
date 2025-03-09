const express = require('express');
const route = express.Router();
const  { addFlightSchedule, getFlightSchedule, getFlightById, getBusSchedule } = require('../controllers/flightController')

route.post('/', addFlightSchedule);
route.get('/', getBusSchedule);
route.get('/by-date', getFlightSchedule);
route.get('/:id', getFlightById);

module.exports = route;
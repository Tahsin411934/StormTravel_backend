const express = require('express');
const route = express.Router();
const  { addFlightSchedule, getFlightSchedule, getFlightById } = require('../controllers/flightController')

route.post('/', addFlightSchedule);
route.get('/by-date', getFlightSchedule);
route.get('/:id', getFlightById);

module.exports = route;
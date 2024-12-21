const express = require('express');
const route = express.Router();
const  { addFlightSchedule, getFlightSchedule } = require('../controllers/flightController')

route.post('/', addFlightSchedule);
route.get('/by-date', getFlightSchedule);

module.exports = route;
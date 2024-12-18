const express = require('express');
const route = express.Router();
const  { addFlightSchedule } = require('../controllers/flightController')

route.post('/', addFlightSchedule);

module.exports = route;
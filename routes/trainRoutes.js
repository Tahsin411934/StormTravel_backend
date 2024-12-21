const express = require('express');
const route = express.Router();
const  { addTrainSchedule, getTrainSchedule } = require('../controllers/trainController')

route.post('/', addTrainSchedule);
route.get('/by-date', getTrainSchedule);

module.exports = route;
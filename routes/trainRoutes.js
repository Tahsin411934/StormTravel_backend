const express = require('express');
const route = express.Router();
const  { addTrainSchedule, getTrainSchedule, getTrainById, TrainSchedule } = require('../controllers/trainController')

route.post('/', addTrainSchedule);
route.get('/', TrainSchedule);
route.get('/by-date', getTrainSchedule);
route.get('/:id', getTrainById);

module.exports = route;
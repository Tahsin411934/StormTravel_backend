const Flight = require('../models/flightSchedule')

const addFlightSchedule = async(req,res) =>{
 try {
    const NewFlightSchedule = new Flight(req.body);
     await NewFlightSchedule.save();
     res.status(200).json({ msg: ' created bus schedule'});

 } catch (error) {
    res.status(500).json({ msg: 'Error creating schedule', error: error.message });
 }
}

module.exports = { addFlightSchedule }
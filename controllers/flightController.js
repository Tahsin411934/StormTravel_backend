const Flight = require('../models/flightSchedule');

const addFlightSchedule = async (req, res) => {
   try {
      const newFlightSchedule = new Flight(req.body);
      await newFlightSchedule.save();
      res.status(200).json({ msg: 'Created flight schedule' });
   } catch (error) {
      res.status(500).json({ msg: 'Error creating schedule', error: error.message });
   }
};

const getFlightSchedule = async (req, res) => {
   const { date, from, to } = req.query;
console.log(date, from, to )
   if (!date || !from || !to || date === 'null') {
      return res.status(400).json({ msg: 'Date, from, and to fields are required' });
   }

   try {
      const flightSchedules = await Flight.find({
         date: {
            $gte: new Date(date),
            $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
         },
         from,
         to,
      });

      if (flightSchedules.length === 0) {
         return res.status(404).json({ msg: 'No flight schedules found for the specified date and route' });
      }

      res.json(flightSchedules);
   } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error fetching flight schedules', error: error.message });
   }
};


const getFlightById = async (req, res) => {
   const {id} = req.params;
   try {
       const flight = await Flight.findById(id)
       if (!flight) {
           return res.status(404).json({ msg: 'flight not found' });
       }
       res.json(flight);
   } catch (error) {
       console.log(error)
       res.status(500).json({ msg: 'Error fetching flight', error: error.message });
   }
   
};

module.exports = { addFlightSchedule, getFlightSchedule, getFlightById };

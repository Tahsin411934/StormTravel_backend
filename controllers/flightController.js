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

   if (!date || !from || !to || date === 'null') {
       return res.status(400).json({ msg: 'Date, from, and to fields are required' });
   }

   try {
       // Search for flights on the requested date
       const requestedDateFlights = await Flight.find({
           date: {
               $gte: new Date(date),
               $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
           },
           from,
           to,
       });

       // If flights exist on the requested date, return them
       if (requestedDateFlights.length > 0) {
           return res.json(requestedDateFlights);
       }

       // If no flights found, search for the next available flights (limit 5)
       const nextFlights = await Flight.find({
           date: { $gt: new Date(date) }, // Find flights after the requested date
           from,
           to,
       })
           .sort({ date: 1 }) // Sort by date (ascending)
           .limit(5); // Limit to 5 flights

       if (nextFlights.length > 0) {
           return res.json(
            
                nextFlights,
           );
       }

       // If no flights found at all, return an empty array
       return res.json([]);

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

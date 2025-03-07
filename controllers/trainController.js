const Train = require('../models/trainSchedule');

const addTrainSchedule = async (req, res) => {
   try {
      const newTrainSchedule = new Train(req.body);
      await newTrainSchedule.save();
      res.status(200).json({ msg: 'Created Train schedule' });
   } catch (error) {
      res.status(500).json({ msg: 'Error creating schedule', error: error.message });
   }
};

const getTrainSchedule = async (req, res) => {
   const { date, from, to } = req.query;
   
   console.log("Requested Date:", date, "From:", from, "To:", to);

   if (!date || !from || !to || date === 'null') {
       return res.status(400).json({ msg: 'Date, from, and to fields are required' });
   }

   try {
       // Normalize the date for filtering
       const startOfDay = new Date(date);
       startOfDay.setUTCHours(0, 0, 0, 0);

       const endOfDay = new Date(date);
       endOfDay.setUTCHours(23, 59, 59, 999);

       // Fetch train schedules for the requested date
       const trainSchedules = await Train.find({
           date: { $gte: startOfDay, $lt: endOfDay },
           from,
           to
       });

       // If train schedules exist for the requested date, return them
       if (trainSchedules.length > 0) {
           return res.json(trainSchedules);
       }

       // If no schedules found, fetch the next available train schedules (limit 5)
       const nextTrainSchedules = await Train.find({
           date: { $gt: endOfDay }, // Look for trains after the requested date
           from,
           to
       })
           .sort({ date: 1 }) // Sort in ascending order
           .limit(5); // Limit to 5 schedules

       if (nextTrainSchedules.length > 0) {
           return res.json(
               
               nextTrainSchedules
           );
       }

       // If no trains are found at all
       return res.status(404).json({ msg: 'No train schedules available for the specified route' });

   } catch (error) {
       console.error(error);
       res.status(500).json({ msg: 'Error fetching train schedules', error: error.message });
   }
};


const getTrainById = async (req, res) => {
   const { id } = req.params;
   try {
      const train = await Train.findById(id)
      if (!train) {
         return res.status(404).json({ msg: 'train not found' });
      }
      res.json(train);
   } catch (error) {
      console.log(error)
      res.status(500).json({ msg: 'Error fetching train', error: error.message });
   }

};
module.exports = { addTrainSchedule, getTrainSchedule, getTrainById };

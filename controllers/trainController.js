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
console.log(date, from, to )
   if (!date || !from || !to || date === 'null') {
      return res.status(400).json({ msg: 'Date, from, and to fields are required' });
   }

   try {
      const trainSchedules = await Train.find({
         date: {
            $gte: new Date(date),
            $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
         },
         from,
         to,
      });

      if (trainSchedules.length === 0) {
         return res.status(404).json({ msg: 'No flight schedules found for the specified date and route' });
      }

      res.json(trainSchedules);
   } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error fetching flight schedules', error: error.message });
   }
};

module.exports = { addTrainSchedule, getTrainSchedule };

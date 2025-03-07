const BusSchedule = require('../models/busSchedule');

// Add new bus schedule
const addBusSchedule = async (req, res) => {
    try {
        const newBusSchedule = new BusSchedule(req.body);
        await newBusSchedule.save();
        res.json({ msg: 'Bus schedule created successfully', busSchedule: newBusSchedule });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error creating bus schedule', error: error.message });
    }
};

// Helper functions for random selection
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomPrice = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Locations, bus names, and classes to choose from
const locations = ["Dhaka", "Chattogram", "cox", "Sylhet"];
const busNames = ["Express Line", "City Rider", "GreenLine", "Sky Travels", "BlueLine"];
const classes = ["AC", "Non AC"];

// Insert new bus schedule every 6 minutes
// const insertBusScheduleEverySixMinutes = () => {
//     setInterval(async () => {
//         try {
//             // Select 'from' and 'to' randomly but ensure they aren't the same
//             let from = randomElement(locations);
//             let to;
//             do {
//                 to = randomElement(locations);
//             } while (from === to);

//             // Generate other random data
//             const scheduleData = {
//                 busNumber: Math.floor(Math.random() * 9000) + 1000, // 4-digit random number
//                 busName: randomElement(busNames),
//                 class: randomElement(classes),
//                 from,
//                 to,
//                 departureTime: new Date(),
//                 arrivalTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours later
//                 seatsAvailable: Math.floor(Math.random() * 30) + 20, // Random seats between 20 and 50
//                 price: randomPrice(500, 2000),
//                 date: new Date()
//             };
 
//             const newSchedule = new BusSchedule(scheduleData);
//             await newSchedule.save();
//             console.log("New bus schedule inserted:", newSchedule);
//         } catch (error) {
//             console.error("Error inserting bus schedule:", error);
//         }
//     }, 360000); // Inserts data every 6 minutes
// };
const getBusSchedule = async (req, res) => {
    try {
        // Fetch and sort bus schedules by date in descending order
        const busSchedules = await BusSchedule.find().sort({ date: -1 });
        
        if (busSchedules.length === 0) {
            return res.status(404).json({ msg: "No bus schedules available" });
        }
        
        res.status(200).json(busSchedules);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



const getBusSchedulesByDate = async (req, res) => {
    const { date, from, to } = req.query;

    if (!date || !from || !to || date === 'null') {
        return res.status(400).json({ msg: 'Date, from, and to fields are required' });
    }

    try {
        // Normalize the date for filtering
        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);

        console.log("Start of Day:", startOfDay);
        console.log("End of Day:", endOfDay);

        // Fetch bus schedules for the requested date
        const busSchedules = await BusSchedule.find({
            date: { $gte: startOfDay, $lt: endOfDay },
            from,
            to
        });

        // If schedules exist for the requested date, return them
        if (busSchedules.length > 0) {
            return res.json(busSchedules);
        }

        // If no schedules found, fetch the next available schedules (limit 5)
        const nextBusSchedules = await BusSchedule.find({
            date: { $gt: endOfDay }, // Look for schedules after the requested date
            from,
            to
        })
            .sort({ date: 1 }) // Sort in ascending order
            .limit(5); // Limit to 5 schedules

        if (nextBusSchedules.length > 0) {
            return res.json(
               
                 nextBusSchedules
            );
        }

        // If no buses are found at all
        return res.status(404).json({ msg: 'No bus schedules available for the specified route' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error fetching bus schedules', error: error.message });
    }
};



const getBusById = async (req, res) => {
    const {id} = req.params;
    try {
        const bus = await BusSchedule.findById(id)
        if (!bus) {
            return res.status(404).json({ msg: 'Bus not found' });
        }
        res.json(bus);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error fetching bus', error: error.message });
    }
    
};


// Start the schedule insertion function every 6 minutes
// insertBusScheduleEverySixMinutes();

// Export the functions
module.exports = { addBusSchedule, getBusSchedulesByDate, getBusById, getBusSchedule };
 
const BecomeTourGuide = require('../models/beComeATourGider'); // corrected name and path

const addBecomeTourGuide = async (req, res) => { // added const and updated function name
    try {
        const newBecomeTourGuide = new BecomeTourGuide(req.body); // updated instance name
        await newBecomeTourGuide.save();
        res.status(200).json({ msg: 'Created become tour guide request' });
    } catch (error) {
        res.status(500).json({ msg: 'Error creating become tour guide request' });
    }
}


const getTourGuider = async (req, res)=>{
    try {
        const TourGuider = await BecomeTourGuide.find({isActive: true});
        res.json(TourGuider);
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ msg: 'Error fetching packages', error: error.message });
    }
}



module.exports = { addBecomeTourGuide, getTourGuider };

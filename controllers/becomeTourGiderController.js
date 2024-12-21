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
const  getTourGuiderById = async(req,res)=>{
    try {
        const guider = await BecomeTourGuide.findById(req.params.id);
        if (!guider) {
            return res.status(404).json({ msg: 'guider not found' });
        }
        res.json(guider);
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ msg: 'Error fetching package', error: error.message });
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



module.exports = { addBecomeTourGuide, getTourGuider, getTourGuiderById };

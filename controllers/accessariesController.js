const Accessories = require('../models/accessories.js');

const createAccessories = async (req, res) => {
    try {
        const newAccessories = new Accessories(req.body);
        await newAccessories.save();
        res.json({ msg: 'Accessories created successfully', accessories: newAccessories });
    } catch (error) {
        res.status(500).json({ msg: 'Error creating accessories', error: error.message });
    }
};


const  getAccessories = async (req, res) => {
    try {
        const accessories = await Accessories.find();
        res.json(accessories);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching accessories', error: error.message });
    }
} 

const getAccessoriesById = async(req,res)=>{
    try {
        const accessorie = await Accessories.findById(req.params.id);
        if (!accessorie) {
            return res.status(404).json({ msg: 'Package not found' });
        }
        res.json(accessorie);
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ msg: 'Error fetching package', error: error.message });
    }
}
const getAccessoriesByCategory = async (req, res) => {
    try {
        const accessories = await Accessories.find({ category: req.params.category });

        if (!accessories || accessories.length === 0) {
            return res.status(404).json({ msg: 'No accessories found for this category' });
        }

        res.json(accessories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error fetching accessories', error: error.message });
    }
};


module.exports = { createAccessories, getAccessories, getAccessoriesById, getAccessoriesByCategory };

const Bus = require('../models/bus'); // Adjust the path as necessary

// Create a new bus
exports.createBus = async (req, res) => {
    try {
        const bus = new Bus(req.body);
        await bus.save();
        res.status(201).send(bus);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all buses
exports.getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.find({});
        res.status(200).send(buses);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a single bus by ID
exports.getBusById = async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id);
        if (!bus) {
            return res.status(404).send();
        }
        res.status(200).send(bus);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a bus by ID
exports.updateBus = async (req, res) => {
    try {
        const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!bus) {
            return res.status(404).send();
        }
        res.status(200).send(bus);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a bus by ID
exports.deleteBus = async (req, res) => {
    try {
        const bus = await Bus.findByIdAndDelete(req.params.id);
        if (!bus) {
            return res.status(404).send();
        }
        res.status(200).send(bus);
    } catch (error) {
        res.status(500).send(error);
    }
};
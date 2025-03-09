const {mongoose} = require("mongoose");

const busSchema = new mongoose.Schema({
    busNumber: {  type: String, required: true },
    busName: { type:  String, required: true },
    description: { type:  String, required: false },
});

const  Bus
 = mongoose.model('Bus', busSchema);

module.exports = Bus;
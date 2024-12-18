const { default: mongoose } = require('mongoose');



const flightSchema = new mongoose.Schema({
    flightNumber: {  type: String, required: true },
    flightName: { type:  String, required: true },
    class: {type:  String, required: true },
    from :{ type : String, required: true},
    to : { type : String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    seatsAvailable: { type: Number, required: true },
    price: { type: Number, required: true },
    date:  { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})
const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
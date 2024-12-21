const { default: mongoose } = require("mongoose");

const trainSeduleSchema = new  mongoose.Schema({
    trainNumber: {  type: String, required: true },
    trainName: { type:  String, required: true },
    type: {type:  String, required: true },
    from :{ type : String, required: true},
    to : { type : String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    Shovon_chair: { type: Number, required: true },
    First_class_chair: { type: Number, required: true },
    First_class: { type: Number, required: true },
    AC: { type: Number, required: true },
    price: { type: Number, required: true },
    date:  { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const  TrainSchedule = mongoose.model('TrainSchedule', trainSeduleSchema);

module.exports = TrainSchedule;

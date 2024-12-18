const mongoose = require('mongoose');

const becomeTourGiderSchema= new mongoose.Schema({
    name: {type: String, required: true},
    mobileNumber: {type: String, required: true},
    email: {type: String, required: true},
    experience: {type: String, required: true},
    certification: {type: String, required: true},
    price: {type: Number, required: true},
    aboutMe: {type: String, required: true},
    image: {type: String, required: true},
    isActive: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}

})

const BecomeTourGider = mongoose.model('BecomeTourGider', becomeTourGiderSchema);

module.exports = BecomeTourGider;
const {default:mongoose} = require("mongoose");
const TicketBookingSchema = new mongoose.Schema({
    userName:{type:String, required: true},
    email:{type:String, required: true},
    call:{type:String, required: true},
    category:{type:String, required: true},
    totalSeat:{type:Number, required: true},
    totalPrice:{type:Number, required: true},
    
})

const TicketBooking = mongoose.model('TicketBooking',TicketBookingSchema )
module.exports = TicketBooking;
const { default: mongoose } = require("mongoose");

const BookingSchema = new mongoose.Schema({
  travelers: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d+$/, "Phone number must contain only digits"], 
  },
  emailAddress: {
    type: String,
    required: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  extras: {
    premiumFood: {
      type: Boolean,
      default: false,
    },
    refreshRoom: {
      type: Boolean,
      default: false,
    },
  },
  totalPrice: {
    type: Number,
    required: true,
    min: [0, "Total price must be a positive number"], 
  },
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Booking", BookingSchema);

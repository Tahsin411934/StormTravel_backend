const TicketBooking = require("../models/ticketBooking");

// POST request for adding a new ticket booking
const addTicketBooking = async (req, res) => {
  try {
    const newBooking = new TicketBooking(req.body);
    await newBooking.save();
    res.status(201).json({ msg: 'Booking added successfully' }); // 201 is for resource creation
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' }); // Generic server error response
  }
};

// GET request for retrieving a ticket booking by ID
const getTicketBookingById = async (req, res) => {
  try {
    const booking = await TicketBooking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' }); // 404 if booking is not found
    }
    res.status(200).json(booking); // Return the found booking
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' }); // Generic server error response
  }
};

module.exports = { addTicketBooking, getTicketBookingById };

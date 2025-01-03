const Booking = require("../models/booking"); // Adjust the path to your Booking model

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const bookingData = req.body;

    // Create a new booking instance
    const newBooking = new Booking(bookingData);

    // Save the booking to the database
    const savedBooking = await newBooking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: savedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating booking",
      error: error.message,
    });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving bookings",
      error: error.message,
    });
  }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking retrieved successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving booking",
      error: error.message,
    });
  }
};

// Update a booking by ID
exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating booking",
      error: error.message,
    });
  }
};

// Delete a booking by ID
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
      data: deletedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting booking",
      error: error.message,
    });
  }
};

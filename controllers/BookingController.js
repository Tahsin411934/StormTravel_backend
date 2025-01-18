const Booking = require("../models/booking"); // Adjust the path to your Booking model

// Function to handle errors
const handleError = (res, error, message) => {
  res.status(500).json({
    success: false,
    message: message || "An error occurred",
    error: error.message,
  });
};

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
    handleError(res, error, "Error creating booking");
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
    handleError(res, error, "Error retrieving bookings");
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
    handleError(res, error, "Error retrieving booking");
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
    handleError(res, error, "Error updating booking");
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
    handleError(res, error, "Error deleting booking");
  }
};
 
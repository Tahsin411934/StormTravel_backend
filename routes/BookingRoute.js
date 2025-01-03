const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/BookingController"); // Adjust the path

router.post("/bookings", BookingController.createBooking);
router.get("/bookings", BookingController.getAllBookings);
router.get("/bookings/:id", BookingController.getBookingById);
router.put("/bookings/:id", BookingController.updateBooking);
router.delete("/bookings/:id", BookingController.deleteBooking);

module.exports = router;

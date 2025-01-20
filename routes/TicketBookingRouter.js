const express = require("express");
const router = express.Router();
const { addTicketBooking, getTicketBookingById } = require("../controllers/ticketBookingController");  // Make sure this path is correct

// Define the POST route for adding a ticket booking
router.post("/", addTicketBooking);  // Route handler
router.get("/:id", getTicketBookingById);  // Route handler

module.exports = router;

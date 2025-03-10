const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongodb'); // MongoDB connection
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/busRoutes');
const packageRoutes = require('./routes/packageRoutes');
const accessoriesRoutes = require('./routes/accessoriesRoutes');
const flightRoutes = require('./routes/flightRoutes');
const trainRoutes = require('./routes/trainRoutes');
const becomeTourGiderRoutes = require('./routes/becomeTourGiderRouter');
const bookingRoutes = require("./routes/BookingRoute"); 
const TicketBookingRouter = require("./routes/TicketBookingRouter"); 
const accessoriesCategoryRoutes = require("./routes/accessoriesCategoryRoutes"); 
const busgetRoutes = require("./routes/busgetRoutes"); 
const app = express(); 

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database
connectDB();
 
// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api', paymentRoutes);
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/bus-schedule', busRoutes); // Bus schedule routes
app.use('/api/train-schedule', trainRoutes); // Bus schedule routes
app.use('/api/flight',  flightRoutes);
app.use('/api/ticketBooking',  TicketBookingRouter);
app.use('/api/package', packageRoutes)
app.use('/api/accessories', accessoriesRoutes)
app.use("/api/booking", bookingRoutes); 
app.use('/api/becomeTourGider',  becomeTourGiderRoutes);
app.use('/api/categories',  accessoriesCategoryRoutes);
app.use('/api',  busgetRoutes);


module.exports = app;
 
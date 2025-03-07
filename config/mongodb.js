const mongoose = require('mongoose');
let isConnected = false;  // Track connection status

const connectDB = async () => {
  if (isConnected) {
    console.log('MongoDB already connected');
    return;  // Skip the connection if already established
  }

  try {
    // Establish connection to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit if the connection fails
  }
};

module.exports = connectDB;

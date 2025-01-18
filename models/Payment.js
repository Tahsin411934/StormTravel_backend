// models/Payment.js
const mongoose = require('mongoose');

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const paymentSchema = new mongoose.Schema({
    transaction_id: { 
        type: String, 
        required: true, 
        unique: true,  // Ensures transaction_id is unique
    },
    customer_name: { 
        type: String, 
        required: true 
    },
    customer_email: { 
        type: String, 
        required: true, 
        match: [emailRegex, 'Please provide a valid email address'] // Email format validation
    },
    amount: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        default: 'pending'  // Default status is 'pending'
    },
    payment_url: { 
        type: String 
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model('Payment', paymentSchema);

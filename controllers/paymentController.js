// controllers/paymentController.js
const axios = require('axios');
const Payment = require('../models/Payment');

const store_id = 'your-store-id';
const store_passwd = 'your-store-password';

// Initiate payment
const initiatePayment = async (req, res) => {
    const { amount, transaction_id, customer_name, customer_email, customer_address, customer_city, customer_country } = req.body;

    const paymentData = {
        store_id,
        store_passwd,
        total_amount: amount,
        currency: 'BDT',
        tran_id: transaction_id,
        success_url: 'http://localhost:3000/payment/success',
        fail_url: 'http://localhost:3000/payment/fail',
        cancel_url: 'http://localhost:3000/payment/cancel',
        cus_name: customer_name,
        cus_email: customer_email,
        cus_add1: customer_address,
        cus_city: customer_city,
        cus_country: customer_country,
    };

    try {
        const response = await axios.post('https://sandbox.sslcommerz.com/gwprocess/v4/api.php', paymentData);
        const paymentResponse = response.data;

        if (paymentResponse.status === 'SUCCESS') {
            // Save payment data to database
            const payment = new Payment({
                transaction_id,
                customer_name,
                customer_email,
                amount,
                payment_url: paymentResponse.url
            });

            await payment.save();
            res.send({ paymentUrl: paymentResponse.url });
        } else {
            res.status(500).json({ error: 'Payment initiation failed' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Payment success callback (SSL Commerz)
const paymentSuccess = async (req, res) => {
    // Update payment status in database
    const { tran_id } = req.query;
    await Payment.updateOne({ transaction_id: tran_id }, { $set: { status: 'success' } });

    res.send('Payment Successful');
};

// Payment failure callback (SSL Commerz)
const paymentFailure = async (req, res) => {
    // Update payment status in database
    const { tran_id } = req.query;
    await Payment.updateOne({ transaction_id: tran_id }, { $set: { status: 'failed' } });

    res.send('Payment Failed');
};

module.exports = { initiatePayment, paymentSuccess, paymentFailure };

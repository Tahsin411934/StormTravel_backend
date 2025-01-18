// routes/paymentRoutes.js
const express = require('express');
const { initiatePayment, paymentSuccess, paymentFailure } = require('../controllers/paymentController');
const router = express.Router();

router.post('/payment', initiatePayment);
router.get('/payment/success', paymentSuccess);
router.get('/payment/fail', paymentFailure);

module.exports = router;

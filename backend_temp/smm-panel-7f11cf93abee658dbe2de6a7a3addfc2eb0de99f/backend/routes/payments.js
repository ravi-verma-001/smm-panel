const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Create Payment Request
router.post('/create', auth, async (req, res) => {
    const { amount, utr } = req.body;

    try {
        // Check if UTR already exists
        const existingPayment = await Payment.findOne({ utr });
        if (existingPayment) {
            return res.status(400).json({ message: 'Transaction ID (UTR) already exists' });
        }

        const newPayment = new Payment({
            user: req.user.id,
            amount,
            utr,
            status: 'pending' // Default status
        });

        await newPayment.save();
        res.json({ message: 'Payment request submitted successfully', payment: newPayment });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get Payment History for User
router.get('/history', auth, async (req, res) => {
    try {
        const payments = await Payment.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(payments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

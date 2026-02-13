const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const User = require('../models/User');

// Middleware to simulate user auth (In a real app, use actual JWT auth middleware)
// For now, we'll assume the frontend sends a 'username' or 'userId' in headers or body for demo.
// OR better, we make a simple middleware that gets user by ID from header for this demo.
// Middleware to simulate user auth
const demoAuthMiddleware = async (req, res, next) => {
    try {
        // Use email for demo purposes (stable across resets)
        const userEmail = req.headers['x-user-email'] || 'test@user.com';

        let user = await User.findOne({ email: userEmail });

        // Auto-create demo user if missing
        if (!user) {
            user = new User({
                username: 'TestUser',
                email: userEmail,
                walletBalance: 0
            });
            await user.save();
        }

        req.userId = user._id;
        next();
    } catch (err) {
        console.error("Auth Middleware Error:", err);
        return res.status(500).json({ message: 'Server Error during Auth' });
    }
};

// Create Payment Request
router.post('/create', demoAuthMiddleware, async (req, res) => {
    const { amount, utr } = req.body;

    try {
        // Check if UTR already exists
        const existingPayment = await Payment.findOne({ utr });
        if (existingPayment) {
            return res.status(400).json({ message: 'Transaction ID (UTR) already exists' });
        }

        const newPayment = new Payment({
            user: req.userId,
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
router.get('/history', demoAuthMiddleware, async (req, res) => {
    try {
        const payments = await Payment.find({ user: req.userId }).sort({ createdAt: -1 });
        res.json(payments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

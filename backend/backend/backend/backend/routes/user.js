const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware to simulate user auth by email
const demoAuthMiddleware = async (req, res, next) => {
    try {
        const userEmail = req.headers['x-user-email'] || 'test@user.com';
        let user = await User.findOne({ email: userEmail });

        if (!user) {
            // For safety in this demo, return error if not found, 
            // but strictly payments.js creates it. 
            // We'll return 404 or create here too to be safe.
            user = new User({ username: 'TestUser', email: userEmail, walletBalance: 0 });
            await user.save();
        }

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get User Profile (Balance)
router.get('/me', demoAuthMiddleware, async (req, res) => {
    try {
        res.json({
            username: req.user.username,
            email: req.user.email,
            walletBalance: req.user.walletBalance
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

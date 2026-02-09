const express = require('express');
const router = express.Router();
const User = require('../models/User');

const auth = require('../middleware/auth');
const Order = require('../models/Order');

// Get User Profile (Balance & Stats)
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        // Calculate total spent
        const orders = await Order.find({ user: req.user.id });
        const totalSpent = orders.reduce((sum, order) => sum + (order.charge || 0), 0);
        const totalOrders = orders.length;

        res.json({
            username: user.username,
            email: user.email,
            walletBalance: user.walletBalance,
            totalSpent,
            totalOrders,
            isAdmin: user.isAdmin
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');

const auth = require('../middleware/auth');
const Order = require('../models/Order');

// Get User Profile (Balance & Stats)
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        // Optimized aggregation to calculate total spent and orders
        const stats = await Order.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
            {
                $group: {
                    _id: null,
                    totalSpent: { $sum: "$charge" },
                    completedOrders: {
                        $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] }
                    }
                }
            }
        ]);

        const safeStats = stats.length > 0 ? stats[0] : { totalSpent: 0, completedOrders: 0 };

        res.json({
            username: user.username,
            email: user.email,
            walletBalance: user.walletBalance,
            totalSpent: safeStats.totalSpent,
            totalOrders: safeStats.completedOrders,
            isAdmin: user.isAdmin
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

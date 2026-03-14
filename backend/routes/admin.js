const express = require('express');
const router = express.Router();
console.log('--- ADMIN ROUTES FILE LOADED: c:\\Users\\raviv\\OneDrive\\Desktop\\SMMPANEL\\backend\\routes\\admin.js ---');
const authMiddleware = require('../middleware/authMiddleware');
const Payment = require('../models/Payment');
const User = require('../models/User');
const Order = require('../models/Order');

// Get Admin Dashboard Stats
router.get('/stats', authMiddleware, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({});
        const pendingRequests = await Payment.countDocuments({ status: 'pending' });

        // Calculate Revenue (Selling Price - API Cost) for completed orders
        // Note: For older orders without apiCost, we use the fallback estimation logic
        const orders = await Order.find({ status: 'completed' });
        
        let totalRevenue = 0;
        orders.forEach(order => {
            const cost = order.apiCost || (order.charge / 1.30);
            totalRevenue += (order.charge - cost);
        });

        res.json({
            totalUsers,
            pendingRequests,
            totalRevenue: parseFloat(totalRevenue.toFixed(2))
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get Pending Payments
router.get('/payments/pending', authMiddleware, async (req, res) => {
    try {
        console.log("Admin: Fetching pending payments...");
        const payments = await Payment.find({ status: 'pending' })
            .populate('user', 'username email') // Get user details
            .sort({ createdAt: -1 });

        console.log(`Admin: Found ${payments.length} pending payments.`);
        if (payments.length > 0) {
            console.log("Sample payment:", JSON.stringify(payments[0], null, 2));
        }
        res.json(payments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Approve Payment
router.post('/payments/approve/:id', authMiddleware, async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        if (payment.status !== 'pending') {
            return res.status(400).json({ message: 'Payment is already processed' });
        }

        // Start Session for Transaction (if replica set enabled, otherwise basic flow)
        // For simplicity, we'll do basic checks without heavy transaction wrapper unless critical

        payment.status = 'approved';
        await payment.save();

        // Add Balance to User
        const user = await User.findById(payment.user);
        if (user) {
            user.walletBalance += payment.amount;
            await user.save();
        }

        res.json({ message: 'Payment approved and wallet updated', payment });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Reject Payment
router.post('/payments/reject/:id', authMiddleware, async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        if (payment.status !== 'pending') {
            return res.status(400).json({ message: 'Payment is already processed' });
        }

        payment.status = 'rejected';
        await payment.save();

        res.json({ message: 'Payment rejected', payment });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update Service Average Time
router.put('/services/:id/time', authMiddleware, async (req, res) => {
    try {
        const { averageTime } = req.body;
        const Service = require('../models/Service'); // Import here as it's not at the top

        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        service.averageTime = averageTime;
        await service.save();

        res.json({ message: 'Service average time updated', service });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

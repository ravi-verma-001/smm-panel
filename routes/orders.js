const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Service = require('../models/Service');
const User = require('../models/User');
const providerApi = require('../utils/japApi'); // Actually generic providerApi now
// Alias for consistency if code uses japApi
const japApi = providerApi;

// Middleware for demo auth (same as payments.js, should be centralized ideally)
const demoAuthMiddleware = async (req, res, next) => {
    try {
        const userEmail = req.headers['x-user-email'] || 'test@user.com';
        let user = await User.findOne({ email: userEmail });
        if (!user) {
            user = new User({ username: 'TestUser', email: userEmail, walletBalance: 0 });
            await user.save();
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(500).json({ message: 'Auth Error' });
    }
};

// 1. Place New Order
router.post('/create', demoAuthMiddleware, async (req, res) => {
    const { serviceId, link, quantity } = req.body;

    // Validate Input
    if (!serviceId || !link || !quantity) {
        return res.status(400).json({ message: 'Please provide serviceId, link, and quantity' });
    }

    try {
        // A. Find Service
        // Note: serviceId passed from frontend is the providerServiceId
        const service = await Service.findOne({ providerServiceId: serviceId });

        if (!service) {
            return res.status(404).json({ message: 'Service not found in database. Please contact admin.' });
        }

        // B. Calculate Cost
        const charge = (service.rate * quantity) / 1000;

        console.log(`[ORDER] User: ${req.user.email} | Service: ${service.name} | Rate: ${service.rate} | Qty: ${quantity}`);
        console.log(`[ORDER] Calculated Charge: ${charge}`);

        // C. Check User Balance
        const user = await User.findById(req.user._id);
        console.log(`[ORDER] Balance Before: ${user.walletBalance}`);

        if (user.walletBalance < charge) {
            return res.status(400).json({ message: `Insufficient balance. Required: $${charge.toFixed(4)}` });
        }

        // D. Validate Min/Max
        if (quantity < service.min || quantity > service.max) {
            return res.status(400).json({ message: `Quantity must be between ${service.min} and ${service.max}` });
        }

        // E. Place Order on Provider (SMMFollows)
        try {
            console.log(`[ORDER] Sending to Provider...`);
            const providerResponse = await japApi.addOrder(serviceId, link, quantity);
            console.log(`[ORDER] Provider Response:`, providerResponse);

            // SMMFollows might return { error: '...' } even on 200 OK
            if (providerResponse.error) {
                return res.status(400).json({ message: 'Provider Error: ' + providerResponse.error });
            }

            const orderRef = providerResponse.order;

            // F. Deduct Balance & Save Order
            user.walletBalance -= charge;
            await user.save();
            console.log(`[ORDER] Balance Deducted. New Balance: ${user.walletBalance}`);

            const newOrder = new Order({
                user: user._id,
                service: service._id,
                externalOrderId: orderRef,
                link,
                quantity,
                charge,
                status: 'pending'
            });

            await newOrder.save();

            res.json({
                message: 'Order placed successfully!',
                orderId: newOrder._id,
                charge: charge,
                balance: user.walletBalance,
                externalOrderId: orderRef
            });

        } catch (providerError) {
            console.error("Provider Order Failed:", providerError.response ? providerError.response.data : providerError.message);
            // Don't deduct balance if provider fails!
            return res.status(500).json({ message: 'Failed to place order with provider.' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;

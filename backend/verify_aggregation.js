const mongoose = require('mongoose');
const Order = require('./models/Order');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const runVerification = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smmpanel');
        console.log('MongoDB Connected');

        // cached user id from previous interactions or fetch one
        // Let's try to find a user with orders
        const user = await User.findOne();
        if (!user) {
            console.log('No users found to test.');
            process.exit(0);
        }

        console.log(`Testing aggregation for user: ${user.username} (${user._id})`);

        const start = Date.now();

        const stats = await Order.aggregate([
            { $match: { user: user._id } },
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

        const duration = Date.now() - start;
        console.log(`Aggregation took ${duration}ms`);
        console.log('Stats:', stats);

        if (stats.length > 0) {
            console.log('Total Spent:', stats[0].totalSpent);
            console.log('Completed Orders:', stats[0].completedOrders);
        } else {
            console.log('No orders found for this user.');
        }
    } catch (err) {
        console.error('Verification failed:', err);
    } finally {
        await mongoose.disconnect();
    }
};

runVerification();

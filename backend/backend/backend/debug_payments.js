const mongoose = require('mongoose');
const Payment = require('./models/Payment');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smmpanel')
    .then(() => {
        console.log('MongoDB Connected');
        checkPayments();
    })
    .catch(err => console.log(err));

async function checkPayments() {
    try {
        const users = await User.find({});
        console.log('--- ALL USERS ---');
        console.log(users);

        const payments = await Payment.find({});
        console.log('--- ALL PAYMENTS ---');
        console.log(JSON.stringify(payments, null, 2));

        // Check pending specifically
        const pending = await Payment.find({ status: 'pending' });
        console.log(`--- PENDING COUNT in DB: ${pending.length} ---`);
        if (pending.length > 0) {
            console.log("First pending payment user ID:", pending[0].user);
            const user = await User.findById(pending[0].user);
            console.log("Resolved User:", user);
        }

    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
}

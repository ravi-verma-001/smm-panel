const mongoose = require('mongoose');
const User = require('./models/User');
const Payment = require('./models/Payment');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smmpanel')
    .then(async () => {
        console.log('MongoDB Connected');
        await reproduceBug();
    })
    .catch(err => console.error(err));

async function reproduceBug() {
    try {
        // 1. Create User
        const email = 'bug_test_' + Date.now() + '@example.com';
        const user = new User({
            username: 'BugTestUser',
            email: email,
            walletBalance: 0
        });
        await user.save();
        console.log(`Created user ${user.email} with balance ${user.walletBalance}`);

        // 2. Create Payment
        const payment = new Payment({
            user: user._id,
            amount: 100,
            utr: 'UTR_' + Date.now(),
            status: 'pending'
        });
        await payment.save();
        console.log(`Created payment ${payment._id} for amount ${payment.amount}`);

        // 3. Simulate Approve Logic (copying from admin.js route)
        // payment is already fetched, but let's re-fetch to be true to route logic
        const paymentToApprove = await Payment.findById(payment._id);

        if (!paymentToApprove) {
            console.error('Payment not found');
            return;
        }

        paymentToApprove.status = 'approved';
        await paymentToApprove.save();
        console.log('Payment status updated to approved');

        // Add Balance to User
        const userToUpdate = await User.findById(paymentToApprove.user);
        if (userToUpdate) {
            console.log(`Before update: Balance is ${userToUpdate.walletBalance}`);
            // Explicitly force number conversion to be safe, though schema should handle it
            userToUpdate.walletBalance += Number(paymentToApprove.amount);
            await userToUpdate.save();
            console.log(`After update: Balance is ${userToUpdate.walletBalance}`);
        } else {
            console.error('User not found during update');
        }

        // 4. Verification
        const verifyUser = await User.findById(user._id);
        console.log(`Final Database Balance: ${verifyUser.walletBalance}`);

        if (verifyUser.walletBalance === 100) {
            console.log('SUCCESS: Balance updated correctly.');
        } else {
            console.log('FAILURE: Balance not updated.');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error during reproduction:', error);
        process.exit(1);
    }
}

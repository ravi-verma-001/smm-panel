const mongoose = require('mongoose');
const User = require('./models/User');
const Service = require('./models/Service');
const dotenv = require('dotenv');

dotenv.config();

const simulateOrder = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smmpanel');
        console.log("Connected to DB");

        const userEmail = 'test@user.com';
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            console.log("User not found!");
            return;
        }

        console.log(`Initial Balance: ${user.walletBalance} (Type: ${typeof user.walletBalance})`);

        // Fetch Service 17435
        const serviceId = 17435;
        const service = await Service.findOne({ providerServiceId: serviceId });

        if (!service) {
            console.log("Service not found");
            return;
        }

        const quantity = 10; // Small quantity
        const charge = (service.rate * quantity) / 1000;
        console.log(`Service Rate: ${service.rate}, Quantity: ${quantity}, Charge: ${charge}`);

        if (user.walletBalance < charge) {
            console.log("Insufficient balance");
            return;
        }

        console.log("Deducting...");
        user.walletBalance -= charge;
        console.log(`New Balance (in memory): ${user.walletBalance}`);

        await user.save();
        console.log("User Saved.");

        // Verification
        const refreshedUser = await User.findOne({ email: userEmail });
        console.log(`Final Balance (from DB): ${refreshedUser.walletBalance}`);

        process.exit(0);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

simulateOrder();

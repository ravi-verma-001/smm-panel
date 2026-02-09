const mongoose = require('mongoose');
const fs = require('fs');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smmpanel')
    .then(() => {
        console.log('MongoDB Connected');
        createUser();
    });

async function createUser() {
    try {
        let user = await User.findOne({ email: 'test@user.com' });
        if (!user) {
            user = new User({
                username: 'TestUser',
                email: 'test@user.com',
                walletBalance: 0
            });
            await user.save();
        }

        // Write ID to file
        fs.writeFileSync('user_id.txt', user._id.toString());
        console.log('USER ID SAVED');
        process.exit(0);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

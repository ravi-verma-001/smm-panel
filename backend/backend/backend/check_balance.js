const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smmpanel')
    .then(async () => {
        console.log('MongoDB Connected');
        const user = await User.findOne({ email: 'test@user.com' });
        if (!user) {
            console.log('User test@user.com NOT found.');
        } else {
            console.log('User FOUND:', user.email);
            console.log('Wallet Balance:', user.walletBalance);
        }
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const mongoose = require('mongoose');
const Admin = require('./models/Admin'); // Assuming Admin model exists
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smmpanel')
    .then(async () => {
        console.log('MongoDB Connected');
        const admin = await Admin.findOne({ email: 'admin@dovix.com' });
        if (!admin) {
            console.log('Admin NOT found.');
        } else {
            console.log('Admin FOUND:', admin.email);
        }
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

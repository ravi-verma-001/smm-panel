const mongoose = require('mongoose');
const Payment = require('./models/Payment');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smmpanel')
    .then(async () => {
        console.log('MongoDB Connected');
        await Payment.deleteMany({});
        console.log('All payments deleted.');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

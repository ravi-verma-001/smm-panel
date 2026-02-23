const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('../models/Service');

dotenv.config({ path: __dirname + '/../.env' });

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smmpanel')
    .then(async () => {
        console.log('Connected to DB');
        const count = await Service.countDocuments();
        console.log(`Total Services in DB: ${count}`);
        if (count > 0) {
            const sample = await Service.findOne();
            console.log('Sample Service Name:', sample.name);
            console.log('Sample Service Rate (INR):', sample.rate);
        }
        mongoose.connection.close();
    })
    .catch(err => console.error(err));

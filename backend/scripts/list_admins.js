const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const dotenv = require('dotenv');

dotenv.config({ path: __dirname + '/../.env' });

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smmpanel')
    .then(async () => {
        console.log('MongoDB Connected');
        const admins = await Admin.find({});
        console.log('Admins found in DB:', admins.map(a => a.email));
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

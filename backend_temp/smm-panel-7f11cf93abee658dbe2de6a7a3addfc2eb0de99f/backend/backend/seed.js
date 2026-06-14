const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const User = require('./models/User'); // Optional: seed a user too

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smmpanel')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const seedAdmin = async () => {
    try {
        // Check if admin exists
        const adminExists = await Admin.findOne({ email: 'admin@dovix.com' });
        if (adminExists) {
            console.log('Admin already exists');
            return;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash('admin123', salt);

        // Create Admin
        const admin = new Admin({
            email: 'admin@dovix.com',
            password: password
        });

        await admin.save();
        console.log('Admin created successfully');
        console.log('Email: admin@dovix.com');
        console.log('Password: admin123');

    } catch (error) {
        console.error('Error seeding admin:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedAdmin();

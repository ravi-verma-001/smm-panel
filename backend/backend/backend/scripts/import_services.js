const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env from parent directory (MUST BE BEFORE REQUIRING japApi)
dotenv.config({ path: path.join(__dirname, '../.env') });

const Service = require('../models/Service');
const providerApi = require('../utils/japApi');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smmpanel');
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('DB Connection Logic Error:', err);
        process.exit(1);
    }
};

const importServices = async () => {
    await connectDB();

    try {
        console.log('Fetching services from Provider...');
        const providerServices = await providerApi.getServices();

        if (!Array.isArray(providerServices)) {
            console.error('Error: Provider response is not an array.', providerServices);
            process.exit(1);
        }

        console.log(`Provider returned ${providerServices.length} services.`);

        // Clear existing services? Or Update? 
        // Strategy: We will Upsert (Update if exists, Insert if new) based on providerServiceId

        let count = 0;
        for (const s of providerServices) {
            // Map Provider Fields to Our Schema
            // Provider: { service, name, type, category, rate, min, max, dripfeed, refill }

            const serviceData = {
                providerServiceId: s.service,
                name: s.name,
                category: s.category,
                rate: parseFloat(s.rate), // In USD usually
                min: Number(s.min),
                max: Number(s.max),
                type: s.type,
                active: true
            };

            await Service.findOneAndUpdate(
                { providerServiceId: s.service },
                serviceData,
                { upsert: true, new: true }
            );
            count++;
        }

        console.log(`Successfully imported/updated ${count} services.`);
        process.exit(0);

    } catch (error) {
        console.error('Import Failed:', error);
        process.exit(1);
    }
};

importServices();

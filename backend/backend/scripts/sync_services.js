const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables FIRST
dotenv.config({ path: __dirname + '/../.env' });

const Service = require('../models/Service');
const providerApi = require('../utils/japApi');

// Connect to Database
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smmpanel')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    });

const syncServices = async () => {
    try {
        console.log('Fetching services from provider...');
        const providerServices = await providerApi.getServices();

        if (!Array.isArray(providerServices)) {
            console.error('Unexpected response format from provider:', providerServices);
            return;
        }

        console.log(`Fetched ${providerServices.length} services from provider.`);

        let addedCount = 0;
        let updatedCount = 0;

        for (const pService of providerServices) {
            // Map provider service to our schema
            // providerServices format usually: { service: 123, name: '...', type: '...', category: '...', rate: '...', min: '...', max: '...' }

            // 1 USD = 90.65 INR (User defined rate)
            const EXCHANGE_RATE = 90.65;

            const serviceData = {
                providerServiceId: pService.service,
                name: pService.name,
                category: pService.category,
                // Convert USD to INR and add 25% profit
                rate: (parseFloat(pService.rate) * EXCHANGE_RATE) * 1.25,
                min: parseInt(pService.min),
                max: parseInt(pService.max),
                type: pService.type,
                active: true // Auto-enable fetched services
            };

            // Upsert: Update if exists, Insert if not
            const result = await Service.findOneAndUpdate(
                { providerServiceId: pService.service },
                serviceData,
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );

            // Check if it was an update or insert (mongoose doesn't explicitly say easily with findOneAndUpdate without checking raw result, 
            // but we can assume based on logic or just count processed)
            // For simplicity in logs:
            updatedCount++;
        }

        console.log(`Sync Complete. Processed ${updatedCount} services.`);

    } catch (error) {
        console.error('Error syncing services:', error.message);
    } finally {
        mongoose.connection.close();
        console.log('Database connection closed.');
    }
};

syncServices();

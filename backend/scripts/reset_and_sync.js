const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env
dotenv.config({ path: path.join(__dirname, '../.env') });

const Service = require('../models/Service');
const providerApi = require('../utils/japApi');

const resetAndSync = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smmpanel');
        console.log('MongoDB Connected');

        // 1. Clear existing services
        console.log('Clearing existing services...');
        await Service.deleteMany({});
        console.log('All existing services deleted.');

        // 2. Fetch from new API
        console.log('Fetching services from new API...');
        const providerServices = await providerApi.getServices();

        if (!Array.isArray(providerServices)) {
            console.error('Error: Provider response is not an array.', providerServices);
            process.exit(1);
        }

        console.log(`Fetched ${providerServices.length} services.`);

        if (providerServices.length > 0) {
            console.log(`Sample Raw Rate (First Service): ${providerServices[0].rate}`);
            console.log(`Sample Name: ${providerServices[0].name}`);
        }

        // 3. Insert new services
        let count = 0;

        // Fetch live USD to INR exchange rate dynamically
        let exchangeRate = parseFloat(process.env.EXCHANGE_RATE) || 85;
        try {
            const axios = require('axios');
            console.log('Fetching live USD to INR exchange rate...');
            const rateResponse = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
            if (rateResponse.data && rateResponse.data.rates && rateResponse.data.rates.INR) {
                exchangeRate = parseFloat(rateResponse.data.rates.INR);
                console.log(`Live Exchange Rate Applied: 1 USD = ₹${exchangeRate}`);
            }
        } catch (err) {
            console.warn(`Failed to fetch live exchange rate, using fallback (₹${exchangeRate}):`, err.message);
        }

        const finalServices = providerServices
            .map(pService => ({
                providerServiceId: pService.service,
                name: pService.name,
                category: pService.category,
                rate: parseFloat(pService.rate) * exchangeRate * 1.30, // Convert to INR and add 30% margin
                min: parseInt(pService.min),
                max: parseInt(pService.max),
                type: pService.type,
                active: true
            }));

        await Service.insertMany(finalServices);
        console.log(`Successfully inserted ${finalServices.length} new services.`);

        process.exit(0);
    } catch (error) {
        console.error('Sync Failed:', error);
        process.exit(1);
    }
};

resetAndSync();

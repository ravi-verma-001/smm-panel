const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const providerApi = require('../utils/japApi'); // Import provider API for sync

// Get All Services (Grouped by Category ideally, but flat list for now)
router.get('/', async (req, res) => {
    try {
        const services = await Service.find({ active: true }).sort({ category: 1, rate: 1 });
        res.json(services);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Hidden route to trigger database reset & sync with Provider API
// User can just visit /api/services/forcesync in their browser
router.get('/forcesync', async (req, res) => {
    try {
        console.log('Fetching existing services to preserve custom average times...');
        const existingServices = await Service.find({});
        const timeMap = {};
        existingServices.forEach(s => {
            if (s.averageTime) timeMap[s.providerServiceId] = s.averageTime;
        });

        console.log('Clearing existing services...');
        await Service.deleteMany({});
        console.log('All existing services deleted.');

        console.log('Fetching services from new API...');
        const providerServices = await providerApi.getServices();

        if (!Array.isArray(providerServices)) {
            return res.status(500).json({ error: 'Provider response is not an array', data: providerServices });
        }

        console.log(`Fetched ${providerServices.length} services.`);

        // Fetch live USD to INR exchange rate dynamically
        let exchangeRate = parseFloat(process.env.EXCHANGE_RATE) || 85; // Fallback
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

        const finalServices = providerServices.map(pService => {
            const providerRate = parseFloat(pService.rate);
            
            // Extract timing from description if present (e.g. Start Time: 0-10 Mins or 0-1 Hour)
            let parsedTime = '';
            if (pService.desc) {
                const timeMatch = pService.desc.match(/(?:Start Time|🕓 Start Time)\s*:\s*([^\r\n]+)/i);
                if (timeMatch && timeMatch[1]) {
                    parsedTime = timeMatch[1].trim();
                }
            }

            return {
                providerServiceId: pService.service,
                name: pService.name,
                category: pService.category,
                rate: providerRate * 1.30, // Directly add 30% margin on INR rate
                originalRate: providerRate, // Store base cost in INR
                min: parseInt(pService.min),
                max: parseInt(pService.max),
                type: pService.type,
                averageTime: parsedTime || pService.time || pService.average_time || timeMap[pService.service] || '30 mins - 1 hour',
                active: true
            };
        });

        await Service.insertMany(finalServices);
        console.log(`Successfully inserted ${finalServices.length} new services.`);

        res.json({ success: true, count: finalServices.length, message: 'Database successfully synced with new Provider API' });
    } catch (error) {
        console.error('Sync Failed:', error);
        res.status(500).json({ error: 'Sync Failed', details: error.message });
    }
});

module.exports = router;

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
        console.log('Clearing existing services...');
        await Service.deleteMany({});
        console.log('All existing services deleted.');

        console.log('Fetching services from new API...');
        const providerServices = await providerApi.getServices();

        if (!Array.isArray(providerServices)) {
            return res.status(500).json({ error: 'Provider response is not an array', data: providerServices });
        }

        console.log(`Fetched ${providerServices.length} services.`);

        // Use raw rate as requested by user ("dont multiply the price")
        const finalServices = providerServices.map(pService => ({
            providerServiceId: pService.service,
            name: pService.name,
            category: pService.category,
            rate: parseFloat(pService.rate), // Raw API rate
            min: parseInt(pService.min),
            max: parseInt(pService.max),
            type: pService.type,
            active: true
        }));

        await Service.insertMany(finalServices);
        console.log(`Successfully inserted ${finalServices.length} new services.`);

        res.json({ success: true, count: finalServices.length, message: 'Database successfully synced with new Provider API' });
    } catch (error) {
        console.error('Sync Failed:', error);
        res.status(500).json({ error: 'Sync Failed', details: error.message });
    }
});

module.exports = router;

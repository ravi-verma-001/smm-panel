const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

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

module.exports = router;

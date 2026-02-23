const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    providerServiceId: { type: Number, required: true }, // Service ID from JAP
    name: { type: String, required: true },
    category: { type: String, required: true },
    rate: { type: Number, required: true }, // Your selling price
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    type: { type: String, default: 'default' }, // default, custom_comments, etc.
    averageTime: { type: String, default: '30 mins - 1 hour' }, // Global default average time
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Service', serviceSchema);

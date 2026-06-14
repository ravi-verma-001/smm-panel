const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    externalOrderId: { type: String }, // Order ID from JAP
    link: { type: String, required: true },
    quantity: { type: Number, required: true },
    charge: { type: Number, required: true }, // Amount deducted from user
    start_count: { type: Number },
    remains: { type: Number },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'partial', 'canceled', 'fail'],
        default: 'pending'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);

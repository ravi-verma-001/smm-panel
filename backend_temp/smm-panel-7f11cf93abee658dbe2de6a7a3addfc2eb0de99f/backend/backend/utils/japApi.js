const axios = require('axios');

// Default to SMMFollows, but allow override via ENV
const API_URL = process.env.SMM_API_URL || 'https://smmfollows.com/api/v2';


const providerApi = {
    // 1. Get Services
    getServices: async () => {
        try {
            const response = await axios.post(API_URL, {
                key: process.env.SMM_API_KEY,
                action: 'services'
            });
            return response.data;
        } catch (error) {
            console.warn('Provider API Error (getServices):', error.message);
            throw error;
        }
    },

    // 2. Add Order
    addOrder: async (serviceId, link, quantity) => {
        try {
            const response = await axios.post(API_URL, {
                key: process.env.SMM_API_KEY,
                action: 'add',
                service: serviceId,
                link: link,
                quantity: quantity
            });
            return response.data;
        } catch (error) {
            console.warn('Provider API Error (addOrder):', error.message);
            throw error;
        }
    },

    // 3. Get Order Status
    getOrderStatus: async (orderId) => {
        try {
            const response = await axios.post(API_URL, {
                key: process.env.SMM_API_KEY,
                action: 'status',
                order: orderId
            });
            return response.data;
        } catch (error) {
            console.warn('Provider API Error (getOrderStatus):', error.message);
            throw error;
        }
    },

    // 4. Get Balance
    getBalance: async () => {
        try {
            const response = await axios.post(API_URL, {
                key: process.env.SMM_API_KEY,
                action: 'balance'
            });
            return response.data;
        } catch (error) {
            console.warn('Provider API Error (getBalance):', error.message);
            throw error;
        }
    }
};

module.exports = providerApi;

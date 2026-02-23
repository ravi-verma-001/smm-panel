const axios = require('axios');

const API_URL = process.env.SMM_API_URL || 'https://likeradda.in/api/v2';

// Helper function to send requests bypassing Cloudflare manually
const sendRequest = async (payload) => {
    // We send data as form data as panels often block application/json
    const formData = new URLSearchParams(payload);

    const response = await axios.post(API_URL, formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Origin': 'https://likeradda.in',
            'Referer': 'https://likeradda.in/',
            'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin'
        }
    });

    return response.data;
};

const providerApi = {
    // 1. Get Services
    getServices: async () => {
        try {
            console.log(`[API] Fetching services from provider: ${API_URL}`);
            return await sendRequest({
                key: process.env.SMM_API_KEY,
                action: 'services'
            });
        } catch (error) {
            console.warn('Provider API Error (getServices):', error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // 2. Add Order
    addOrder: async (serviceId, link, quantity) => {
        try {
            console.log(`[API] Sending new order to provider: ${API_URL}`);
            return await sendRequest({
                key: process.env.SMM_API_KEY,
                action: 'add',
                service: serviceId,
                link: link,
                quantity: quantity
            });
        } catch (error) {
            console.warn('Provider API Error (addOrder):', error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // 3. Get Order Status
    getOrderStatus: async (orderId) => {
        try {
            console.log(`[API] Fetching order status from provider: ${API_URL}`);
            return await sendRequest({
                key: process.env.SMM_API_KEY,
                action: 'status',
                order: orderId
            });
        } catch (error) {
            console.warn('Provider API Error (getOrderStatus):', error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // 4. Get Balance
    getBalance: async () => {
        try {
            console.log(`[API] Fetching balance from provider: ${API_URL}`);
            return await sendRequest({
                key: process.env.SMM_API_KEY,
                action: 'balance'
            });
        } catch (error) {
            console.warn('Provider API Error (getBalance):', error.response ? error.response.data : error.message);
            throw error;
        }
    }
};

module.exports = providerApi;

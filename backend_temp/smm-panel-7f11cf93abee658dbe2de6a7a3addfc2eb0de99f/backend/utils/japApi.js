const axios = require('axios');

const { HttpsProxyAgent } = require('https-proxy-agent');

// Default to SMMFollows, but allow override via ENV
const API_URL = process.env.SMM_API_URL || 'https://smmfollows.com/api/v2';

// Proxy Configuration
const PROXY_URL = process.env.SMM_API_PROXY; // e.g., http://user:pass@ip:port
let agent = null;

if (PROXY_URL) {
    console.log('Using Proxy:', PROXY_URL);
    agent = new HttpsProxyAgent(PROXY_URL);
}


const providerApi = {
    // Helper for headers
    getHeaders: () => ({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Origin': 'https://likeradda.in',
        'Referer': 'https://likeradda.in/',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site'
    }),

    // 1. Get Services
    getServices: async () => {
        try {
            const formData = new URLSearchParams({
                key: process.env.SMM_API_KEY,
                action: 'services'
            });
            const config = { headers: providerApi.getHeaders() };
            if (agent) config.httpsAgent = agent;

            const response = await axios.post(API_URL, formData, config);
            return response.data;
        } catch (error) {
            console.warn('Provider API Error (getServices):', error.message);
            throw error;
        }
    },

    // 2. Add Order
    addOrder: async (serviceId, link, quantity) => {
        try {
            const formData = new URLSearchParams({
                key: process.env.SMM_API_KEY,
                action: 'add',
                service: serviceId,
                link: link,
                quantity: quantity
            });
            const config = { headers: providerApi.getHeaders() };
            if (agent) config.httpsAgent = agent;

            const response = await axios.post(API_URL, formData, config);
            return response.data;
        } catch (error) {
            console.warn('Provider API Error (addOrder):', error.message);
            throw error;
        }
    },

    // 3. Get Order Status
    getOrderStatus: async (orderId) => {
        try {
            const formData = new URLSearchParams({
                key: process.env.SMM_API_KEY,
                action: 'status',
                order: orderId
            });
            const config = { headers: providerApi.getHeaders() };
            if (agent) config.httpsAgent = agent;

            const response = await axios.post(API_URL, formData, config);
            return response.data;
        } catch (error) {
            console.warn('Provider API Error (getOrderStatus):', error.message);
            throw error;
        }
    },

    // 4. Get Balance
    getBalance: async () => {
        try {
            const formData = new URLSearchParams({
                key: process.env.SMM_API_KEY,
                action: 'balance'
            });
            const config = { headers: providerApi.getHeaders() };
            if (agent) config.httpsAgent = agent;

            const response = await axios.post(API_URL, formData, config);
            return response.data;
        } catch (error) {
            console.warn('Provider API Error (getBalance):', error.message);
            throw error;
        }
    }
};

module.exports = providerApi;

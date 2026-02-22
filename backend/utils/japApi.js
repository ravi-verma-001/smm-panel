const axios = require('axios');

// We now use ScraperAPI as a middleman to bypass Cloudflare
const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY; // User needs to add this
const API_URL = process.env.SMM_API_URL || 'https://smmfollows.com/api/v2';

// Helper function to send requests via ScraperAPI
const sendViaScraperApi = async (payload) => {
    if (!SCRAPER_API_KEY) {
        throw new Error('SCRAPER_API_KEY is missing in environment variables. Please add it to use Cloudflare bypass.');
    }

    // Connect through ScraperAPI Proxy Mode (Standard for Axios)
    // SMM panels block the standard ScraperAPI endpoint because it modifies origin headers
    // We add premium=true to use residential proxies which are less likely to be blocked 
    const formData = new URLSearchParams(payload);

    const response = await axios.post(API_URL, formData, {
        proxy: {
            protocol: 'http',
            host: 'proxy-server.scraperapi.com',
            port: 3128,
            auth: {
                username: 'scraperapi.premium=true.render=true.keep_headers=true',
                password: SCRAPER_API_KEY
            }
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' // Panels love forms, hate JSON
        }
    });

    return response.data;
};

const providerApi = {
    // 1. Get Services
    getServices: async () => {
        try {
            return await sendViaScraperApi({
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
            return await sendViaScraperApi({
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
            return await sendViaScraperApi({
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
            return await sendViaScraperApi({
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



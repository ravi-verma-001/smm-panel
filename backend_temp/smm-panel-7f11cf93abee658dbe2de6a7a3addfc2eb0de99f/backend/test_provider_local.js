const axios = require('axios');
const dotenv = require('dotenv');
const { HttpsProxyAgent } = require('https-proxy-agent');

// Load env vars
dotenv.config({ path: '../.env' });

const API_KEY = process.env.SMM_API_KEY;
const API_URL = process.env.SMM_API_URL || 'https://likeradda.in/api/v2';

if (!API_KEY) {
    console.error("ERROR: SMM_API_KEY is missing in .env file");
    process.exit(1);
}

const PROXY_URL = process.env.SMM_API_PROXY;
let agent = null;
if (PROXY_URL) {
    console.log("Using Proxy:", PROXY_URL);
    agent = new HttpsProxyAgent(PROXY_URL);
}

console.log("Testing Provider API...");
console.log("URL:", API_URL);
console.log("Key:", API_KEY.substring(0, 5) + "...");

const getHeaders = () => ({
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
});

async function testConnection() {
    try {
        // Try to get services (standard read-only action)
        const formData = new URLSearchParams({
            key: API_KEY,
            action: 'services'
        });

        console.log("Sending request...");
        const config = { headers: getHeaders() };
        if (agent) config.httpsAgent = agent;

        const response = await axios.post(API_URL, formData, config);

        console.log("\nSUCCESS! API Connected.");
        console.log("Response Data (First 1 service):");
        if (Array.isArray(response.data) && response.data.length > 0) {
            console.log(response.data[0]);
        } else {
            console.log(response.data);
        }

    } catch (error) {
        console.error("\nFAILED! API Error.");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        } else {
            console.error("Error Message:", error.message);
        }
    }
}

testConnection();

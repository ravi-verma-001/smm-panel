const dotenv = require('dotenv');
dotenv.config();

// Adjust path to point to the correct location of japApi.js (now providerApi)
const providerApi = require('./utils/japApi');

console.log("Testing Provider API connection...");
console.log("URL:", process.env.SMM_API_URL);
console.log("Key:", process.env.SMM_API_KEY ? "Loaded (Hidden)" : "MISSING");

async function testConnection() {
    try {
        console.log("\n--- ATTEMPT 1: Standard 'key' parameter ---");
        const res1 = await providerApi.getBalance();
        console.log("Success:", res1);
        return;
    } catch (error) {
        console.log("Attempt 1 Failed:", error.response ? error.response.data : error.message);
    }

    try {
        console.log("\n--- ATTEMPT 2: 'api_token' parameter ---");
        // We need to manually invoke axios here to test different params since providerApi is hardcoded
        const axios = require('axios');
        const res2 = await axios.post(process.env.SMM_API_URL, new URLSearchParams({
            api_token: process.env.SMM_API_KEY,
            action: 'balance'
        }));
        console.log("Success with api_token:", res2.data);
    } catch (error) {
        console.log("Attempt 2 Failed:", error.response ? error.response.data : error.message);
    }

    try {
        console.log("\n--- ATTEMPT 3: 'api_key' parameter ---");
        const axios = require('axios');
        const res3 = await axios.post(process.env.SMM_API_URL, new URLSearchParams({
            api_key: process.env.SMM_API_KEY,
            action: 'balance'
        }));
        console.log("Success with api_key:", res3.data);
    } catch (error) {
        console.log("Attempt 3 Failed:", error.response ? error.response.data : error.message);
    }

    try {
        console.log("\n--- ATTEMPT 4: JSON Body ({ key, action }) ---");
        const axios = require('axios');
        const res4 = await axios.post(process.env.SMM_API_URL, {
            key: process.env.SMM_API_KEY,
            action: 'balance'
        });
        console.log("Success with JSON:", res4.data);
    } catch (error) {
        console.log("Attempt 4 Failed:", error.response ? error.response.data : error.message);
    }
}

testConnection();

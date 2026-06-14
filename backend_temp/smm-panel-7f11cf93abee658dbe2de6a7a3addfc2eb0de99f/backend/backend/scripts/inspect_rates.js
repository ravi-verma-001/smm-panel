const providerApi = require('../utils/japApi');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const inspect = async () => {
    try {
        console.log('API URL:', process.env.SMM_API_URL);
        console.log('API KEY Length:', process.env.SMM_API_KEY ? process.env.SMM_API_KEY.length : 'Missing');

        console.log('Fetching services...');
        const services = await providerApi.getServices();
        if (services.length > 0) {
            console.log('First 5 services raw rates:');
            services.slice(0, 5).forEach(s => {
                console.log(`Service: ${s.name} | Rate: ${s.rate}`);
            });
        } else {
            console.log('No services found.');
        }
    } catch (err) {
        console.error(err);
    }
};

inspect();

const axios = require('axios');

const fs = require('fs');

async function testOrder() {
    try {
        const payload = {
            serviceId: 17435,
            link: 'https://instagram.com/test',
            quantity: 100
        };

        const config = {
            headers: {
                'x-user-email': 'test@user.com',
                'Content-Type': 'application/json'
            }
        };

        console.log("Sending Order Request:", payload);
        const res = await axios.post('http://localhost:5000/api/orders/create', payload, config);
        console.log("Success:", res.data);
        fs.writeFileSync('api_response.log', JSON.stringify({ status: res.status, data: res.data }, null, 2));

    } catch (err) {
        const errorLog = {
            status: err.response ? err.response.status : 'Unknown',
            data: err.response ? err.response.data : err.message
        };
        console.error("API Error Logged to file");
        fs.writeFileSync('api_response.log', JSON.stringify(errorLog, null, 2));
    }
}

testOrder();

const http = require('http');

function checkUrl(url) {
    http.get(url, (res) => {
        console.log(`Checking ${url}... Status: ${res.statusCode}`);
        res.on('data', () => { }); // Consume data
    }).on('error', (e) => {
        console.error(`Error checking ${url}: ${e.message}`);
    });
}

checkUrl('http://localhost:3000');
checkUrl('http://localhost:5000/api/services');

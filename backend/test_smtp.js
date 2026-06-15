const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('Testing SMTP connection...');
console.log('Host:', process.env.SMTP_HOST);
console.log('Port:', process.env.SMTP_PORT);
console.log('User:', process.env.SMTP_USER);

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

transporter.verify(function(error, success) {
    if (error) {
        console.error('SMTP Verification failed:');
        console.error(error);
    } else {
        console.log('SMTP server is ready to send emails!');
    }
    process.exit(0);
});

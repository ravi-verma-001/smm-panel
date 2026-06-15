const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');

// Admin Login
router.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const payload = {
            admin: {
                id: admin.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// User Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            username,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { _id: user.id, username: user.username, email: user.email, walletBalance: user.walletBalance } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { _id: user.id, username: user.username, email: user.email, walletBalance: user.walletBalance } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Google Login / Register (OAuth Verification/Mock endpoint)
router.post('/google-login', async (req, res) => {
    const { email, name } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        let user = await User.findOne({ email });

        if (!user) {
            // Register user automatically
            let username = name ? name.replace(/\s+/g, '').toLowerCase() : email.split('@')[0];
            let usernameExists = await User.findOne({ username });
            if (usernameExists) {
                username = `${username}${Math.floor(Math.random() * 1000)}`;
            }

            // Generate a random password since they login with Google
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(Math.random().toString(36).slice(-8), salt);

            user = new User({
                username,
                email,
                password: hashedPassword
            });

            await user.save();
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { _id: user.id, username: user.username, email: user.email, walletBalance: user.walletBalance } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Forgot Password Route (Request reset link)
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found with this email' });
        }

        // Generate token
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Check if SMTP is configured
        const isSmtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

        const resetUrl = `${req.headers.origin || 'http://localhost:3000'}/reset-password?token=${token}`;

        if (isSmtpConfigured) {
            // Send real email
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || '587'),
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });

            const mailOptions = {
                to: user.email,
                from: process.env.SMTP_USER,
                subject: 'DovixSMM Password Reset Request',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                        <h2 style="color: #2563eb; text-align: center;">DovixSMM Password Reset</h2>
                        <p>Hello ${user.username},</p>
                        <p>You requested a password reset for your account on DovixSMM.</p>
                        <p>Please click the button below to reset your password. This link is valid for 1 hour.</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reset Password</a>
                        </div>
                        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
                        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;">
                        <p style="font-size: 12px; color: #64748b; text-align: center;">DovixSMM - Cheapest SMM Reseller Panel</p>
                    </div>
                `
            };

            await transporter.sendMail(mailOptions);
            return res.json({ message: 'A real password reset link has been sent to your email inbox!' });
        } else {
            // SMTP is not configured - log in backend terminal and return simulation message
            console.log('\n======================================');
            console.log(`[PASSWORD RESET REQUEST] for ${email}`);
            console.log(`Reset Link: ${resetUrl}`);
            console.log('======================================\n');

            return res.json({ 
                message: 'Password reset request registered! (Admin Notice: SMTP is not configured. The reset link has been printed to the backend terminal log for testing, and a link has been provided directly below).',
                debugLink: resetUrl
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error processing password reset' });
    }
});

// Reset Password Route (Actual change)
router.post('/reset-password', async (req, res) => {
    const { token, password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
        }

        // Salt and hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        
        // Clear tokens
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        
        await user.save();

        res.json({ message: 'Password reset successful! You can now log in.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error resetting password' });
    }
});

module.exports = router;

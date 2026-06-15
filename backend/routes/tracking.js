const express = require('express');
const router = express.Router();
const User = require('../models/User');
const axios = require('axios');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Helper to hash user data as required by Meta's CAPI documentation
const sha256 = (str) => {
    if (!str) return null;
    return crypto.createHash('sha256').update(str.trim().toLowerCase()).digest('hex');
};

router.post('/event', async (req, res) => {
    const { eventName, eventId, userAgent, sourceUrl, customData } = req.body;
    const authHeader = req.headers.authorization;
    
    let userEmail = "";
    let userUsername = "";
    let userId = "";

    // Parse user context if available
    if (authHeader && authHeader.startsWith('Bearer ')) {
        try {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SMMPANEL123');
            if (decoded.user && decoded.user.id) {
                const user = await User.findById(decoded.user.id);
                if (user) {
                    userEmail = user.email;
                    userUsername = user.username;
                    userId = user.id;
                }
            }
        } catch (err) {
            // Token parsing fallback
        }
    }

    const pixelId = process.env.META_PIXEL_ID;
    const capiAccessToken = process.env.META_CAPI_ACCESS_TOKEN;

    // Skip if not configured
    if (!pixelId || !capiAccessToken) {
        return res.status(200).json({ status: "skipped", message: "Meta API keys not configured" });
    }

    const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    try {
        const hashedEmail = sha256(userEmail);
        const hashedPhone = sha256(customData.phone || "");

        const eventData = {
            data: [
                {
                    event_name: eventName,
                    event_time: Math.floor(Date.now() / 1000),
                    event_id: eventId,
                    event_source_url: sourceUrl || "https://dovixsmm.com",
                    action_source: "website",
                    user_data: {
                        client_ip_address: clientIp,
                        client_user_agent: userAgent || req.headers['user-agent'],
                        em: hashedEmail ? [hashedEmail] : undefined,
                        ph: hashedPhone ? [hashedPhone] : undefined,
                        external_id: userId ? [sha256(userId)] : undefined
                    },
                    custom_data: {
                        value: customData.value || undefined,
                        currency: customData.currency || "INR",
                        content_name: customData.content_name || undefined,
                        content_type: customData.content_type || "product",
                        order_id: customData.order_id || undefined
                    }
                }
            ]
        };

        await axios.post(
            `https://graph.facebook.com/v19.0/${pixelId}/events`,
            eventData,
            {
                params: { access_token: capiAccessToken },
                headers: { 'Content-Type': 'application/json' }
            }
        );

        res.json({ status: "success" });
    } catch (error) {
        console.error("Meta CAPI failed:", error.response ? error.response.data : error.message);
        res.status(200).json({ status: "failed", error: error.message });
    }
});

module.exports = router;

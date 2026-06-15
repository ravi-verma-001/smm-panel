"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Generate Unique Event ID for Deduplication between Browser (Pixel) and Server (CAPI)
export const generateEventId = (): string => {
    return 'evt_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
};

export const trackPixelEvent = (eventName: string, params?: Record<string, any>, eventId?: string) => {
    const trackingId = eventId || generateEventId();
    
    // 1. Meta Pixel Browser Tracking
    if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", eventName, params || {}, { event_id: trackingId });
    }
    
    // 2. Google Analytics 4 tracking
    if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", eventName, params || {});
    }

    // 3. Forward to Server-Side Conversion API (CAPI) for deduplication
    const userToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
    
    if (userToken) {
        fetch(`${API_URL}/api/tracking/event`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify({
                eventName,
                eventId: trackingId,
                clientIp: "", // Handled on backend side
                userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
                sourceUrl: typeof window !== "undefined" ? window.location.href : "",
                customData: params || {}
            })
        }).catch(err => console.debug("CAPI forwarding skipped:", err.message));
    }
};

export default function MetaTrackingProvider() {
    const pathname = usePathname();

    useEffect(() => {
        // Track global PageView on route change
        trackPixelEvent("PageView");
    }, [pathname]);

    return null;
}

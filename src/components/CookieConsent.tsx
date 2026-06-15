"use client";

import { useState, useEffect } from "react";
import styles from "./CookieConsent.module.css";

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie_consent");
        if (!consent) {
            setVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie_consent", "accepted");
        setVisible(false);
        if (typeof window !== "undefined") {
            window.location.reload();
        }
    };

    const handleReject = () => {
        localStorage.setItem("cookie_consent", "rejected");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className={styles.banner}>
            <div className={styles.content}>
                <p className={styles.text}>
                    We use cookies, Facebook Pixel, and analytics to optimize your experience. By continuing to use DovixSMM, you agree to our policies.
                </p>
                <div className={styles.actions}>
                    <button onClick={handleReject} className={styles.btnReject}>
                        Reject
                    </button>
                    <button onClick={handleAccept} className={styles.btnAccept}>
                        Accept Cookies
                    </button>
                </div>
            </div>
        </div>
    );
}

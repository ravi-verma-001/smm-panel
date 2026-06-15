"use client";

import { ShieldCheck, Zap, Heart, MessageSquare, Star } from "lucide-react";
import styles from "./TrustSection.module.css";

const badges = [
    { icon: <Zap size={24} />, title: "Instant Auto-Delivery", desc: "Start in minutes" },
    { icon: <ShieldCheck size={24} />, title: "Secure Payments", desc: "SSL Encrypted verification" },
    { icon: <MessageSquare size={24} />, title: "24/7 Support Desk", desc: "Live tickets assistance" },
    { icon: <Heart size={24} />, title: "Refund Protection", desc: "Satisfied or credited" }
];

const reviews = [
    { name: "Rohit K.", service: "Instagram Followers", rating: 5, text: "Unbelievable delivery speed. Completed my order of 10k in under 1 hour!" },
    { name: "Jessica M.", service: "YouTube Subscribers", rating: 5, text: "Organic growth, no drop recorded for over a month now. Highly recommend." },
    { name: "Aarav S.", service: "Telegram Group Members", rating: 5, text: "Excellent API support. Automated panels work smoothly for our marketing agency." }
];

export default function TrustSection() {
    return (
        <div className={styles.wrapper}>
            {/* Trust Badges */}
            <div className={styles.badgesGrid}>
                {badges.map((b, i) => (
                    <div key={i} className={styles.badgeCard}>
                        <div className={styles.icon}>{b.icon}</div>
                        <h4 className={styles.badgeTitle}>{b.title}</h4>
                        <p className={styles.badgeDesc}>{b.desc}</p>
                    </div>
                ))}
            </div>

            {/* Testimonials */}
            <div className={styles.testimonialSection}>
                <h3 className={styles.secTitle}>Recent Client Experiences</h3>
                <div className={styles.reviewsGrid}>
                    {reviews.map((r, i) => (
                        <div key={i} className={styles.reviewCard}>
                            <div className={styles.stars}>
                                {[...Array(r.rating)].map((_, idx) => (
                                    <Star key={idx} size={16} fill="#F59E0B" color="#F59E0B" />
                                ))}
                            </div>
                            <p className={styles.reviewText}>&quot;{r.text}&quot;</p>
                            <div className={styles.reviewFooter}>
                                <span className={styles.clientName}>{r.name}</span>
                                <span className={styles.clientService}>{r.service}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

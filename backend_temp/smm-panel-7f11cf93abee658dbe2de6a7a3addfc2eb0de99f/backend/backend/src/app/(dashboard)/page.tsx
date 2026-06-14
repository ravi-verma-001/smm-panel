"use client";

import {
    Wallet,
    ShoppingCart,
    CreditCard,
    TrendingUp,
    ArrowRight,
    Megaphone,
    LifeBuoy
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const stats = [
    {
        label: "Available Balance",
        value: "$1,240.50",
        icon: Wallet,
    },
    {
        label: "Total Spent",
        value: "$5,320.00",
        icon: CreditCard,
    },
    {
        label: "Total Orders",
        value: "8,432",
        icon: ShoppingCart,
    },
    {
        label: "Account Status",
        value: "Elite",
        icon: TrendingUp,
    },
];

const news = [
    {
        id: 1,
        date: "Jan 28, 2026",
        content: "New Instagram services added! High retention views now available at $0.50/k.",
    },
    {
        id: 2,
        date: "Jan 25, 2026",
        content: "We've updated our API documentation. Please check the new endpoints for better integration.",
    },
    {
        id: 3,
        date: "Jan 20, 2026",
        content: "TikTok follower update issues resolved. All pending orders are now processing.",
    },
];

export default function Dashboard() {
    const [balance, setBalance] = useState("0.00");

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
                const res = await fetch(`${API_URL}/api/user/me`, {
                    headers: { 'x-user-email': 'test@user.com' }
                });
                const data = await res.json();
                if (res.ok) {
                    setBalance(data.walletBalance.toFixed(2));
                }
            } catch (error) {
                console.error("Failed to fetch balance", error);
            }
        };

        fetchBalance();
    }, []);

    // Update stats with live balance
    const liveStats = stats.map(s =>
        s.label === "Available Balance" ? { ...s, value: `$${balance}` } : s
    );

    return (
        <div className={styles.container}>
            <div className={styles.welcomeSection}>
                <h1 className={styles.welcomeTitle}>Welcome back, Raviv!</h1>
                <p className={styles.apiLink}>API Key: ******************** <button style={{ color: 'var(--accent-primary)', marginLeft: '8px' }}>Copy</button></p>
            </div>

            <div className={styles.statsGrid}>
                {liveStats.map((stat, index) => (
                    <div key={index} className={styles.statCard}>
                        <div className={styles.statIconWrapper}>
                            <stat.icon size={24} />
                        </div>
                        <div className={styles.statInfo}>
                            <span className={styles.statLabel}>{stat.label}</span>
                            <span className={styles.statValue}>{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.contentGrid}>
                <div className={styles.sectionCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>
                            <Megaphone size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
                            Latest News & Updates
                        </h2>
                    </div>
                    <div className={styles.newsList}>
                        {news.map((item) => (
                            <div key={item.id} className={styles.newsItem}>
                                <span className={styles.newsDate}>{item.date}</span>
                                <p className={styles.newsContent}>{item.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.sectionCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Quick Actions</h2>
                    </div>
                    <div className={styles.quickActions}>
                        <Link href="/order" className={styles.actionBtn}>
                            <span>Place New Order</span>
                            <ArrowRight size={18} />
                        </Link>
                        <Link href="/funds" className={styles.actionBtn}>
                            <span>Add Funds</span>
                            <ArrowRight size={18} />
                        </Link>
                        <Link href="/services" className={styles.actionBtn}>
                            <span>View Services</span>
                            <ArrowRight size={18} />
                        </Link>
                        <Link href="/tickets" className={styles.actionBtn}>
                            <span>Contact Support</span>
                            <LifeBuoy size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

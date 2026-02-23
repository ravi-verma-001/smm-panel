"use client";

import { Bell, User, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { useSidebar } from "@/context/SidebarContext";

export default function Navbar() {
    const [balance, setBalance] = useState("0.00");
    const { toggleSidebar } = useSidebar();

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem("token");
                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
                const res = await fetch(`${API_URL}/api/user/me`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setBalance(data.walletBalance.toFixed(4));
                }
            } catch (error) {
                console.warn("Failed to fetch balance", error);
            }
        };

        fetchBalance();
        // Poll every 30 seconds to keep updated
        const interval = setInterval(fetchBalance, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className={styles.navbar}>
            <div className={styles.menuToggle} onClick={() => {
                console.log("Menu clicked");
                toggleSidebar();
            }}>
                <Menu size={24} />
            </div>

            <div className={styles.content}>
                <div className={styles.balanceCard}>
                    <span className={styles.balanceLabel}>Balance:</span>
                    <span className={styles.balanceAmount}>₹{balance}</span>
                </div>

                <div className={styles.actions}>
                    <button className={styles.iconBtn}>
                        <Bell size={20} />
                        <span className={styles.badge}>3</span>
                    </button>

                    <div className={styles.profile}>
                        <div className={styles.avatar}>
                            <User size={20} />
                        </div>
                        <span className={styles.username}>AdminUser</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

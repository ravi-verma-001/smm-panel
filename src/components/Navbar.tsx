"use client";

import { Bell, User, Menu, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { useSidebar } from "@/context/SidebarContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const [balance, setBalance] = useState("0.00");
    const { toggleSidebar } = useSidebar();
    const { logout } = useAuth();

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem("token");
                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
                const res = await fetch(`${API_URL}/api/user/me`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setBalance(data.user?.walletBalance?.toFixed(2) || "0.00");
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
                <div className={styles.brand}>
                    <img src="/Dovix_logo.png" alt="Dovix SMM" className={styles.logo} />
                </div>

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
                        <span className={styles.username}>User</span>
                    </div>

                    <button className={styles.logoutBtn} onClick={logout} title="Logout">
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}

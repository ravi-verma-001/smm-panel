"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Settings() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        alert("Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const generateNewKey = () => {
        if (confirm("Are you sure you want to generate a new API key? The old one will stop working.")) {
            alert("New API Key Generated!");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Account Settings</h1>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Change Password</h2>
                <form onSubmit={handlePasswordChange} className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label}>Old Password</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.btn}>Change Password</button>
                </form>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>API Settings</h2>
                <div className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label}>API Key</label>
                        <div className={styles.apiKeyBox}>
                            <input
                                type="text"
                                value="sk_live_51Msz..."
                                readOnly
                                className={`${styles.input} ${styles.apiKeyInput}`}
                            />
                            <button
                                type="button"
                                onClick={generateNewKey}
                                className={styles.btn}
                                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                            >
                                Generate New
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

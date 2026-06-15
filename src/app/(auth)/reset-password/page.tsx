"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "../auth.module.css";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!token) {
            setMessage({ type: 'error', text: "Invalid or missing password reset token." });
            return;
        }

        if (password !== confirmPassword) {
            setMessage({ type: 'error', text: "Passwords do not match." });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
            const res = await fetch(`${API_URL}/api/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({
                    type: 'success',
                    text: data.message || "Password has been reset successfully!"
                });
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                setMessage({
                    type: 'error',
                    text: data.message || "Failed to reset password."
                });
            }
        } catch (err) {
            setMessage({
                type: 'error',
                text: "Something went wrong. Please check if the server is running."
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h1 className={styles.title} style={{ fontSize: '1.75rem', fontWeight: '800' }}>New Password</h1>
                <p className={styles.subtitle}>Enter your new password below to reset your credentials.</p>
            </div>

            {message && (
                <div className={`px-4 py-3 rounded relative mb-4 text-sm ${
                    message.type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'
                }`}>
                    {message.text}
                </div>
            )}

            {!token ? (
                <div className="text-center py-4 text-red-600 font-medium">
                    Invalid or expired password reset token link. Please request a new reset link.
                    <div className="mt-4">
                        <Link href="/forgot-password" className={styles.link}>
                            Request Reset Link
                        </Link>
                    </div>
                </div>
            ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label className={styles.label}>New Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className={styles.input}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Confirm New Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className={styles.input}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? "Resetting Password..." : "Update Password"}
                    </button>
                </form>
            )}
        </div>
    );
}

export default function ResetPassword() {
    return (
        <div className={styles.container}>
            <Suspense fallback={<div className="text-white">Loading...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
}

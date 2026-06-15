"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../auth.module.css";
import { AlertCircle } from "lucide-react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [debugLink, setDebugLink] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setDebugLink("");

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
            const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({
                    type: 'success',
                    text: data.message
                });
                if (data.debugLink) {
                    setDebugLink(data.debugLink);
                }
            } else {
                setMessage({
                    type: 'error',
                    text: data.message || "Failed to process request"
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
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title} style={{ fontSize: '1.75rem', fontWeight: '800' }}>Reset Password</h1>
                    <p className={styles.subtitle}>Enter your email address and we'll send you a link to reset your password.</p>
                </div>

                {message && (
                    <div className={`px-4 py-3 rounded relative mb-4 text-sm ${
                        message.type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'
                    }`}>
                        {message.text}
                    </div>
                )}

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label className={styles.label}>Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className={styles.input}
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? "Sending Link..." : "Send Reset Link"}
                    </button>
                </form>

                {debugLink && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
                        <p className="text-xs text-blue-600 mb-2 font-medium">Development Debug Link:</p>
                        <Link href={debugLink} className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors">
                            Click here to Reset Password
                        </Link>
                    </div>
                )}

                <p className={styles.footer}>
                    Remembered your password?
                    <Link href="/login" className={styles.link} style={{ marginLeft: '4px' }}>
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}

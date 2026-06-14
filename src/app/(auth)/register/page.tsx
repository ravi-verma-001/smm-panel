"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../auth.module.css";
import SuccessModal from "@/components/SuccessModal";

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
            const res = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setShowSuccess(true);
            } else {
                setError(data.message || "Registration failed");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {/* JSON-LD Structured Data Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://dovixsmm.com/"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Register",
                                "item": "https://dovixsmm.com/register"
                            }
                        ]
                    })
                }}
            />

            <SuccessModal
                isOpen={showSuccess}
                title="Account Created!"
                message="Your account has been successfully created. You can now log in to the dashboard."
                actionLabel="Login Now"
                actionLink="/login"
            />

            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title} style={{ fontSize: '1.75rem', fontWeight: '800' }}>DovixSMM Register</h1>
                    <p className={styles.subtitle}>Get started with the best SMM reseller panel</p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label className={styles.label}>Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className={styles.input}
                            required
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className={styles.input}
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            className={styles.input}
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            className={styles.input}
                            required
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </form>

                <p className={styles.footer} style={{ marginBottom: '1.5rem' }}>
                    Already have an account?
                    <Link href="/login" className={styles.link} style={{ marginLeft: '4px' }}>
                        Sign In
                    </Link>
                </p>

                {/* Public footer links to brand & SEO pages */}
                <div className="border-t border-slate-100 pt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-slate-500 font-medium">
                    <Link href="/about" className="hover:text-blue-600 transition">About Us</Link>
                    <span>•</span>
                    <Link href="/contact" className="hover:text-blue-600 transition">Contact Us</Link>
                    <span>•</span>
                    <Link href="/privacy" className="hover:text-blue-600 transition">Privacy Policy</Link>
                    <span>•</span>
                    <Link href="/terms" className="hover:text-blue-600 transition">Terms & Conditions</Link>
                    <span>•</span>
                    <Link href="/refunds" className="hover:text-blue-600 transition">Refund Policy</Link>
                </div>
            </div>
        </div>
    );
}

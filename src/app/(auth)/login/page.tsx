"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "../auth.module.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth(); // Use the login function from context

    const handleGoogleCredentialResponse = async (response: any) => {
        setLoading(true);
        setError("");
        try {
            const jwtToken = response.credential;
            const base64Url = jwtToken.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const payload = JSON.parse(jsonPayload);
            const { email, name } = payload;

            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
            const res = await fetch(`${API_URL}/api/auth/google-login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name }),
            });

            const data = await res.json();

            if (res.ok) {
                login(data.token, data.user);
            } else {
                setError(data.message || "Google Authentication failed");
            }
        } catch (err) {
            setError("Google login failed, make sure backend server is running");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Load GIS client script
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            const google = (window as any).google;
            if (google) {
                google.accounts.id.initialize({
                    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "1056581458994-demo.apps.googleusercontent.com",
                    callback: handleGoogleCredentialResponse
                });

                // Render the official Google Sign-In button
                const btnContainer = document.getElementById("google-signin-btn");
                if (btnContainer) {
                    google.accounts.id.renderButton(btnContainer, {
                        theme: "outline",
                        size: "large",
                        width: btnContainer.clientWidth || 340,
                        text: "signin_with"
                    });
                }
            }
        };

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Login successful - context handles storage and redirect
                login(data.token, data.user);
            } else {
                setError(data.message || "Invalid credentials");
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
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "DovixSMM",
                            "url": "https://dovixsmm.com",
                            "logo": "https://dovixsmm.com/Dovix_logo.png",
                            "description": "Premium SMM Panel providing the cheapest and fastest social media services for Instagram, YouTube, TikTok, and Facebook.",
                            "sameAs": [
                                "https://facebook.com/dovixsmm",
                                "https://instagram.com/dovixsmm",
                                "https://youtube.com/dovixsmm",
                                "https://twitter.com/dovixsmm"
                            ]
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            "name": "DovixSMM",
                            "url": "https://dovixsmm.com",
                            "potentialAction": {
                                "@type": "SearchAction",
                                "target": "https://dovixsmm.com/services?search={search_term_string}",
                                "query-input": "required name=search_term_string"
                            }
                        }
                    ])
                }}
            />

            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title} style={{ fontSize: '1.75rem', fontWeight: '800' }}>DovixSMM - Cheapest SMM Panel</h1>
                    <p className={styles.subtitle}>Best Social Media Marketing Panel Provider. Sign in to place orders.</p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm">
                        {error}
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

                    <div className={styles.field}>
                        <label className={styles.label}>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className={styles.input}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className={styles.actions}>
                        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", cursor: "pointer" }}>
                            <input type="checkbox" /> Remember me
                        </label>
                        <Link href="/forgot-password" className={styles.forgot}>
                            Forgot Password?
                        </Link>
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <div className={styles.orDivider}>or</div>

                <div className="flex justify-center w-full mt-2">
                    <div id="google-signin-btn"></div>
                </div>

                <p className={styles.footer} style={{ marginBottom: '1.5rem' }}>
                    Don&apos;t have an account?
                    <Link href="/register" className={styles.link} style={{ marginLeft: '4px' }}>
                        Sign Up
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

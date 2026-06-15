"use client";

import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 md:px-8">
            <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Privacy Policy & Cookie Usage</h1>
                    <p className="text-slate-500 text-sm">Last updated: June 15, 2026</p>
                </div>

                <div className="prose prose-slate max-w-none text-slate-600 space-y-6 text-[14px] leading-relaxed">
                    <p>
                        At <strong>DovixSMM</strong>, accessible from https://dovixsmm.com, one of our main priorities is the privacy of our visitors. 
                        This Privacy Policy document contains types of information that is collected and recorded by DovixSMM and how we use it.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 pt-2">1. Information We Collect</h2>
                    <p>
                        We collect personal information that you provide directly to us when registering for our SMM services:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Account Registration Data: Username, Email Address, and encrypted Password.</li>
                        <li>Payment Information: UTR / Transaction ID for payment verification.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-slate-800 pt-2">2. How We Use Your Information</h2>
                    <p>
                        We use the information we collect to operate, maintain, and improve our services, including processing SMM orders, verifying payments, communicating order updates via email, and preventing fraudulent transactions.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 pt-2">3. Cookies & Ads Analytics Policy</h2>
                    <p>
                        We utilize cookies, Google Analytics 4 (GA4), and the Facebook (Meta) Pixel to optimize user experience, secure sessions, measure conversions, and serve relevant advertising. These platforms automatically collect IP addresses, user agent details, page URLs, and transaction event types (e.g. signups, logins, and purchases) to enhance website security and performance.
                    </p>
                    <p>
                        You can choose to refuse cookies or disable Meta tracking mechanisms via your browser settings or directly via our GDPR-compliant cookie consent banner.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 pt-2">4. Data Security & Disclosures</h2>
                    <p>
                        We implement strict industry-standard security measures to safeguard your personal details. SMM service links (e.g., target profile URLs) are shared securely with backend API networks to execute delivery. We never require, nor should you ever share, your social media accounts password to process SMM views, followers, or likes.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 pt-2">5. Support Contact</h2>
                    <p>
                        If you have questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:support@dovixsmm.com" className="text-blue-600 font-bold">support@dovixsmm.com</a>.
                    </p>
                </div>

                <div className="border-t border-slate-100 mt-10 pt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-slate-400 font-medium">
                    <Link href="/login" className="hover:text-blue-600 transition">Back to Login</Link>
                    <span>•</span>
                    <Link href="/about" className="hover:text-blue-600 transition">About Us</Link>
                    <span>•</span>
                    <Link href="/contact" className="hover:text-blue-600 transition">Contact Us</Link>
                    <span>•</span>
                    <Link href="/terms" className="hover:text-blue-600 transition">Terms & Conditions</Link>
                    <span>•</span>
                    <Link href="/refunds" className="hover:text-blue-600 transition">Refund Policy</Link>
                </div>
            </div>
        </div>
    );
}

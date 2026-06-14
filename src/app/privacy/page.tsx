"use client";

import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 md:px-8">
            <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Privacy Policy</h1>
                    <p className="text-slate-500 text-sm">Last updated: June 14, 2026</p>
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
                        We use the information we collect to operate, maintain, and improve our services, including:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Processing your SMM orders and tracking status.</li>
                        <li>Managing account balances, adding funds, and verifying payments.</li>
                        <li>Communicating with you through email or support tickets regarding order updates.</li>
                        <li>Preventing fraudulent transactions and ensuring network security.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-slate-800 pt-2">3. Data Security & Storage</h2>
                    <p>
                        We implement strict industry-standard security measures to safeguard your personal details. We do not require, 
                        nor should you ever share, your social media accounts password to process views, followers, or likes.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 pt-2">4. Third-Party Disclosures</h2>
                    <p>
                        We do not sell, trade, or transfer your personal information to third parties. SMM service links (e.g., target profile URLs) 
                        are shared securely with backend API providers to execute the delivery of your requested orders.
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

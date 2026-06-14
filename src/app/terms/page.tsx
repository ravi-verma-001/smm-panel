"use client";

import Link from "next/link";

export default function TermsAndConditions() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 md:px-8">
            <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Terms & Conditions</h1>
                    <p className="text-slate-500 text-sm">Last updated: June 14, 2026</p>
                </div>

                <div className="prose prose-slate max-w-none text-slate-600 space-y-6 text-[14px] leading-relaxed">
                    <p>
                        By placing an order with <strong>DovixSMM</strong>, you automatically accept all the below-listed terms of service 
                        whether you read them or not. We reserve the right to change these terms of service without notice.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 pt-2">1. Service Delivery</h2>
                    <p>
                        DovixSMM is designed to promote your social media profiles (followers, likes, views, etc.). 
                        You agree to follow all platform rules (Instagram, YouTube, etc.) and not post prohibited content.
                    </p>
                    <p>
                        <strong>Important:</strong> You must set your social account profile to <strong>Public</strong> before placing orders. 
                        No refunds will be given for private accounts or wrong target link submissions.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 pt-2">2. Rates & Services</h2>
                    <p>
                        Rates for services are subject to change without notice. We do not guarantee delivery time metrics as they rely on 
                        external API provider speed and platforms updates, though most orders start instantly.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 pt-2">3. Payment & Account Balance</h2>
                    <p>
                        All deposits added to your wallet balance are final. You agree that once a deposit is processed and wallet balance is credited, 
                        you will not file a chargeback or dispute for any reason.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 pt-2">4. Liabilities</h2>
                    <p>
                        DovixSMM is in no way liable for any account suspension, shadowban, or deletion by social media networks. Use services at your own discretion.
                    </p>
                </div>

                <div className="border-t border-slate-100 mt-10 pt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-slate-400 font-medium">
                    <Link href="/login" className="hover:text-blue-600 transition">Back to Login</Link>
                    <span>•</span>
                    <Link href="/about" className="hover:text-blue-600 transition">About Us</Link>
                    <span>•</span>
                    <Link href="/contact" className="hover:text-blue-600 transition">Contact Us</Link>
                    <span>•</span>
                    <Link href="/privacy" className="hover:text-blue-600 transition">Privacy Policy</Link>
                    <span>•</span>
                    <Link href="/refunds" className="hover:text-blue-600 transition">Refund Policy</Link>
                </div>
            </div>
        </div>
    );
}

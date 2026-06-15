"use client";

import Link from "next/link";

export default function TermsAndConditions() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 md:px-8">
            <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Terms of Service</h1>
                    <p className="text-slate-500 text-sm">Last updated: June 15, 2026</p>
                </div>

                <div className="prose prose-slate max-w-none text-slate-600 space-y-6 text-[14px] leading-relaxed">
                    <p>
                        By accessing and placing an order with <strong>DovixSMM</strong>, you confirm that you are in agreement with 
                        and bound by the terms of service contained in the Terms and Conditions outlined below.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 pt-2">1. General Service Provisions</h2>
                    <p>
                        DovixSMM is designed strictly to promote your Instagram, YouTube, TikTok, Facebook, or Telegram profiles. 
                        We do not guarantee that your new followers will interact with you or that views will yield sales/conversions. 
                        We only guarantee that you receive the specific digital volume you paid for.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 pt-2">2. Payment & Wallet Terms</h2>
                    <p>
                        All deposits added to your DovixSMM wallet balance via secure QR Codes, Stripe, or crypto are final. 
                        Deposited funds cannot be withdrawn, refunded, or chargebacked back to your payment methods. 
                        You agree not to file dispute/chargeback actions after depositing funds. Any violation will result in 
                        immediate account suspension and order reversal.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 pt-2">3. Refund Policy</h2>
                    <p>
                        If an SMM order cannot be executed or fails due to system changes, the specific order value will be 
                        credited back to your DovixSMM dashboard wallet. No refunds will be processed back to original bank accounts or UPI cards.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 pt-2">4. User Account Suspension</h2>
                    <p>
                        DovixSMM reserves the right to suspend accounts without prior warning in the event of payment disputes, 
                        attempts to hack API endpoints, or using automated scripts to register multiple fake accounts.
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

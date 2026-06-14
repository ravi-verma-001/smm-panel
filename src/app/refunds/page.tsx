"use client";

import Link from "next/link";

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 md:px-8">
            <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Refund & Delivery Policy</h1>
                    <p className="text-slate-500 text-sm">Last updated: June 14, 2026</p>
                </div>

                <div className="prose prose-slate max-w-none text-slate-600 space-y-6 text-[14px] leading-relaxed">
                    <h2 className="text-xl font-bold text-slate-800 pt-2">1. Refund Policy Details</h2>
                    <p>
                        No refunds will be made back to your original payment source (such as your bank account, card, or wallet). 
                        Once a payment is successfully verified and added as a wallet balance, it must be used for placing SMM orders on DovixSMM.
                    </p>
                    <p>
                        You agree that you will not file a dispute or chargeback against us. If you do, we reserve the right to terminate your account 
                        and block any future services.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 pt-2">2. Delivery Policy (Shipping)</h2>
                    <p>
                        Our products are purely digital services. Delivery starts automatically after order placement:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Start Time:</strong> Typically 0–60 minutes, unless a delay is specified in the service description.</li>
                        <li><strong>Delivery Speed:</strong> Varies per service and platform. Some are completed instantly; others might take 1–3 days for high-volume orders.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-slate-800 pt-2">3. Cancelled or Partial Orders</h2>
                    <p>
                        If an order fails to deliver or is partially completed due to system updates, the balance for the undelivered portion 
                        will be automatically refunded back to your DovixSMM account wallet. You can then use these funds to place a new order.
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
                    <Link href="/terms" className="hover:text-blue-600 transition">Terms & Conditions</Link>
                </div>
            </div>
        </div>
    );
}

"use client";

import Link from "next/link";
import { Mail, HelpCircle, ShieldAlert } from "lucide-react";

export default function ContactUs() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 md:px-8">
            {/* FAQ JSON-LD Structured Data Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "What is an SMM Panel?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "An SMM Panel is an online store that sells automated social media marketing services such as Instagram followers, YouTube views, likes, and shares at cheap reseller rates."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How long do SMM orders take?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Most SMM services start processing instantly. The average time for delivery ranges from 15 minutes to 24 hours depending on the specific service volume."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Are payments secure on DovixSMM?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, we support highly secure local UPI and global payment methods with 256-bit SSL encryption to protect your transaction details."
                                }
                            }
                        ]
                    })
                }}
            />

            <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Contact DovixSMM Support</h1>
                    <p className="text-slate-500 text-lg">We are here to help you 24/7. Get in touch with us.</p>
                </div>

                <div className="space-y-8 text-slate-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2 mb-2">
                                    <Mail className="text-blue-600" size={20} />
                                    Email Support
                                </h3>
                                <p className="text-sm text-slate-500 mb-4">Send us your queries, order ID questions, or payment receipt details directly.</p>
                            </div>
                            <span className="font-bold text-blue-600">support@dovixsmm.com</span>
                        </div>

                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2 mb-2">
                                    <ShieldAlert className="text-blue-600" size={20} />
                                    Support Ticket
                                </h3>
                                <p className="text-sm text-slate-500 mb-4">Registered users can raise instant tickets from the internal dashboard for faster resolution.</p>
                            </div>
                            <Link href="/login" className="text-sm font-bold text-blue-600 hover:underline">Open Support Ticket &rarr;</Link>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <HelpCircle className="text-blue-600" size={24} />
                            Frequently Asked Questions
                        </h2>

                        <div className="space-y-4">
                            <div className="p-5 bg-slate-50/50 rounded-xl">
                                <h4 className="font-bold text-slate-950 text-base mb-1">What is an SMM Panel?</h4>
                                <p className="text-sm text-slate-500">An SMM Panel is an online store that sells automated social media marketing services such as Instagram followers, YouTube views, likes, and shares at cheap reseller rates.</p>
                            </div>

                            <div className="p-5 bg-slate-50/50 rounded-xl">
                                <h4 className="font-bold text-slate-950 text-base mb-1">How long do SMM orders take?</h4>
                                <p className="text-sm text-slate-500">Most SMM services start processing instantly. The average time for delivery ranges from 15 minutes to 24 hours depending on the specific service volume.</p>
                            </div>

                            <div className="p-5 bg-slate-50/50 rounded-xl">
                                <h4 className="font-bold text-slate-950 text-base mb-1">Are payments secure on DovixSMM?</h4>
                                <p className="text-sm text-slate-500">Yes, we support highly secure local UPI and global payment methods with 256-bit SSL encryption to protect your transaction details.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-100 mt-10 pt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-slate-400 font-medium">
                    <Link href="/login" className="hover:text-blue-600 transition">Back to Login</Link>
                    <span>•</span>
                    <Link href="/about" className="hover:text-blue-600 transition">About Us</Link>
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

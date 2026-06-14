"use client";

import Link from "next/link";
import { Shield, Sparkles, Zap, Award } from "lucide-react";

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 md:px-8">
            <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">About DovixSMM</h1>
                    <p className="text-slate-500 text-lg">Your Trusted Partner in Social Media Growth & Marketing Automation</p>
                </div>

                <div className="prose prose-slate max-w-none text-slate-600 space-y-6 text-[15px] leading-relaxed">
                    <p>
                        Welcome to <strong>DovixSMM</strong>, the industry-leading social media marketing (SMM) reseller panel. 
                        We specialize in providing high-quality, high-speed, and extremely affordable growth services for 
                        platforms like Instagram, YouTube, TikTok, Facebook, and Telegram.
                    </p>

                    <p>
                        Founded with a mission to democratize digital marketing, DovixSMM empowers influencers, agencies, 
                        and business owners to establish a powerful online footprint. We connect directly to premium API 
                        networks, enabling lightning-fast delivery and real-time order tracking.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-800 pt-4 border-t border-slate-100">Why Choose DovixSMM?</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="flex gap-4 items-start">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <Zap size={22} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-base mb-1">Instant Auto-Delivery</h3>
                                <p className="text-sm text-slate-500">Most services start processing instantly, running 24/7 via automated APIs.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <Shield size={22} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-base mb-1">Unmatched Security</h3>
                                <p className="text-sm text-slate-500">Secure payments and encrypted endpoints. We never require account passwords.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <Sparkles size={22} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-base mb-1">Cheapest SMM Services</h3>
                                <p className="text-sm text-slate-500">Bulk API provider rates passed directly on to you with zero hidden costs.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <Award size={22} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-base mb-1">Premium Support</h3>
                                <p className="text-sm text-slate-500">Our customer support ticket system runs around the clock to assist you.</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center pt-8 border-t border-slate-100">
                        <Link 
                            href="/register" 
                            className="inline-flex items-center justify-center px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-0.5"
                        >
                            Get Started Now
                        </Link>
                    </div>
                </div>

                <div className="border-t border-slate-100 mt-10 pt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-slate-400 font-medium">
                    <Link href="/login" className="hover:text-blue-600 transition">Back to Login</Link>
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

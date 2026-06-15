"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import TrustSection from "@/components/TrustSection";
import { Zap, Shield, Sparkles, Award } from "lucide-react";

export default function AboutUs() {
    const { token } = useAuth();
    
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 md:px-8">
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
                
                {/* Meta Open Graph, Twitter & Structured Data Schema */}
                <title>About Us | DovixSMM - Social Media Growth Experts</title>
                <meta name="description" content="Learn about DovixSMM, the top SMM reseller panel providing high retention, lightning-fast followers, likes, and watch time solutions." />
                
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">About DovixSMM</h1>
                    <p className="text-slate-500 text-lg max-w-xl mx-auto">Your Dedicated partner in automated social media growth, reach scaling, and brand positioning.</p>
                </div>

                <div className="prose prose-slate max-w-none text-slate-600 space-y-8 text-[15px] leading-relaxed">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Our Mission</h3>
                            <p className="text-slate-500 text-sm">To provide fast, reliable, and secure promotional services that help creators and businesses achieve their target reach without high marketing agency costs.</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Our Vision</h3>
                            <p className="text-slate-500 text-sm">To build the most transparent SMM ecosystem globally with verified delivery, instant refunds, and secure automation endpoints.</p>
                        </div>
                    </div>

                    {/* Counters */}
                    <div className="bg-blue-600 text-white rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-lg shadow-blue-500/15 mt-8">
                        <div>
                            <span className="block text-3xl font-black mb-1">5M+</span>
                            <span className="text-xs text-blue-100 font-medium">Orders Completed</span>
                        </div>
                        <div>
                            <span className="block text-3xl font-black mb-1">15k+</span>
                            <span className="text-xs text-blue-100 font-medium">Happy Resellers</span>
                        </div>
                        <div>
                            <span className="block text-3xl font-black mb-1">99.9%</span>
                            <span className="text-xs text-blue-100 font-medium">Success Rate</span>
                        </div>
                        <div>
                            <span className="block text-3xl font-black mb-1">24/7</span>
                            <span className="text-xs text-blue-100 font-medium">Support Active</span>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-800 pt-6 border-t border-slate-100">Core Values We Guarantee</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    <TrustSection />

                    <div className="text-center pt-8 border-t border-slate-100">
                        <Link 
                            href={token ? "/" : "/register"} 
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

"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, PhoneCall, HelpCircle, Shield, ChevronDown } from "lucide-react";
import { trackPixelEvent } from "@/components/MetaTracking";

export default function ContactUs() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        // Track Contact Lead Submission for Ad optimization
        trackPixelEvent("Contact", {
            client_name: name,
            client_email: email
        });

        setTimeout(() => {
            setSubmitting(false);
            setSuccess(true);
            setName("");
            setEmail("");
            setMessage("");
        }, 1200);
    };

    const toggleFaq = (index: number) => {
        setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const faqs = [
        { q: "How long does order delivery take?", a: "Most SMM orders begin executing automatically within 5 to 10 minutes of placement. Specific delivery speed details are listed under service items description." },
        { q: "Are these services safe for my account?", a: "Yes, fully safe. We use high quality compliance methods and we never ask for your account password. All promotions are compliant with target platforms guidelines." },
        { q: "How do I add money to the wallet?", a: "You can navigate to the 'Add Funds' section from your dashboard, pay via secure QR Code (UPI), Credit/Debit Card (Stripe), PayPal, or Cryptocurrencies. Funds are processed instantly." }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 md:px-8">
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-10">
                
                {/* Left side info */}
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Contact Us</h1>
                    <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                        Need assistance with a custom bulk order or having issues with funds upload? Submit a message below or chat with us directly.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <Mail size={20} />
                            </div>
                            <div>
                                <span className="block text-xs text-slate-400 font-bold uppercase">Email Support</span>
                                <a href="mailto:support@dovixsmm.com" className="text-slate-700 font-bold hover:text-blue-600">support@dovixsmm.com</a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                                <PhoneCall size={20} />
                            </div>
                            <div>
                                <span className="block text-xs text-slate-400 font-bold uppercase">WhatsApp Helpdesk</span>
                                <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold hover:underline">
                                    +91 99999 99999
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-slate-100 pt-6">
                        <h3 className="text-base font-bold text-slate-800 mb-4">Frequently Asked Questions</h3>
                        <div className="space-y-3">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="border-b border-slate-100 pb-3">
                                    <button 
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full flex justify-between items-center text-left text-sm font-bold text-slate-700 hover:text-blue-600 transition"
                                    >
                                        <span>{faq.q}</span>
                                        <ChevronDown size={16} className={`transform transition-transform ${faqOpen[idx] ? 'rotate-180' : ''}`} />
                                    </button>
                                    {faqOpen[idx] && (
                                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">{faq.a}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right side contact form */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-6">Drop Us a Line</h3>
                        
                        {success ? (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-4 text-sm font-medium">
                                Message submitted successfully! Our support agents will respond via email shortly.
                            </div>
                        ) : null}

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs text-slate-600 font-bold mb-1">Your Name</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-slate-600 font-bold mb-1">Email Address</label>
                                <input 
                                    type="email" 
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-slate-600 font-bold mb-1">Message Detail</label>
                                <textarea 
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-28 resize-none"
                                    placeholder="Brief details about your order or request..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-md shadow-blue-200 text-sm"
                                disabled={submitting}
                            >
                                {submitting ? "Sending..." : "Submit Inquiry"}
                            </button>
                        </form>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 mt-6 pt-4 border-t border-slate-200">
                        <Shield size={14} /> 24/7 Verified Support Protection
                    </div>
                </div>
            </div>
            
            <div className="max-w-4xl w-full flex justify-center gap-x-4 gap-y-2 mt-8 text-xs text-slate-400 font-medium">
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
    );
}

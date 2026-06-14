"use client";

import { useState, useEffect, useMemo } from "react";
import {
    Wallet,
    ShoppingCart,
    CreditCard,
    TrendingUp,
    ArrowRight,
    Megaphone,
    LifeBuoy,
    Instagram,
    Facebook,
    Youtube,
    Send,
    Music2,
    Twitter,
    Globe,
    Linkedin,
    MessageCircle,
    PlayCircle,
    AlertCircle,
    X,
    Shield
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.css";
import SuccessModal from "@/components/SuccessModal";

interface Service {
    _id: string;
    providerServiceId: number;
    name: string;
    rate: number;
    min: number;
    max: number;
    category: string;
    type: string;
    averageTime?: string;
}

const PLATFORMS = ["Instagram", "Facebook", "Telegram", "YouTube"];

const news = [
    {
        id: 1,
        date: "Jan 28, 2026",
        content: "New Instagram services added! High retention views now available at ₹5.50/k.",
    },
    {
        id: 2,
        date: "Jan 25, 2026",
        content: "We've updated our API documentation. Please check the new endpoints for better integration.",
    },
    {
        id: 3,
        date: "Jan 20, 2026",
        content: "TikTok follower update issues resolved. All pending orders are now processing.",
    },
];

export default function Dashboard() {
    const { user, token } = useAuth();
    const [balance, setBalance] = useState(0);
    const [totalSpent, setTotalSpent] = useState("0.00");
    const [totalOrders, setTotalOrders] = useState("0");

    // Order form states
    const [services, setServices] = useState<Service[]>([]);
    const [category, setCategory] = useState(PLATFORMS[0]);
    const [selectedServiceId, setSelectedServiceId] = useState<string>("");
    const [link, setLink] = useState("");
    const [quantity, setQuantity] = useState<number | "">("");
    const [charge, setCharge] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    // Fetch Stats & Services
    useEffect(() => {
        const fetchDashboardData = async () => {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
            
            // 1. Fetch Services (Public)
            try {
                const res = await fetch(`${API_URL}/api/services`);
                const data = await res.json();
                if (res.ok && data.length > 0) {
                    setServices(data);
                }
            } catch (error) {
                console.error("Failed to fetch services", error);
            }

            // 2. Fetch User Stats (Authenticated only)
            if (token) {
                try {
                    const userRes = await fetch(`${API_URL}/api/user/me`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const userData = await userRes.json();
                    if (userRes.ok && userData.user) {
                        setBalance(userData.user.walletBalance || 0);
                        setTotalSpent(userData.totalSpent?.toFixed(2) || "0.00");
                        setTotalOrders(userData.totalOrders?.toLocaleString() || "0");
                    }
                } catch (error) {
                    console.error("Failed to fetch user stats", error);
                }
            }
        };

        fetchDashboardData();
    }, [token]);

    const filteredServices = useMemo(() => {
        return services.filter(s => 
            s.category.toLowerCase().includes(category.toLowerCase())
        );
    }, [services, category]);

    // Auto-select first service when category changes
    useEffect(() => {
        if (filteredServices.length > 0) {
            setSelectedServiceId(filteredServices[0].providerServiceId.toString());
        } else {
            setSelectedServiceId("");
        }
    }, [filteredServices]);

    const selectedService = services.find(s => s.providerServiceId.toString() === selectedServiceId) || filteredServices[0];

    useEffect(() => {
        if (selectedService && typeof quantity === "number") {
            const price = (quantity / 1000) * selectedService.rate;
            setCharge(price);
        } else {
            setCharge(0);
        }
    }, [selectedService, quantity]);

    const getCategoryIcon = (categoryName: string) => {
        const cat = categoryName.toLowerCase();
        if (cat.includes('instagram')) return <Instagram size={20} />;
        if (cat.includes('facebook') || cat.includes('fb')) return <Facebook size={20} />;
        if (cat.includes('youtube')) return <Youtube size={20} />;
        if (cat.includes('telegram')) return <Send size={20} />;
        if (cat.includes('tiktok')) return <Music2 size={20} />;
        if (cat.includes('twitter') || cat.includes('x')) return <Twitter size={20} />;
        if (cat.includes('linkedin')) return <Linkedin size={20} />;
        if (cat.includes('threads')) return <MessageCircle size={20} />;
        if (cat.includes('spotify') || cat.includes('music')) return <PlayCircle size={20} />;
        return <Globe size={20} />;
    };

    const handleOrderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // If not logged in, prompt user to log in/register
        if (!token) {
            setShowLoginPrompt(true);
            return;
        }

        setLoading(true);
        setMessage(null);

        if (!selectedService) return;

        // Check wallet balance
        if (charge > balance) {
            setLoading(false);
            alert(`Insufficient funds. Your wallet balance is ₹${balance.toFixed(2)} but order cost is ₹${charge.toFixed(2)}.`);
            return;
        }

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
            const res = await fetch(`${API_URL}/api/orders/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    serviceId: selectedService.providerServiceId,
                    link,
                    quantity: Number(quantity)
                })
            });

            const data = await res.json();

            if (res.ok) {
                setShowSuccessModal(true);
                setLink("");
                setQuantity("");
                // Refresh balance
                setBalance(prev => prev - charge);
            } else {
                alert(data.message || "Order Failed");
            }
        } catch {
            alert("Server connection failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {/* Success modal for placed orders */}
            <SuccessModal
                isOpen={showSuccessModal}
                title="Success!"
                message="Order Placed Successfully"
                actionLabel="Continue"
                actionLink="/"
            />

            {/* Login Prompt Modal for guests */}
            {showLoginPrompt && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full relative transform transition-all scale-100">
                        <button
                            onClick={() => setShowLoginPrompt(false)}
                            className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition"
                        >
                            <X size={20} />
                        </button>
                        <div className="flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                                <Shield size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Login Required</h2>
                            <p className="text-slate-500 mb-6">Please sign in or register to place your social media marketing order.</p>
                            <div className="flex flex-col gap-3 w-full">
                                <Link 
                                    href="/login" 
                                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center justify-center"
                                >
                                    Log In
                                </Link>
                                <Link 
                                    href="/register" 
                                    className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition flex items-center justify-center"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Dynamic Welcome / Hero Section */}
            {token ? (
                <div className={styles.welcomeSection}>
                    <h1 className={styles.welcomeTitle}>Welcome back, {user?.username || "User"}!</h1>
                </div>
            ) : (
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-3xl p-8 md:p-12 mb-8 shadow-lg shadow-blue-500/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="max-w-xl">
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">DovixSMM - Cheapest SMM Reseller Panel</h1>
                        <p className="text-blue-100 text-base md:text-lg mb-6">Boost your social media presence instantly. Buy High Quality followers, views, likes, and more starting at just ₹5.</p>
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                            <Link href="/register" className="px-6 py-3 bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-bold transition shadow-sm">
                                Get Started Now
                            </Link>
                            <Link href="/about" className="px-6 py-3 border border-blue-400 text-white hover:bg-white/10 rounded-xl font-bold transition">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Authenticated Dashboard Stats */}
            {token && (
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statIconWrapper}>
                            <Wallet size={24} />
                        </div>
                        <div className={styles.statInfo}>
                            <span className={styles.statLabel}>Available Balance</span>
                            <span className={styles.statValue}>₹{balance.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIconWrapper}>
                            <CreditCard size={24} />
                        </div>
                        <div className={styles.statInfo}>
                            <span className={styles.statLabel}>Total Spent</span>
                            <span className={styles.statValue}>₹{totalSpent}</span>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIconWrapper}>
                            <ShoppingCart size={24} />
                        </div>
                        <div className={styles.statInfo}>
                            <span className={styles.statLabel}>Total Orders</span>
                            <span className={styles.statValue}>{totalOrders}</span>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIconWrapper}>
                            <TrendingUp size={24} />
                        </div>
                        <div className={styles.statInfo}>
                            <span className={styles.statLabel}>Account Status</span>
                            <span className={styles.statValue}>Elite</span>
                        </div>
                    </div>
                </div>
            )}

            {/* New Order Form & Service Description Section (Copied from /order page layout) */}
            <div className={styles.contentGrid}>
                <div className={styles.formCard}>
                    <h2 className="text-xl font-bold text-slate-800 mb-6">Place a New Order</h2>
                    <form onSubmit={handleOrderSubmit} className={styles.form}>
                        <div className={styles.field}>
                            <label className={styles.label}>Select Platform</label>
                            <div className={styles.categoryGrid}>
                                {PLATFORMS.map(plt => (
                                    <button
                                        key={plt}
                                        type="button"
                                        className={`${styles.categoryItem} ${category === plt ? styles.activeCategory : ""}`}
                                        onClick={() => setCategory(plt)}
                                        title={plt}
                                    >
                                        <span className={styles.categoryIcon}>
                                            {getCategoryIcon(plt)}
                                        </span>
                                        <span className={styles.categoryName}>{plt}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Service</label>
                            <div className={styles.selectWrapper}>
                                <select
                                    value={selectedServiceId}
                                    onChange={(e) => setSelectedServiceId(e.target.value)}
                                    className={styles.select}
                                >
                                    {filteredServices.map(service => (
                                        <option key={service._id} value={service.providerServiceId}>
                                            {service.providerServiceId} - {service.name} (Avg: {service.averageTime || '--'}) - ₹{service.rate.toFixed(2)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Link</label>
                            <input
                                type="text"
                                placeholder="https://..."
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                className={styles.input}
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Quantity</label>
                            <input
                                type="number"
                                placeholder={`Min: ${selectedService?.min || 0} - Max: ${selectedService?.max || 0}`}
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
                                className={styles.input}
                                min={selectedService?.min}
                                max={selectedService?.max}
                                required
                            />
                        </div>

                        <div className={styles.chargeBox}>
                            <span className={styles.chargeLabel}>Total Charge</span>
                            <span className={styles.chargeValue}>₹{charge.toFixed(2)}</span>
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? "Processing..." : "Submit Order"}
                        </button>
                    </form>
                </div>

                <div className={styles.infoCol}>
                    <div className={styles.infoCard}>
                        <div className={styles.infoHeader}>
                            <AlertCircle size={20} className={styles.infoIcon} />
                            <h3>Service Description</h3>
                        </div>
                        <div className={styles.description}>
                            <p><strong>Service:</strong> {selectedService?.name || 'Select a service'}</p>
                            <p><strong>Rate per 1000:</strong> ₹{selectedService?.rate.toFixed(2) || '0.00'}</p>
                            <p><strong>Average Time:</strong> {selectedService?.averageTime || '30 mins - 1 hour'}</p>
                            <p><strong>Min/Max Order:</strong> {selectedService?.min || 0} / {selectedService?.max.toLocaleString() || 0}</p>
                            <div className={styles.divider} />
                            <p className={styles.note}>
                                Please ensure your account is set to <strong>Public</strong> before placing an order.
                                Private accounts will not receive followers/likes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard News & Quick Actions (Visible to authenticated users only) */}
            {token && (
                <div className={`${styles.contentGrid} mt-8`}>
                    <div className={styles.sectionCard}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>
                                <Megaphone size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
                                Latest News & Updates
                            </h2>
                        </div>
                        <div className={styles.newsList}>
                            {news.map((item) => (
                                <div key={item.id} className={styles.newsItem}>
                                    <span className={styles.newsDate}>{item.date}</span>
                                    <p className={styles.newsContent}>{item.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.sectionCard}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.cardTitle}>Quick Actions</h2>
                        </div>
                        <div className={styles.quickActions}>
                            <Link href="/funds" className={styles.actionBtn}>
                                <span>Add Funds</span>
                                <ArrowRight size={18} />
                            </Link>
                            <Link href="/services" className={styles.actionBtn}>
                                <span>View Services</span>
                                <ArrowRight size={18} />
                            </Link>
                            <Link href="/tickets" className={styles.actionBtn}>
                                <span>Contact Support</span>
                                <LifeBuoy size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

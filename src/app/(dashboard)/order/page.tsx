"use client";

import { useState, useEffect, useMemo } from "react";
import { AlertCircle, X, Instagram, Facebook, Youtube, Send, Music2, Twitter, Globe, Linkedin, MessageCircle, PlayCircle, ChevronDown } from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";

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

export default function NewOrder() {
    const [services, setServices] = useState<Service[]>([]);
    const [category, setCategory] = useState(PLATFORMS[0]);
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState<string>("");
    const [link, setLink] = useState("");
    const [quantity, setQuantity] = useState<number | "">("");
    const [charge, setCharge] = useState(0);
    const [balance, setBalance] = useState(0);
    const [showLowBalanceModal, setShowLowBalanceModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successTimer, setSuccessTimer] = useState<NodeJS.Timeout | null>(null);

    // Auto-close success modal after 3 seconds
    useEffect(() => {
        if (showSuccessModal) {
            const timer = setTimeout(() => {
                setShowSuccessModal(false);
            }, 3000);
            setSuccessTimer(timer);
            return () => clearTimeout(timer);
        }
    }, [showSuccessModal]);

    const closeSuccessModal = () => {
        if (successTimer) clearTimeout(successTimer);
        setShowSuccessModal(false);
    };

    // Close category dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest(`.${styles.customSelectContainer}`)) {
                setIsCategoryDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Fetch Services on Load
    useEffect(() => {
        const fetchServicesAndBalance = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
                const token = localStorage.getItem("token");

                // Fetch Balance
                if (token) {
                    const userRes = await fetch(`${API_URL}/api/user/me`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const userData = await userRes.json();
                    if (userRes.ok && userData.user) {
                        setBalance(userData.user.walletBalance || 0);
                    }
                }

                // Fetch Services
                const res = await fetch(`${API_URL}/api/services`);
                const data = await res.json();
                if (res.ok) {
                    setServices(data);
                    // Set default category
                    if (data.length > 0) {
                        setCategory("Instagram");
                    }
                }
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };
        fetchServicesAndBalance();
    }, []);

    const platformServices = useMemo(() => {
        return services.filter(s => 
            s.category.toLowerCase().includes(category.toLowerCase())
        );
    }, [services, category]);

    const categoriesForPlatform = useMemo(() => {
        const cats = platformServices.map(s => s.category.trim());
        return Array.from(new Set(cats)).sort();
    }, [platformServices]);

    useEffect(() => {
        if (categoriesForPlatform.length > 0) {
            setSelectedSubCategory(categoriesForPlatform[0]);
        } else {
            setSelectedSubCategory("");
        }
    }, [categoriesForPlatform]);

    const filteredServices = useMemo(() => {
        return platformServices.filter(s => 
            s.category.trim() === selectedSubCategory.trim()
        );
    }, [platformServices, selectedSubCategory]);

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

    const getCategoryIcon = (category: string) => {
        const cat = category.toLowerCase();
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (!selectedService) return;

        // Check wallet balance
        if (charge > balance) {
            setLoading(false);
            setShowLowBalanceModal(true);
            return;
        }

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/api/orders/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    serviceId: selectedService.providerServiceId, // Send Provider ID
                    link,
                    quantity: Number(quantity)
                })
            });

            const data = await res.json();

            if (res.ok) {
                setShowSuccessModal(true); // Show popup instead of inline message
                setLink("");
                setQuantity("");
            } else {
                setMessage({ type: 'error', text: data.message || "Order Failed" });
            }
        } catch {
            setMessage({ type: 'error', text: "Server connection failed" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>New Order</h1>

            {/* Low Balance Modal */}
            {showLowBalanceModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center p-5 border-b border-gray-100">
                            <div className="flex items-center gap-2 text-red-600">
                                <AlertCircle size={22} />
                                <h3 className="text-lg font-semibold">Low Balance</h3>
                            </div>
                            <button
                                onClick={() => setShowLowBalanceModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-600 text-[15px] mb-4">
                                Your current wallet balance is <strong className="text-gray-900">₹{balance.toFixed(2)}</strong>, but this order requires <strong className="text-gray-900">₹{charge.toFixed(2)}</strong>.
                            </p>
                            <p className="text-gray-600 text-[15px] mb-6">
                                Please recharge your wallet to proceed with this service.
                            </p>
                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={() => setShowLowBalanceModal(false)}
                                    className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                                <Link
                                    href="/add-funds"
                                    className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
                                >
                                    Add Funds Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {message && message.type === 'error' && (
                <div className={`p-4 mb-4 rounded-lg text-sm font-medium bg-red-50 text-red-700`}>
                    {message.text}
                </div>
            )}

            {/* Success Auto-Close Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100 animate-in zoom-in-95 duration-200 relative">
                        <button
                            onClick={closeSuccessModal}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
                        >
                            <X size={20} />
                        </button>
                        <div className="p-8 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                <svg
                                    className="w-8 h-8 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
                            <p className="text-gray-600 mb-6">Order Placed Successfully</p>
                            <button
                                onClick={closeSuccessModal}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.grid}>
                <div className={styles.formCard}>
                    <form onSubmit={handleSubmit} className={styles.form}>
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
                            <label className={styles.label}>Category</label>
                            <div className={styles.customSelectContainer}>
                                <button
                                    type="button"
                                    className={styles.customSelectTrigger}
                                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                                >
                                    <span className={styles.triggerLeft}>
                                        <span className={styles.optionIcon}>
                                            {getCategoryIcon(selectedSubCategory)}
                                        </span>
                                        <span className={styles.triggerText}>{selectedSubCategory || "Select Category"}</span>
                                    </span>
                                    <ChevronDown size={18} className={`${styles.chevron} ${isCategoryDropdownOpen ? styles.chevronOpen : ""}`} />
                                </button>
                                
                                {isCategoryDropdownOpen && (
                                    <div className={styles.customSelectOptions}>
                                        {categoriesForPlatform.map(cat => (
                                            <div
                                                key={cat}
                                                className={`${styles.customOption} ${selectedSubCategory === cat ? styles.customOptionActive : ""}`}
                                                onClick={() => {
                                                    setSelectedSubCategory(cat);
                                                    setIsCategoryDropdownOpen(false);
                                                }}
                                            >
                                                <span className={styles.optionIcon}>
                                                    {getCategoryIcon(cat)}
                                                </span>
                                                <span className={styles.optionText}>{cat}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
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
        </div>
    );
}

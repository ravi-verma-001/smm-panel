"use client";

import { useState, useEffect, useMemo } from "react";
import { AlertCircle } from "lucide-react";
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

export default function NewOrder() {
    const [services, setServices] = useState<Service[]>([]);
    const [category, setCategory] = useState("");
    const [selectedServiceId, setSelectedServiceId] = useState<string>("");
    const [link, setLink] = useState("");
    const [quantity, setQuantity] = useState<number | "">("");
    const [charge, setCharge] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Fetch Services on Load
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
                const res = await fetch(`${API_URL}/api/services`);
                const data = await res.json();
                if (res.ok) {
                    setServices(data);
                    // Set default category
                    if (data.length > 0) {
                        const firstCategory = data[0].category;
                        setCategory(firstCategory);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch services", error);
            }
        };
        fetchServices();
    }, []);

    const categories = [...new Set(services.map(s => s.category))];

    const filteredServices = useMemo(() => {
        return services.filter(s => s.category === category);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (!selectedService) return;

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
                setMessage({ type: 'success', text: `Order Placed Successfully! ID: ${data.orderId}` });
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

            {message && (
                <div className={`p-4 mb-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <div className={styles.grid}>
                <div className={styles.formCard}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.field}>
                            <label className={styles.label}>Category</label>
                            <div className={styles.selectWrapper}>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className={styles.select}
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
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
                                            {service.providerServiceId} - {service.name} - ₹{service.rate.toFixed(2)}
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

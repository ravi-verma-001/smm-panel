"use client";

import { useState, useEffect } from "react";
import { CreditCard, ShieldCheck, AlertCircle, QrCode, Loader2, History } from "lucide-react";
import styles from "./page.module.css";
import Image from "next/image";

const paymentMethods = [
    { id: "qr", name: "QR Code | UPI", min: 1 },
    { id: "stripe", name: "Credit/Debit Card (Stripe)", min: 10 },
    { id: "paypal", name: "PayPal", min: 5 },
    { id: "crypto", name: "Cryptocurrency (Coinbase)", min: 20 },
];

interface Payment {
    _id: string;
    amount: number;
    utr: string;
    status: string;
    createdAt: string;
}

export default function AddFunds() {
    const [method, setMethod] = useState(paymentMethods[0].id);
    const [amount, setAmount] = useState("");
    const [utr, setUtr] = useState("");
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState<Payment[]>([]);
    const [historyLoading, setHistoryLoading] = useState(true);

    const selectedMethod = paymentMethods.find(m => m.id === method);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            // Demo user ID header
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            const res = await fetch(`${API_URL}/api/payments/history`, {
                headers: { 'x-user-email': 'test@user.com' } // Demo Email
            });
            const data = await res.json();
            if (res.ok) {
                setHistory(data);
            }
        } catch (error) {
            console.log("Error fetching history", error);
        } finally {
            setHistoryLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (method === "qr") {
            if (!utr) return alert("Please enter UTR number");

            setLoading(true);
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
                const res = await fetch(`${API_URL}/api/payments/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-user-email": "test@user.com"
                    },
                    body: JSON.stringify({ amount, utr })
                });

                const data = await res.json();

                if (res.ok) {
                    alert("Payment request submitted successfully! Funds will be added after approval.");
                    setAmount("");
                    setUtr("");
                    fetchHistory();
                } else {
                    alert(data.message || "Failed to submit request");
                }
            } catch (error) {
                alert("Server error");
            } finally {
                setLoading(false);
            }
        } else {
            alert(`Redirecting to ${selectedMethod?.name} to pay $${amount}...`);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Add Funds</h1>

            <div className={styles.grid}>
                <div className={styles.card}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.field}>
                            <label className={styles.label}>Payment Method</label>
                            <select
                                value={method}
                                onChange={(e) => setMethod(e.target.value)}
                                className={styles.select}
                            >
                                {paymentMethods.map(m => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                ))}
                            </select>
                        </div>

                        {method === "qr" && (
                            <div className="flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-200 rounded-xl mb-6">
                                <span className="text-sm font-bold text-slate-700 mb-3">Scan & Pay</span>
                                <div className={styles.qrContainer}>
                                    <Image
                                        src="/upi-qr.jpg"
                                        alt="UPI QR Code"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-3 text-center">
                                    Scan with any UPI App (GPay, PhonePe, Paytm)<br />
                                    After payment, enter the UTR / Transaction ID below.
                                </p>
                            </div>
                        )}

                        <div className={styles.field}>
                            <label className={styles.label}>Amount ($)</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder={`Minimum: $${selectedMethod?.min}`}
                                min={selectedMethod?.min}
                                className={styles.input}
                                required
                            />
                        </div>

                        {method === "qr" && (
                            <div className={styles.field}>
                                <label className={styles.label}>UTR / Transaction ID</label>
                                <input
                                    type="text"
                                    value={utr}
                                    onChange={(e) => setUtr(e.target.value)}
                                    placeholder="Enter 12-digit UTR number"
                                    className={styles.input}
                                    required
                                />
                            </div>
                        )}

                        {method !== "qr" && (
                            <div className={styles.field}>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                    You will be redirected to a secure payment page.
                                </p>
                            </div>
                        )}

                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" /> : `Pay $${Number(amount || 0).toFixed(2)}`}
                        </button>
                    </form>
                </div>

                <div className={styles.sideCol}>
                    <div className={styles.card}>
                        <h3 className={styles.infoTitle}>
                            <AlertCircle size={20} />
                            Important Information
                        </h3>
                        <ul className={styles.infoList}>
                            <li className={styles.infoItem}>
                                <b>QR Code Payments:</b> Verified manually. Funds added within 10-20 mins.
                            </li>
                            <li className={styles.infoItem}>
                                Please ensure UTR is correct to avoid delays.
                            </li>
                            <li className={styles.infoItem}>
                                Bonus: Deposit $100+ and get 5% extra bonus.
                            </li>
                        </ul>

                        <div className={styles.secureBadge}>
                            <ShieldCheck size={20} />
                            <span>256-bit Secure SSL Payment</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center gap-2">
                    <History size={20} className="text-slate-400" />
                    <h2 className="text-lg font-bold text-slate-800">Transaction History</h2>
                </div>

                {historyLoading ? (
                    <div className="p-8 text-center text-slate-500">Loading...</div>
                ) : history.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No transactions found</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b border-slate-100 text-slate-600">
                                <tr>
                                    <th className="p-4 font-semibold">Date</th>
                                    <th className="p-4 font-semibold">UTR</th>
                                    <th className="p-4 font-semibold">Amount</th>
                                    <th className="p-4 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {history.map((tx) => (
                                    <tr key={tx._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4">{new Date(tx.createdAt).toLocaleDateString()}</td>
                                        <td className="p-4 font-mono text-xs">{tx.utr}</td>
                                        <td className="p-4 font-bold text-slate-900">${tx.amount}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${tx.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                tx.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { Check, X, Loader2, Search, Filter, MoreHorizontal, FileText } from "lucide-react";

interface Payment {
    _id: string;
    user: {
        username: string;
        email: string;
    };
    amount: number;
    utr: string;
    date: string;
    status: string;
    createdAt: string;
}

export default function PendingPayments() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<string | null>(null);

    useEffect(() => {
        fetchPayments();
        const interval = setInterval(fetchPayments, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const fetchPayments = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            const res = await fetch(`${API_URL}/api/admin/payments/pending`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok) {
                setPayments(data);
            }
        } catch (error) {
            console.error("Failed to fetch payments", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id: string, action: "approve" | "reject") => {
        setProcessingId(id);
        try {
            const token = localStorage.getItem("adminToken");
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            const res = await fetch(`${API_URL}/api/admin/payments/${action}/${id}`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                // Remove from list
                setPayments((prev) => prev.filter((p) => p._id !== id));
            } else {
                alert("Failed to process payment");
            }
        } catch (error) {
            console.error(`Failed to ${action} payment`, error);
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Pending Payments</h1>
                    <p className="text-slate-500 mt-1">Review and approve user payment requests.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                        <Filter size={16} />
                        <span>Filter</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200">
                        <FileText size={16} />
                        <span>Export CSV</span>
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm flex items-center gap-4">
                <Search size={20} className="text-slate-400" />
                <input
                    type="text"
                    placeholder="Search by username, email or UTR number..."
                    className="flex-1 bg-transparent border-none focus:outline-none text-slate-600 placeholder:text-slate-400"
                />
            </div>

            {/* Payments Table */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200/60 shadow-sm">
                    <Loader2 className="animate-spin text-emerald-600 mb-4" size={40} />
                    <p className="text-slate-500 font-medium">Loading payments...</p>
                </div>
            ) : payments.length === 0 ? (
                <div className="bg-white p-16 rounded-2xl border border-slate-200/60 shadow-sm text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-slate-50 rounded-full mb-4">
                        <Check size={32} className="text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">No Pending Payments</h3>
                    <p className="text-slate-500 mt-2">All caught up! There are no new payment requests to review.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-100">
                                    <th className="p-5 font-semibold text-slate-600 text-sm tracking-wide">User Details</th>
                                    <th className="p-5 font-semibold text-slate-600 text-sm tracking-wide">Amount</th>
                                    <th className="p-5 font-semibold text-slate-600 text-sm tracking-wide">Transaction Info</th>
                                    <th className="p-5 font-semibold text-slate-600 text-sm tracking-wide text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {payments.map((payment) => (
                                    <tr key={payment._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
                                                    {payment.user?.username?.substring(0, 2).toUpperCase() || 'Ur'}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-slate-900">{payment.user?.username || 'Unknown'}</div>
                                                    <div className="text-xs text-slate-500">{payment.user?.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="font-bold text-emerald-600 text-lg">
                                                ${payment.amount.toFixed(2)}
                                            </div>
                                            <span className="text-xs text-slate-400 font-medium">USD</span>
                                        </td>
                                        <td className="p-5">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-semibold text-slate-400">UTR:</span>
                                                    <code className="bg-slate-100 px-2 py-0.5 rounded text-xs font-mono text-slate-700 border border-slate-200">
                                                        {payment.utr}
                                                    </code>
                                                </div>
                                                <div className="text-xs text-slate-400">
                                                    {new Date(payment.createdAt).toLocaleDateString()} at {new Date(payment.createdAt).toLocaleTimeString()}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-100 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleAction(payment._id, "reject")}
                                                    disabled={processingId === payment._id}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all border border-transparent hover:border-red-100"
                                                    title="Reject"
                                                >
                                                    {processingId === payment._id ? (
                                                        <Loader2 size={18} className="animate-spin" />
                                                    ) : (
                                                        <X size={18} />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => handleAction(payment._id, "approve")}
                                                    disabled={processingId === payment._id}
                                                    className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200 disabled:opacity-70 disabled:cursor-not-allowed"
                                                >
                                                    {processingId === payment._id ? (
                                                        <Loader2 size={16} className="animate-spin" />
                                                    ) : (
                                                        <Check size={16} />
                                                    )}
                                                    <span className="font-medium">Approve</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

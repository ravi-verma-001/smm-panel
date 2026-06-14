"use client";

import { useEffect, useState } from "react";
import { Check, X, Loader2 } from "lucide-react";

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
        <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Pending Payments</h1>

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="animate-spin text-blue-600" size={32} />
                </div>
            ) : payments.length === 0 ? (
                <div className="bg-white p-12 rounded-xl border border-slate-200 text-center">
                    <p className="text-slate-500">No pending payments found.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="p-4 font-semibold text-slate-600">User</th>
                                    <th className="p-4 font-semibold text-slate-600">Amount</th>
                                    <th className="p-4 font-semibold text-slate-600">UTR / Ref</th>
                                    <th className="p-4 font-semibold text-slate-600">Date</th>
                                    <th className="p-4 font-semibold text-slate-600 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {payments.map((payment) => (
                                    <tr key={payment._id} className="hover:bg-slate-50/50">
                                        <td className="p-4">
                                            <div className="font-medium text-slate-900">{payment.user?.username || 'Unknown'}</div>
                                            <div className="text-sm text-slate-500">{payment.user?.email}</div>
                                        </td>
                                        <td className="p-4 font-bold text-green-600">
                                            ${payment.amount.toFixed(2)}
                                        </td>
                                        <td className="p-4">
                                            <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono text-slate-600">
                                                {payment.utr}
                                            </code>
                                        </td>
                                        <td className="p-4 text-slate-500 text-sm">
                                            {new Date(payment.createdAt).toLocaleDateString()}
                                            <br />
                                            {new Date(payment.createdAt).toLocaleTimeString()}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleAction(payment._id, "approve")}
                                                    disabled={processingId === payment._id}
                                                    className="flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors border border-green-200 disabled:opacity-50"
                                                >
                                                    {processingId === payment._id ? (
                                                        <Loader2 size={16} className="animate-spin" />
                                                    ) : (
                                                        <Check size={16} />
                                                    )}
                                                    <span className="text-sm font-medium">Approve</span>
                                                </button>

                                                <button
                                                    onClick={() => handleAction(payment._id, "reject")}
                                                    disabled={processingId === payment._id}
                                                    className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors border border-red-200 disabled:opacity-50"
                                                >
                                                    {processingId === payment._id ? (
                                                        <Loader2 size={16} className="animate-spin" />
                                                    ) : (
                                                        <X size={16} />
                                                    )}
                                                    <span className="text-sm font-medium">Reject</span>
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

"use client";

import { useState, useEffect } from "react";
import {
    Users,
    Activity,
    DollarSign,
    RefreshCw
} from "lucide-react";
import styles from "../admin.module.css";

interface DashboardStats {
    totalUsers: number;
    pendingRequests: number;
    totalRevenue: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
            
            const res = await fetch(`${API_URL}/api/admin/stats`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (res.ok) {
                const data = await res.json();
                setStats(data);
                setError(null);
            } else {
                setError("Failed to fetch statistics");
            }
        } catch (err) {
            setError("Connection error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(val);
    };

    return (
        <div className="space-y-6">
            {/* Simple Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-slate-500 text-sm">Overview of platform performance.</p>
                </div>
                <button 
                    onClick={fetchStats}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
                    disabled={loading}
                >
                    <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                    Refresh
                </button>
            </div>

            {/* Stats Grid - Clean */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Users */}
                <div className={styles.statCard}>
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Users</p>
                                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                                    {loading ? "..." : (stats?.totalUsers || 0).toLocaleString()}
                                </h3>
                            </div>
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <Users size={20} />
                            </div>
                        </div>
                        <div className="text-xs text-blue-600 font-medium">
                            Real-time data <span className="text-slate-400">from database</span>
                        </div>
                    </div>
                </div>

                {/* Pending Requests */}
                <div className={styles.statCard}>
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Pending Requests</p>
                                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                                    {loading ? "..." : (stats?.pendingRequests || 0)}
                                </h3>
                            </div>
                            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                <Activity size={20} />
                            </div>
                        </div>
                        <div className="text-xs text-orange-600 font-medium">
                            Action Required
                        </div>
                    </div>
                </div>

                {/* Total Revenue */}
                <div className={styles.statCard}>
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Revenue (Profit)</p>
                                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                                    {loading ? "..." : formatCurrency(stats?.totalRevenue || 0)}
                                </h3>
                            </div>
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <DollarSign size={20} />
                            </div>
                        </div>
                        <div className="text-xs text-blue-600 font-medium">
                            Selling Price - API Cost
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                    {error}
                </div>
            )}

            {/* Recent Activity Section - Clean */}
            <div className={styles.activityCard}>
                <div className={`${styles.activityHeader} flex items-center justify-between`}>
                    <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
                </div>
                <div className="p-12 text-center text-slate-500 text-sm">
                    No recent activity to show.
                </div>
            </div>
        </div>
    );
}


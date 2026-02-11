import {
    Users,
    CreditCard,
    DollarSign,
    Activity
} from "lucide-react";
import styles from "../admin.module.css";

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            {/* Simple Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-slate-500 text-sm">Overview of platform performance.</p>
                </div>
            </div>

            {/* Stats Grid - Clean */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Users */}
                <div className={styles.statCard}>
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Users</p>
                                <h3 className="text-2xl font-bold text-slate-900 mt-1">1,240</h3>
                            </div>
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <Users size={20} />
                            </div>
                        </div>
                        <div className="text-xs text-green-600 font-medium">
                            +12% <span className="text-slate-400">from last month</span>
                        </div>
                    </div>
                </div>

                {/* Pending Payments */}
                <div className={styles.statCard}>
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Pending Requests</p>
                                <h3 className="text-2xl font-bold text-slate-900 mt-1">12</h3>
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
                                <p className="text-sm font-medium text-slate-500">Total Revenue</p>
                                <h3 className="text-2xl font-bold text-slate-900 mt-1">$45,200</h3>
                            </div>
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                <DollarSign size={20} />
                            </div>
                        </div>
                        <div className="text-xs text-green-600 font-medium">
                            +8.4% <span className="text-slate-400">from last month</span>
                        </div>
                    </div>
                </div>
            </div>

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

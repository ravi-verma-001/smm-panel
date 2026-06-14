export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 font-medium mb-1">Total Users</h3>
                    <p className="text-3xl font-bold text-slate-900">1,240</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 font-medium mb-1">Pending Payments</h3>
                    <p className="text-3xl font-bold text-orange-500">12</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 font-medium mb-1">Total Revenue</h3>
                    <p className="text-3xl font-bold text-green-600">$45,200</p>
                </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Activity</h2>
                <p className="text-slate-500">No recent activity to show.</p>
            </div>
        </div>
    );
}

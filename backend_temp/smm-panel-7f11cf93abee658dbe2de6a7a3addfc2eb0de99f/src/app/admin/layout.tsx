"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Wallet,
    LogOut,
    Shield,
    Menu,
    Search,
    Bell,
    User,
    ChevronRight,
    Settings
} from "lucide-react";
import { useState } from "react";
import styles from "./admin.module.css";

// Clean Admin Sidebar
function AdminSidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (val: boolean) => void }) {
    const pathname = usePathname();

    const menuItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Pending Payments", href: "/admin/payments", icon: Wallet },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={`${styles.sidebar} fixed top-0 left-0 h-full w-64 z-50 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                {/* Logo Section */}
                <div className={`${styles.logoSection} flex items-center gap-3`}>
                    <div className={`${styles.logoBox} h-8 w-8 flex items-center justify-center`}>
                        <Shield size={18} />
                    </div>
                    <div>
                        <span className="font-bold text-lg tracking-tight text-slate-900 block leading-tight">DovixSMM</span>
                        <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">Admin</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-4">
                        Main Menu
                    </div>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''} flex items-center gap-3 px-3 py-2.5`}
                            >
                                <Icon size={18} />
                                <span className="text-sm">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile & Logout */}
                <div className="p-3 border-t border-slate-200 bg-slate-50/50">
                    <button
                        onClick={() => {
                            if (window.confirm("Are you sure you want to logout?")) {
                                localStorage.removeItem('adminToken');
                                window.location.href = '/admin/login';
                            }
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 text-slate-500 hover:bg-slate-100 hover:text-red-600 rounded-lg w-full transition-colors group mb-2"
                    >
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Logout</span>
                    </button>

                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                            <User size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">Administrator</p>
                            <p className="text-xs text-slate-500 truncate">admin@dovixsmm.com</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

// Clean Header
function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
    return (
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg lg:hidden"
                >
                    <Menu size={20} />
                </button>
                <div className="hidden md:block text-sm font-medium text-slate-500">
                    Dashboard Overview
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="text-slate-400 hover:text-slate-600">
                    <Search size={18} />
                </button>
                <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block"></div>
                <button className="text-slate-400 hover:text-slate-600 relative">
                    <Bell size={18} />
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>
            </div>
        </header>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className={`flex min-h-screen bg-slate-50 ${styles.adminContainer}`}>
            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 lg:ml-64 flex flex-col min-w-0 transition-all duration-300">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}

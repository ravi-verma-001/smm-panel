"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AuthGuard from "@/components/AuthGuard";
import styles from "./layout.module.css";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { token, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Authenticated users get the sidebar and top navbar layout
    if (token) {
        return (
            <>
                <Sidebar />
                <Navbar />
                <main className={styles.mainWrapper}>
                    <AuthGuard>
                        {children}
                    </AuthGuard>
                </main>
            </>
        );
    }

    // Guest users landing on the homepage get a full-width container with a simple header
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="bg-white border-b border-slate-100 h-16 flex items-center justify-between px-6 md:px-12 sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <img src="/Dovix_logo.png" alt="Dovix SMM" className="h-10 object-contain" />
                </div>
                <div className="flex gap-4">
                    <Link href="/login" className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition">
                        Login
                    </Link>
                    <Link href="/register" className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm shadow-blue-200">
                        Sign Up
                    </Link>
                </div>
            </header>

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
                <AuthGuard>
                    {children}
                </AuthGuard>
            </main>
        </div>
    );
}

"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AuthGuard from "@/components/AuthGuard";
import GuestLanding from "@/components/GuestLanding";
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

    // Guest users landing on the homepage get the premium landing page experience
    if (!token) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <GuestLanding />
            </div>
        );
    }

    // Authenticated users get the sidebar and top navbar layout
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

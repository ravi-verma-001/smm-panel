"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { token, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const publicPaths = ["/login", "/register", "/", "/about", "/contact", "/privacy", "/terms", "/refunds"];
        if (!loading && !token) {
            if (!publicPaths.includes(pathname)) {
                router.push("/login");
            }
        }
    }, [token, loading, router, pathname]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const publicPaths = ["/login", "/register", "/", "/about", "/contact", "/privacy", "/terms", "/refunds"];
    if (!token && !publicPaths.includes(pathname)) {
        return null;
    }

    return <>{children}</>;
}

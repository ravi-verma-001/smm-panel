"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { token, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !token) {
            // Redirect to login if not authenticated
            // Avoid redirecting if already on public pages (like register) -> handled by layout placement usually
            // But strict guard is better.
            if (pathname !== "/login" && pathname !== "/register") {
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

    // If no token, we return null (effect will redirect)
    if (!token && pathname !== "/login" && pathname !== "/register") {
        return null;
    }

    return <>{children}</>;
}

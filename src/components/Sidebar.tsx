"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingBag,
    PlusCircle,
    Wallet,
    Settings,
    LogOut,
    Zap,
    LifeBuoy,
    X
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";
import styles from "./Sidebar.module.css";

const menuItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "New Order", href: "/order", icon: PlusCircle },
    { name: "Orders", href: "/orders", icon: ShoppingBag },
    { name: "Services", href: "/services", icon: Zap },
    { name: "Add Funds", href: "/funds", icon: Wallet },
    { name: "Support", href: "/tickets", icon: LifeBuoy },
    { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();
    const { isSidebarOpen, closeSidebar } = useSidebar();

    return (
        <>
            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
                <div className={styles.logo}>
                    <img
                        src="/logo.svg"
                        alt="DovixSMM"
                        className={styles.logoImage}
                        height={40}
                    />
                    <button className={styles.closeBtn} onClick={closeSidebar}>
                        <X size={24} />
                    </button>
                </div>

                <nav className={styles.nav}>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.link} ${isActive ? styles.active : ""}`}
                                onClick={closeSidebar}
                            >
                                <Icon size={20} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className={styles.footer}>
                    <button className={styles.logout} onClick={logout}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Overlay */}
            <div
                className={`${styles.overlay} ${isSidebarOpen ? styles.overlayOpen : ""}`}
                onClick={closeSidebar}
            />
        </>
    );
}

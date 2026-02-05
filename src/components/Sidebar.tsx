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
    LifeBuoy
} from "lucide-react";
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

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <Zap className={styles.logoIcon} size={28} />
                <span className={styles.logoText}>DovixSMM</span>
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
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <button className={styles.logout}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}

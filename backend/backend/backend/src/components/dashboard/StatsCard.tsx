import { LucideIcon } from "lucide-react";
import styles from "./StatsCard.module.css";

interface StatsCardProps {
    title: string;
    value: string;
    change?: string;
    isPositive?: boolean;
    icon: LucideIcon;
    color?: string;
}

export default function StatsCard({ title, value, change, isPositive, icon: Icon, color = "var(--accent-primary)" }: StatsCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.iconWrapper} style={{ backgroundColor: `${color}20`, color: color }}>
                    <Icon size={24} />
                </div>
                {change && (
                    <span className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}>
                        {isPositive ? "+" : ""}{change}
                    </span>
                )}
            </div>
            <div className={styles.content}>
                <h3 className={styles.value}>{value}</h3>
                <p className={styles.title}>{title}</p>
            </div>
        </div>
    );
}

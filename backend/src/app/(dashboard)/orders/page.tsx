"use client";

import styles from "./page.module.css";

const ordersData = [
    { id: 8932, date: "2026-01-28", service: "Instagram Followers", link: "https://instagram.com/user", quantity: 1000, charge: 0.90, status: "Completed" },
    { id: 8931, date: "2026-01-28", service: "YouTube Views", link: "https://youtube.com/watch?v=...", quantity: 5000, charge: 12.50, status: "Processing" },
    { id: 8930, date: "2026-01-27", service: "TikTok Likes", link: "https://tiktok.com/@user/video", quantity: 500, charge: 1.20, status: "Pending" },
    { id: 8929, date: "2026-01-27", service: "Facebook Page Likes", link: "https://facebook.com/page", quantity: 100, charge: 1.20, status: "Canceled" },
    { id: 8928, date: "2026-01-26", service: "Instagram Likes", link: "https://instagram.com/p/...", quantity: 2000, charge: 0.40, status: "Completed" },
];

export default function OrderHistory() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Order History</h1>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>ID</th>
                            <th className={styles.th}>Date</th>
                            <th className={styles.th}>Service</th>
                            <th className={styles.th}>Link</th>
                            <th className={styles.th}>Quantity</th>
                            <th className={styles.th}>Charge</th>
                            <th className={styles.th}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersData.slice(0, 1).map((order) => (
                            <tr key={order.id} className={styles.tr}>
                                <td className={styles.td}>{order.id}</td>
                                <td className={styles.td}>{order.date}</td>
                                <td className={styles.td}>{order.service}</td>
                                <td className={styles.td}>{order.link}</td>
                                <td className={styles.td}>{order.quantity}</td>
                                <td className={styles.td}>₹{order.charge.toFixed(2)}</td>
                                <td className={styles.td}>
                                    <span className={`${styles.status} ${styles['status' + order.status]}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { Loader2 } from "lucide-react";

interface Service {
    _id: string;
    name: string;
    category: string;
    averageTime?: string;
}

interface Order {
    _id: string;
    externalOrderId: string;
    service: Service;
    link: string;
    quantity: number;
    charge: number;
    status: string;
    createdAt: string;
}

export default function OrderHistory() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
                const token = localStorage.getItem("token");

                const res = await fetch(`${API_URL}/api/orders/history`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                } else {
                    setError("Failed to load orders.");
                }
            } catch (err) {
                setError("Error reaching server.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Order History</h1>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className={styles.tableContainer}>
                {loading ? (
                    <div className="flex justify-center p-8"><Loader2 className="animate-spin text-gray-500" /></div>
                ) : orders.length === 0 ? (
                    <div className="text-center p-8 text-gray-500">No orders found.</div>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>ID</th>
                                <th className={styles.th}>Date</th>
                                <th className={styles.th}>Service</th>
                                <th className={styles.th}>Avg. Time</th>
                                <th className={styles.th}>Link</th>
                                <th className={styles.th}>Quantity</th>
                                <th className={styles.th}>Charge</th>
                                <th className={styles.th}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className={styles.tr}>
                                    <td className={styles.td}>{order.externalOrderId || order._id.slice(-6)}</td>
                                    <td className={styles.td}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className={styles.td}>{order.service?.name || 'Unknown'}</td>
                                    <td className={styles.td}>{order.service?.averageTime || '--'}</td>
                                    <td className={styles.td}>
                                        <div className="truncate max-w-[150px]">{order.link}</div>
                                    </td>
                                    <td className={styles.td}>{order.quantity.toLocaleString()}</td>
                                    <td className={styles.td}>₹{order.charge.toFixed(2)}</td>
                                    <td className={styles.td}>
                                        <span className={`${styles.status} ${styles['status' + (order.status.charAt(0).toUpperCase() + order.status.slice(1))]}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

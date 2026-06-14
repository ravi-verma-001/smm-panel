import styles from "./RecentOrders.module.css";

const orders = [
    { id: "#ORD-9382", service: "Instagram Followers [High Quality]", link: "instagram.com/user...", quantity: 1000, status: "Completed", date: "2 mins ago" },
    { id: "#ORD-9381", service: "YouTube Views [Retention]", link: "youtube.com/watch?...", quantity: 5000, status: "Processing", date: "15 mins ago" },
    { id: "#ORD-9380", service: "TikTok Likes", link: "tiktok.com/@user/no...", quantity: 500, status: "Pending", date: "1 hour ago" },
    { id: "#ORD-9379", service: "Facebook Page Likes", link: "facebook.com/mybra...", quantity: 200, status: "Canceled", date: "3 hours ago" },
];

export default function RecentOrders() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Recent Orders</h2>
                <button className={styles.viewAll}>View All</button>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Service</th>
                            <th>Link</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td className={styles.id}>{order.id}</td>
                                <td className={styles.service}>{order.service}</td>
                                <td className={styles.link}>{order.link}</td>
                                <td>{order.quantity.toLocaleString()}</td>
                                <td>
                                    <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className={styles.time}>{order.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

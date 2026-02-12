"use client";

import { useState } from "react";
import styles from "./page.module.css";

const ticketsData = [
    { id: 102, subject: "Order #8930 not started", date: "2026-01-28", status: "Open", lastMessage: "Hello, I placed an order 5 hours ago and it's still pending. Can you check?" },
    { id: 101, subject: "Refill Request #8452", date: "2026-01-20", status: "Closed", lastMessage: "Refill has been completed. Thanks for using our service." },
];

export default function Tickets() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Support Tickets</h1>
                <button className={styles.createBtn}>+ New Ticket</button>
            </div>

            <div className={styles.ticketsList}>
                {ticketsData.map((ticket) => (
                    <div key={ticket.id} className={styles.ticket}>
                        <div className={styles.ticketHeader}>
                            <h3 className={styles.subject}>#{ticket.id} - {ticket.subject}</h3>
                            <span className={`${styles.status} ${styles['status' + ticket.status]}`}>
                                {ticket.status}
                            </span>
                        </div>
                        <div className={styles.meta} style={{ marginBottom: '0.75rem' }}>
                            Last update: {ticket.date}
                        </div>
                        <p className={styles.preview}>{ticket.lastMessage}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

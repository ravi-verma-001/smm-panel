"use client";

import { useState } from "react";
import styles from "./page.module.css";
import TicketModal from "@/components/TicketModal";
import { MessageCircle, Mail } from "lucide-react";

const ticketsData = [
    { id: 102, subject: "Order #8930 not started", date: "2026-01-28", status: "Open", lastMessage: "Hello, I placed an order 5 hours ago and it's still pending. Can you check?" },
    { id: 101, subject: "Refill Request #8452", date: "2026-01-20", status: "Closed", lastMessage: "Refill has been completed. Thanks for using our service." },
];

export default function Tickets() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Support Tickets</h1>
                <button
                    className={styles.createBtn}
                    onClick={() => setIsModalOpen(true)}
                >
                    + New Ticket
                </button>
            </div>

            <div className={styles.contactSection}>
                <a href="https://wa.me/916267777534" target="_blank" rel="noopener noreferrer" className={`${styles.contactCard} ${styles.whatsapp}`}>
                    <div className={styles.iconWrapper}>
                        <MessageCircle size={24} />
                    </div>
                    <div className={styles.contactInfo}>
                        <h3>WhatsApp Support</h3>
                        <p>Chat with us instantly</p>
                    </div>
                </a>

                <div
                    onClick={() => {
                        navigator.clipboard.writeText("dovixmedia@gmail.com");
                        window.location.href = "mailto:dovixmedia@gmail.com";
                        alert("Email copied to clipboard!");
                    }}
                    className={`${styles.contactCard} ${styles.email}`}
                    role="button"
                    tabIndex={0}
                >
                    <div className={styles.iconWrapper}>
                        <Mail size={24} />
                    </div>
                    <div className={styles.contactInfo}>
                        <h3>Email Support</h3>
                        <p>dovixmedia@gmail.com</p>
                    </div>
                </div>
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

            <TicketModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}

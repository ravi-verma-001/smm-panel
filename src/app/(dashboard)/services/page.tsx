"use client";

import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import styles from "./page.module.css";

const servicesData = [
    { id: 1, name: "Instagram Followers [High Quality]", rate: 0.90, min: 10, max: 20000, category: "Instagram" },
    { id: 2, name: "Instagram Likes [Instant]", rate: 0.20, min: 50, max: 50000, category: "Instagram" },
    { id: 3, name: "YouTube Views [Retention]", rate: 2.50, min: 1000, max: 1000000, category: "YouTube" },
    { id: 4, name: "YouTube Subscribers", rate: 15.00, min: 100, max: 10000, category: "YouTube" },
    { id: 5, name: "TikTok Followers", rate: 3.50, min: 100, max: 10000, category: "TikTok" },
    { id: 6, name: "TikTok Shares", rate: 0.50, min: 50, max: 100000, category: "TikTok" },
    { id: 7, name: "Facebook Page Likes", rate: 12.00, min: 100, max: 5000, category: "Facebook" },
    { id: 8, name: "Twitter/X Followers", rate: 8.00, min: 100, max: 10000, category: "Twitter" },
];

export default function Services() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            const res = await fetch(`${API_URL}/api/services`);
            const data = await res.json();
            setServices(data);
        } catch (error) {
            console.error("Failed to fetch services", error);
        } finally {
            setLoading(false);
        }
    };

    const categories = ["All", ...new Set(services.map(s => s.category))];

    const filteredServices = services.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "All" || service.category === category;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Services</h1>

            <div className={styles.controls}>
                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} size={20} />
                    <input
                        type="text"
                        placeholder="Search services..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.categoryWrapper}>
                    <Filter className={styles.filterIcon} size={20} />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={styles.categorySelect}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading services...</div>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Service</th>
                                <th>Rate / 1000</th>
                                <th>Min / Max</th>
                                <th>Average Time</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredServices.map(service => (
                                <tr key={service._id}>
                                    <td className={styles.id}>{service.providerServiceId}</td>
                                    <td className={styles.name}>{service.name}</td>
                                    <td className={styles.rate}>₹{service.rate.toFixed(2)}</td>
                                    <td className={styles.limits}>{service.min} / {service.max.toLocaleString()}</td>
                                    <td className={styles.time}>{service.averageTime || '30 mins - 1 hour'}</td>
                                    <td>
                                        <span className={styles.categoryBadge}>{service.category}</span>
                                    </td>
                                </tr>
                            ))}
                            {filteredServices.length === 0 && (
                                <tr>
                                    <td colSpan={5} className={styles.noResults}>No services found matching your criteria.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

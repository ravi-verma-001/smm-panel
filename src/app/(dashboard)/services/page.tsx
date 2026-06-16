"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Filter, Star, Info, X } from "lucide-react";
import styles from "./page.module.css";

export default function Services() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Modal states
    const [selectedService, setSelectedService] = useState<any | null>(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
            const res = await fetch(`${API_URL}/api/services`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
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

    // Group services by category for SMMResell layout style
    const groupedServices = useMemo(() => {
        const groups: { [key: string]: any[] } = {};
        filteredServices.forEach(service => {
            if (!groups[service.category]) {
                groups[service.category] = [];
            }
            groups[service.category].push(service);
        });
        return groups;
    }, [filteredServices]);

    const getCategoryIconEmoji = (catName: string) => {
        const cat = catName.toLowerCase();
        if (cat.includes("tiktok")) return "🎵";
        if (cat.includes("instagram") || cat.includes("ig")) return "📸";
        if (cat.includes("facebook") || cat.includes("fb")) return "👥";
        if (cat.includes("youtube") || cat.includes("yt")) return "🎥";
        if (cat.includes("telegram") || cat.includes("tg")) return "📢";
        if (cat.includes("twitter") || cat.includes("x")) return "🐦";
        return "⚡";
    };

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
                                <th className={styles.starCol}></th>
                                <th>ID</th>
                                <th>Service Name</th>
                                <th>Rate / 1000</th>
                                <th>Min</th>
                                <th>Max</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(groupedServices).length === 0 ? (
                                <tr>
                                    <td colSpan={7} className={styles.noResults}>No services found matching your criteria.</td>
                                </tr>
                            ) : (
                                Object.keys(groupedServices).map(cat => (
                                    <>
                                        {/* Category Header Row */}
                                        <tr key={cat} className={styles.categoryHeaderRow}>
                                            <td colSpan={7} className={styles.categoryHeaderCell}>
                                                <div className={styles.categoryTitleContent}>
                                                    <span className={styles.categoryIcon}>{getCategoryIconEmoji(cat)}</span>
                                                    <span>{cat}</span>
                                                </div>
                                            </td>
                                        </tr>
                                        {/* Services list under this category */}
                                        {groupedServices[cat].map(service => (
                                            <tr key={service._id}>
                                                <td className={styles.starCol}>
                                                    <Star size={16} className={styles.starIcon} />
                                                </td>
                                                <td>
                                                    <span className={styles.idBadge}>{service.providerServiceId}</span>
                                                </td>
                                                <td className={styles.nameCol}>
                                                    <span className={styles.namePrefix}>»</span>
                                                    <span className={styles.nameText}>{service.name}</span>
                                                </td>
                                                <td>
                                                    <span className={styles.rate}>₹{service.rate.toFixed(2)}</span>
                                                </td>
                                                <td className={styles.limits}>{service.min}</td>
                                                <td className={styles.limits}>{service.max.toLocaleString()}</td>
                                                <td>
                                                    <button 
                                                        className={styles.detailsBtn}
                                                        onClick={() => setSelectedService(service)}
                                                    >
                                                        <Info size={13} />
                                                        Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Service Details Modal */}
            {selectedService && (
                <div className={styles.modalOverlay} onClick={() => setSelectedService(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3 className={styles.modalTitle}>Service #{selectedService.providerServiceId} Details</h3>
                            <button className={styles.modalCloseBtn} onClick={() => setSelectedService(null)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div>
                                <h4 className={styles.modalSectionTitle}>Service Name</h4>
                                <p className={styles.modalText}>{selectedService.name}</p>
                            </div>
                            
                            <div>
                                <h4 className={styles.modalSectionTitle}>Category</h4>
                                <p className={styles.modalText}>{selectedService.category}</p>
                            </div>

                            <div className={styles.modalInfoGrid}>
                                <div>
                                    <h4 className={styles.modalSectionTitle}>Rate per 1000</h4>
                                    <p className={styles.modalText} style={{ color: '#16a34a', fontWeight: 'bold' }}>
                                        ₹{selectedService.rate.toFixed(2)}
                                    </p>
                                </div>
                                <div>
                                    <h4 className={styles.modalSectionTitle}>Average Time</h4>
                                    <p className={styles.modalText}>{selectedService.averageTime || '30 mins - 1 hour'}</p>
                                </div>
                            </div>

                            <div className={styles.modalInfoGrid}>
                                <div>
                                    <h4 className={styles.modalSectionTitle}>Min Order</h4>
                                    <p className={styles.modalText}>{selectedService.min}</p>
                                </div>
                                <div>
                                    <h4 className={styles.modalSectionTitle}>Max Order</h4>
                                    <p className={styles.modalText}>{selectedService.max.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.modalCloseActionBtn} onClick={() => setSelectedService(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

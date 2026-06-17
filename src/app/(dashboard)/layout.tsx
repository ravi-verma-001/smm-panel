"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AuthGuard from "@/components/AuthGuard";
import GuestLanding from "@/components/GuestLanding";
import styles from "./layout.module.css";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowRight, PhoneCall } from "lucide-react";
import landingStyles from "../(auth)/landing.module.css";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { token, loading } = useAuth();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Guest users landing on the homepage get the premium landing page experience
    // Except when they click "Services" where we render the public services page wrapped in the guest navbar/footer
    if (!token) {
        if (pathname === "/services") {
            return (
                <div className={landingStyles.container}>
                    {/* Public Header */}
                    <header className={landingStyles.navbar} style={{ position: "relative" }}>
                        <Link href="/" className={landingStyles.logo}>
                            Dovix<span className={landingStyles.logoAccent}>SMM</span>
                        </Link>
                        <div className={landingStyles.navLinks}>
                            <Link href="/login" className={landingStyles.navLink}>Sign in</Link>
                            <Link href="/services" className={landingStyles.navLink}>Services</Link>
                            <Link href="/api-docs" className={landingStyles.navLink}>API</Link>
                            <Link href="/blog" className={landingStyles.navLink}>Blog</Link>
                            <Link href="/terms" className={landingStyles.navLink}>Terms</Link>
                        </div>
                        <div className={landingStyles.navActions}>
                            <Link href="/login" className={landingStyles.signInOutline}>
                                Sign in <ArrowRight size={16} />
                            </Link>
                            <Link href="/register" className={landingStyles.signUpSolid}>
                                Sign up <ArrowRight size={16} />
                            </Link>
                        </div>
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                            className={landingStyles.hamburger}
                            aria-label="Toggle Menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        {/* Mobile Menu Dropdown */}
                        {mobileMenuOpen && (
                            <div className={landingStyles.mobileMenu}>
                                <Link href="/login" className={landingStyles.mobileMenuLink} onClick={() => setMobileMenuOpen(false)}>Sign in</Link>
                                <Link href="/services" className={landingStyles.mobileMenuLink} onClick={() => setMobileMenuOpen(false)}>Services</Link>
                                <Link href="/api-docs" className={landingStyles.mobileMenuLink} onClick={() => setMobileMenuOpen(false)}>API</Link>
                                <Link href="/blog" className={landingStyles.mobileMenuLink} onClick={() => setMobileMenuOpen(false)}>Blog</Link>
                                <Link href="/terms" className={landingStyles.mobileMenuLink} onClick={() => setMobileMenuOpen(false)}>Terms</Link>
                                <div className={landingStyles.mobileMenuActions}>
                                    <Link href="/login" className={landingStyles.signInOutline} style={{ justifyContent: "center" }} onClick={() => setMobileMenuOpen(false)}>
                                        Sign in <ArrowRight size={16} />
                                    </Link>
                                    <Link href="/register" className={landingStyles.signUpSolid} style={{ justifyContent: "center" }} onClick={() => setMobileMenuOpen(false)}>
                                        Sign up <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </header>

                    {/* Public services content */}
                    <main style={{ minHeight: "calc(100vh - 200px)", padding: "1.5rem" }}>
                        {children}
                    </main>

                    {/* Public Footer */}
                    <footer className={landingStyles.legalFooter}>
                        <div className={landingStyles.legalLinks}>
                            <Link href="/about" className={landingStyles.legalLink}>About Us</Link>
                            <span>•</span>
                            <Link href="/contact" className={landingStyles.legalLink}>Contact Us</Link>
                            <span>•</span>
                            <Link href="/privacy" className={landingStyles.legalLink}>Privacy Policy</Link>
                            <span>•</span>
                            <Link href="/terms" className={landingStyles.legalLink}>Terms & Conditions</Link>
                            <span>•</span>
                            <Link href="/refunds" className={landingStyles.legalLink}>Refund Policy</Link>
                        </div>
                        <div className={landingStyles.copyright}>
                            © {new Date().getFullYear()} DovixSMM. All rights reserved.
                        </div>
                    </footer>

                    {/* Floating WhatsApp Widget */}
                    <a 
                        href="https://wa.me/919999999999" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={landingStyles.whatsappFloat}
                        title="Chat on WhatsApp"
                    >
                        <PhoneCall size={24} />
                    </a>
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <GuestLanding />
            </div>
        );
    }

    // Authenticated users get the sidebar and top navbar layout
    return (
        <>
            <Sidebar />
            <Navbar />
            <main className={styles.mainWrapper}>
                <AuthGuard>
                    {children}
                </AuthGuard>
            </main>
        </>
    );
}


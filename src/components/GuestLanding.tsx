"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "../app/(auth)/landing.module.css";
import { 
    Award, 
    Zap, 
    Shield, 
    CreditCard, 
    Sparkles,
    Instagram, 
    Facebook, 
    Youtube, 
    Send, 
    Twitter, 
    Play, 
    MessageSquare,
    ArrowRight,
    TrendingUp,
    PhoneCall,
    Bookmark
} from "lucide-react";

export default function GuestLanding() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("Instagram");
    const { login } = useAuth();

    const handleGoogleCredentialResponse = async (response: any) => {
        setLoading(true);
        setError("");
        try {
            const jwtToken = response.credential;
            const base64Url = jwtToken.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const payload = JSON.parse(jsonPayload);
            const { email, name } = payload;

            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
            const res = await fetch(`${API_URL}/api/auth/google-login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name }),
            });

            const data = await res.json();

            if (res.ok) {
                login(data.token, data.user);
            } else {
                setError(data.message || "Google Authentication failed");
            }
        } catch (err) {
            setError("Google login failed, make sure backend server is running");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Load GIS client script
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            const google = (window as any).google;
            if (google) {
                google.accounts.id.initialize({
                    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "736778589499-d8vducrui4uehl37ckvdup99765vcqmp.apps.googleusercontent.com",
                    callback: handleGoogleCredentialResponse
                });

                // Render the official Google Sign-In button
                const btnContainer = document.getElementById("google-signin-btn-landing");
                if (btnContainer) {
                    google.accounts.id.renderButton(btnContainer, {
                        theme: "filled_blue",
                        size: "large",
                        width: btnContainer.clientWidth || 340,
                        text: "continue_with"
                    });
                }
            }
        };

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                login(data.token, data.user);
            } else {
                setError(data.message || "Invalid credentials");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const tabsData: Record<string, { title: string, desc: string, icon: any, label: string }> = {
        Instagram: {
            title: "Instagram SMM Services",
            desc: "At DovixSMM, we offer comprehensive Instagram growth services to help individuals, businesses, and resellers enhance their social media presence. Our services include real and active followers, post likes, story views, reel views, and comments, all designed to increase engagement and visibility. With safe and fast delivery, DovixSMM ensures your Instagram account grows organically.",
            icon: <Instagram size={22} />,
            label: "Instagram"
        },
        Facebook: {
            title: "Facebook SMM Services",
            desc: "Expand your Facebook presence with our top-rated promotion services. We offer Facebook profile followers, page likes, post reactions, video views, and comment automation to boost your brand page credibility. All services are optimized for high retention and safety, backed by automatic speed control.",
            icon: <Facebook size={22} />,
            label: "Facebook"
        },
        YouTube: {
            title: "YouTube SMM Services",
            desc: "Get organic YouTube growth, increase channel authority, and get monetized faster. Choose our reliable YouTube watch time services, high-retention video views, non-drop subscribers, and organic video shares. Gain authentic audience interaction under compliance.",
            icon: <Youtube size={22} />,
            label: "YouTube"
        },
        Twitter: {
            title: "Twitter/X SMM Services",
            desc: "Dominate the conversation on Twitter/X. Fast-track your tweet interactions with high-quality likes, retweets, profile visits, and active followers. Perfect for project launches, crypto promotions, and corporate branding campaigns.",
            icon: <Twitter size={22} />,
            label: "Twitter"
        },
        Spotify: {
            title: "Spotify & Music Services",
            desc: "Boost your music career and streams today. We provide safe and premium Spotify track plays, playlist followers, artist monthly listeners, and custom podcast listeners to boost your music algorithmic ranking.",
            icon: <Play size={22} />,
            label: "Spotify"
        },
        Telegram: {
            title: "Telegram SMM Services",
            desc: "Build massive, active Telegram communities instantly. We offer fast channel members, group members, post views, poll votes, and message reactions. Complete automation for high-speed community growth.",
            icon: <Send size={22} />,
            label: "Telegram"
        },
        TikTok: {
            title: "TikTok SMM Services",
            desc: "Go viral on TikTok! Boost your content algorithmic reach with high-retention video views, video shares, profile followers, and active video comments. Fully automated instant delivery.",
            icon: <MessageSquare size={22} />,
            label: "TikTok"
        }
    };

    return (
        <div className={styles.container}>
            {/* Navbar Header corresponding to Screenshot 1 */}
            <header className={styles.navbar}>
                <Link href="/" className={styles.logo}>
                    Dovix<span className={styles.logoAccent}>SMM</span>
                </Link>
                <div className={styles.navLinks}>
                    <Link href="/login" className={styles.navLink}>Sign in</Link>
                    <Link href="/services" className={styles.navLink}>Services</Link>
                    <Link href="/api-docs" className={styles.navLink}>API</Link>
                    <Link href="/blog" className={styles.navLink}>Blog</Link>
                    <Link href="/terms" className={styles.navLink}>Terms</Link>
                </div>
                <div className={styles.navActions}>
                    <Link href="/login" className={styles.signInOutline}>
                        Sign in <ArrowRight size={16} />
                    </Link>
                    <Link href="/register" className={styles.signUpSolid}>
                        Sign up <ArrowRight size={16} />
                    </Link>
                </div>
            </header>

            {/* Split Hero Section with Form on the right (Screenshot 1) */}
            <section className={styles.heroSplitSection}>
                <div className={styles.heroContent}>
                    <div className={styles.badge}>
                        <Award size={16} /> Cheapest & Fastest SMM Market
                    </div>
                    <h1 className={styles.heroTitle}>
                        #1 WORLD TOP SMM SERVICE <span className={styles.heroTitleHighlight}>PROVIDER</span> 🔥
                    </h1>
                    <p className={styles.heroText}>
                        DovixSMM World&apos;s #1 Cheapest SMM Panel &quot;offers the most affordable and fastest SMM panel for resellers. 24/7 support. Get instant likes, views, and Boost & Start growing on Instagram, YouTube, Telegram & more with real, instant engagement.
                    </p>
                    <p className={styles.heroText}>
                        Join us to experience top-notch SMM services tailored to meet all your social media marketing needs!
                    </p>
                    <div className={styles.trustText}>
                        We are trusted since 2019
                    </div>
                    <div className={styles.heroBtns}>
                        <Link href="/services" className={styles.btnBlue}>
                            Services <ArrowRight size={18} />
                        </Link>
                        <Link href="/register" className={styles.btnGreen}>
                            Sign up <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>

                {/* Login Card on the right */}
                <div className={styles.authCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Sign In</h2>
                        <p className={styles.cardSubtitle}>Access your dashboard to place orders</p>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm">
                            {error}
                        </div>
                    )}

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.field}>
                            <label className={styles.label}>Username Or Email</label>
                            <input 
                                type="email" 
                                placeholder="Email address"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Password</label>
                            <input 
                                type="password" 
                                placeholder="Password"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.actions}>
                            <label className={styles.rememberMe}>
                                <input type="checkbox" /> Remember me
                            </label>
                            <Link href="/forgot-password" className={styles.forgotLink}>
                                Forgot Password?
                            </Link>
                        </div>

                        <div className={styles.btnGroup}>
                            <div className={styles.rowActions}>
                                <button type="button" className={styles.bookmarkBtn} title="Bookmark Site">
                                    <Bookmark size={20} />
                                </button>
                                <button type="submit" className={styles.submitBtn} disabled={loading}>
                                    {loading ? "Signing in..." : "Sign in"}
                                </button>
                            </div>
                            
                            {/* Google Auth container */}
                            <div id="google-signin-btn-landing" className="w-full flex justify-center mt-1"></div>

                            <Link href="/forgot-password" className={styles.forgotBtn}>
                                Forgot Password?
                            </Link>
                        </div>
                    </form>

                    <p className={styles.footer}>
                        Don&apos;t have an account?
                        <Link href="/register" className={styles.footerLink}>
                            Sign Up
                        </Link>
                    </p>
                </div>
            </section>

            {/* Why Choose Us Section (Screenshot 2) */}
            <section className={styles.chooseUsSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Why Choose DovixSMM?</h2>
                    <p className={styles.sectionSubtitle}>
                        Discover the competitive advantages that make DovixSMM the preferred choice for social media growth
                    </p>
                </div>

                <div className={styles.chooseUsGrid}>
                    <div className={styles.chooseUsCard}>
                        <div className={styles.iconWrapper}>
                            <Sparkles size={28} />
                        </div>
                        <h3 className={styles.cardTitleText}>Premium Quality Services</h3>
                        <p className={styles.cardDescText}>
                            DovixSMM delivers exceptional quality social media marketing services with high retention rates, genuine engagement, and real accounts.
                        </p>
                    </div>

                    <div className={styles.chooseUsCard}>
                        <div className={styles.iconWrapper}>
                            <Zap size={28} />
                        </div>
                        <h3 className={styles.cardTitleText}>24/7 Customer Support</h3>
                        <p className={styles.cardDescText}>
                            Our dedicated support team is available round-the-clock to assist with orders, troubleshoot issues, and provide expert guidance.
                        </p>
                    </div>

                    <div className={styles.chooseUsCard}>
                        <div className={styles.iconWrapper}>
                            <CreditCard size={28} />
                        </div>
                        <h3 className={styles.cardTitleText}>Affordable Pricing</h3>
                        <p className={styles.cardDescText}>
                            Enjoy the most affordable SMM services without compromising on quality. Our cost-effective solutions provide maximum value.
                        </p>
                    </div>

                    <div className={styles.chooseUsCard}>
                        <div className={styles.iconWrapper}>
                            <TrendingUp size={28} />
                        </div>
                        <h3 className={styles.cardTitleText}>Fast Delivery Speed</h3>
                        <p className={styles.cardDescText}>
                            Experience rapid order processing and instant start times. Most services begin within minutes, ensuring quick results.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services We Offer Section (Screenshot 3 & 4) */}
            <section className={styles.servicesSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>SERVICES WE OFFERS</h2>
                    <p className={styles.sectionSubtitle}>
                        At DovixSMM, we provide the cheapest and best SMM panel services to help you grow on all major platforms. Whether you need Instagram followers, Facebook likes, YouTube views, Twitter engagement, or TikTok growth – we&apos;ve got you covered.
                    </p>
                </div>

                {/* Tabs selection */}
                <div className={styles.tabsContainer}>
                    {Object.keys(tabsData).map(tabKey => (
                        <button
                            key={tabKey}
                            type="button"
                            className={`${styles.tabBtn} ${activeTab === tabKey ? styles.tabBtnActive : ""}`}
                            onClick={() => setActiveTab(tabKey)}
                        >
                            {tabsData[tabKey].icon}
                            {tabsData[tabKey].label}
                        </button>
                    ))}
                </div>

                {/* Active Tab content */}
                <div className={styles.tabContentCard}>
                    <div className={styles.tabContentLeft}>
                        <h3 className={styles.tabTitle}>{tabsData[activeTab].title}</h3>
                        <p className={styles.tabDesc}>{tabsData[activeTab].desc}</p>
                        <Link href="/services" className={styles.exploreBtn}>
                            Explore {tabsData[activeTab].label} Services
                        </Link>
                    </div>
                    <div className={styles.tabContentRight}>
                        <div className={styles.brandBigText}>
                            {tabsData[activeTab].label}
                        </div>
                    </div>
                </div>
            </section>

            {/* Streamers and Content Creators section (Screenshot 5) */}
            <section className={styles.streamerSection}>
                <div className={styles.streamerLeft}>
                    <div className={styles.streamerBadge}>
                        <Sparkles size={16} /> Discover Powerful Services
                    </div>
                    <h2 className={styles.streamerTitle}>
                        Cheapest SMM Panel for Streamers & Content Creators – DovixSMM
                    </h2>
                    <p className={styles.streamerText}>
                        If you are looking for the best SMM panel to grow your streams and social media accounts, DovixSMM.com is your trusted partner. We provide cheap and reliable SMM reseller services that help you get real followers, likes, comments, and viewers on platforms like Twitch, YouTube, TikTok, Kick.com, Trovo, Facebook, Instagram, and more.
                    </p>
                    <p className={styles.streamerText}>
                        At DovixSMM, we focus on helping streamers, influencers, and resellers achieve faster growth with our social media marketing panel. Our services are fully automated, 100% safe, and come with instant delivery to make sure you never miss out on engagement. Take your content to the next level today!
                    </p>
                </div>

                <div className={styles.streamerRight}>
                    <div className={styles.cardWidget}>
                        <span className={styles.widgetLabel}>Twitter Followers</span>
                        <span className={styles.widgetValue}>+36,146</span>
                        <span className={styles.widgetGrowth}>▲ 70% this month</span>
                    </div>

                    <div className={styles.cardWidget}>
                        <span className={styles.widgetLabel}>Instagram Followers</span>
                        <span className={styles.widgetValue}>+42,810</span>
                        <span className={styles.widgetGrowth}>▲ 70% this month</span>
                    </div>

                    <div className={styles.cardWidget}>
                        <span className={styles.widgetLabel}>Watchtime (hours)</span>
                        <span className={styles.widgetValue}>4,000/hrs</span>
                        <span className={styles.widgetGrowth}>▲ 4000/hrs reached</span>
                    </div>

                    <div className={styles.cardWidget}>
                        <span className={styles.widgetLabel}>Total Services</span>
                        <span className={styles.widgetValue}>+12,456</span>
                        <span className={styles.widgetGrowth}>Active Automated APIs</span>
                    </div>
                </div>
            </section>

            {/* Public Brand and Legal Footer */}
            <footer className={styles.legalFooter}>
                <div className={styles.legalLinks}>
                    <Link href="/about" className={styles.legalLink}>About Us</Link>
                    <span>•</span>
                    <Link href="/contact" className={styles.legalLink}>Contact Us</Link>
                    <span>•</span>
                    <Link href="/privacy" className={styles.legalLink}>Privacy Policy</Link>
                    <span>•</span>
                    <Link href="/terms" className={styles.legalLink}>Terms & Conditions</Link>
                    <span>•</span>
                    <Link href="/refunds" className={styles.legalLink}>Refund Policy</Link>
                </div>
                <div className={styles.copyright}>
                    © {new Date().getFullYear()} DovixSMM. All rights reserved.
                </div>
            </footer>

            {/* Floating WhatsApp Widget */}
            <a 
                href="https://wa.me/919999999999" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.whatsappFloat}
                title="Chat on WhatsApp"
            >
                <PhoneCall size={24} />
            </a>
        </div>
    );
}

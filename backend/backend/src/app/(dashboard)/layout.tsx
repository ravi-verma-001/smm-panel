import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AuthGuard from "@/components/AuthGuard";
import styles from "./layout.module.css";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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

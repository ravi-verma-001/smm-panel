import Link from "next/link";
import styles from "../auth.module.css";

export default function Login() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>Sign in to manage your SMM orders</p>
                </div>

                <form className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label}>Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.actions}>
                        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", cursor: "pointer" }}>
                            <input type="checkbox" /> Remember me
                        </label>
                        <Link href="/forgot-password" className={styles.forgot}>
                            Forgot Password?
                        </Link>
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Sign In
                    </button>
                </form>

                <p className={styles.footer}>
                    Don't have an account?
                    <Link href="/register" className={styles.link}>
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

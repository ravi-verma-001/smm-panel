import Link from "next/link";
import styles from "../auth.module.css";

export default function Register() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Create Account</h1>
                    <p className={styles.subtitle}>Get started with the best SMM panel</p>
                </div>

                <form className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label}>Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className={styles.input}
                            required
                        />
                    </div>

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
                            placeholder="Create a password"
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            className={styles.input}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Create Account
                    </button>
                </form>

                <p className={styles.footer}>
                    Already have an account?
                    <Link href="/login" className={styles.link}>
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}

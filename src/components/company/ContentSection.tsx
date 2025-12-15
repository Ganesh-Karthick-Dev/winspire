'use client';

import styles from './ContentSection.module.css';

export default function ContentSection() {
    return (
        <section className={styles.contentSection}>
            <div className={styles.contentInner}>
                <h2 className={styles.sectionTitle}>Our Story</h2>
                <p className={styles.sectionText}>
                    We are passionate about revolutionizing healthcare revenue cycle management
                    through innovative technology and dedicated expertise. Our mission is to
                    empower healthcare providers with the tools they need to thrive.
                </p>
            </div>
        </section>
    );
}

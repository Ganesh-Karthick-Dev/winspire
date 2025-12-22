import React from 'react';
import styles from './CorporateProfile.module.css';

const CorporateProfile: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <div className={styles.titleWrapper}>
                    <div className={styles.dots}>
                        <span className={styles.dot}></span>
                        <span className={styles.dot}></span>
                    </div>
                    <h2 className={styles.title}>Corporate Profile</h2>
                </div>
                <div className={styles.subtitle}>Company Information</div>
            </div>

            <div className={styles.grid}>
                {/* Row 1 */}
                <div className={styles.item}>
                    <div className={styles.label}>Company Name</div>
                    <div className={styles.valueBox}>
                        Winspire Co., Ltd.
                    </div>
                </div>

                <div className={styles.item}>
                    <div className={styles.label}>Establishment</div>
                    <div className={styles.valueBox}>
                        October 11, 2017
                    </div>
                </div>

                {/* Row 2 */}
                <div className={styles.item}>
                    <div className={styles.label}>Capital</div>
                    <div className={styles.valueBox}>
                        1,784,195,888 yen (including capital surplus)
                    </div>
                </div>

                <div className={styles.item}>
                    <div className={styles.label}>Location</div>
                    <div className={styles.valueBox} style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <div>Tokyo Office (Head Office)</div>
                        <div style={{ fontSize: '0.9em', opacity: 0.8, marginTop: '4px' }}>
                            Room 322, Tokyo Central Omotesando, 4-3-15 Jingumae, Shibuya-ku, Tokyo
                        </div>
                        <a href="#" className={styles.link}>Google Maps</a>
                    </div>
                </div>

                {/* Row 3 - Full Width? Or split? Reference shows Representative left, Board right (tall) */}
                <div className={styles.item}>
                    <div className={styles.label}>Representative</div>
                    <div className={styles.valueBox}>
                        Representative Director Akihiko Madokoro
                    </div>
                </div>

                {/* Board Member - Spans vertically in grid usually, but here likely just next cell */}
                <div className={styles.item} style={{ gridRow: 'span 2' }}>
                    <div className={styles.label}>Board Member</div>
                    <div className={styles.valueBox} style={{ alignItems: 'flex-start' }}>
                        <div className={styles.boardList}>
                            <div>Director: Osamu Chujo</div>
                            <div>Nakajo Director: Hideo Horii</div>
                            <div>Director: Yukihiro Nakamura</div>
                            <div>Director: Ryohei Shimada</div>
                            <div>Director (Full-time Audit and Supervisory Committee Member): Yorihiro Ueno</div>
                            <div>Director (Audit and Supervisory Committee Member): Katsunori Ura</div>
                            <div>Director (Audit and Supervisory Committee Member): Tatsuto Kuramoto</div>
                        </div>
                    </div>
                </div>

                {/* History - Left side under Representative */}
                <div className={styles.item}>
                    <div className={styles.label}>History</div>
                    <div className={styles.valueBox} style={{ alignItems: 'flex-start' }}>
                        <div className={styles.historyList}>
                            <div>July 2011: Established Style Link (real estate consulting business)</div>
                            <div>January 2016: Established Style Port (real estate VR business)</div>
                            <div>November 2016: Merged with Senkaku Banrai Real Estate (real estate business)</div>
                            <div>December 2017: Acquired business from the company</div>
                        </div>
                    </div>
                </div>

                {/* Last Row - Default Half Width */}
                <div className={styles.item}>
                    <div className={styles.label}>Main Business Overview</div>
                    <div className={styles.valueBox}>
                        Development and provision of IT solutions in the construction and real estate markets
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CorporateProfile;

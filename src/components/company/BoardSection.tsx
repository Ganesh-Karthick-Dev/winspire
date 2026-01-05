import React from 'react';
import Image from 'next/image';
import styles from './BoardSection.module.css';

// Board Member Data
const boardMembers = [
    {
        id: 1,
        name: 'Shravan Kumar',
        role: 'Vice President of Operations',
        image: '/images/team/shravan-kumar.png',
        bio: 'Shravan Kumar leads operations at Winspire RCM with a single focus: building systems, teams, and workflows that perform reliably in the real world. He has led end-to-end RCM delivery across complex client environments, large multi-layered operational teams, and high-volume, high-precision workflows. At Winspire, he shapes how Neura AI translates into clear work prioritization, fewer handoffs, faster decision cycles, and measurable productivity gains.'
    },
    {
        id: 2,
        name: 'Steve Kang',
        role: 'Strategic Technology Advisor',
        image: '/images/team/steve-kang.png',
        bio: 'Steve Kang is a strategic technology advisor with over two decades of experience helping leaders translate technology into measurable business outcomes. His work spans healthcare, government, and regulated environments where security and compliance are critical. At Winspire RCM, Steve supports infrastructure strategy, security posture, and technology alignment as the platform scales.'
    },
    {
        id: 3,
        name: 'John Kostic, CFP®, CEPA',
        role: 'Strategic Growth Advisor',
        image: '/images/team/john-kostic.png',
        bio: 'John Kostic is a seasoned strategic advisor with over 25 years of experience guiding business owners, executives, and high-net-worth families through complex growth and transition decisions. A Certified Financial Planner™ and Certified Exit Planning Advisor, he supports Winspire RCM with executive relationships, market entry, and long-term partnership development.'
    },
    {
        id: 4,
        name: 'Curtis Cates',
        role: 'Chief Marketing & Sales Officer',
        image: '/images/team/curtis-cates.png',
        bio: 'Curtis Cates leads growth at Winspire RCM with strategic depth, healthcare domain expertise, and modern AI-driven go-to-market execution. He has spent his career at the intersection of healthcare transformation and enterprise growth, advising Fortune 500 executives and driving multi-million-dollar client relationships. Curtis ensures Neura AI\'s value is communicated with clarity and credibility.'
    },
    {
        id: 5,
        name: 'Philip Leone',
        role: 'Chief Advisor',
        image: '/images/team/philip-leone.png',
        bio: 'Philip Leone is a seasoned healthcare executive with over two decades of experience guiding organizations through growth, reimbursement complexity, and market expansion. He has secured CPT codes, structured payer contracting strategies, and supported FDA-cleared technology launches. As Chief Advisor, he brings critical perspective on reimbursement strategy, regulatory risk, and sustainable commercialization.'
    },
    {
        id: 6,
        name: 'Dan Schulte, MBA, CHFP',
        role: 'Principal Consultant',
        image: '/images/team/dan-schulte.png',
        bio: 'Dan Schulte has worked in healthcare provider and RCM vendor arena for over 40 years. He has helped large and small organizations find weak spots, change processes, and realize immediate returns. Previously held senior RCM positions at HGS, The Outsource Group, Parallon, Apollo Health Street, and Siemens Health Services. Dan holds an MBA from Southern Illinois University and CHFP certification from HFMA.'
    },
    {
        id: 7,
        name: 'Suresh H. Nish',
        role: 'Founder & Chief Executive Officer',
        image: '', // No photo provided
        bio: 'Suresh built Winspire RCM on the belief that revenue outcomes improve when intelligence enters the cycle early. With over two decades of experience in healthcare revenue cycle operations, he has led and scaled large RCM operations. Under his leadership, Winspire focuses on sustainable revenue improvement, transparent performance measurement, and responsible automation.'
    }
];

const BoardSection: React.FC = () => {
    return (
        <section className={styles.boardSection}>
            <div className={styles.header}>
                <div className={styles.titleWrapper}>
                    <div className={styles.dots}>
                        <span className={styles.dot}></span>
                        <span className={styles.dot}></span>
                    </div>
                    <h2 className={styles.title}>Board Members</h2>
                </div>
                <div className={styles.subtitle}>Executive Introduction</div>
            </div>

            <div className={styles.grid}>
                {boardMembers.map((member) => (
                    <div key={member.id} className={styles.card}>
                        {/* Image Side */}
                        <div className={styles.imageWrapper}>
                            {member.image ? (
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className={styles.memberImage}
                                />
                            ) : (
                                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #083151 0%, #0a4a7a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>{member.name.charAt(0)}</span>
                                </div>
                            )}
                        </div>

                        {/* Text Side */}
                        <div className={styles.textContent}>
                            <div className={styles.role}>{member.role}</div>
                            <h3 className={styles.name}>{member.name}</h3>
                            <div className={styles.divider}></div>
                            <p className={styles.bio}>{member.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BoardSection;

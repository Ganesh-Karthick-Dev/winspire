import React from 'react';
import Image from 'next/image';
import styles from './BoardSection.module.css';

const boardMembers = [
    {
        id: 7,
        name: 'Suresh H. Nish',
        role: 'Founder & CEO',
        image: '/images/team/suresh-h-nish-ceo.png',
        bio: 'Suresh built Winspire RCM on the belief that revenue outcomes improve when intelligence enters the cycle early. With over two decades of experience in healthcare revenue cycle operations, he has led and scaled large RCM operations. Under his leadership, Winspire focuses on sustainable revenue improvement, transparent performance measurement, and responsible automation.'
    },

    {
        id: 6,
        name: 'Dan Schulte',
        role: 'Chief Operating Officer',
        image: '/images/team/dan-schulte.png',
        bio: 'Dan Schulte has worked in healthcare provider and RCM vendor arena for over 40 years. He has helped large and small organizations find weak spots, change processes, and realize immediate returns. Previously held senior RCM positions at HGS, The Outsource Group, Parallon, Apollo Health Street, and Siemens Health Services.'
    },
    {
        id: 5,
        name: 'Philip Leone',
        role: 'Chief Advisor',
        image: '/images/team/philip-leone.png',
        bio: 'Philip Leone is a seasoned healthcare executive with over two decades of experience guiding organizations through growth, reimbursement complexity, and market expansion. He has secured CPT codes, structured payer contracting strategies, and supported FDA-cleared technology launches. As Chief Advisor, he brings critical perspective on reimbursement strategy, regulatory risk, and sustainable commercialization.'
    },
    {
        id: 4,
        name: 'Curtis Cates',
        role: 'Chief Marketing & Sales',
        image: '/images/team/curtis-cates.png',
        bio: 'Curtis Cates leads growth at Winspire RCM with strategic depth, healthcare domain expertise, and modern AI-driven go-to-market execution. He has spent his career at the intersection of healthcare transformation and enterprise growth, advising Fortune 500 executives and driving multi-million-dollar client relationships. Curtis ensures Neura AI\'s value is communicated with clarity and credibility.'
    },
    {
        id: 3,
        name: 'John Kostic',
        role: 'Strategic Growth Officer',
        image: '/images/team/john-kostic.png',
        bio: 'John Kostic is a seasoned strategic advisor with over 25 years of experience guiding business owners, executives, and high-net-worth families through complex growth and transition decisions. A Certified Financial Planner™ and Certified Exit Planning Advisor, he supports Winspire RCM with executive relationships, market entry, and long-term partnership development.'
    },
    {
        id: 1,
        name: 'Shravan Kumar',
        role: 'Vice President - Operations',
        image: '/images/team/shravan-kumar.png',
        bio: 'Shravan Kumar leads operations at Winspire RCM with a single focus: building systems, teams, and workflows that perform reliably in the real world. He has led end-to-end RCM delivery across complex client environments, large multi-layered operational teams, and high-volume, high-precision workflows. At Winspire, he shapes how Neura AI translates into clear work prioritization, fewer handoffs, faster decision cycles, and measurable productivity gains.'
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

            <div className={styles.gridContainer}>
                {boardMembers.map((member) => (
                    <div key={member.id} className={styles.memberCard}>
                        <div className={styles.imageWrapper}>
                            {member.image ? (
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className={styles.memberImage}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            ) : (
                                <div className={styles.placeholderImage}>
                                    <span>{member.name.charAt(0)}</span>
                                </div>
                            )}
                        </div>
                        <div className={styles.cardContent}>
                            <p className={styles.role}>{member.role}</p>
                            <h3 className={styles.name}>{member.name}</h3>
                            <p className={styles.bio}>{member.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BoardSection;

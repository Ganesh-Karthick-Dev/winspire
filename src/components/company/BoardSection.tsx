import React from 'react';
import Image from 'next/image';
import styles from './BoardSection.module.css';

// Board Member Data
const boardMembers = [
    {
        id: 1,
        name: 'Akihiko Madokoro',
        role: 'Representative Director',
        image: '/images/team/member1.jpg', // Placeholder
        bio: 'In 1991, he joined Yahagi Construction Co., Ltd. After working there for 13 years, mainly in real estate planning and sales, he was involved in listing investment corporations. Founded Style Link Co., Ltd. in 2011 and Style Port Co., Ltd. in 2017.'
    },
    {
        id: 2,
        name: 'Osamu Chujo',
        role: 'Director',
        image: '/images/team/member2.jpg', // Placeholder
        bio: 'In 1988, he joined Recruit Co., Ltd., involved in planning human resources businesses. In 2003, joined So-net M3, Inc. (now M3, Inc.) as site producer. Served as director at M3 Career, Inc. Joined Style Port as director in 2017.'
    },
    {
        id: 3,
        name: 'Hideo Horii',
        role: 'Director',
        image: '/images/team/member3.jpg', // Placeholder
        bio: 'In 1995, joined Nomura Real Estate Commerce Co., Ltd. In development consulting department, involved in planning and tenant leasing. Joined Styleport Co., Ltd. in 2017, became director in May 2020.'
    },
    {
        id: 4,
        name: 'Yukihiro Nakamura',
        role: 'Director',
        image: '/images/team/member4.jpg', // Placeholder
        bio: 'In 1996, joined Noguchi Architects. Worked on design and supervision of condominiums for 10 years. In 2008, joined Mitsubishi Jisho Sekkei. Joined Styleport, Inc. in 2017, became a director in October 2021.'
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
                            {/* Using a colored placeholder div if image fails, or just a placeholder source */}
                            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)' }}></div>
                            {/* 
                            <Image 
                                src={member.image} 
                                alt={member.name}
                                fill
                                className={styles.memberImage}
                            />
                            */}
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

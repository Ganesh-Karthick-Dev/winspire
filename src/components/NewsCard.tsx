import React from 'react';
import Image from 'next/image';

interface NewsCardProps {
    category: string;
    date: string;
    title: string;
    imageSrc: string;
    link?: string;
}

export default function NewsCard({ category, date, title, imageSrc, link = '#' }: NewsCardProps) {
    return (
        <a href={link} className="news-item-row">
            {/* Left Side: Image Card */}
            <div className="news-image-card">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>

            {/* Right Side: Content Card with Arrow */}
            <div className="news-content-card">
                <div className="news-card-header">
                    <div className="news-meta">
                        <span className="news-category">{category}</span>
                        <span className="news-date">{date}</span>
                    </div>
                    <div className="news-arrow">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                <h3 className="news-title">{title}</h3>
            </div>
        </a>
    );
}

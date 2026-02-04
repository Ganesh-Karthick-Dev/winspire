'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    Building2,
    Target,
    Layers,
    Sparkles,
    CalendarCheck,
} from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

const navItems = [
    {
        title: 'Home',
        icon: Home,
        href: '/',
    },
    {
        title: 'Company',
        icon: Building2,
        href: '/company',
    },
    {
        title: 'Outcomes',
        icon: Target,
        href: '/outcomes',
    },
    {
        title: 'Solutions',
        icon: Layers,
        href: '/solutions',
    },
    {
        title: 'Neura AI',
        icon: Sparkles,
        href: '/neura-ai',
    },
    {
        title: 'Book a Demo',
        icon: CalendarCheck,
        href: '/book-demo',
    },
];

export default function DockNavbar() {
    const pathname = usePathname();

    const isActiveLink = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <nav
            style={{
                position: 'fixed',
                top: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
            }}
        >
            <Dock>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = isActiveLink(item.href);

                    return (
                        <Link key={item.title} href={item.href} style={{ textDecoration: 'none' }}>
                            <DockItem>
                                <DockLabel>{item.title}</DockLabel>
                                <DockIcon>
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '50%',
                                            background: isActive
                                                ? 'linear-gradient(135deg, #0D1F47 0%, #264792 35%, #4073BF 65%, #332E73 100%)'
                                                : '#f0f0f5',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.2s ease',
                                            boxShadow: isActive
                                                ? '0 4px 12px rgba(38, 71, 146, 0.4)'
                                                : '0 1px 3px rgba(0, 0, 0, 0.08)',
                                        }}
                                    >
                                        <Icon
                                            style={{
                                                width: '55%',
                                                height: '55%',
                                                color: isActive ? '#ffffff' : '#444444',
                                                strokeWidth: 1.8,
                                            }}
                                        />
                                    </div>
                                </DockIcon>
                            </DockItem>
                        </Link>
                    );
                })}
            </Dock>
        </nav>
    );
}

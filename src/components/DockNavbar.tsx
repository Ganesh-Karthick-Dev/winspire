'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    Building2,
    Target,
    Layers,
    BrainCircuit,
    CalendarCheck,
} from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

const NeuraIcon = (props: any) => (
    <svg 
        viewBox="0 0 2119 2299" 
        fill="currentColor" 
        {...props}
    >
        <path fillRule="evenodd" clipRule="evenodd" d="M1186.93 928.055V0H931.512V928.055L127.709 464.094L0 685.281L774.084 1132.29C898.637 1080.18 1025.95 998.656 1058.5 744.078C1091.11 999.141 1218.85 1080.48 1343.63 1132.59L2118.43 685.281L1990.73 464.094L1186.93 928.055ZM1343.27 1165.72C1218.61 1217.83 1091.08 1299.26 1058.5 1554.08C1026 1299.91 899.042 1218.24 774.68 1166.12L0 1613.47L127.709 1834.66L931.512 1370.56V2298.75H1186.93V1370.56L1990.73 1834.66L2118.43 1613.47L1343.27 1165.72Z" />
    </svg>
);

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
        icon: NeuraIcon,
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

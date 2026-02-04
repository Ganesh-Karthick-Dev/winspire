'use client';

import {
    motion,
    MotionValue,
    useMotionValue,
    useSpring,
    useTransform,
    type SpringOptions,
    AnimatePresence,
} from 'framer-motion';
import {
    Children,
    cloneElement,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

const DEFAULT_MAGNIFICATION = 64;
const DEFAULT_DISTANCE = 140;
const DEFAULT_PANEL_HEIGHT = 52;

type DockProps = {
    children: React.ReactNode;
    className?: string;
    distance?: number;
    panelHeight?: number;
    magnification?: number;
    spring?: SpringOptions;
};
type DockItemProps = {
    className?: string;
    children: React.ReactNode;
};
type DockLabelProps = {
    className?: string;
    children: React.ReactNode;
};
type DockIconProps = {
    className?: string;
    children: React.ReactNode;
};

type DocContextType = {
    mouseX: MotionValue;
    spring: SpringOptions;
    magnification: number;
    distance: number;
};
type DockProviderProps = {
    children: React.ReactNode;
    value: DocContextType;
};

const DockContext = createContext<DocContextType | undefined>(undefined);

function DockProvider({ children, value }: DockProviderProps) {
    return <DockContext.Provider value={value}>{children}</DockContext.Provider>;
}

function useDock() {
    const context = useContext(DockContext);
    if (!context) {
        throw new Error('useDock must be used within an DockProvider');
    }
    return context;
}

function Dock({
    children,
    spring = { mass: 0.1, stiffness: 150, damping: 12 },
    magnification = DEFAULT_MAGNIFICATION,
    distance = DEFAULT_DISTANCE,
    panelHeight = DEFAULT_PANEL_HEIGHT,
}: DockProps) {
    const mouseX = useMotionValue(Infinity);

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <motion.div
                onMouseMove={({ pageX }) => {
                    mouseX.set(pageX);
                }}
                onMouseLeave={() => {
                    mouseX.set(Infinity);
                }}
                style={{
                    height: panelHeight,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(240, 242, 245, 0.75) 100%)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    padding: '0 14px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                }}
                role='toolbar'
                aria-label='Application dock'
            >
                <DockProvider value={{ mouseX, spring, distance, magnification }}>
                    {children}
                </DockProvider>
            </motion.div>
        </div>
    );
}

function DockItem({ children }: DockItemProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { distance, magnification, mouseX, spring } = useDock();

    const isHovered = useMotionValue(0);

    const mouseDistance = useTransform(mouseX, (val) => {
        const domRect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - domRect.x - domRect.width / 2;
    });

    const widthTransform = useTransform(
        mouseDistance,
        [-distance, 0, distance],
        [40, magnification, 40]
    );

    const width = useSpring(widthTransform, spring);

    return (
        <motion.div
            ref={ref}
            style={{
                width,
                height: width,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
            }}
            onHoverStart={() => isHovered.set(1)}
            onHoverEnd={() => isHovered.set(0)}
            onFocus={() => isHovered.set(1)}
            onBlur={() => isHovered.set(0)}
            tabIndex={0}
            role='button'
            aria-haspopup='true'
        >
            {Children.map(children, (child) =>
                cloneElement(child as React.ReactElement, { width, isHovered })
            )}
        </motion.div>
    );
}

function DockLabel({ children, ...rest }: DockLabelProps) {
    const restProps = rest as Record<string, unknown>;
    const isHovered = restProps['isHovered'] as MotionValue<number>;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = isHovered.on('change', (latest) => {
            setIsVisible(latest === 1);
        });

        return () => unsubscribe();
    }, [isHovered]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 0, x: '-50%' }}
                    animate={{ opacity: 1, y: 8, x: '-50%' }}
                    exit={{ opacity: 0, y: 0, x: '-50%' }}
                    transition={{ duration: 0.2 }}
                    style={{
                        position: 'absolute',
                        bottom: '-32px',
                        left: '50%',
                        width: 'fit-content',
                        whiteSpace: 'nowrap',
                        borderRadius: '6px',
                        background: 'linear-gradient(135deg, #0D1F47 0%, #264792 35%, #4073BF 65%, #332E73 100%)',
                        color: '#ffffff',
                        padding: '4px 10px',
                        fontSize: '11px',
                        fontWeight: 500,
                        boxShadow: '0 4px 12px rgba(38, 71, 146, 0.35)',
                        zIndex: 100,
                    }}
                    role='tooltip'
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function DockIcon({ children, ...rest }: DockIconProps) {
    const restProps = rest as Record<string, unknown>;
    const width = restProps['width'] as MotionValue<number>;

    const sizeTransform = useTransform(width, (val) => val * 0.85);

    return (
        <motion.div
            style={{
                width: sizeTransform,
                height: sizeTransform,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {children}
        </motion.div>
    );
}

export { Dock, DockIcon, DockItem, DockLabel };

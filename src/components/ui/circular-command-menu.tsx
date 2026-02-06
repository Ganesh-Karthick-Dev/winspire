"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

export interface CommandItem {
    id: string
    icon: ReactNode
    label: string
    shortcut?: string
    onClick?: () => void
}

export interface CircularCommandMenuProps {
    items?: CommandItem[]
    trigger?: ReactNode
    className?: string
    radius?: number
    defaultOpen?: boolean
    onSelect?: (item: CommandItem) => void
    centerOffset?: { x?: number; y?: number }
}

export function CircularCommandMenu({
    items = [],
    trigger,
    className,
    radius = 240,
    defaultOpen = false,
    onSelect,
    centerOffset = { x: 0, y: 0 },
}: CircularCommandMenuProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [isHovered, setIsHovered] = useState(false)

    // Ensure we have items
    const safeItems = items || []
    const itemCount = safeItems.length
    
    const wrapperRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(wrapperRef, { once: true, amount: 0.25 })
    
    // Animation State
    const rotation = useMotionValue(0)
    
    // Configuration
    const duration = 60 // Seconds for a full 360 rotation
    
    useEffect(() => {
        if (!isInView) return;
        
        let animationFrame: number;
        let lastTime = performance.now();
        
        const loop = (time: number) => {
            const delta = time - lastTime;
            lastTime = time;

            if (!isHovered) {
                const speed = 360 / (duration * 1000); 
                const increment = speed * delta;
                rotation.set(rotation.get() + increment);
            }
            
            animationFrame = requestAnimationFrame(loop);
        };
        
        animationFrame = requestAnimationFrame(loop);
        
        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, isHovered, duration, rotation]);


    // Total size includes radius + buffer for labels
    const totalSize = (radius + 140) * 2 
    
    return (
        <div
            ref={wrapperRef}
            className={cn("relative flex items-center justify-center mx-auto", className)}
            style={{
                height: `${totalSize}px`,
                width: `${totalSize}px`
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Central Trigger / Logo - Absolutely centered for perfect alignment */}
            <motion.div
                className={cn(
                    "absolute left-1/2 top-1/2 z-20 flex h-24 w-24 items-center justify-center rounded-full",
                    "bg-[#0f172a] border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.3)]",
                    "text-blue-400"
                )}
                style={{
                    marginLeft: centerOffset.x,
                    marginTop: centerOffset.y,
                }}
                initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
                animate={{ 
                    scale: isInView ? 1 : 0, 
                    opacity: isInView ? 1 : 0,
                    x: "-50%",
                    y: "-50%"
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                {trigger || (
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Menu</span>
                    </div>
                )}
            </motion.div>

            {/* Orbiting Items */}
            <AnimatePresence>
                {(isOpen || defaultOpen) && itemCount > 0 && isInView && (
                    <div className="absolute inset-0 pointer-events-none">
                         {/* Centered coordinate system */}
                        <div className="absolute left-1/2 top-1/2 w-0 h-0"> 
                            {safeItems.map((item, index) => (
                                <OrbitingItem
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    total={itemCount}
                                    radius={radius}
                                    rotation={rotation}
                                    onSelect={onSelect}
                                    isActive={activeIndex === index}
                                    setActive={() => setActiveIndex(index)}
                                    clearActive={() => setActiveIndex(null)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

function OrbitingItem({ 
    item, 
    index, 
    total, 
    radius, 
    rotation, 
    onSelect,
    isActive,
    setActive,
    clearActive
}: { 
    item: CommandItem, 
    index: number, 
    total: number, 
    radius: number, 
    rotation: MotionValue<number>,
    onSelect?: (item: CommandItem) => void,
    isActive: boolean;
    setActive: () => void;
    clearActive: () => void;
}) {
    // Distribute items evenly starting from -90deg (top)
    const angleOffset = (360 / total) * index - 90; 
    
    // Combine offset with continuous rotation
    const angleRad = useTransform(rotation, r => ((angleOffset + r) * Math.PI) / 180);
    
    const x = useTransform(angleRad, rad => Math.cos(rad) * radius);
    const y = useTransform(angleRad, rad => Math.sin(rad) * radius);
    
    // Label placement: Pushed out by an extra 80px
    const labelRadius = radius + 80; 
    const labelX = useTransform(angleRad, rad => Math.cos(rad) * labelRadius);
    const labelY = useTransform(angleRad, rad => Math.sin(rad) * labelRadius);

    // Dynamic anchoring: 
    // Right side (0 deg, cos=1) -> anchor 0% (Left aligned) -> 50(1) - 50 = 0
    // Left side (180 deg, cos=-1) -> anchor -100% (Right aligned) -> 50(-1) - 50 = -100
    // Top/Bottom (90/270, cos=0) -> anchor -50% (Centered) -> 50(0) - 50 = -50
    const xPercent = useTransform(angleRad, rad => `${(Math.cos(rad) * 50) - 50}%`);

    return (
        <>
            {/* Icon Button */}
            <motion.div
                className="absolute pointer-events-auto"
                style={{ x, y }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
            >
                <motion.button
                     onClick={() => {
                        item.onClick?.()
                        onSelect?.(item)
                    }}
                    onMouseEnter={setActive}
                    onMouseLeave={clearActive}
                    className={cn(
                        "flex h-16 w-16 -ml-8 -mt-8 items-center justify-center rounded-full", 
                        "border border-white/10 bg-[#0f172a] backdrop-blur-md",
                        "transition-all duration-300 hover:bg-blue-600 hover:border-blue-400 hover:scale-110",
                        isActive && "ring-2 ring-blue-500 bg-blue-600 scale-110",
                        "text-blue-400 hover:text-white"
                    )}
                    aria-label={item.label}
                >
                    <div className="text-current scale-125">{item.icon}</div>
                </motion.button>
            </motion.div>

            {/* Label */}
            <motion.div
                className="absolute flex items-center justify-center pointer-events-none"
                style={{ x: labelX, y: labelY }}
            >
                <motion.div 
                    className={cn(
                        "text-white font-outfit font-bold text-lg whitespace-nowrap -translate-y-1/2",
                        "drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ x: xPercent }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                >
                    {item.label}
                </motion.div>
            </motion.div>
        </>
    )
}

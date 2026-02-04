"use client"

import { useState, useEffect, useCallback, useRef, type ReactNode } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import styles from "./circular-command-menu.module.css"

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
}

function CircularCommandMenu({
    items = [],
    trigger,
    className,
    radius = 240, // Further increased radius for extreme airiness
    defaultOpen = false,
    onSelect,
}: CircularCommandMenuProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    // Defensive check for items
    const safeItems = items || []
    const itemCount = safeItems.length

    const angleStep = itemCount > 0 ? 360 / itemCount : 0
    const startAngle = -90 // Start from top

    useEffect(() => {
        if (defaultOpen) {
            setIsOpen(true)
        }
    }, [defaultOpen])

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            // If forced open, we might not want to close on escape, but valid for now
            if (!isOpen || itemCount === 0) return

            const currentActive = activeIndex ?? 0

            switch (e.key) {
                case "ArrowRight":
                case "ArrowDown":
                    e.preventDefault()
                    setActiveIndex((currentActive + 1) % itemCount)
                    break
                case "ArrowLeft":
                case "ArrowUp":
                    e.preventDefault()
                    setActiveIndex((currentActive - 1 + itemCount) % itemCount)
                    break
                case "Enter":
                    e.preventDefault()
                    const selectedItem = safeItems[currentActive]
                    if (selectedItem) {
                        selectedItem.onClick?.()
                        onSelect?.(selectedItem)
                    }
                    // If it's a menu that should stay open, maybe don't close?
                    // For now, let's keep it closeable unless strictly required otherwise
                    // But user said "no button click to open", implying it stays open or opens on view?
                    // Let's assume standard behavior for selection but auto-open.
                    break
            }
        },
        [isOpen, activeIndex, safeItems, itemCount, onSelect],
    )

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [handleKeyDown])

    const getItemPosition = (index: number) => {
        const angle = ((startAngle + index * angleStep) * Math.PI) / 180
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
        }
    }

    const totalSize = (radius + 80) * 2 // Reduced buffer for tighter layout
    const wrapperRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(wrapperRef, { once: true, amount: 0.25 })

    return (
        <div
            ref={wrapperRef}
            className={cn("relative flex items-center justify-center mx-auto", className)}
            style={{
                height: `${totalSize}px`,
                width: `${totalSize}px`
            }}
        >
            {/* Central logo — appears first when in view */}
            <motion.div
                className={cn(
                    "relative z-20 flex h-20 w-20 items-center justify-center rounded-full",
                    "bg-[#0f172a] border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.3)]",
                    "text-blue-400"
                )}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
                {trigger || (
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Supports</span>
                    </div>
                )}
            </motion.div>

            {/* Menu Items */}
            <AnimatePresence>
                {isOpen && itemCount > 0 && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10" role="menu">
                        {safeItems.map((item, index) => {
                            const position = getItemPosition(index)
                            // Determine if on left or right side to align tooltip
                            const isRightSide = position.x >= 0;

                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{
                                        opacity: 1,
                                        x: 0,
                                        y: 0,
                                        scale: 0,
                                    }}
                                    animate={
                                        isInView
                                            ? {
                                                opacity: 1,
                                                x: position.x - 28,
                                                y: position.y - 28,
                                                scale: 1,
                                            }
                                            : {
                                                opacity: 1,
                                                x: 0,
                                                y: 0,
                                                scale: 0,
                                            }
                                    }
                                    exit={{
                                        opacity: 0,
                                        x: 0,
                                        y: 0,
                                        scale: 0,
                                    }}
                                    transition={{
                                        duration: 0.65,
                                        ease: [0.22, 1, 0.36, 1],
                                        delay: isInView ? 0.25 : 0,
                                    }}
                                    className="absolute"
                                >
                                    <motion.button
                                        onClick={() => {
                                            item.onClick?.()
                                            onSelect?.(item)
                                        }}
                                        onMouseEnter={() => setActiveIndex(index)}
                                        onMouseLeave={() => setActiveIndex(null)}
                                        className={cn(
                                            "flex h-16 w-16 items-center justify-center rounded-full",
                                            "border border-white/10 bg-[#0f172a] shadow-[0_0_15px_rgba(0,0,0,0.5)]",
                                            "transition-all duration-300 hover:bg-blue-600 hover:border-blue-400 hover:scale-110 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]",
                                            activeIndex === index && "ring-2 ring-blue-500 bg-blue-600 scale-110",
                                            "text-blue-400 hover:text-white"
                                        )}
                                        role="menuitem"
                                        aria-label={item.label}
                                    >
                                        <div className="text-current scale-125">{item.icon}</div>
                                    </motion.button>

                                    {/* Label: raw CSS positioning + gap (circular-command-menu.module.css) */}
                                    <motion.div
                                        className={cn(
                                            styles.ccmLabel,
                                            Math.abs(position.x) < 40
                                                ? position.y < 0
                                                    ? styles.ccmLabelTop
                                                    : styles.ccmLabelBottom
                                                : position.x > 0
                                                    ? styles.ccmLabelRight
                                                    : styles.ccmLabelLeft
                                        )}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: isInView ? 1 : 0 }}
                                        transition={{ delay: isInView ? 0.95 : 0, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        {item.label}
                                    </motion.div>
                                </motion.div>
                            )
                        })}
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

// Export Component as default and named
export { CircularCommandMenu }

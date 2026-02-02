"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: "relative",
    width: "fit-content",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
  },
  rectangle: {
    position: "absolute",
    left: 0,
    top: 0,
    border: "1px solid rgba(0,0,0,0.2)",
    backgroundColor: "rgba(229, 231, 235, 0.9)",
  },
  pointerWrap: {
    position: "absolute",
  },
  pointerIcon: {
    width: "20px",
    height: "20px",
    color: "#fff",
  },
};

export function PointerHighlight({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName,
}: {
  children: React.ReactNode;
  rectangleClassName?: string;
  pointerClassName?: string;
  containerClassName?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      setDimensions({ width, height });
    };

    measure();

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = el.getBoundingClientRect();
      setDimensions({ width, height });
    });
    resizeObserver.observe(el);

    return () => resizeObserver.unobserve(el);
  }, []);

  return (
    <div
      className={containerClassName}
      style={{ ...styles.container }}
      ref={containerRef}
    >
      <span style={{ position: "relative", zIndex: 10 }}>{children}</span>
      {dimensions.width > 0 && dimensions.height > 0 && (
        <motion.div
          style={styles.overlay}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className={rectangleClassName}
            style={styles.rectangle}
            initial={{ width: 0, height: 0 }}
            whileInView={{
              width: dimensions.width,
              height: dimensions.height,
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.div
            style={{
              ...styles.pointerWrap,
              rotate: -90,
            }}
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              x: dimensions.width + 4,
              y: dimensions.height + 4,
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              opacity: { duration: 0.1, ease: "easeInOut" },
              duration: 1,
              ease: "easeInOut",
            }}
          >
            <Pointer
              className={pointerClassName}
              style={styles.pointerIcon}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

function Pointer({
  className,
  style,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      {...props}
    >
      <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
    </svg>
  );
}

export default PointerHighlight;

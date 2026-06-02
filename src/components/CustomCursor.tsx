"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Each trail dot is its own component so hooks are called at the top level
function TrailDot({ lag }: { lag: number }) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const stiffness = 130 - lag * 22;
  const damping = 14 + lag * 2;
  const springX = useSpring(mouseX, { stiffness, damping, mass: 0.3 });
  const springY = useSpring(mouseY, { stiffness, damping, mass: 0.3 });
  const size = Math.max(3, 7 - lag * 1.2);
  const opacity = 0.22 - lag * 0.04;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        width: size,
        height: size,
        opacity,
      }}
      className="fixed top-0 left-0 pointer-events-none rounded-full bg-[#F59E0B] z-[9996] -translate-x-1/2 -translate-y-1/2"
    />
  );
}

export default function CustomCursor() {
  const [label, setLabel] = useState("");
  const [isOver, setIsOver] = useState(false);
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 180, damping: 16, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 16, mass: 0.4 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-cursor]");
      if (el) {
        setIsOver(true);
        setLabel(el.getAttribute("data-cursor") ?? "");
      } else {
        setIsOver(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <>
      <TrailDot lag={1} />
      <TrailDot lag={2} />
      <TrailDot lag={3} />
      <TrailDot lag={4} />

      {/* Main cursor */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            width: label ? "auto" : isOver ? 44 : 10,
            height: label ? "auto" : isOver ? 44 : 10,
            backgroundColor: isOver && !label ? "transparent" : "#F59E0B",
            borderWidth: isOver && !label ? 1.5 : 0,
            borderColor: isOver && !label ? "#F59E0B" : "transparent",
          }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          className="rounded-full flex items-center justify-center overflow-hidden"
        >
          {label && (
            <span className="text-[11px] font-medium text-[#111] px-3 py-1.5 whitespace-nowrap bg-[#F59E0B]">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}

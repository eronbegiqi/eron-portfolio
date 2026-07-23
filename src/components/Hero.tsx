"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import MagneticButton from "./MagneticButton";

function SplitReveal({
  text,
  serif,
  delay,
}: {
  text: string;
  serif?: boolean;
  delay: number;
}) {
  return (
    <span className="inline-flex overflow-hidden">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "105%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.75,
            delay: delay + i * 0.04,
            ease: [0.23, 1, 0.32, 1],
          }}
          className={`inline-block ${char === " " ? "w-[0.25em]" : ""} ${
            serif ? "font-display italic text-[#F59E0B]" : ""
          }`}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

// The "." easter egg — click to see a secret message
function SecretPeriod() {
  const [clicks, setClicks] = useState(0);
  const [tooltip, setTooltip] = useState("");

  const messages = [
    "p.s. I designed this in one evening.",
    "p.p.s. the cursor has a trail.",
    "try the konami code. ↑↑↓↓←→←→BA",
    "still clicking? you're hired.",
  ];

  const handleClick = () => {
    const next = clicks % messages.length;
    setTooltip(messages[next]);
    setClicks((c) => c + 1);
    setTimeout(() => setTooltip(""), 2500);
  };

  return (
    <span className="relative">
      <motion.span
        onClick={handleClick}
        data-cursor="psst"
        whileTap={{ scale: 0.7 }}
        animate={tooltip ? { color: "#F59E0B" } : { color: "#F59E0B" }}
        transition={{ duration: 0.15 }}
        className="font-display italic cursor-none select-none"
      >
        .
      </motion.span>

      <AnimatePresence>
        {tooltip && (
          <motion.span
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="absolute left-1/2 -translate-x-1/2 -bottom-10 whitespace-nowrap bg-[#111] text-white text-[11px] px-3 py-1.5 rounded-full pointer-events-none z-50"
          >
            {tooltip}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const springX = useSpring(rawX, { stiffness: 30, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 30, damping: 20 });

  const gradientBg = useTransform(
    [springX, springY] as const,
    ([x, y]: number[]) =>
      `radial-gradient(ellipse 70% 60% at ${(x as number) * 100}% ${(y as number) * 100}%, #FEF3C7 0%, transparent 65%)`
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width);
      rawY.set((e.clientY - rect.top) / rect.height);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-center"
    >
      {/* Ambient gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: gradientBg }}
      />

      {/* Film grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Vertical rule lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] z-[1]">
        {[20, 35, 50, 65, 80].map((pct) => (
          <div
            key={pct}
            className="absolute top-0 bottom-0 w-px bg-[#111]"
            style={{ left: `${pct}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto px-6 pt-28 pb-16">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="text-[11px] text-[#bbb] tracking-[0.22em] uppercase mb-12 select-none"
        >
          Product Designer — B2B SaaS
        </motion.p>

        {/* Name */}
        <h1 className="leading-[0.88] tracking-[-0.02em] mb-8">
          <div className="text-[clamp(5rem,13vw,11rem)] overflow-hidden">
            <SplitReveal text="ERON" delay={0.5} />
          </div>
          <div className="text-[clamp(5rem,13vw,11rem)] overflow-hidden -mt-1">
            <SplitReveal text="BEGIQI" serif delay={0.62} />
            <SecretPeriod />
          </div>
        </h1>

        {/* Thin divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.23, 1, 0.32, 1] }}
          className="w-full max-w-xs h-px bg-[#e8e8e8] origin-center mb-8"
        />

        {/* Role line — single, static position statement (no cycling) */}
        <div className="overflow-hidden h-6 mb-4">
          <motion.p
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.85, ease: [0.23, 1, 0.32, 1] }}
            className="text-sm text-[#888] tracking-wide"
          >
            Product designer for complex B2B SaaS.
          </motion.p>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="text-sm text-[#aaa] mb-10 max-w-xl leading-relaxed"
        >
          I design data-rich workflows and the design systems that scale them
          across multi-product platforms — and I build AI into how I design,
          from discovery through delivery.
        </motion.p>

        {/* Magnetic CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.45, ease: [0.23, 1, 0.32, 1] }}
          className="flex items-center gap-5"
        >
          <MagneticButton>
            <Link
              href="#work"
              data-cursor="View"
              className="inline-flex items-center gap-2 bg-[#111] text-white text-sm font-medium px-7 py-3 rounded-full hover:bg-[#F59E0B] hover:text-[#111] transition-all duration-250 active:scale-[0.97]"
            >
              View work
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link
              href="#contact"
              data-cursor=""
              className="text-sm text-[#888] hover:text-[#111] transition-colors duration-200 underline underline-offset-4 decoration-[#F59E0B]/50 hover:decoration-[#F59E0B]"
            >
              Get in touch
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          className="flex items-center gap-6 sm:gap-10 mt-16 pt-8 border-t border-[#e8e8e8] w-full max-w-lg justify-center"
        >
          {[
            { value: "7+", label: "Years designing" },
            { value: "B2B SaaS", label: "Primary focus" },
            { value: "Design + Build", label: "End to end" },
          ].map(({ value, label }) => (
            <motion.div
              key={label}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              <div className="font-display text-base sm:text-xl text-[#111] whitespace-nowrap">
                {value}
              </div>
              <div className="text-[11px] text-[#bbb] tracking-wide uppercase mt-0.5">
                {label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.6 }}
        className="absolute bottom-8 flex items-center gap-2.5 text-[11px] text-[#ccc] tracking-[0.18em] uppercase select-none"
      >
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}

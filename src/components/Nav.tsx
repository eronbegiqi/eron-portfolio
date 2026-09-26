"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

// Easter egg: click the mark 5× to trigger a spin + secret tooltip
function Mark() {
  const [clicks, setClicks] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const handleClick = () => {
    const next = clicks + 1;
    setClicks(next);
    if (next >= 5) {
      setSpinning(true);
      setShowTip(true);
      setClicks(0);
      setTimeout(() => setSpinning(false), 800);
      setTimeout(() => setShowTip(false), 2800);
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        animate={spinning ? { rotate: 360 } : { rotate: 0 }}
        transition={spinning ? { duration: 0.7, ease: [0.23, 1, 0.32, 1] } : {}}
        whileTap={{ scale: 0.88 }}
        aria-label="Home"
        data-cursor=""
        className="block text-[#111] hover:text-[#F59E0B] transition-colors duration-200"
      >
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
          <rect width="18" height="2" fill="currentColor" />
          <rect y="6" width="12" height="2" fill="currentColor" />
          <rect y="12" width="7" height="2" fill="currentColor" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="absolute top-8 left-0 whitespace-nowrap bg-[#111] text-white text-[11px] px-3 py-1.5 rounded-full pointer-events-none z-50"
          >
            5 clicks. respect. 🫡
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Initialize Cal.com embed
  useEffect(() => {
    (async function () {
      const { getCalApi } = await import("@calcom/embed-react");
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", {
        cssVarsPerTheme: {
          dark: { "cal-brand": "#F59E0B" },
          light: { "cal-brand": "#F59E0B" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
      className={`fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 ${
        scrolled
          ? "bg-white/92 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-black/[0.06]"
          : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <Link href="/" className="block">
        <Mark />
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            data-cursor=""
            className="relative text-sm text-[#6b6b6b] hover:text-[#111] transition-colors duration-200 group py-1"
          >
            {label}
            <span className="absolute bottom-0 left-0 h-px w-0 bg-[#F59E0B] group-hover:w-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]" />
          </Link>
        ))}
      </nav>

      {/* Availability badge — opens Cal.com booking on click */}
      <button
        data-cal-namespace="15min"
        data-cal-link="eronbegiqi/15min"
        data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
        data-cursor="Hire me"
        className="group"
      >
        <motion.div
          initial={false}
          whileHover="hovered"
          className="flex items-center gap-2 text-sm text-[#6b6b6b] select-none overflow-hidden"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 animate-[pulse-dot_2s_ease-in-out_infinite]" />
          <span className="hidden sm:inline">Available</span>
          <motion.span
            variants={{
              hovered: { width: "auto", opacity: 1, marginLeft: 2 },
            }}
            initial={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="hidden sm:inline text-[#F59E0B] text-xs font-medium overflow-hidden whitespace-nowrap"
          >
            — let&apos;s chat →
          </motion.span>
        </motion.div>
      </button>
    </motion.header>
  );
}

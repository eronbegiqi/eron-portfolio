"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
];

function launchConfetti() {
  const colors = ["#F59E0B", "#111111", "#FEF3C7", "#FDE68A", "#ffffff"];
  const container = document.createElement("div");
  container.style.cssText =
    "position:fixed;inset:0;pointer-events:none;z-index:9998;overflow:hidden";
  document.body.appendChild(container);

  for (let i = 0; i < 100; i++) {
    const el = document.createElement("div");
    const color = colors[i % colors.length];
    const size = 5 + Math.random() * 10;
    const x = Math.random() * window.innerWidth;
    const tx = (Math.random() - 0.5) * 900;
    const ty = 200 + Math.random() * 700;
    const rot = Math.random() * 720 - 360;
    const dur = 1100 + Math.random() * 900;
    el.style.cssText = `
      position:absolute;left:${x}px;top:-${size}px;
      width:${size}px;height:${size}px;
      background:${color};
      border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
    `;
    el.animate(
      [
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        { transform: `translate(${tx}px,${ty}px) rotate(${rot}deg)`, opacity: 0 },
      ],
      { duration: dur, easing: "cubic-bezier(0,0.9,0.57,1)", fill: "forwards" }
    );
    container.appendChild(el);
  }
  setTimeout(() => container.remove(), 2600);
}

const CONSOLE_MESSAGE = `
%c  ╔═══════════════════════════════════════╗
  ║   ERON BEGIQI  ·  UX/UI + Dev         ║
  ║   eron.begiqi@technexus.io            ║
  ║                                       ║
  ║   you found the source code. nice.    ║
  ╚═══════════════════════════════════════╝
`;

export default function EasterEggs() {
  const [konamiActive, setKonamiActive] = useState(false);

  // Console signature
  useEffect(() => {
    console.log(
      CONSOLE_MESSAGE,
      "color:#F59E0B;font-family:monospace;font-size:12px;line-height:1.5"
    );
  }, []);

  // Konami code listener
  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === KONAMI[idx]) {
        idx++;
        if (idx === KONAMI.length) {
          launchConfetti();
          setKonamiActive(true);
          setTimeout(() => setKonamiActive(false), 3200);
          idx = 0;
        }
      } else {
        idx = 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {konamiActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] bg-[#111] text-white px-6 py-4 rounded-2xl text-sm shadow-2xl text-center pointer-events-none"
        >
          <div className="text-[#F59E0B] font-display text-lg mb-1">You found it.</div>
          <div className="text-[#888] text-xs">↑↑↓↓←→←→BA — the classics never die</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

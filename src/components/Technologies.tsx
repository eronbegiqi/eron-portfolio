"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrambleText from "./ScrambleText";

const technologies = [
  "Figma",
  "Framer",
  "Webflow",
  "WordPress",
  "Shopify",
  "HTML",
  "CSS",
  "Tailwind",
  "React",
  "Next.js",
  "TypeScript",
  "Lottie",
  "Vercel",
  "GitHub",
  "Git",
  "Node.js",
  "Neon",
  "Supabase",
  "Stripe",
  "Claude",
  "Codex",
  "Gemini",
  "Cursor",
  "VS Code",
];

export default function Technologies() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="technologies"
      ref={ref}
      className="py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full"
    >
      <div className="flex items-end justify-between border-b border-[#e8e8e8] pb-8 mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="font-display text-[clamp(2.5rem,5vw,3.75rem)]"
        >
          <ScrambleText text="Technologies" trigger={inView} />
        </motion.h2>
        <span className="text-[11px] text-[#bbb] tracking-[0.18em] uppercase mb-1">
          Stack
        </span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {technologies.map((tech, i) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.03 * i, ease: [0.23, 1, 0.32, 1] }}
            className="rounded-full border border-[#e8e8e8] px-4 py-2 text-sm text-[#555] transition-colors duration-200 hover:border-[#F59E0B]/40 hover:text-[#111]"
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

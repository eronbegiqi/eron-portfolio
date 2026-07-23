"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ScrambleText from "./ScrambleText";

const stats = [
  { value: 7, suffix: "+", label: "Years of Experience" },
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 30, suffix: "+", label: "Happy Clients" },
];

const skills = [
  "Figma",
  "React",
  "Next.js",
  "TypeScript",
  "Framer",
  "Design Systems",
  "Tailwind CSS",
  "User Research",
  "Prototyping",
  "Motion Design",
];

// Glitch counter: randomizes digits before settling on the real number
function GlitchCounter({
  value,
  suffix,
  active,
}: {
  value: number;
  suffix: string;
  active: boolean;
}) {
  const [display, setDisplay] = useState("—");
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    let rafId: number;
    const glitchDuration = 24; // frames of random digits
    const countDuration = 800; // ms for the count-up

    const glitch = () => {
      frame++;
      setDisplay(String(Math.floor(Math.random() * 99)));
      if (frame < glitchDuration) {
        rafId = requestAnimationFrame(glitch);
      } else {
        // Switch to smooth count-up
        let start: number | null = null;
        const count = (ts: number) => {
          if (!start) start = ts;
          const elapsed = ts - start;
          const t = Math.min(elapsed / countDuration, 1);
          const eased = 1 - (1 - t) ** 3;
          setDisplay(String(Math.floor(eased * value)));
          if (t < 1) rafId = requestAnimationFrame(count);
          else {
            setDisplay(String(value));
            setSettled(true);
          }
        };
        rafId = requestAnimationFrame(count);
      }
    };

    rafId = requestAnimationFrame(glitch);
    return () => cancelAnimationFrame(rafId);
  }, [active, value]);

  return (
    <span
      className={`tabular-nums transition-colors duration-200 ${
        settled ? "text-[#111]" : "text-[#F59E0B]"
      }`}
    >
      {display}
      {settled ? suffix : ""}
    </span>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full"
    >
      {/* Header */}
      <div className="flex items-end justify-between border-b border-[#e8e8e8] pb-8 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="font-display text-[clamp(2.5rem,5vw,3.75rem)]"
        >
          <ScrambleText text="About Me" trigger={inView} />
        </motion.h2>
        <span className="text-[11px] text-[#bbb] tracking-[0.18em] uppercase mb-1">
          Who I Am
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="text-base text-[#333] leading-[1.85] mb-5">
            I&apos;m a product designer focused on complex, data-rich B2B SaaS.
            I work end to end — from research and workflows to the design
            systems that keep a multi-product platform consistent.
          </p>
          <p className="text-sm text-[#6b6b6b] leading-[1.85] mb-5">
            Because I also build in React and Next.js, my designs ship without
            the usual handoff friction. Lately I&apos;ve gone AI-native:
            pulling live design tokens with the Figma MCP, using Claude across
            discovery, prototyping, and delivery, and building my own tooling
            to compress the loop from idea to production.
          </p>
          <p className="text-sm text-[#6b6b6b] leading-[1.85] mb-10">
            Right now I&apos;m designing DealerAssist, a B2B SaaS platform for
            US car dealerships.
          </p>

          {/* Skill chips with staggered hover */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.28,
                  delay: 0.35 + i * 0.04,
                  ease: [0.23, 1, 0.32, 1],
                }}
                whileHover={{ scale: 1.07, borderColor: "#F59E0B", color: "#111" }}
                whileTap={{ scale: 0.95 }}
                data-cursor=""
                className="text-[11px] border border-[#e8e8e8] px-2.5 py-1 rounded-full text-[#777] transition-colors duration-200"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Stats with glitch counters */}
        <div className="space-y-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.65,
                delay: 0.25 + i * 0.14,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="flex items-baseline gap-4 border-b border-[#e8e8e8] py-6 first:pt-0 group"
            >
              <span className="font-display text-[clamp(3.5rem,6vw,5rem)] leading-none">
                <GlitchCounter value={stat.value} suffix={stat.suffix} active={inView} />
              </span>
              <span className="text-sm text-[#888] group-hover:text-[#555] transition-colors duration-200">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

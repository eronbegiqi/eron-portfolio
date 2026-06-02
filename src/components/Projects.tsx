"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    slug: "financeflow",
    number: "01",
    title: "FinanceFlow",
    category: "Dashboard Design",
    year: "2024",
    description:
      "Redesigned a complex financial analytics platform. Reduced cognitive load by 40% and improved task completion rates across all user segments.",
    from: "#FFFBEB",
    to: "#FEF3C7",
    accent: "#F59E0B",
    gridColor: "#F59E0B18",
  },
  {
    slug: "shopsphere",
    number: "02",
    title: "ShopSphere",
    category: "Mobile App",
    year: "2024",
    description:
      "End-to-end mobile shopping experience with contextual recommendations and a frictionless checkout. Increased conversion rate by 28%.",
    from: "#F8FAFC",
    to: "#F1F5F9",
    accent: "#64748B",
    gridColor: "#64748B14",
  },
  {
    slug: "cloudbase",
    number: "03",
    title: "CloudBase",
    category: "SaaS Onboarding",
    year: "2023",
    description:
      "Onboarding redesign that cut time-to-activation from 12 minutes to under 3. Zero drop-off on key activation flows after launch.",
    from: "#EEF2FF",
    to: "#E0E7FF",
    accent: "#6366F1",
    gridColor: "#6366F114",
  },
  {
    slug: "nexus-identity",
    number: "04",
    title: "Nexus Identity",
    category: "Brand System",
    year: "2023",
    description:
      "Complete brand identity for a tech startup — logo, type system, motion guidelines, illustration style, and a full Figma component library.",
    from: "#ECFDF5",
    to: "#D1FAE5",
    accent: "#10B981",
    gridColor: "#10B98114",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const n = projects.length;
      setActiveIndex(Math.min(Math.floor(v * n), n - 1));
    });
  }, [scrollYProgress]);

  const p = projects[activeIndex];

  return (
    <section id="work">
      {/* Section label */}
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto pt-12 pb-0">
        <div className="flex items-end justify-between border-b border-[#e8e8e8] pb-8">
          <h2 className="font-display text-[clamp(2.5rem,5vw,3.75rem)]">
            Selected Work
          </h2>
          <span className="text-[11px] text-[#bbb] tracking-[0.18em] uppercase mb-1">
            Projects
          </span>
        </div>
      </div>

      {/* Sticky scroll container — unique concept */}
      <div ref={containerRef} style={{ height: `${projects.length * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -28 }}
              transition={{ duration: 0.48, ease: [0.23, 1, 0.32, 1] }}
              className="h-full flex flex-col lg:grid lg:grid-cols-2"
            >
              {/* Info panel */}
              <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-20 pt-28">
                <p className="text-[11px] text-[#bbb] tracking-[0.18em] uppercase mb-8 select-none">
                  {p.number} — {String(projects.length).padStart(2, "0")}
                </p>

                <h3 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.9] tracking-tight mb-5">
                  {p.title}
                </h3>

                <div className="flex items-center gap-3 mb-6 text-sm text-[#888]">
                  <span>{p.category}</span>
                  <span className="w-1 h-1 rounded-full bg-[#ddd]" />
                  <span>{p.year}</span>
                </div>

                <p className="text-sm text-[#6b6b6b] leading-[1.8] max-w-[340px] mb-10">
                  {p.description}
                </p>

                <Link
                  href={`/work/${p.slug}`}
                  data-cursor="Open"
                  className="group inline-flex items-center gap-2 text-sm font-medium w-fit"
                >
                  <span className="border-b border-[#111] pb-px group-hover:border-[#F59E0B] group-hover:text-[#F59E0B] transition-colors duration-200">
                    View Case Study
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </Link>

                {/* Progress indicator */}
                <div className="flex items-center gap-2 mt-16">
                  {projects.map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        width: i === activeIndex ? 28 : 10,
                        backgroundColor:
                          i === activeIndex ? "#F59E0B" : "#e5e5e5",
                      }}
                      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                      className="h-[2px] rounded-full"
                    />
                  ))}
                </div>
              </div>

              {/* Visual panel */}
              <div
                className="relative overflow-hidden hidden lg:block"
                style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}
              >
                {/* Dot-grid overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle, ${p.gridColor} 1px, transparent 1px)`,
                    backgroundSize: "28px 28px",
                  }}
                />

                {/* Abstract UI mockup */}
                <div className="absolute inset-0 flex items-center justify-center p-16">
                  <div className="w-full max-w-[320px] space-y-3">
                    <div
                      className="h-2 rounded-full w-3/5"
                      style={{ backgroundColor: p.accent + "55" }}
                    />
                    <div
                      className="h-[3px] rounded-full w-2/5 mb-5"
                      style={{ backgroundColor: p.accent + "33" }}
                    />
                    <div
                      className="rounded-xl overflow-hidden"
                      style={{ border: `2px solid ${p.accent}33` }}
                    >
                      <div
                        className="h-[3px]"
                        style={{ backgroundColor: p.accent }}
                      />
                      <div className="bg-white/60 p-4 space-y-2.5">
                        <div className="h-2.5 bg-white/80 rounded-full w-4/5" />
                        <div className="h-2 bg-white/50 rounded-full w-3/5" />
                        <div className="h-2 bg-white/50 rounded-full w-2/3" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2.5 pt-1">
                      {[0.7, 1, 0.55].map((opacity, j) => (
                        <div
                          key={j}
                          className="rounded-lg overflow-hidden"
                          style={{ border: `1px solid ${p.accent}22` }}
                        >
                          <div
                            className="h-[2px]"
                            style={{
                              backgroundColor: p.accent,
                              opacity,
                            }}
                          />
                          <div className="bg-white/50 h-14" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-8 right-8 text-[11px] text-[#6b6b6b] bg-white/75 backdrop-blur-sm px-3 py-1.5 rounded-full select-none">
                  {p.category}
                </div>

                {/* Year badge */}
                <div className="absolute bottom-8 left-8 text-[11px] text-[#888] select-none">
                  {p.year}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

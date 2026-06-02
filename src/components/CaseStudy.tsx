"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { type Project, type Phase, getNextProject } from "@/lib/projects";

// ── Reading progress bar ────────────────────────────────────────────────────
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#F59E0B] origin-left z-[100]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

// ── Animated metric counter ─────────────────────────────────────────────────
function MetricCounter({
  value,
  active,
}: {
  value: string;
  active: boolean;
}) {
  const numericMatch = value.match(/^(\d+)/);
  const suffix = value.replace(/^\d+/, "");
  const numeric = numericMatch ? parseInt(numericMatch[1], 10) : null;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active || numeric === null) return;
    let raf: number;
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      setCount(Math.floor(eased * numeric));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setCount(numeric);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, numeric]);

  if (numeric === null) return <>{value}</>;
  return (
    <>
      {count}
      {suffix}
    </>
  );
}

// ── CSS wireframe mockups per phase ─────────────────────────────────────────
function PhaseMockup({ phase }: { phase: string }) {
  if (phase === "01") {
    // Research: data table / survey UI
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="w-full max-w-xs space-y-2">
          {/* Header row */}
          <div className="flex gap-2 pb-2 border-b border-[#e0e0e0]">
            {["Segment", "Count", "Score"].map((h) => (
              <div key={h} className="flex-1 text-[10px] text-[#aaa] uppercase tracking-wider">
                {h}
              </div>
            ))}
          </div>
          {/* Data rows */}
          {[
            ["#F59E0B33", 0.8, 0.5],
            ["#F59E0B22", 0.6, 0.7],
            ["#F59E0B18", 0.9, 0.4],
            ["#F59E0B14", 0.5, 0.9],
            ["#F59E0B10", 0.7, 0.6],
          ].map(([bg, w1, w2], i) => (
            <div key={i} className="flex gap-2 py-1.5 items-center border-b border-[#f0f0f0]">
              <div className="flex-1 flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-sm" style={{ background: bg as string }} />
                <div className="h-1.5 rounded-full bg-[#e5e5e5]" style={{ width: `${(w1 as number) * 100}%` }} />
              </div>
              <div className="flex-1">
                <div className="h-1.5 rounded-full bg-[#e5e5e5] w-2/3" />
              </div>
              <div className="flex-1">
                <div
                  className="h-1.5 rounded-full"
                  style={{
                    width: `${(w2 as number) * 100}%`,
                    backgroundColor: "#F59E0B",
                    opacity: 0.6,
                  }}
                />
              </div>
            </div>
          ))}
          {/* Chart stub */}
          <div className="mt-3 h-16 rounded border border-[#e8e8e8] flex items-end px-2 pb-1 gap-1">
            {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.45, 0.75].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h * 100}%`,
                  backgroundColor: i === 3 ? "#F59E0B" : "#e5e5e5",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (phase === "02") {
    // Wireframes: lo-fi boxes
    return (
      <div className="w-full h-full flex items-center justify-center p-6">
        <div className="w-full max-w-xs space-y-2">
          {/* Nav bar wireframe */}
          <div className="flex items-center justify-between border border-dashed border-[#ccc] rounded px-3 py-2">
            <div className="h-2 w-6 bg-[#ddd] rounded-sm" />
            <div className="flex gap-2">
              {[0.8, 1, 0.7].map((w, i) => (
                <div key={i} className="h-1.5 bg-[#e5e5e5] rounded-sm" style={{ width: `${w * 24}px` }} />
              ))}
            </div>
            <div className="h-5 w-14 border border-dashed border-[#ccc] rounded-full" />
          </div>
          {/* Content area */}
          <div className="flex gap-2 h-24">
            <div className="w-1/3 border border-dashed border-[#ccc] rounded p-2 space-y-1">
              {[1, 0.7, 0.9, 0.5, 0.8, 0.6].map((w, i) => (
                <div key={i} className="h-1 rounded-sm bg-[#e5e5e5]" style={{ width: `${w * 100}%` }} />
              ))}
            </div>
            <div className="flex-1 border border-dashed border-[#F59E0B]/60 rounded p-2 space-y-1.5">
              <div className="h-2.5 bg-[#F59E0B]/20 rounded-sm w-3/4" />
              <div className="h-1 bg-[#e5e5e5] rounded-sm w-full" />
              <div className="h-1 bg-[#e5e5e5] rounded-sm w-4/5" />
              <div className="mt-2 grid grid-cols-3 gap-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-5 border border-dashed border-[#ccc] rounded" />
                ))}
              </div>
            </div>
          </div>
          {/* Footer wireframe */}
          <div className="grid grid-cols-4 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-6 border border-dashed border-[#ccc] rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (phase === "03") {
    // Design: hi-fi component
    return (
      <div className="w-full h-full flex items-center justify-center p-6">
        <div className="w-full max-w-xs space-y-2">
          {/* Top bar */}
          <div className="flex items-center justify-between bg-white border border-[#e8e8e8] rounded-lg px-3 py-2 shadow-sm">
            <div className="h-2 w-8 bg-[#111] rounded-full" />
            <div className="flex gap-1.5">
              {["bg-[#F59E0B]", "bg-[#e5e5e5]", "bg-[#e5e5e5]"].map((c, i) => (
                <div key={i} className={`h-1.5 w-12 ${c} rounded-full`} />
              ))}
            </div>
            <div className="h-6 w-16 bg-[#F59E0B] rounded-full" />
          </div>
          {/* Cards */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { c: "#FFFBEB", b: "#F59E0B" },
              { c: "#fff", b: "#e8e8e8" },
              { c: "#fff", b: "#e8e8e8" },
              { c: "#fff", b: "#e8e8e8" },
            ].map(({ c, b }, i) => (
              <div
                key={i}
                className="rounded-lg p-3 space-y-1.5"
                style={{ background: c, border: `1px solid ${b}` }}
              >
                <div className="h-1.5 rounded-full w-4/5" style={{ background: b }} />
                <div className="h-1 rounded-full w-3/5 bg-[#e5e5e5]" />
                <div className="h-4 rounded" style={{ background: b, opacity: 0.3 }} />
              </div>
            ))}
          </div>
          {/* Action bar */}
          <div className="flex gap-2">
            <div className="flex-1 h-8 bg-[#111] rounded-lg" />
            <div className="w-8 h-8 border border-[#e8e8e8] rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  // phase === "04" — Delivery: specs/annotation
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="w-full max-w-xs space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
          <div className="text-[10px] text-[#aaa] uppercase tracking-wider">Handoff specs</div>
        </div>
        {[
          { label: "Font size", value: "14px / 1.6" },
          { label: "Spacing", value: "8px grid" },
          { label: "Radius", value: "8px / 12px" },
          { label: "Shadow", value: "0 2px 8px 0%" },
          { label: "Duration", value: "200ms ease-out" },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between py-1.5 border-b border-[#f0f0f0]">
            <span className="text-[11px] text-[#888]">{label}</span>
            <code className="text-[11px] bg-[#f8f8f8] px-2 py-0.5 rounded font-mono text-[#333]">
              {value}
            </code>
          </div>
        ))}
        <div className="mt-3 p-3 bg-[#FFFBEB] rounded-lg border border-[#F59E0B]/30">
          <div className="text-[10px] text-[#F59E0B] uppercase tracking-wider mb-1">Components</div>
          <div className="flex flex-wrap gap-1">
            {["Button", "Card", "Input", "Modal", "Toast", "Nav"].map((c) => (
              <span key={c} className="text-[10px] bg-white border border-[#F59E0B]/30 px-2 py-0.5 rounded text-[#888]">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Phase item (extracted to avoid hooks-in-loop) ────────────────────────────
function PhaseItem({
  phase,
  index,
  accent,
}: {
  phase: Phase;
  index: number;
  accent: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-[#e8e8e8] ${
        isEven ? "" : "lg:[&>*:first-child]:order-2"
      }`}
    >
      {/* Text side */}
      <div className={`py-12 ${isEven ? "lg:pr-16" : "lg:pl-16 lg:order-2"}`}>
        <div className="flex items-center gap-3 mb-6">
          <span className="font-display text-sm" style={{ color: accent }}>
            {phase.number}
          </span>
          <span className="h-px flex-1 bg-[#e8e8e8]" />
          <span className="text-[11px] text-[#bbb]">{phase.duration}</span>
        </div>
        <h3 className="font-display text-2xl mb-3">{phase.title}</h3>
        <p className="text-sm text-[#666] leading-[1.8] mb-7">{phase.description}</p>
        <ul className="space-y-2.5">
          {phase.details.map((detail, j) => (
            <motion.li
              key={j}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + j * 0.06, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-start gap-3 text-sm text-[#555]"
            >
              <span
                className="mt-[7px] w-1 h-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: accent }}
              />
              {detail}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Mockup side */}
      <div
        className={`h-[280px] lg:h-auto border-[#e8e8e8] ${
          isEven ? "lg:border-l" : "lg:border-r"
        } bg-[#fafafa]`}
      >
        <PhaseMockup phase={phase.number} />
      </div>
    </motion.div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function CaseStudy({ project }: { project: Project }) {
  const nextProject = getNextProject(project.slug);
  const outcomesRef = useRef<HTMLDivElement>(null);
  const outcomesInView = useInView(outcomesRef, { once: true, margin: "-80px" });

  return (
    <>
      <ReadingProgress />

      {/* Back link */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/#work"
          data-cursor=""
          className="inline-flex items-center gap-2 text-xs text-[#888] hover:text-[#111] transition-colors duration-200 bg-white/80 backdrop-blur-sm border border-[#e8e8e8] px-3 py-2 rounded-full"
        >
          <span>←</span>
          <span>All Work</span>
        </Link>
      </div>

      {/* ── Hero ── */}
      <header
        className="relative min-h-[85vh] flex flex-col justify-end overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${project.from} 0%, ${project.to} 100%)`,
        }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, ${project.gridColor} 1.5px, transparent 1.5px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Large project number watermark */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 font-display text-[18vw] leading-none select-none pointer-events-none"
          style={{ color: project.accent, opacity: 0.08 }}
        >
          {project.number}
        </div>

        <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-16 pt-32 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <p
              className="text-[11px] uppercase tracking-[0.2em] mb-5"
              style={{ color: project.accent }}
            >
              {project.number} / 04 — {project.category}
            </p>

            <h1 className="font-display text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tight mb-6">
              {project.title}
            </h1>

            <p className="text-base text-[#555] max-w-xl leading-[1.7] mb-10">
              {project.tagline}
            </p>

            {/* Metadata strip */}
            <div className="flex flex-wrap gap-8 border-t border-black/[0.08] pt-8">
              {[
                { label: "Role", value: project.role },
                { label: "Timeline", value: project.timeline },
                { label: "Year", value: project.year },
                { label: "Team", value: project.team },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[10px] text-[#aaa] uppercase tracking-[0.15em] mb-1">
                    {label}
                  </p>
                  <p className="text-sm text-[#333] font-medium">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── Challenge pull-quote ── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 border-b border-[#e8e8e8]">
        <div className="max-w-4xl mx-auto">
          <div
            className="w-8 h-[2px] mb-8"
            style={{ backgroundColor: project.accent }}
          />
          <blockquote className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.3] text-[#111]">
            &ldquo;{project.challenge}&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ── Overview + Metadata ── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 border-b border-[#e8e8e8] max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 items-start">
          {/* Text */}
          <div>
            <h2 className="font-display text-3xl mb-8">Overview</h2>
            {project.overview.split("\n\n").map((para, i) => (
              <p key={i} className="text-[#555] leading-[1.85] mb-5 text-base">
                {para}
              </p>
            ))}
          </div>

          {/* Sticky sidebar card */}
          <div className="lg:sticky lg:top-24 space-y-0 border border-[#e8e8e8] rounded-2xl overflow-hidden">
            {[
              { label: "My Role", value: project.role },
              { label: "Timeline", value: project.timeline },
              { label: "Team", value: project.team },
            ].map(({ label, value }) => (
              <div key={label} className="px-5 py-4 border-b border-[#e8e8e8]">
                <p className="text-[10px] text-[#bbb] uppercase tracking-[0.14em] mb-1">
                  {label}
                </p>
                <p className="text-sm text-[#333]">{value}</p>
              </div>
            ))}

            <div className="px-5 py-4 border-b border-[#e8e8e8]">
              <p className="text-[10px] text-[#bbb] uppercase tracking-[0.14em] mb-2">
                Tools
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[11px] border border-[#e8e8e8] px-2 py-0.5 rounded-full text-[#666]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-5 py-4">
              <p className="text-[10px] text-[#bbb] uppercase tracking-[0.14em] mb-2">
                Deliverables
              </p>
              <ul className="space-y-1.5">
                {project.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-[11px] text-[#666]">
                    <span
                      className="mt-[5px] w-1 h-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: project.accent }}
                    />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process phases ── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <div className="flex items-end justify-between border-b border-[#e8e8e8] pb-8 mb-16">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)]">Process</h2>
          <span className="text-[11px] text-[#bbb] tracking-[0.18em] uppercase">
            4 phases
          </span>
        </div>

        <div className="space-y-0">
          {project.phases.map((phase, i) => (
            <PhaseItem key={phase.number} phase={phase} index={i} accent={project.accent} />
          ))}
        </div>
      </section>

      {/* ── Outcomes ── */}
      <section
        ref={outcomesRef}
        className="py-20 px-6 md:px-12 lg:px-20 border-t border-[#e8e8e8]"
        style={{
          background: `linear-gradient(180deg, #fff 0%, ${project.from} 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-end justify-between border-b border-black/[0.07] pb-8 mb-16">
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)]">Outcomes</h2>
            <span className="text-[11px] text-[#bbb] tracking-[0.18em] uppercase">
              Results
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-black/[0.07]">
            {project.outcomes.map((outcome, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={outcomesInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: i * 0.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="px-6 lg:px-10 py-8 first:pl-0 last:pr-0"
              >
                <div
                  className="font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-none tabular-nums mb-3"
                  style={{ color: project.accent }}
                >
                  <MetricCounter value={outcome.value} active={outcomesInView} />
                </div>
                <p className="text-sm font-semibold text-[#111] mb-1.5">
                  {outcome.label}
                </p>
                <p className="text-[12px] text-[#888] leading-[1.6]">
                  {outcome.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Next project ── */}
      {nextProject && (
        <section className="border-t border-[#e8e8e8]">
          <Link
            href={`/work/${nextProject.slug}`}
            data-cursor="View"
            className="group block px-6 md:px-12 lg:px-20 py-16 max-w-7xl mx-auto w-full"
          >
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] text-[#bbb] tracking-[0.18em] uppercase mb-3">
                  Next Project
                </p>
                <h3 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] group-hover:translate-x-2 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
                  {nextProject.title}
                </h3>
              </div>
              <div className="text-3xl text-[#bbb] group-hover:text-[#F59E0B] group-hover:translate-x-1 transition-all duration-300">
                →
              </div>
            </div>
            <p className="text-sm text-[#888] mt-4">
              {nextProject.category} — {nextProject.year}
            </p>
          </Link>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-[#e8e8e8] py-7 px-6 md:px-12 lg:px-20 flex items-center justify-between">
        <span className="text-xs text-[#bbb]">© 2025 Eron Begiqi</span>
        <Link
          href="/"
          data-cursor=""
          className="text-xs text-[#bbb] hover:text-[#111] transition-colors duration-200"
        >
          ← Back to Portfolio
        </Link>
      </footer>
    </>
  );
}

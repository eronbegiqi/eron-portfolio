"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type {
  CaseStudy as CaseStudyData,
  Phase,
  GalleryItem,
} from "@/data/case-studies";
import ProjectImage from "./ProjectImage";

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

  // phase === "04" (or any other index) — Delivery: specs/annotation
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

// ── AI-native process — dedicated block, central to the new positioning ────
function AIProcessSection({
  aiProcess,
  accent,
}: {
  aiProcess: string;
  accent: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const steps = ["Figma MCP", "Claude-anchored prompts", "Prototype & build"];

  return (
    <section
      ref={ref}
      className="py-20 px-6 md:px-12 lg:px-20 border-b border-[#e8e8e8]"
      style={{ background: `linear-gradient(180deg, #fff 0%, ${accent}0d 100%)` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-4xl mx-auto w-full"
      >
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-8" style={{ backgroundColor: accent }} />
          <span
            className="text-[11px] tracking-[0.18em] uppercase"
            style={{ color: accent }}
          >
            AI-native process
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-10">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] text-[#333]"
                style={{ borderColor: `${accent}55` }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                {step}
              </span>
              {i < steps.length - 1 && (
                <span className="text-[#ccc]" aria-hidden>
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        {aiProcess.split("\n\n").map((para, i) => (
          <p key={i} className="text-[#555] leading-[1.85] mb-5 text-base last:mb-0">
            {para}
          </p>
        ))}
      </motion.div>
    </section>
  );
}

// ── Gallery — wide full-width, pair two-up, mobile in a phone frame ─────────
function GallerySection({
  gallery,
}: {
  gallery: (GalleryItem & { exists: boolean })[];
}) {
  const wideItems = gallery.filter((g) => g.kind === "wide");
  const pairItems = gallery.filter((g) => g.kind === "pair");
  const mobileItems = gallery.filter((g) => g.kind === "mobile");

  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 border-b border-[#e8e8e8] max-w-7xl mx-auto w-full">
      <div className="flex items-end justify-between border-b border-[#e8e8e8] pb-8 mb-16">
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)]">Gallery</h2>
        <span className="text-[11px] text-[#bbb] tracking-[0.18em] uppercase">
          Screens
        </span>
      </div>

      <div className="space-y-6">
        {wideItems.map((item) => (
          <figure key={item.src}>
            <ProjectImage
              src={item.src}
              alt={item.alt}
              exists={item.exists}
              width={2400}
              height={1350}
              sizes="(max-width: 1280px) 100vw, 1280px"
              aspect="16 / 9"
              dims="2400×1350"
              slotName="Gallery wide"
              className="w-full rounded-xl"
            />
            {item.caption && (
              <figcaption className="text-[12px] text-[#888] mt-2">
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}

        {pairItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pairItems.map((item) => (
              <figure key={item.src}>
                <ProjectImage
                  src={item.src}
                  alt={item.alt}
                  exists={item.exists}
                  width={1400}
                  height={1050}
                  sizes="(max-width: 639px) 100vw, 50vw"
                  aspect="4 / 3"
                  dims="1400×1050"
                  slotName="Gallery pair"
                  className="w-full rounded-xl"
                />
                {item.caption && (
                  <figcaption className="text-[12px] text-[#888] mt-2">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}

        {mobileItems.length > 0 && (
          <div className="flex justify-center pt-4">
            {mobileItems.map((item) => (
              <figure
                key={item.src}
                className="w-[260px] overflow-hidden rounded-[2.5rem] border-[10px] border-[#111]"
              >
                <ProjectImage
                  src={item.src}
                  alt={item.alt}
                  exists={item.exists}
                  width={1080}
                  height={1920}
                  sizes="280px"
                  aspect="9 / 16"
                  dims="1080×1920"
                  slotName="Gallery mobile"
                  className="w-full"
                />
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
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
  const displayNumber = String(index + 1).padStart(2, "0");

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
            {displayNumber}
          </span>
          <span className="h-px flex-1 bg-[#e8e8e8]" />
          {phase.label && (
            <span className="text-[11px] text-[#bbb]">{phase.label}</span>
          )}
        </div>
        <h3 className="font-display text-2xl mb-7">{phase.title}</h3>
        <ul className="space-y-2.5">
          {phase.points.map((point, j) => (
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
              {point}
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
        <PhaseMockup phase={displayNumber} />
      </div>
    </motion.div>
  );
}

interface NextProject {
  slug: string;
  title: string;
  category: string;
  year: string;
  thumbnail: string;
  thumbnailAlt: string;
  thumbnailExists: boolean;
}

interface CaseStudyProps {
  caseStudy: CaseStudyData;
  totalCount: number;
  coverExists: boolean;
  overviewImageExists: boolean;
  gallery: (GalleryItem & { exists: boolean })[];
  nextProject: NextProject | null;
}

// ── Main component ───────────────────────────────────────────────────────────
export default function CaseStudy({
  caseStudy,
  totalCount,
  coverExists,
  overviewImageExists,
  gallery,
  nextProject,
}: CaseStudyProps) {
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

      {/* ── Cover ── */}
      <div className="pt-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <ProjectImage
          src={caseStudy.cover}
          alt={caseStudy.coverAlt}
          exists={coverExists}
          width={2400}
          height={1350}
          sizes="(max-width: 1280px) 100vw, 1280px"
          aspect="16 / 9"
          dims="2400×1350"
          slotName="Case study cover"
          priority
          className="w-full rounded-2xl"
        />
      </div>

      {/* ── Meta header ── */}
      <header
        className="relative flex flex-col justify-end overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${caseStudy.from} 0%, ${caseStudy.to} 100%)`,
        }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, ${caseStudy.gridColor} 1.5px, transparent 1.5px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Large project number watermark */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 font-display text-[18vw] leading-none select-none pointer-events-none"
          style={{ color: caseStudy.accent, opacity: 0.08 }}
        >
          {caseStudy.number}
        </div>

        <div className="relative z-10 px-6 md:px-12 lg:px-20 py-16 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <p
              className="text-[11px] uppercase tracking-[0.2em] mb-5"
              style={{ color: caseStudy.accent }}
            >
              {caseStudy.number} / {String(totalCount).padStart(2, "0")} — {caseStudy.category}
            </p>

            <h1 className="font-display text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tight mb-6">
              {caseStudy.title}
            </h1>

            <p className="text-base text-[#555] max-w-xl leading-[1.7] mb-10">
              {caseStudy.tagline}
            </p>

            {/* Metadata strip */}
            <div className="flex flex-wrap gap-8 border-t border-black/[0.08] pt-8">
              {[
                { label: "Role", value: caseStudy.role },
                { label: "Timeline", value: caseStudy.timeline },
                { label: "Year", value: caseStudy.year },
                { label: "Team", value: caseStudy.team },
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
            style={{ backgroundColor: caseStudy.accent }}
          />
          <blockquote className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.3] text-[#111]">
            &ldquo;{caseStudy.challenge}&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ── Overview + Metadata ── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 border-b border-[#e8e8e8] max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 items-start">
          {/* Text + overview image */}
          <div>
            <h2 className="font-display text-3xl mb-8">Overview</h2>
            {caseStudy.overview.split("\n\n").map((para, i) => (
              <p key={i} className="text-[#555] leading-[1.85] mb-5 text-base">
                {para}
              </p>
            ))}
            <ProjectImage
              src={caseStudy.overviewImage}
              alt={caseStudy.overviewImageAlt}
              exists={overviewImageExists}
              width={2400}
              height={1350}
              sizes="(max-width: 1280px) 100vw, 900px"
              aspect="16 / 9"
              dims="2400×1350"
              slotName="Overview image"
              className="w-full rounded-xl mt-4"
            />
          </div>

          {/* Sticky sidebar card */}
          <div className="lg:sticky lg:top-24 space-y-0 border border-[#e8e8e8] rounded-2xl overflow-hidden">
            {[
              { label: "My Role", value: caseStudy.role },
              { label: "Timeline", value: caseStudy.timeline },
              { label: "Team", value: caseStudy.team },
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
                {caseStudy.tools.map((tool) => (
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
                {caseStudy.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-[11px] text-[#666]">
                    <span
                      className="mt-[5px] w-1 h-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: caseStudy.accent }}
                    />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI-native process ── */}
      <AIProcessSection aiProcess={caseStudy.aiProcess} accent={caseStudy.accent} />

      {/* ── Process phases ── */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <div className="flex items-end justify-between border-b border-[#e8e8e8] pb-8 mb-16">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)]">Process</h2>
          <span className="text-[11px] text-[#bbb] tracking-[0.18em] uppercase">
            {caseStudy.phases.length} phases
          </span>
        </div>

        <div className="space-y-0">
          {caseStudy.phases.map((phase, i) => (
            <PhaseItem key={i} phase={phase} index={i} accent={caseStudy.accent} />
          ))}
        </div>
      </section>

      {/* ── Gallery ── */}
      <GallerySection gallery={gallery} />

      {/* ── Outcomes ── */}
      <section
        ref={outcomesRef}
        className="py-20 px-6 md:px-12 lg:px-20 border-t border-[#e8e8e8]"
        style={{
          background: `linear-gradient(180deg, #fff 0%, ${caseStudy.from} 100%)`,
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
            {caseStudy.outcomes.map((outcome, i) => (
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
                  style={{ color: caseStudy.accent }}
                >
                  <MetricCounter value={outcome.value} active={outcomesInView} />
                </div>
                <p className="text-sm font-semibold text-[#111]">{outcome.label}</p>
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
            className="group flex flex-col sm:flex-row sm:items-center gap-8 px-6 md:px-12 lg:px-20 py-16 max-w-7xl mx-auto w-full"
          >
            <div className="w-full sm:w-48 flex-shrink-0 overflow-hidden rounded-xl">
              <ProjectImage
                src={nextProject.thumbnail}
                alt={nextProject.thumbnailAlt}
                exists={nextProject.thumbnailExists}
                width={1200}
                height={750}
                sizes="192px"
                aspect="16 / 10"
                dims="1200×750"
                slotName="Wall card thumb"
                className="w-full"
              />
            </div>
            <div className="flex flex-1 items-end justify-between">
              <div>
                <p className="text-[11px] text-[#bbb] tracking-[0.18em] uppercase mb-3">
                  Next Project
                </p>
                <h3 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] group-hover:translate-x-2 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
                  {nextProject.title}
                </h3>
                <p className="text-sm text-[#888] mt-4">
                  {nextProject.category} — {nextProject.year}
                </p>
              </div>
              <div className="hidden sm:block text-3xl text-[#bbb] group-hover:text-[#F59E0B] group-hover:translate-x-1 transition-all duration-300">
                →
              </div>
            </div>
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

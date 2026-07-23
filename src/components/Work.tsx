"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Lock } from "lucide-react";
import ScrambleText from "./ScrambleText";
import ProjectImage from "./ProjectImage";
import type { Project, ProjectTag } from "@/data/projects";

const FILTER_TAGS: ProjectTag[] = [
  "B2B SaaS",
  "Design System",
  "Workflow",
  "AI Workflow",
  "Mobile",
  "Web Dev",
];

export interface WorkProject extends Project {
  thumbnailExists: boolean;
}

export default function Work({ projects }: { projects: WorkProject[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [active, setActive] = useState<"All" | ProjectTag>("All");

  const visible =
    active === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(active));

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full"
    >
      <div className="flex items-end justify-between border-b border-[#e8e8e8] pb-8 mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="font-display text-[clamp(2.5rem,5vw,3.75rem)]"
        >
          <ScrambleText text="Selected Work" trigger={inView} />
        </motion.h2>
        <span className="text-[11px] text-[#bbb] tracking-[0.18em] uppercase mb-1">
          Projects
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <FilterBar active={active} onChange={setActive} />
        <p
          aria-live="polite"
          className="text-[11px] text-[#bbb] tracking-[0.18em] uppercase"
        >
          Showing {visible.length} project{visible.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 grid-flow-row-dense">
        {visible.map((project, i) => (
          <WorkCard key={project.slug} project={project} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}

function FilterBar({
  active,
  onChange,
}: {
  active: "All" | ProjectTag;
  onChange: (tag: "All" | ProjectTag) => void;
}) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter projects by tag"
    >
      {(["All", ...FILTER_TAGS] as const).map((tag) => {
        const isActive = active === tag;
        return (
          <button
            key={tag}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(tag)}
            data-cursor=""
            className={`rounded-full border px-3 py-1.5 text-[11px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 ${
              isActive
                ? "border-[#111] bg-[#111] text-white"
                : "border-[#e8e8e8] text-[#777] hover:border-[#F59E0B]/40 hover:text-[#111]"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}

function WorkCard({
  project,
  index,
  inView,
}: {
  project: WorkProject;
  index: number;
  inView: boolean;
}) {
  const {
    title,
    oneLiner,
    tags,
    featured,
    builtByMe,
    hasCaseStudy,
    figmaUrl,
    thumbnail,
    thumbnailAlt,
    thumbnailExists,
    slug,
  } = project;

  const imageSlot = featured
    ? {
        width: 1600,
        height: 1000,
        dims: "1600×1000",
        sizes: "(max-width: 1024px) 100vw, 66vw",
        slotName: "Featured card thumb",
      }
    : {
        width: 1200,
        height: 750,
        dims: "1200×750",
        sizes: "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw",
        slotName: "Wall card thumb",
      };

  const shellClasses =
    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white motion-safe:transition-[transform,border-color] motion-safe:duration-200 motion-safe:ease-out hover:-translate-y-1 focus-within:-translate-y-1 hover:border-[#F59E0B]/40 focus-within:border-[#F59E0B]/40";
  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2";

  const body = (
    <>
      <div className="relative">
        <ProjectImage
          src={thumbnail}
          alt={thumbnailAlt}
          exists={thumbnailExists}
          width={imageSlot.width}
          height={imageSlot.height}
          sizes={imageSlot.sizes}
          aspect="16 / 10"
          dims={imageSlot.dims}
          slotName={imageSlot.slotName}
          className="block w-full"
        />
        {builtByMe && (
          <span className="absolute top-3 left-3 rounded-full border border-[#e8e8e8] bg-white/90 px-2.5 py-1 text-[10px] uppercase tracking-wide text-[#555] backdrop-blur-sm">
            Designed &amp; Built
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-base font-semibold text-[#111]">{title}</h3>
          <p className="mt-1 text-sm leading-snug text-[#6b6b6b]">{oneLiner}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#e8e8e8] px-2.5 py-1 text-[11px] text-[#888]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-1">
          {hasCaseStudy ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#111] transition-colors duration-200 group-hover:text-[#F59E0B]">
              View case study <span aria-hidden>→</span>
            </span>
          ) : figmaUrl ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#111] transition-colors duration-200 group-hover:text-[#F59E0B]">
              View project <ArrowUpRight size={14} aria-hidden />
            </span>
          ) : (
            <LockedProjectButton title={title} />
          )}
        </div>
      </div>
    </>
  );

  let shell: React.ReactNode;
  if (hasCaseStudy) {
    shell = (
      <Link
        href={`/work/${slug}`}
        data-cursor="View"
        className={`${shellClasses} ${focusRing}`}
      >
        {body}
      </Link>
    );
  } else if (figmaUrl) {
    shell = (
      <a
        href={figmaUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="View"
        className={`${shellClasses} ${focusRing}`}
      >
        {body}
      </a>
    );
  } else {
    shell = <div className={shellClasses}>{body}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.05 + index * 0.05,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={featured ? "sm:col-span-2" : undefined}
    >
      {shell}
    </motion.div>
  );
}

function LockedProjectButton({ title }: { title: string }) {
  const [revealed, setRevealed] = useState(false);
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  const handleClick = () => {
    router.push(`/?project=${encodeURIComponent(title)}#contact`, { scroll: false });
    document.getElementById("contact")?.scrollIntoView({ behavior: "auto" });
  };

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setRevealed(true)}
        onMouseLeave={() => setRevealed(false)}
        onFocus={() => setRevealed(true)}
        onBlur={() => setRevealed(false)}
        aria-label={`Contact about ${title}`}
        data-cursor="Contact"
        className="inline-flex items-center gap-1.5 rounded text-sm text-[#888] transition-colors duration-200 hover:text-[#111] focus-visible:text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2"
      >
        <Lock size={13} strokeWidth={1.75} aria-hidden />
        Available on request
      </button>
      <AnimatePresence>
        {revealed && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
            role="tooltip"
            className="pointer-events-none absolute -top-9 left-0 z-20 whitespace-nowrap rounded-full bg-[#111] px-3 py-1.5 text-[11px] text-white"
          >
            Contact for details on this project.
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

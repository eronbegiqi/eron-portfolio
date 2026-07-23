"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ScrambleText from "./ScrambleText";

const services = [
  {
    number: "01",
    title: "Product design for B2B SaaS",
    description:
      "Complex workflows, data-dense interfaces, discovery to delivery.",
    tags: ["Workflows", "Research", "Prototyping"],
  },
  {
    number: "02",
    title: "Design systems",
    description:
      "Scalable, token-based systems that unify experience across a multi-product platform.",
    tags: ["Tokens", "Components", "Governance"],
  },
  {
    number: "03",
    title: "AI-native workflow",
    description:
      "Figma MCP and Claude across discovery, prototyping, and delivery, plus custom tooling.",
    tags: ["Figma MCP", "Claude", "Tooling"],
  },
  {
    number: "04",
    title: "Design + build",
    description:
      "React/Next.js implementation, so design intent ships intact.",
    tags: ["React", "Next.js", "TypeScript"],
  },
];

// Individual tilt card — 3D perspective on mouse position
function ServiceCard({
  service,
  index,
  inView,
}: {
  service: (typeof services)[0];
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: cy * -7, y: cx * 7 });
  };

  const onLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: 0.1 + index * 0.08,
        ease: [0.23, 1, 0.32, 1],
      }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      data-cursor=""
      style={{
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? "transform 0.08s ease-out" : "transform 0.4s ease-out",
        transformStyle: "preserve-3d",
      }}
      className="group relative bg-white p-8 md:p-10 overflow-hidden border-t border-[#e8e8e8] md:odd:border-r-0 border-r"
    >
      {/* Top amber reveal line */}
      <span className="absolute top-0 left-0 h-[2px] w-0 bg-[#F59E0B] group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />

      {/* Subtle glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, #FEF3C740 0%, transparent 70%)",
        }}
      />

      {/* Number */}
      <p className="font-display text-[3rem] leading-none text-[#ebebeb] group-hover:text-[#F59E0B] transition-colors duration-300 mb-6 select-none">
        {service.number}
      </p>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-3 group-hover:translate-x-0.5 transition-transform duration-250">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[#6b6b6b] leading-[1.75] mb-7">
        {service.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04, duration: 0.2 }}
            className="text-[11px] border border-[#e8e8e8] px-2.5 py-1 rounded-full text-[#888] group-hover:border-[#F59E0B]/40 group-hover:text-[#555] transition-colors duration-250"
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {/* Corner arrow that appears on hover */}
      <motion.span
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-6 right-6 text-[#F59E0B] text-sm pointer-events-none"
      >
        ↗
      </motion.span>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      ref={ref}
      className="py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full"
    >
      {/* Header with scramble effect */}
      <div className="flex items-end justify-between border-b border-[#e8e8e8] pb-8 mb-0">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="font-display text-[clamp(2.5rem,5vw,3.75rem)]"
        >
          <ScrambleText text="What I Do" trigger={inView} />
        </motion.h2>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-[11px] text-[#bbb] tracking-[0.18em] uppercase mb-1"
        >
          Services
        </motion.span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 border-b border-l border-[#e8e8e8]">
        {services.map((service, i) => (
          <ServiceCard key={service.number} service={service} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}

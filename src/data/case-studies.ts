export interface Phase {
  title: string;
  label?: string;
  points: string[];
}

export interface GalleryItem {
  kind: "wide" | "pair" | "mobile";
  src: string;
  alt: string;
  caption?: string;
}

export interface Outcome {
  /** Literal "[TODO]" is expected until a real figure is supplied. */
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  year: string;
  // Per-project theming — drives CaseStudy.tsx's hero gradient, dot-grid, and
  // watermark-number treatment.
  from: string;
  to: string;
  accent: string;
  gridColor: string;
  number: string;
  category: string;

  cover: string;
  coverAlt: string;
  role: string;
  timeline: string;
  team: string;
  tools: string[];
  deliverables: string[];
  tagline: string;
  challenge: string;

  overview: string;
  overviewImage: string;
  overviewImageAlt: string;

  aiProcess: string;

  phases: Phase[];

  gallery: GalleryItem[];

  outcomes: Outcome[];

  nextSlug: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "dealerassist",
    title: "DealerAssist",
    year: "2025",
    from: "#FFFBEB",
    to: "#FEF3C7",
    accent: "#F59E0B",
    gridColor: "#F59E0B18",
    number: "01",
    category: "B2B SaaS Platform",

    cover: "/work/dealerassist/cover.webp",
    coverAlt: "DealerAssist product cover — dealership site editor with live preview",
    role: "Product Designer",
    timeline: "[TODO]",
    team: "[TODO]",
    tools: ["Figma", "Figma MCP", "Claude", "React"],
    deliverables: ["Platform IA", "Design system extension", "Editor UI", "Onboarding flow"],
    tagline: "Letting dealerships run a modern website without needing a web team.",
    challenge:
      "Dealership marketing staff needed a way to launch and edit a modern site without filing a ticket to an agency for every change.",

    overview:
      "DealerAssist gives dealership staff a self-serve site editor built on the same component system their public pages render from.\n\nThe constraint: it had to work for non-technical staff on day one, without flattening what the platform could do for power users later.",
    overviewImage: "/work/dealerassist/overview.webp",
    overviewImageAlt: "Dealership staff member editing a homepage section in DealerAssist",

    aiProcess:
      "Design tokens came out of the live Figma file via the Figma MCP, so the component states Claude scaffolded were never out of sync with what design actually shipped.\n\nPrompts were anchored to real frames rather than written in the abstract, which meant iteration happened directly against working UI instead of a separate spec document.",

    phases: [
      { title: "Research", label: "Discovery", points: ["[TODO]", "[TODO]"] },
      { title: "Wireframes", label: "Structure", points: ["[TODO]", "[TODO]"] },
      { title: "Design", label: "System", points: ["[TODO]", "[TODO]"] },
      { title: "Delivery", label: "Handoff", points: ["[TODO]", "[TODO]"] },
    ],

    gallery: [
      { kind: "wide", src: "/work/dealerassist/wide-1.webp", alt: "Full site editor with section list open" },
      { kind: "wide", src: "/work/dealerassist/wide-2.webp", alt: "Live preview pane mid-edit" },
      { kind: "pair", src: "/work/dealerassist/pair-1.webp", alt: "Section settings panel", caption: "Section settings" },
      { kind: "pair", src: "/work/dealerassist/pair-2.webp", alt: "Publish confirmation state", caption: "Publish flow" },
      { kind: "mobile", src: "/work/dealerassist/mobile-1.webp", alt: "DealerAssist editor on a phone screen" },
    ],

    outcomes: [
      { value: "[TODO]", label: "Time to first published edit" },
      { value: "[TODO]", label: "Support tickets avoided" },
    ],

    nextSlug: "dealer-templates",
  },
  {
    slug: "dealer-templates",
    title: "DealerAssist Templates",
    year: "2025",
    from: "#F8FAFC",
    to: "#F1F5F9",
    accent: "#64748B",
    gridColor: "#64748B14",
    number: "02",
    category: "Template System",

    cover: "/work/dealer-templates/cover.webp",
    coverAlt: "DealerAssist Templates cover — template picker with several dealership site layouts",
    role: "Product Designer",
    timeline: "[TODO]",
    team: "[TODO]",
    tools: ["Figma", "Figma MCP", "Claude"],
    deliverables: ["Template library", "Theming system", "Preview flow", "Deploy pipeline"],
    tagline: "A template system dealerships can make their own in minutes, not weeks.",
    challenge:
      "Every new dealership site started from a blank file and a multi-week build — even when most of the layout matched the last site that shipped.",

    overview:
      "DealerAssist Templates turns that repeated groundwork into a library dealers pick from and re-theme, instead of rebuilding from scratch.\n\nThe constraint: templates had to stay visually distinct enough that dealerships didn't feel like they were running someone else's site.",
    overviewImage: "/work/dealer-templates/overview.webp",
    overviewImageAlt: "Dealer previewing a template with their own branding applied",

    aiProcess:
      "Each template's structure was pulled directly from Figma via the Figma MCP, so the preview environment Claude built could stay pixel-accurate to the design file as templates were added.\n\nNew template variants were prototyped by prompting against existing frames rather than starting a new build from zero each time.",

    phases: [
      { title: "Research", label: "Discovery", points: ["[TODO]", "[TODO]"] },
      { title: "Wireframes", label: "Structure", points: ["[TODO]", "[TODO]"] },
      { title: "Design", label: "System", points: ["[TODO]", "[TODO]"] },
      { title: "Delivery", label: "Handoff", points: ["[TODO]", "[TODO]"] },
    ],

    gallery: [
      { kind: "wide", src: "/work/dealer-templates/wide-1.webp", alt: "Template gallery grid view" },
      { kind: "wide", src: "/work/dealer-templates/wide-2.webp", alt: "Template detail view with theming controls" },
      { kind: "pair", src: "/work/dealer-templates/pair-1.webp", alt: "Color and font theming panel", caption: "Theming controls" },
      { kind: "pair", src: "/work/dealer-templates/pair-2.webp", alt: "Template deploy confirmation state", caption: "Deploy flow" },
      { kind: "mobile", src: "/work/dealer-templates/mobile-1.webp", alt: "Template preview on a phone screen" },
    ],

    outcomes: [
      { value: "[TODO]", label: "Time to launch a new site" },
      { value: "[TODO]", label: "Templates in the library" },
    ],

    nextSlug: "dealerchat",
  },
  {
    slug: "dealerchat",
    title: "DealerChat",
    year: "2025",
    from: "#EEF2FF",
    to: "#E0E7FF",
    accent: "#6366F1",
    gridColor: "#6366F114",
    number: "03",
    category: "Product Module",

    cover: "/work/dealerchat/cover.webp",
    coverAlt: "DealerChat cover — live chat widget with availability settings open",
    role: "Product Designer",
    timeline: "[TODO]",
    team: "[TODO]",
    tools: ["Figma", "Figma MCP", "Claude"],
    deliverables: ["Settings UI", "Availability scheduler", "Working-hours config"],
    tagline: "Giving service teams control over when and how live chat shows up.",
    challenge:
      "Dealerships wanted live chat available only during business hours, but changing that window required an engineer to edit a config file.",

    overview:
      "DealerChat moves availability and working-hours configuration into a settings panel dealership staff can manage themselves.\n\nThe constraint: the scheduler had to handle multi-location dealerships with different hours per location, not just a single on/off switch.",
    overviewImage: "/work/dealerchat/overview.webp",
    overviewImageAlt: "Staff member setting per-location working hours in DealerChat",

    aiProcess:
      "The settings UI's component states were extracted from the existing DealerAssist design system via the Figma MCP, keeping DealerChat visually consistent with the rest of the platform by construction rather than manual review.\n\nEdge cases — overlapping hours, holiday overrides — were worked through as prompts against the live prototype, then folded back into the Figma file.",

    phases: [
      { title: "Research", label: "Discovery", points: ["[TODO]", "[TODO]"] },
      { title: "Wireframes", label: "Structure", points: ["[TODO]", "[TODO]"] },
      { title: "Design", label: "System", points: ["[TODO]", "[TODO]"] },
      { title: "Delivery", label: "Handoff", points: ["[TODO]", "[TODO]"] },
    ],

    gallery: [
      { kind: "wide", src: "/work/dealerchat/wide-1.webp", alt: "Availability scheduler with multiple locations listed" },
      { kind: "wide", src: "/work/dealerchat/wide-2.webp", alt: "Working-hours editor for a single location" },
      { kind: "pair", src: "/work/dealerchat/pair-1.webp", alt: "Holiday override panel", caption: "Holiday overrides" },
      { kind: "pair", src: "/work/dealerchat/pair-2.webp", alt: "Chat widget shown in offline state", caption: "Offline state" },
      { kind: "mobile", src: "/work/dealerchat/mobile-1.webp", alt: "DealerChat settings on a phone screen" },
    ],

    outcomes: [
      { value: "[TODO]", label: "Config changes handled without engineering" },
      { value: "[TODO]", label: "Locations onboarded" },
    ],

    nextSlug: "dealerassist",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getNextCaseStudy(slug: string): CaseStudy | undefined {
  const current = getCaseStudy(slug);
  if (!current) return undefined;
  return caseStudies.find((c) => c.slug === current.nextSlug);
}

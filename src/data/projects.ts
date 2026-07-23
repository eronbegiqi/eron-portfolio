export type ProjectTag =
  | "B2B SaaS"
  | "Automotive"
  | "Design System"
  | "Workflow"
  | "AI Workflow"
  | "Mobile"
  | "Marketing Site"
  | "Web Dev"
  | "Enterprise";

export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  tags: ProjectTag[];
  featured: boolean;
  builtByMe: boolean;
  hasCaseStudy: boolean;
  figmaUrl: string | null;
  thumbnail: string;
  thumbnailAlt: string;
}

export const projects: Project[] = [
  // Featured — own case-study pages
  {
    slug: "dealerassist",
    title: "DealerAssist",
    oneLiner: "B2B SaaS platform that lets US dealerships deploy modern sites.",
    tags: ["B2B SaaS", "Automotive", "Design System"],
    featured: true,
    builtByMe: true,
    hasCaseStudy: true,
    figmaUrl: null,
    thumbnail: "/work/thumbs/dealerassist.webp",
    thumbnailAlt: "DealerAssist dashboard showing a dealership's live site editor",
  },
  {
    slug: "dealer-templates",
    title: "DealerAssist Templates",
    oneLiner: "High-conversion website template system dealers deploy in minutes.",
    tags: ["B2B SaaS", "Automotive", "Marketing Site"],
    featured: true,
    builtByMe: true,
    hasCaseStudy: true,
    figmaUrl: null,
    thumbnail: "/work/thumbs/dealer-templates.webp",
    thumbnailAlt: "Template picker showing several dealership site templates side by side",
  },
  {
    slug: "dealerchat",
    title: "DealerChat",
    oneLiner: "Live-chat module — settings, availability, working-hours config.",
    tags: ["B2B SaaS", "Workflow", "Automotive"],
    featured: true,
    builtByMe: false,
    hasCaseStudy: true,
    figmaUrl: null,
    thumbnail: "/work/thumbs/dealerchat.webp",
    thumbnailAlt: "DealerChat settings panel showing working-hours configuration",
  },
  // Wall
  {
    slug: "design-bridge",
    title: "Design Bridge",
    oneLiner: "Figma plugin: Claude HTML exports into native Figma layers.",
    tags: ["AI Workflow", "Design System", "Web Dev"],
    featured: false,
    builtByMe: true,
    hasCaseStudy: false,
    figmaUrl: null,
    thumbnail: "/work/thumbs/design-bridge.webp",
    thumbnailAlt: "Design Bridge plugin converting an HTML export into native Figma layers",
  },
  {
    slug: "featured-cars",
    title: "Featured Cars",
    oneLiner: "Inventory star-toggling and a Manage Featured Cars modal.",
    tags: ["B2B SaaS", "Workflow"],
    featured: false,
    builtByMe: false,
    hasCaseStudy: false,
    figmaUrl: null,
    thumbnail: "/work/thumbs/featured-cars.webp",
    thumbnailAlt: "Manage Featured Cars modal with inventory star-toggles",
  },
  {
    slug: "cohere-ds",
    title: "Cohere design system",
    oneLiner: "Token set unifying the DealerAssist platform surfaces.",
    tags: ["Design System"],
    featured: false,
    builtByMe: false,
    hasCaseStudy: false,
    figmaUrl: null,
    thumbnail: "/work/thumbs/cohere-ds.webp",
    thumbnailAlt: "Cohere design system token sheet in Figma",
  },
  {
    slug: "attributy",
    title: "Attributy",
    oneLiner: "Mobile app interface and its design system.",
    tags: ["Mobile", "Design System"],
    featured: false,
    builtByMe: false,
    hasCaseStudy: false,
    figmaUrl: null,
    thumbnail: "/work/thumbs/attributy.webp",
    thumbnailAlt: "Attributy mobile app home screen",
  },
  {
    slug: "comitas",
    title: "Swiss gov & enterprise",
    oneLiner: "Apps and sites for Swiss public-sector clients at Comitas.",
    tags: ["Enterprise", "Mobile", "Web Dev"],
    featured: false,
    builtByMe: false,
    hasCaseStudy: false,
    figmaUrl: null,
    thumbnail: "/work/thumbs/comitas.webp",
    thumbnailAlt: "Swiss public-sector web app screen designed at Comitas",
  },
  {
    slug: "shedzug",
    title: "SHEDZug",
    oneLiner: "React website redesign for a Swiss organisation.",
    tags: ["Web Dev", "Marketing Site"],
    featured: false,
    builtByMe: true,
    hasCaseStudy: false,
    figmaUrl: "https://www.figma.com/REPLACE-ME",
    thumbnail: "/work/thumbs/shedzug.webp",
    thumbnailAlt: "SHEDZug marketing site homepage",
  },
  {
    slug: "summit-balkans",
    title: "Summit Balkans",
    oneLiner: "Hiking-tours site with a full page-speed overhaul.",
    tags: ["Marketing Site", "Web Dev"],
    featured: false,
    builtByMe: true,
    hasCaseStudy: false,
    figmaUrl: null,
    thumbnail: "/work/thumbs/summit-balkans.webp",
    thumbnailAlt: "Summit Balkans hiking tours homepage",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

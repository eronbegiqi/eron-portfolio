export type ProjectTag =
  | "B2B SaaS"
  | "Automotive"
  | "Design System"
  | "Workflow"
  | "AI Workflow"
  | "Mobile"
  | "Marketing Site"
  | "Web Dev"
  | "Enterprise"
  | "Branding"
  | "E-commerce"
  | "Fintech"
  | "Crypto";

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
    oneLiner:
      "Marketing site and dashboard for a B2B SaaS platform, built from zero to shipped product.",
    tags: ["B2B SaaS", "Automotive", "Design System"],
    featured: true,
    builtByMe: true,
    hasCaseStudy: true,
    figmaUrl: "https://www.dealerassist.com",
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
    figmaUrl: "https://www.dealerassist.com/templates",
    thumbnail: "/work/thumbs/dealer-templates.webp",
    thumbnailAlt: "Template picker showing several dealership site templates side by side",
  },
  {
    slug: "dealerchat",
    title: "DealerChat",
    oneLiner:
      "Live-chat module for car dealerships, built to capture and route leads.",
    tags: ["B2B SaaS", "Workflow", "Automotive"],
    featured: true,
    builtByMe: false,
    hasCaseStudy: true,
    figmaUrl: "https://www.dealerassist.com/features/dealer-chat",
    thumbnail: "/work/thumbs/dealerchat.webp",
    thumbnailAlt: "DealerChat settings panel showing working-hours configuration",
  },
  // Wall
  {
    slug: "attributy",
    title: "Attributy",
    oneLiner: "Complete redesign and system design for the Attributy product.",
    tags: ["Mobile", "Design System"],
    featured: false,
    builtByMe: false,
    hasCaseStudy: false,
    figmaUrl: "https://attributy.com",
    thumbnail: "/work/thumbs/attributy.webp",
    thumbnailAlt: "Attributy mobile app home screen",
  },
  {
    slug: "shedzug",
    title: "SHED Zug",
    oneLiner: "Design and development of the website.",
    tags: ["Web Dev", "Marketing Site"],
    featured: false,
    builtByMe: true,
    hasCaseStudy: false,
    figmaUrl: "https://shedzug.ch",
    thumbnail: "/work/thumbs/shedzug.webp",
    thumbnailAlt: "SHED Zug marketing site homepage",
  },
  {
    slug: "summit-balkans",
    title: "Summit Balkans",
    oneLiner:
      "Full website design and development, with a booking system built into the admin panel.",
    tags: ["Marketing Site", "Web Dev"],
    featured: false,
    builtByMe: true,
    hasCaseStudy: false,
    figmaUrl: "https://www.summitbalkans.com",
    thumbnail: "/work/thumbs/summit-balkans.webp",
    thumbnailAlt: "Summit Balkans hiking tours homepage",
  },
  {
    slug: "motoshop-ks",
    title: "Motoshop KS",
    oneLiner:
      "Full booking, servicing, and inventory management system for motorcycle dealerships.",
    tags: ["B2B SaaS", "Workflow", "Web Dev"],
    featured: false,
    builtByMe: true,
    hasCaseStudy: false,
    figmaUrl: "https://motoshop-ks.com",
    thumbnail: "/work/thumbs/motoshop-ks.webp",
    thumbnailAlt: "Motoshop KS dashboard showing motorcycle inventory and bookings",
  },
  {
    slug: "ardellion",
    title: "Ardellion",
    oneLiner: "Brand identity and website design.",
    tags: ["Branding", "Marketing Site"],
    featured: false,
    builtByMe: true,
    hasCaseStudy: false,
    figmaUrl: "https://ardellion.com",
    thumbnail: "/work/thumbs/ardellion.webp",
    thumbnailAlt: "Ardellion brand website homepage",
  },
  {
    slug: "alpine-diagnostics",
    title: "Alpine Diagnostics",
    oneLiner:
      "From branding to a full website with online service bookings.",
    tags: ["Branding", "E-commerce", "Web Dev"],
    featured: false,
    builtByMe: true,
    hasCaseStudy: false,
    figmaUrl: "https://www.alpinediagnostics.ch",
    thumbnail: "/work/thumbs/alpine-diagnostics.webp",
    thumbnailAlt: "Alpine Diagnostics website with online service booking",
  },
  {
    slug: "cannatherapy",
    title: "Cannatherapy",
    oneLiner:
      "From branding to a full website with online service bookings.",
    tags: ["Branding", "E-commerce", "Web Dev"],
    featured: false,
    builtByMe: true,
    hasCaseStudy: false,
    figmaUrl: "https://cannatherapy.ch",
    thumbnail: "/work/thumbs/cannatherapy.webp",
    thumbnailAlt: "Cannatherapy website with online service booking",
  },
  {
    slug: "crypto-united",
    title: "Crypto United",
    oneLiner: "From branding to the full website.",
    tags: ["Branding", "Crypto", "Web Dev"],
    featured: false,
    builtByMe: true,
    hasCaseStudy: false,
    figmaUrl: "https://www.cryptounited.ch",
    thumbnail: "/work/thumbs/crypto-united.webp",
    thumbnailAlt: "Crypto United website homepage",
  },
  {
    slug: "pakapoo",
    title: "Pakapoo",
    oneLiner: "Website with an integrated crypto payment gateway and raffle system.",
    tags: ["Crypto", "E-commerce", "Web Dev"],
    featured: false,
    builtByMe: true,
    hasCaseStudy: false,
    figmaUrl: "http://pakapoo.io",
    thumbnail: "/work/thumbs/pakapoo.webp",
    thumbnailAlt: "Pakapoo raffle platform with crypto checkout",
  },
  {
    slug: "sulpayments",
    title: "SulPayments",
    oneLiner: "Design and development of the website.",
    tags: ["Fintech", "Web Dev"],
    featured: false,
    builtByMe: true,
    hasCaseStudy: false,
    figmaUrl: "https://sulpayments.ch",
    thumbnail: "/work/thumbs/sulpayments.webp",
    thumbnailAlt: "SulPayments website homepage",
  },
  {
    slug: "technokosovo",
    title: "TechnoKosovo",
    oneLiner:
      "A dedicated platform for the country's underground electronic culture.",
    tags: ["Marketing Site", "Web Dev"],
    featured: false,
    builtByMe: true,
    hasCaseStudy: false,
    figmaUrl: "https://www.technokosovo.com",
    thumbnail: "/work/thumbs/technokosovo.webp",
    thumbnailAlt: "TechnoKosovo events platform homepage",
  },
  {
    slug: "coinlaunch",
    title: "CoinLaunch",
    oneLiner:
      "Website platform and browser extension for launching crypto tokens. Still in development.",
    tags: ["Crypto", "Web Dev"],
    featured: false,
    builtByMe: true,
    hasCaseStudy: false,
    figmaUrl: "https://coinlaunch-azure.vercel.app",
    thumbnail: "/work/thumbs/coinlaunch.webp",
    thumbnailAlt: "CoinLaunch platform interface for launching tokens",
  },
  {
    slug: "drawmark",
    title: "Drawmark",
    oneLiner:
      "A crypto raffle platform where holders enter draws for a chance to win prizes. Still in development.",
    tags: ["Crypto", "Web Dev"],
    featured: false,
    builtByMe: true,
    hasCaseStudy: false,
    figmaUrl: "https://drawmark-demo.vercel.app",
    thumbnail: "/work/thumbs/drawmark.webp",
    thumbnailAlt: "Drawmark crypto raffle platform interface",
  },
  {
    slug: "finanz-satellit",
    title: "Finanz Satellit",
    oneLiner: "Design for a fintech application.",
    tags: ["Fintech", "Design System"],
    featured: false,
    builtByMe: false,
    hasCaseStudy: false,
    figmaUrl: null,
    thumbnail: "/work/thumbs/finanz-satellit.webp",
    thumbnailAlt: "Finanz Satellit fintech application screen",
  },
  {
    slug: "remote-tag",
    title: "Remote Tag",
    oneLiner: "Design and development of a GPS asset-tracking platform.",
    tags: ["Web Dev", "Marketing Site"],
    featured: false,
    builtByMe: true,
    hasCaseStudy: false,
    figmaUrl: "https://remotetags.com",
    thumbnail: "/work/thumbs/remote-tag.webp",
    thumbnailAlt: "Remote Tag GPS tracking platform homepage",
  },
  {
    slug: "mytrackingdevices",
    title: "My Tracking Devices",
    oneLiner: "Design and development of the website.",
    tags: ["Web Dev", "E-commerce"],
    featured: false,
    builtByMe: true,
    hasCaseStudy: false,
    figmaUrl: "https://mytrackingdevices.com",
    thumbnail: "/work/thumbs/mytrackingdevices.webp",
    thumbnailAlt: "My Tracking Devices website homepage",
  },
  {
    slug: "disposable-gps-tracker",
    title: "Disposable GPS Tracker",
    oneLiner: "Design and development of the website.",
    tags: ["Web Dev", "E-commerce"],
    featured: false,
    builtByMe: true,
    hasCaseStudy: false,
    figmaUrl: "https://disposablegpstracker.com",
    thumbnail: "/work/thumbs/disposable-gps-tracker.webp",
    thumbnailAlt: "Disposable GPS Tracker website homepage",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

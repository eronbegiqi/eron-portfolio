export interface Phase {
  number: string;
  title: string;
  duration: string;
  description: string;
  details: string[];
}

export interface Outcome {
  value: string;
  label: string;
  description: string;
}

export interface Project {
  slug: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  from: string;
  to: string;
  accent: string;
  gridColor: string;
  // Case study content
  tagline: string;
  role: string;
  timeline: string;
  team: string;
  tools: string[];
  deliverables: string[];
  challenge: string;
  overview: string;
  phases: Phase[];
  outcomes: Outcome[];
  nextSlug: string;
}

export const projects: Project[] = [
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
    tagline:
      "Turning a feature-bloated analytics platform into a tool people actually want to open.",
    role: "Lead UX/UI Designer",
    timeline: "14 weeks",
    team: "1 designer (me), 2 engineers, 1 PM",
    tools: ["Figma", "FigJam", "Maze", "Hotjar", "Lottie"],
    deliverables: [
      "UX research report",
      "48-component design system",
      "Responsive prototypes",
      "Motion specifications",
      "Dev handoff documentation",
    ],
    challenge:
      "The existing dashboard required 8+ clicks to reach the most common workflows. Users were abandoning sessions within 90 seconds. Revenue was at risk.",
    overview:
      "FinanceFlow had accumulated 4 years of feature additions without a cohesive design strategy. Power users had developed workarounds; new users churned within their first week. The brief was clear: make the product feel like it was designed, not assembled.\n\nThe constraint was equally clear: we couldn't break the mental models of existing power users who had memorized every workflow.",
    phases: [
      {
        number: "01",
        title: "Research",
        duration: "3 weeks",
        description:
          "Deep-dive into how real users navigated the existing product, and what they actually needed day to day.",
        details: [
          "24 user interviews across 3 segments (analysts, managers, executives)",
          "Heatmap and session recording analysis — 2,400 sessions reviewed",
          "6 core workflows accounted for 80% of all daily usage",
          "70% of interactions clustered in the top-left quadrant of the screen",
          "Biggest pain: finding specific data across multiple disconnected views",
        ],
      },
      {
        number: "02",
        title: "Wireframes",
        duration: "3 weeks",
        description:
          "Rapid exploration of navigation paradigms before committing to a direction. Three radically different approaches tested.",
        details: [
          "3 competing navigation paradigms prototyped at lo-fi fidelity",
          "Moderated usability testing with 12 participants per concept",
          "Progressive disclosure pattern outperformed alternatives in all tasks",
          "Command palette interaction (⌘K) reduced navigation time by 60% in testing",
          "Card-sorting exercise with 18 participants informed the information architecture",
        ],
      },
      {
        number: "03",
        title: "Design",
        duration: "5 weeks",
        description:
          "Building a cohesive system from the ground up — not a collection of screens, but a living design language.",
        details: [
          "48-component library covering all product surfaces",
          "5 responsive breakpoints with consistent spatial rhythm",
          "WCAG AA compliance across all components",
          "Dark mode variant with independently tuned contrast ratios",
          "12 data visualization patterns with color-blind-safe palettes",
        ],
      },
      {
        number: "04",
        title: "Delivery",
        duration: "3 weeks",
        description:
          "Close collaboration with engineering to ensure the design intent survived implementation.",
        details: [
          "Weekly design-engineering syncs throughout the build sprint",
          "Motion specifications with exact easing curves and durations",
          "Edge-case documentation for 34 identified error and empty states",
          "Two rounds of QA review with annotated feedback",
          "Post-launch monitoring for 4 weeks, 3 iteration cycles",
        ],
      },
    ],
    outcomes: [
      {
        value: "40%",
        label: "Faster task completion",
        description: "Average time to complete top 6 workflows",
      },
      {
        value: "63%",
        label: "Fewer support tickets",
        description: "Navigation-related tickets in the first 60 days",
      },
      {
        value: "28%",
        label: "Longer sessions",
        description: "Average session duration increased significantly",
      },
      {
        value: "67",
        label: "NPS score",
        description: "Up from 24 pre-redesign — a 43-point improvement",
      },
    ],
    nextSlug: "shopsphere",
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
    tagline:
      "A mobile shopping experience that feels personal, not algorithmic.",
    role: "UX/UI Designer",
    timeline: "10 weeks",
    team: "1 designer (me), 3 engineers, 1 PM, 1 data scientist",
    tools: ["Figma", "Principle", "FullStory", "Amplitude", "Maze"],
    deliverables: [
      "iOS & Android design system",
      "Checkout flow redesign",
      "Personalization framework",
      "Onboarding experience",
      "A/B test specifications",
    ],
    challenge:
      "Cart abandonment was at 74%. Users added items but stalled at checkout. The existing flow had 7 screens and required account creation before purchase.",
    overview:
      "ShopSphere was losing customers at the worst possible moment — right before purchase. Analytics showed clear drop-off at the account creation gate. The hypothesis: if we remove friction, conversion will follow.\n\nThe bigger opportunity was personalisation. Their recommendation engine was sophisticated but the UI was surfacing it poorly.",
    phases: [
      {
        number: "01",
        title: "Research",
        duration: "2 weeks",
        description:
          "Understanding exactly where and why users abandoned their carts.",
        details: [
          "Funnel analysis across 180,000 sessions",
          "Exit surveys at abandonment points — 2,400 responses",
          "Competitor checkout benchmarking (8 apps)",
          "Guest checkout emerged as the single most-requested feature",
          "Trust signals (reviews, returns policy) consistently cited as missing",
        ],
      },
      {
        number: "02",
        title: "Wireframes",
        duration: "2 weeks",
        description:
          "Collapsing a 7-screen checkout into 3, without losing any required data.",
        details: [
          "Progressive form disclosure reduced perceived length",
          "Inline validation eliminated 'submit and see errors' frustration",
          "Address autocomplete reduced input time by 65% in testing",
          "One-tap reorder from order history — zero wireframes needed, users loved it",
          "Tested 2 payment UI patterns; bottom sheet won decisively",
        ],
      },
      {
        number: "03",
        title: "Design",
        duration: "4 weeks",
        description:
          "A system that feels native on both iOS and Android while maintaining brand consistency.",
        details: [
          "Platform-adaptive components for iOS and Android conventions",
          "Haptic feedback specifications for key interaction moments",
          "Recommendation cards designed for quick scanning, not reading",
          "Trust signal components: rating breakdowns, return policy, size guides",
          "Dark mode with full contrast audit",
        ],
      },
      {
        number: "04",
        title: "Delivery",
        duration: "2 weeks",
        description:
          "A/B test framework designed to validate key decisions post-launch.",
        details: [
          "3 A/B tests designed and documented pre-launch",
          "Guest checkout vs account creation: guest won by 31% conversion lift",
          "Recommendation placement test: below-the-fold won over hero",
          "Iterative releases: checkout first, then personalisation layer",
          "Conversion tracking dashboard built with data team",
        ],
      },
    ],
    outcomes: [
      {
        value: "28%",
        label: "Conversion increase",
        description: "Overall purchase conversion rate improvement",
      },
      {
        value: "74%",
        label: "Cart abandonment",
        description: "Reduced from 74% to 46% — a 28-point drop",
      },
      {
        value: "3",
        label: "Checkout screens",
        description: "Down from 7, capturing the same information",
      },
      {
        value: "4.8",
        label: "App Store rating",
        description: "Up from 3.9 after the redesign shipped",
      },
    ],
    nextSlug: "cloudbase",
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
    tagline: "First impressions that convert trial users into lifelong customers.",
    role: "Lead UX Designer",
    timeline: "8 weeks",
    team: "1 designer (me), 2 engineers, 1 growth PM",
    tools: ["Figma", "Loom", "Intercom", "Mixpanel", "Typeform"],
    deliverables: [
      "Onboarding flow redesign",
      "Empty state library",
      "In-app tooltip system",
      "Success milestone framework",
      "Activation metric dashboard",
    ],
    challenge:
      "Trial-to-paid conversion was 8% against an industry benchmark of 15–20%. Users signed up, explored briefly, then left without ever reaching their 'aha moment'.",
    overview:
      "CloudBase had a powerful product that nobody understood in their first session. The onboarding flow dumped users into an empty dashboard with no guidance. The product team had tried tooltips — they were ignored.\n\nThe insight from research: users didn't need a tour. They needed their first win.",
    phases: [
      {
        number: "01",
        title: "Research",
        duration: "2 weeks",
        description:
          "Finding the exact moment users who converted decided to stay.",
        details: [
          "Cohort analysis: what did converted users do in their first session?",
          "12 interviews with churned trial users — all cited 'didn't get it'",
          "The 'aha moment': connecting a data source and seeing live data",
          "Median time to aha: 12 minutes. Target: under 3 minutes",
          "Job stories mapped for 3 core user personas",
        ],
      },
      {
        number: "02",
        title: "Wireframes",
        duration: "2 weeks",
        description: "Designing toward a single goal: reach the aha moment faster.",
        details: [
          "Onboarding redesigned as a 'guided first project', not a feature tour",
          "Progress persistence: users could leave and resume without losing state",
          "3 entry paths based on stated use-case during signup",
          "Celebration moment designed for first successful data connection",
          "Empty states redesigned as 'starting points', not blank voids",
        ],
      },
      {
        number: "03",
        title: "Design",
        duration: "3 weeks",
        description:
          "An onboarding system that feels like help, not hindrance.",
        details: [
          "Contextual tooltip system: shown at the right moment, not on load",
          "Checklist sidebar: optional but visible, tracks progress",
          "Confetti and micro-celebration at first data connection",
          "Video walkthroughs embedded at decision points (30s max)",
          "Persistent 'Resume setup' banner for returning incomplete users",
        ],
      },
      {
        number: "04",
        title: "Delivery",
        duration: "1 week",
        description:
          "Shipped incrementally to measure impact of each change in isolation.",
        details: [
          "Phased rollout: 10% → 25% → 100% over 3 weeks",
          "Activation metric defined and tracked from day 1",
          "In-app NPS survey at day 7 for all new trial users",
          "Weekly review with growth team during rollout",
          "Zero regression in power user workflows — confirmed via session review",
        ],
      },
    ],
    outcomes: [
      {
        value: "76%",
        label: "Drop in time-to-activation",
        description: "From 12 minutes to under 3 minutes average",
      },
      {
        value: "19%",
        label: "Trial-to-paid rate",
        description: "Up from 8% — now above industry benchmark",
      },
      {
        value: "0%",
        label: "Drop-off on key flows",
        description: "Critical activation paths after the redesign",
      },
      {
        value: "41",
        label: "NPS at day 7",
        description: "New trial user satisfaction, up from 12",
      },
    ],
    nextSlug: "nexus-identity",
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
    tagline:
      "A brand system built to scale from seed round to Series B without a redesign.",
    role: "Brand Designer & Design Systems Lead",
    timeline: "12 weeks",
    team: "1 designer (me), 1 illustrator, 1 motion designer",
    tools: ["Figma", "After Effects", "Framer", "Notion", "Lottie"],
    deliverables: [
      "Logo system (all lockups)",
      "Brand guidelines (120 pages)",
      "Figma component library",
      "Motion design language",
      "Marketing site design",
    ],
    challenge:
      "A Series A startup with a strong product and a forgettable brand. Their existing visual identity had been assembled from freelancer contributions over 18 months with no coherent direction.",
    overview:
      "Nexus was preparing for a Series B raise and needed a brand that could carry them through growth — consistent enough to be recognisable, flexible enough to extend into new product lines without a complete overhaul.\n\nThe brief: look like the company they're becoming, not the startup they were.",
    phases: [
      {
        number: "01",
        title: "Research",
        duration: "2 weeks",
        description:
          "Positioning research, competitive audit, and stakeholder alignment before a single pixel was moved.",
        details: [
          "Competitive landscape audit across 24 companies in the space",
          "Brand archetype workshop with 8 stakeholders",
          "Customer perception survey — 200 responses from existing users",
          "3 positioning territories developed and pressure-tested",
          "'Precise confidence' emerged as the core brand territory",
        ],
      },
      {
        number: "02",
        title: "Wireframes",
        duration: "3 weeks",
        description:
          "Exploring visual directions before locking into a logomark.",
        details: [
          "4 visual directions developed as full mood boards",
          "Logo exploration: 40+ concepts across 3 directions",
          "Geometric mark selected — scalable from favicon to billboard",
          "Type system: custom variable font with 3 optical sizes",
          "Color system: 3 primaries, 5 tints each, accessible combinations documented",
        ],
      },
      {
        number: "03",
        title: "Design",
        duration: "5 weeks",
        description:
          "Building the complete system — every asset, every rule, every exception.",
        details: [
          "120-page brand guidelines covering every application",
          "Figma library: 280 components, 12 variants average per component",
          "Illustration style guide with 18 example illustrations",
          "Motion language: 3 signature animations, timing specifications",
          "Photography art direction: tone, composition, subject guidelines",
        ],
      },
      {
        number: "04",
        title: "Delivery",
        duration: "2 weeks",
        description:
          "Handoff designed for a team that didn't have a full-time designer yet.",
        details: [
          "Figma library with clear naming conventions and usage notes",
          "Loom walkthrough videos for each brand chapter",
          "Do/don't examples for the 15 most common misuse cases",
          "Asset export scripts for common marketing deliverables",
          "6-month retainer agreed for ongoing brand governance",
        ],
      },
    ],
    outcomes: [
      {
        value: "280",
        label: "Component library",
        description: "Production-ready Figma components delivered",
      },
      {
        value: "120",
        label: "Brand guidelines",
        description: "Pages of documentation covering every touchpoint",
      },
      {
        value: "Series B",
        label: "Fundraising outcome",
        description: "Brand used in pitch deck — round closed 4 months later",
      },
      {
        value: "6mo",
        label: "Zero rebrand",
        description: "Brand system still in use 18 months later, no overhaul",
      },
    ],
    nextSlug: "financeflow",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project | undefined {
  const current = projects.find((p) => p.slug === slug);
  if (!current) return undefined;
  return projects.find((p) => p.slug === current.nextSlug);
}

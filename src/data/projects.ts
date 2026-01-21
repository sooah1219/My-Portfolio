// data/projects.ts
export type Project = {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  techStack: string[];
  summary: string;
  platform: "Web" | "Mobile";
};

export const projects: Project[] = [
  {
    id: "1",
    slug: "forge-career-explorer",
    title: "Forge – Career Exploration App",
    thumbnail: "/images/forge.png",
    techStack: [
      "React Native",
      "TypeScript",
      "Bun/Hono",
      "PostgreSQL",
      "Clerk",
    ],
    summary:
      "Mobile app that helps high school students explore trades careers using conversational AI, gamified pathways, and real data from SkilledTradesBC.",
    platform: "Mobile",
  },
  {
    id: "2",
    slug: "lenditout-marketplace",
    title: "LendItOut – Lending Marketplace",
    thumbnail: "/images/lenditout.png",
    techStack: ["React", "TypeScript", "Express", "MongoDB"],
    summary:
      "Web platform for lending and borrowing items in the community with listing management, categories, and search.",
    platform: "Mobile",
  },
  {
    id: "3",
    slug: "live-order-platform",
    title: "Live Order Platform for Tenton",
    thumbnail: "/images/order.png",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "AWS"],
    summary:
      "Internal order dashboard for a ramen & sushi restaurant, supporting real-time order tracking and smoother kitchen workflows.",
    platform: "Web",
  },
];

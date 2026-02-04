import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const platformEnum = pgEnum("platform_enum", ["Web", "Mobile"]);

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),

  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),

  thumbnail: text("thumbnail").notNull(),

  techStack: text("tech_stack").array().notNull(),
  summary: text("summary").notNull(),

  platform: platformEnum("platform").notNull(),

  developedAt: text("developed_at").notNull(),
  role: text("role").notNull(),
  contributions: text("contributions").notNull(),

  type: text("type").notNull(),
  liveUrl: text("live_url").notNull(),
  githubUrl: text("github_url").notNull(),

  images: text("images").array().notNull(),
  rationale: text("rationale"),
});

export type ProjectFromDB = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

import { db } from "@/db/client";
import type { ProjectFromDB } from "@/db/schema";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getProjects(): Promise<ProjectFromDB[]> {
  const rows = await db.select().from(projects).orderBy(projects.developedAt);
  return rows;
}

export async function getProjectBySlug(
  slug: string
): Promise<ProjectFromDB | null> {
  const rows = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1);

  return rows[0] ?? null;
}

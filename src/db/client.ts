// src/db/client.ts
import * as schema from "@/db/schema";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}
neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, { schema });
export * from "@/db/schema";

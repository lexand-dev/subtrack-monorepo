import { env } from "@subtrack/env/server";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";

export type DrizzleDB = typeof db;
export const db = drizzle(env.DATABASE_URL, { schema });

export * from "./schema";

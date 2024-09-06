import { ENV } from "@/lib/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  topics,
  topicsRelations,
  tweets,
  tweetsRelations,
  users,
} from "./schema";

export const dbSchema = {
  topics,
  topicsRelations,
  tweets,
  tweetsRelations,
  users,
};

const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
});

export const dbClient = drizzle(pool, {
  schema: dbSchema,
});

import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import * as schema from "./schema";
import ws from "ws";

export const getDb = (postgresUrl: string) => {
  neonConfig.webSocketConstructor = ws;
  // To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch
  neonConfig.poolQueryViaFetch = true;

  const sql = neon(postgresUrl);
  const db = drizzle({ client: sql, schema });
  return db;
};

export type Database = ReturnType<typeof getDb>;

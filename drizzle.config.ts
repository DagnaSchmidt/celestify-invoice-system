import dotenv from "dotenv";
import { defineConfig } from 'drizzle-kit';

dotenv.config({
  path: ".dev.vars",
});

export default defineConfig({
  out: './api/db/migrations',
  dialect: 'postgresql',
  schema: './api/db/schema/index.ts',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
    ssl: {
      rejectUnauthorized: false
    }
  },
});

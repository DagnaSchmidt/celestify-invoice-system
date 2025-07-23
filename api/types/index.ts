import { Database } from "../db";

export interface Bindings {
  ASSETS: Fetcher;
  OPEN_EXCHANGE_RATES_API_KEY: string;
}

export interface Variables {
  logger: {
    captureException: (e: unknown) => void;
  };
  db: Database;
}

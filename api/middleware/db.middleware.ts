import { Context, Next, MiddlewareHandler } from "hono";
import { getDb } from "../db";

export const dbMiddleware: MiddlewareHandler = async (
  c: Context,
  next: Next
) => {
  try {
    
    c.set("db", getDb(c.env.POSTGRES_URL!));
    
    return await next();
  } catch (error) {
    console.error(error);
  }
};

import { Hono } from "hono";
import { Bindings, Variables } from "./types";
import { dbMiddleware } from "./middleware/db.middleware";
import invoiceRoute from "./routes/invoiceRoute";

const app = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>().basePath("/api");

app.use(dbMiddleware);

app.route("/invoice", invoiceRoute);

export default {
  fetch: (request: Request, env: Bindings) => {
    const url = new URL(request.url);
    const path = url.pathname;

    // API routes go through the Hono app
    if (path.startsWith("/api/")) {
      return app.fetch(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};

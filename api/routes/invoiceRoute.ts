import { Hono } from "hono";
import { Bindings, Variables } from "../types";
import { eq } from "drizzle-orm";
import { invoices } from "../db/schema";

const invoiceRoute = new Hono<{ Bindings: Bindings, Variables: Variables }>();

invoiceRoute.get("/", async (c) => {
    const db = c.var.db;
    const invoiceItems = await db.query.invoices.findMany({
        with: {
            lineItems: true
        }
    });
    return c.json(invoiceItems);
});

invoiceRoute.get("/:id", async (c) => {
    const db = c.var.db;
    const invoice = await db.query.invoices.findFirst({
        where: eq(invoices.id, parseInt(c.req.param("id"))),
        with: {
            lineItems: true
        }
    });
    return c.json(invoice);
});

invoiceRoute.post("/", async (c) => {
    // TODO: Implement POST method
});

invoiceRoute.put("/:id", async (c) => {
    // TODO: Implement PUT method
});

invoiceRoute.delete("/:id", async (c) => {
    // TODO: Implement DELETE method
});

export default invoiceRoute;
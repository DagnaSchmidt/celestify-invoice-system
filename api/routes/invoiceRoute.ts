import { Hono } from "hono";
import { Bindings, Variables } from "../types";
import { eq } from "drizzle-orm";
import { invoices, lineItems, NewLineItem } from "../db/schema";
import { createInsertSchema } from "drizzle-zod";
import { ZodError } from "zod";

// Generate base schemas from Drizzle for validation
const invoiceInsertSchema = createInsertSchema(invoices).omit({ id: true });
const lineItemInsertSchema = createInsertSchema(lineItems).omit({ id: true });

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
    try {
        const db = c.var.db;

        // parse JSON body
        const body = await c.req.json();

        // validate request body data (only invoice)
        const { lineItems: incomingLineItems, ...invoiceData } = body;
        const validatedInvoice = invoiceInsertSchema.parse({ ...invoiceData, date: new Date(invoiceData.date) });

        // check line items
        if (incomingLineItems.length === 0) {
            return c.json({ message: 'Cannot create invoice without Line Items' }, 400);
        }

        // Insert invoice first (to get invoice id for line items)
        const [createdInvoice] = await db
            .insert(invoices)
            .values(validatedInvoice)
            .returning();

        // add invoiceId to line items
        const lineItemsToInsert = incomingLineItems.map((item: NewLineItem) => ({
            ...item,
            invoiceId: createdInvoice.id,
        }));

        // validate line items
        const validatedLineItems = lineItemsToInsert.map((item: NewLineItem) =>
            lineItemInsertSchema.parse(item)
        );

        // Insert line items
        await db.insert(lineItems).values(validatedLineItems);

        return c.json({ message: 'Invoice created!' }, 201);
    } catch (error) {
        if (error instanceof ZodError) {
            return c.json({ message: "Validation error", issues: error.errors }, 400);
        }

        if (error instanceof Error) {
            return c.json({ message: "Unexpected error", error: error.message }, 500);
        }

        return c.json({ message: "Unknown error" }, 500);
    }
});

invoiceRoute.put("/:id", async (c) => {
    try {
        const db = c.var.db;

        // validate invoice id
        const id = parseInt(c.req.param("id"));

        if (isNaN(id)) {
            return c.json({ message: "Invalid invoice ID" }, 400);
        }

        // check if invoice exists
        const existingInvoice = await db.query.invoices.findFirst({
            where: eq(invoices.id, id),
        });

        if (!existingInvoice) {
            return c.json({ message: "Invoice not found" }, 404);
        }

        // parse JSON body
        const body = await c.req.json();

        // validate request body data (only invoice)
        const { lineItems, ...invoiceData } = body;
        const validatedInvoice = invoiceInsertSchema.parse(invoiceData);

        // check line items
        if (lineItems.length === 0) {
            return c.json({ message: "Cannot update invoice without line items" }, 400);
        }

        // validate line items
        const validatedLineItems = lineItems.map((item: NewLineItem) =>
            lineItemInsertSchema.parse(item)
        );

        // Update invoice
        await db.update(invoices)
            .set(validatedInvoice)
            .where(eq(invoices.id, id));

        // Remove old line items
        await db.delete(lineItems).where(eq(lineItems.invoiceId, id));

        // Insert new line items with updated invoiceId
        const lineItemsToInsert = validatedLineItems.map((item: NewLineItem) => ({
            ...item,
            invoiceId: id,
        }));

        await db.insert(lineItems).values(lineItemsToInsert);

        return c.json({ message: "Invoice updated!" }, 200);
    } catch (error) {
        if (error instanceof ZodError) {
            return c.json({ message: "Validation error", issues: error.errors }, 400);
        }

        if (error instanceof Error) {
            return c.json({ message: "Unexpected error", error: error.message }, 500);
        }

        return c.json({ message: "Unknown error" }, 500);
    }
});

invoiceRoute.delete("/:id", async (c) => {
    try {
        const db = c.var.db;

        // validate invoice id
        const id = parseInt(c.req.param("id"));

        if (isNaN(id)) {
            return c.json({ message: "Invalid invoice ID" }, 400);
        }

        // check if invoice exists
        const existingInvoice = await db.query.invoices.findFirst({
            where: eq(invoices.id, id),
        });

        if (!existingInvoice) {
            return c.json({ message: "Invoice not found" }, 404);
        }

        // Delete the invoice (db supports cascade delete for line items)
        await db.delete(invoices).where(eq(invoices.id, id));

        return c.json({ message: "Invoice deleted successfully" }, 200);
    } catch (error) {
        if (error instanceof Error) {
            return c.json({ message: "Unexpected error", error: error.message }, 500);
        }
        return c.json({ message: "Unknown error" }, 500);
    }
});

export default invoiceRoute;

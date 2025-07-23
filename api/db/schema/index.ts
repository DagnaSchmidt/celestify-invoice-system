import {
  pgTable,
  text,
  timestamp,
  decimal,
  serial,
  integer,
} from "drizzle-orm/pg-core";
import { relations, type InferSelectModel } from "drizzle-orm";

// Invoice table schema
export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  customerDetails: text("customer_details").notNull(),
  date: timestamp("date", { withTimezone: true }).notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
});

// LineItem table schema
export const lineItems = pgTable("line_items", {
  id: serial("id").primaryKey(),
  invoiceId: integer("invoice_id").notNull().references(() => invoices.id, {
    onDelete: "cascade",
  }),
  description: text("description"),
  quantity: integer("quantity").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
});

// Relations
export const invoicesRelations = relations(invoices, ({ many }) => ({
  lineItems: many(lineItems),
}));

export const lineItemsRelations = relations(lineItems, ({ one }) => ({
  invoice: one(invoices, {
    fields: [lineItems.invoiceId],
    references: [invoices.id],
  }),
}));

// TypeScript types
export type Invoice = InferSelectModel<typeof invoices>;
export type LineItem = InferSelectModel<typeof lineItems>;

// Type for invoice with line items (used for API responses)
export type InvoiceWithLineItems = Invoice & {
  lineItems: LineItem[];
};

// Insert types for when creating new records
export type NewInvoice = typeof invoices.$inferInsert;
export type NewLineItem = typeof lineItems.$inferInsert; 
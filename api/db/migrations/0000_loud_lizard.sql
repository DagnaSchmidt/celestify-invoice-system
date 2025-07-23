CREATE TABLE "invoices" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_details" text NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"total_amount" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "line_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"invoice_id" integer NOT NULL,
	"description" text,
	"quantity" integer NOT NULL,
	"amount" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "line_items" ADD CONSTRAINT "line_items_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE cascade ON UPDATE no action;
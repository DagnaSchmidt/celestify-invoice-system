-- Seed data for invoices and line_items tables

-- Clear existing data (optional - uncomment if you want to reset data)
-- TRUNCATE TABLE line_items RESTART IDENTITY CASCADE;
-- TRUNCATE TABLE invoices RESTART IDENTITY CASCADE;

-- Insert sample invoices
INSERT INTO invoices (customer_details, date, total_amount) VALUES 
(
    'John Doe, 123 Elm Street, Springfield',
    CURRENT_TIMESTAMP - INTERVAL '10 days',
    150.00
),
(
    'Jane Smith, 456 Maple Street, Shelbyville', 
    CURRENT_TIMESTAMP - INTERVAL '5 days',
    200.00
);

-- Insert line items for the first invoice (John Doe)
INSERT INTO line_items (invoice_id, description, quantity, amount) VALUES 
(
    1, -- Assuming first invoice gets ID 1
    'Product A',
    2,
    50.00
),
(
    1, -- Same invoice
    'Product B', 
    1,
    50.00
);

-- Insert line items for the second invoice (Jane Smith)
INSERT INTO line_items (invoice_id, description, quantity, amount) VALUES 
(
    2, -- Assuming second invoice gets ID 2
    'Product C',
    2, 
    100.00
);

-- Verify the data was inserted correctly
SELECT 
    i.id as invoice_id,
    i.customer_details,
    i.date,
    i.total_amount,
    li.id as line_item_id,
    li.description,
    li.quantity,
    li.amount
FROM invoices i
LEFT JOIN line_items li ON i.id = li.invoice_id
ORDER BY i.id, li.id; 
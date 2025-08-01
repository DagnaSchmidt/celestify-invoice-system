# Invoice Manager App

I focused on delivering the core functionality with validation on both the frontend and backend.  
I used drizzle schemas (which were already provided) to ensure consistent validation rules.

This was my first time working with the **Hono backend framework**, so getting familiar with its routing and middleware patterns was the most challenging part of the task.

On the frontend, I used **Ant Design** components wherever possible for consistency and accessibility. Due to time constraints, I supplemented layout styling with **Tailwind CSS**, which I have experience with.

If given more time, the next thing I would implement is **state management using Redux Toolkit**, with feature-based slices (e.g. `auth`, `invoices`) and async API handling via `createAsyncThunk`.


## 📦 API Endpoints

### `POST /invoice/`

Creates a new invoice and its related line items.

- Validates the invoice data and each line item separately using `drizzle-zod` schemas.
- Returns an error if:
  - Invoice data or line items are invalid.
  - No line items are provided.
- Inserts the invoice first (to get the generated invoice ID), then inserts line items referencing that ID.

---

### `PUT /invoice/:id`

Updates an existing invoice and its line items.

- Validates invoice ID from URL parameters.
- Validates invoice data and each line item separately.
- Deletes all existing line items related to the invoice, then inserts the updated line items.
- Returns appropriate errors if:
  - Validation fails
  - Invoice ID is invalid
  - No line items are provided

---

### `DELETE /invoice/:id`

Deletes an invoice by ID.

- Validates invoice ID.
- Checks if the invoice exists.
- Deletes the invoice
- Returns errors if:
  - Invoice ID is invalid
  - Invoice does not exist

---

## Error Handling

- Uses `try/catch` blocks for both validation and runtime errors.
- Returns:
  - `400 Bad Request` for schema validation errors, with detailed issue messages.
  - `404 Not Found` if the invoice to update/delete does not exist.
  - `500 Internal Server Error` for unexpected server-side errors, with logged messages for debugging.

---

##  Validation

- Invoice and line items are validated **independently** using `createInsertSchema` from `drizzle-zod`.
- Ensures that every invoice **must have at least one line item** during creation or update.
- Client-side form validation also mirrors these rules for a smoother UX.

---

##  Frontend Implementation

### Invoice List Page

#### Invoice Table with Actions

- Built using Ant Design’s `<Table>` component.
- Columns include: Invoice ID, Customer Details, Date, and Total Amount.
- Action column includes:
  - **View** – navigates to the invoice detail page
  - **Edit** – opens the edit invoice page
  - **Delete** – triggers a confirmation modal

#### Deletion Flow

- Uses Ant Design’s `Modal.confirm` before calling `DELETE /invoice/:id`.
- Upon success:
  - Refreshes the table
  - Shows a success message via `message.success()`
- On error:
  - Displays error with `message.error()`

#### Loading & Errors

- Uses Ant Design’s `<Spin>` component for loading state.
- Displays user-friendly messages when data fetching fails.

---

### Create Invoice Page

#### 1. Form Layout

- Built using Ant Design’s `<Form>` component.
- Inputs for:
  - Customer Details (text input)
- **Total Amount** is calculated from line items automatically.

#### 2. Dynamic Line Items

- Managed via Ant Design’s `Form.List`
- Each item includes:
  - **Description** (`<Input>`)
  - **Quantity** (`<InputNumber>`)
  - **Price** (`<InputNumber>`)
  - **Delete Button** (`<MinusCircleOutlined>`)

#### 3. Validation Rules

- Required fields enforced
- Quantity must be greater than 0
- Price must be greater than 0
- Description must not be empty

#### 4. Form Submission

- On submit:
  - Validates form client-side
  - Sends `POST` request to `/invoice`
- Shows feedback using:
  - `message.success()` on success
  - `message.error()` and inline messages on error

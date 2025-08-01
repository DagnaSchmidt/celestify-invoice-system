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

## ⚠️ Error Handling

- Uses `try/catch` blocks for both validation and runtime errors.
- Returns:
  - `400 Bad Request` for schema validation errors, with detailed issue messages.
  - `404 Not Found` if the invoice to update/delete does not exist.
  - `500 Internal Server Error` for unexpected server-side errors, with logged messages for debugging.

---

## ✅ Validation

- Invoice and line items are validated **independently** using `createInsertSchema` from `drizzle-zod`.
- Ensures that every invoice **must have at least one line item** during creation or update.
- Client-side form validation also mirrors these rules for a smoother UX.

---

## 💻 Frontend Implementation

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









# Full Stack TypeScript Developer Coding Test

Your task is to complete the features for a basic invoice management system using a Hono for the backend and a React application for the frontend.

## Background

You have been provided with a starter Visual Studio solution that contains:
- A neon postgres database with an `invoices` and `line_items` table.
- Drizzle ORM for database operations.
- A Hono backend with an `invoice` route, containing 2 basic `GET` methods.
- A React app in the `src` directory, set up with:
  - essential libraries including reactstrap and [antd](https://4x.ant.design/components/overview/).
  - an invoice list page.
  - an invoice detail page.
  - a blank page for creating/editing invoices.

Start by opening the project in VS Code.

For environment variables, we will use a file called `.dev.vars`
It is exactly the same as a `.env` file, but named differently for Cloudflare Workers, which we are using for this project.
Simply copy `.dev.vars.example` to `.dev.vars` and fill in the env vars with your provided credentials.

Now you can install the dependencies and run the app.

```bash
npm install
npm run dev
```

This will start the app, which you can open in your browser at `http://localhost:5173`.

## Task Breakdown

### Backend:

1. **Expand the Invoice Route**:
   - Add a `POST` method to create a new `invoice` with its `line_items`.
   - Add a `PUT` method to update an existing `invoice` and its `line_items`.
   - Add a `DELETE` method to remove an invoice.

2. **Error Handling**:
   - Implement error handling for edge cases.

### Frontend:

1. **List Invoices Page**:
   - Enhance the invoice list with action buttons for each invoice: "View", "Edit" and "Delete".
   - Implement the "Delete" functionality.

2. **Create/Edit Invoice Page**:
   - Design and implement a unified form to either create a new `Invoice` and its `LineItems` or edit an existing one.
   - If editing, prepopulate the form with the invoice details.
   - Validate the form inputs, e.g., ensure non-negative numbers.
   - Implement the form submission, saving the invoice via the backend API.

3. **UI/UX**:
   - Improve the overall look and feel of the View Invoice page using the provided UI libraries.
   - Prioritize using antd components, especially for form-related tasks.
   - Ensure responsiveness and user-friendly feedback.

### Optional/Bonus Features:

1. **Backend and Frontend Testing**:
   - Add unit tests for API endpoints and React components.

2. **Advanced UI Features**:
   - Implement search or filter for the invoices list.

3. **Additional Validations**:
   - Add backend validation, e.g., a total invoice limit.

## Code Guidelines

Your solution should use:
- Hono for the backend. (see [Hono](https://hono.dev/docs/api/routing))
- TypeScript for React development.
- axios or fetch for API calls.
- Prioritise the use of antd components, especially for forms. If unfamiliar with antd forms, formik or react-hook-form are acceptable.
- Avoid using inline css for styling, instead use reactstrap and antd wherever possible.
- React Router for navigation.
- (Optional) Demonstrate your knowledge in state management using zustand or another state management library of your choice.

## Notes

- Prioritise core functionalities first before diving into optional/bonus features.
- This test aims to evaluate your coding skills, architecture decisions, code readability, and general best practices.
- It's okay if you don't finish everything. Focus on quality over quantity.


## Evaluation Criteria:

- **Functionality**: Does the app perform CRUD operations as expected?
  
- **Backend Best Practices**: Are the API endpoints structured well, with proper status codes, validation, and error handling?

- **Code Quality**: Is the code modular, organized, and adhering to best practices for both backend and frontend?

- **State Management**: How efficiently is the state managed in the React application?

- **Error Handling**: How does the app behave during unexpected scenarios, both in the frontend and backend?

- **Data Validity**: How are data integrity and consistency maintained, especially with operations on `line_items` related to an `invoice`?

- **UI/UX**: Consideration for user experience and design, especially with the forms and list views. 

- **Bonus/Advanced Features**: While not required, any added features or improvements showcase a deep understanding and go beyond the base requirements.

## Rules:

- Dedicate no more than 4-8 hours to this task.
  
- Your primary objective is to implement core functionalities. Focus on those before diving into optional or bonus features.

- If you are unfamiliar with a specific library or tool mentioned, you are free to use an alternative you are comfortable with. However, please justify this choice in your notes or README.

- Commit your code to a new GitHub repository and share the link with us for review. Ensure that the README provides necessary setup instructions, any challenges faced, decisions made, and any other notes you'd like to include.

---

Best of luck! We're excited to see your solution.

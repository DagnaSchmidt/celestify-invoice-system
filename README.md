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
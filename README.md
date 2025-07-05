# Library Management System

A modern frontend application for managing library books, built with React, TypeScript, Redux Toolkit (RTK Query), Tailwind CSS, and ShadCN UI.

## Live Link
https://library-client-ten.vercel.app/

## Features
- **Book Management**: View, create, edit, and delete books (Title, Author, Genre, ISBN, Copies, Availability) with form validation and confirmation dialogs.
- **Borrow Books**: Form to borrow books with quantity and due date, auto-updating availability (prevents over-borrowing).
- **Borrow Summary**: Displays borrowed books with Title, ISBN, and Total Quantity Borrowed.

## Technologies
- **Frontend**: React, TypeScript
- **State Management**: Redux Toolkit, RTK Query
- **Styling**: Tailwind CSS, ShadCN UI
- **Form Validation**: React Hook Form, Zod
- **Toasts**: react-hot-toast
- **Backend API**: Node.js, Express, MongoDB (Mongoose)

## Project Structure
```
src/
├── components/      # Shared UI components (ShadCN UI)
├── pages/           # Pages (Books, Create, Edit, Borrow, Summary)
├── redux/           # Redux store and slices
│   └── api/         # RTK Query endpoints (bookApi)
├── routes/          # React Router routes
├── App.tsx          # Layout wrapper with navbar/footer
└── main.tsx         # Root entry
```

## Setup
1. Clone the repository:
   ```bash
   https://github.com/naeemul-online/library-management-client.git
   cd library-management-client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Ensure the backend server (Node.js, Express, MongoDB) is running at the correct base URL.

## Routes
| Path                | Description                     |
|---------------------|---------------------------------|
| `/books`            | List all books (default)        |
| `/create-book`      | Create a new book               |
| `/edit-book/:id`    | Edit a book                     |
| `/borrow-book/:id`  | Borrow a book                   |
| `/borrow-summery`   | View borrowed books summary     |

## Inspiration
- **BookLovers Theme**: Structure
- **PrintPress Theme**: Layout
No copyrighted assets used.

## GitHub Topics
- react
- typescript
- redux-toolkit
- library-system
- tailwindcss
- shadcn-ui
- rtk-query
- crud-app

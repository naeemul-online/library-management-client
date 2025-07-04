import App from "@/App";
import BookListPage from "@/pages/BookListPage";
import BorrowBookPage from "@/pages/BorrowBookPage";
import BorrowSummery from "@/pages/BorrowSummery";
import CreateBookPage from "@/pages/CreateBookPage";
import EditBookPage from "@/pages/EditBookPage";
import ErrorPage from "@/pages/ErrorPage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: BookListPage,
      },
      {
        path: "books",
        Component: BookListPage,
      },
      {
        path: "create-book",
        Component: CreateBookPage,
      },
      {
        path: "edit-book/:id",
        Component: EditBookPage,
      },
      {
        path: "borrow-book/:id",
        Component: BorrowBookPage,
      },

      {
        path: "borrow-summery",
        Component: BorrowSummery,
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);

export default router;

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/bookApi";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function BookListPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmed) return;
    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete book");
    }
  };
  
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to fetch books</p>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((book: any) => (
              <TableRow key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell>{book.available ? "Yes" : "No"}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/edit-book/${book._id}`)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => navigate(`/borrow-book/${book._id}`)}
                  >
                    Borrow
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

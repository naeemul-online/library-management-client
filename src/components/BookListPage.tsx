import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/bookApi";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Badge } from "./ui/badge";
import { Book, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function BookListPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = (id: string) => {
    toast.custom((t) => (
      <div className="shadow-lg bg-background text-foreground rounded-lg p-4 flex items-center ju space-x-4 border">
        <div className="flex-1">
          <p className="text-sm font-medium">
            Are you sure you want to delete this book?
          </p>
          <div className="mt-2 flex space-x-2">
            <Button
              className="cursor-pointer"
              variant="destructive"
              size="sm"
              onClick={async () => {
                try {
                  await deleteBook(id).unwrap();
                  toast.dismiss(t.id);
                  toast.success("Book deleted successfully");
                } catch (err: any) {
                  toast.dismiss(t.id);
                  toast.error(err?.data?.message || "Failed to delete book");
                }
              }}
            >
              Yes
            </Button>
            <Button
              className="cursor-pointer"
              variant="outline"
              size="sm"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    ));
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to fetch books</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden min-h-screen pt-24 pb-12 bg-background text-foreground"
    >
      <section className="py-20 bg-background text-foreground" id="book-list">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              📚 Our Book Collection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse through our growing library of books across various genres.
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <div className="rounded-xl overflow-hidden border border-border shadow-sm">
              {/* Table Header */}
              <div className="grid grid-cols-8 gap-4 px-6 py-4 bg-muted font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                <div>Serial</div>
                <div>Title</div>
                <div>Author</div>
                <div>Genre</div>
                <div>ISBN</div>
                <div>Copies</div>
                <div>Available</div>
                <div>Actions</div>
              </div>

              {/* Table Body */}
              {data?.data.map((book: any, index: number) => (
                <div
                  key={book._id}
                  className={cn(
                    "grid grid-cols-8 gap-4 px-6 py-4 border-t border-border",
                    index % 2 === 1 ? "bg-muted/50" : ""
                  )}
                >
                  <div className="font-medium">{index + 1}</div>
                  <div className="font-medium">{book.title}</div>
                  <div>{book.author}</div>
                  <div>
                    <Badge variant="secondary" className="text-xs">
                      {book.genre}
                    </Badge>
                  </div>
                  <div className="text-sm">{book.isbn}</div>
                  <div>{book.copies}</div>
                  <div>
                    <Badge
                      variant={book.available ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {book.available ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigate(`/edit-book/${book._id}`)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(book._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      onClick={() => navigate(`/borrow-book/${book._id}`)}
                      disabled={!book.available}
                    >
                      <Book className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden grid gap-6 sm:grid-cols-2 mt-6">
            {data?.data.map((book: any) => (
              <Card
                key={book._id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-lg">{book.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    by {book.author}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <Badge variant="secondary">{book.genre}</Badge>
                    <Badge variant={book.available ? "default" : "destructive"}>
                      {book.available ? "Available" : "Borrowed"}
                    </Badge>
                  </div>
                  <p>ISBN: {book.isbn}</p>
                  <p>Copies: {book.copies}</p>
                  <div className="flex gap-2 pt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => navigate(`/edit-book/${book._id}`)}
                    >
                      <Edit className="w-4 h-4 mr-1" /> Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(book._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => navigate(`/borrow-book/${book._id}`)}
                      disabled={!book.available}
                    >
                      <Book className="w-4 h-4 mr-1" /> Borrow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {data?.data?.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">No books found</h3>
              <p>Start by adding some books to your library.</p>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}

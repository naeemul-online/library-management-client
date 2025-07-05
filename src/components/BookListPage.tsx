import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/bookApi";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Badge } from "./ui/badge";
import { Book, Edit, Trash2 } from "lucide-react";

export default function BookListPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();

  // const handleDelete = async (id: string) => {
  //   const confirmed = window.confirm(
  //     "Are you sure you want to delete this book?"
  //   );
  //   if (!confirmed) return;
  //   try {
  //     await deleteBook(id).unwrap();
  //     toast.success("Book deleted successfully");
  //   } catch (error: any) {
  //     toast.error(error?.data?.message || "Failed to delete book");
  //   }
  // };

  const handleDelete = (id: string) => {
    toast.custom((t) => (
      <div className="bg-white shadow-lg rounded-lg p-4 flex items-center ju space-x-4 border">
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
    <div className="container mx-auto p-4">
      <section className="py-16 " id="book-list">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold  mb-4">
              Our Book Collection
            </h2>
            <p className="text-lg  max-w-2xl mx-auto">
              Browse through our extensive collection of books across various
              genres
            </p>
          </div>

          {/* Desktop Grid View */}
          <div className="hidden lg:block">
            <div className=" rounded-lg shadow-sm overflow-hidden">
              <div className="grid grid-cols-7 gap-4 p-4  font-semibold  text-sm">
                <div>Title</div>
                <div>Author</div>
                <div>Genre</div>
                <div>ISBN</div>
                <div>Copies</div>
                <div>Available</div>
                <div>Actions</div>
              </div>
              {data?.data.map((book: any) => (
                <div
                  key={book._id}
                  className="grid grid-cols-7 gap-4 p-4 border-b border-gray-100 hover: transition-colors"
                >
                  <div className="font-medium ">{book.title}</div>
                  <div className="">{book.author}</div>
                  <div>
                    <Badge variant="secondary" className="text-xs">
                      {book.genre}
                    </Badge>
                  </div>
                  <div className=" text-sm">{book.isbn}</div>
                  <div className="">{book.copies}</div>
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
                      size="sm"
                      onClick={() => navigate(`/edit-book/${book._id}`)}
                      className="p-2"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(book._id)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => navigate(`/borrow-book/${book._id}`)}
                      disabled={!book.available}
                      className="p-2"
                    >
                      <Book className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden grid gap-6 sm:grid-cols-2">
            {data?.data.map((book: any) => (
              <Card
                key={book._id}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg leading-tight">
                    {book.title}
                  </CardTitle>
                  <p className="">by {book.author}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">{book.genre}</Badge>
                      <Badge
                        variant={book.available ? "default" : "destructive"}
                      >
                        {book.available ? "Available" : "Borrowed"}
                      </Badge>
                    </div>
                    <div className="text-sm ">
                      <p>ISBN: {book.isbn}</p>
                      <p>Copies: {book.copies}</p>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/edit-book/${book._id}`)}
                        className="flex-1"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(book._id)}
                        className="flex-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => navigate(`/borrow-book/${book._id}`)}
                        disabled={!book.available}
                        className="flex-1"
                      >
                        <Book className="w-4 h-4 mr-2" />
                        Borrow
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {data?.data.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold  mb-2">No books found</h3>
              <p className="">Start by adding some books to your library</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

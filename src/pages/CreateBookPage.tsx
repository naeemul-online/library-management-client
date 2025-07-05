import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBookMutation } from "@/redux/api/bookApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.enum([
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ]),
  isbn: z.string().min(10, "ISBN is required"),
  description: z.string().optional(),
  copies: z.coerce
    .number()
    .int("Must be an integer")
    .min(0, "Copies cannot be empty"),
});

type BookFormValues = z.infer<typeof bookSchema>;

export default function CreateBookPage() {
  const [createBook] = useCreateBookMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "FICTION",
      isbn: "",
      description: "",
      copies: 1,
    },
  });

  const onSubmit = async (data: BookFormValues) => {
    const bookData = {
      ...data,
      available: data.copies > 0,
    };
    try {
      await createBook(bookData).unwrap();
      toast.success("Book created successfully");
      reset(); // Reset form
      navigate("/books"); // Go to list
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create book");
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen pt-20 pb-8">
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-semibold text-foreground">Add New Book</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              {...register("author", { required: "Author is required" })}
            />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author.message}</p>
            )}
          </div>

          <div>
            <Label>Genre</Label>
            <select {...register("genre")} className="border px-2 py-1 w-full">
              <option value="">Select a genre</option>
              <option value="FICTION">FICTION</option>
              <option value="NON_FICTION">NON_FICTION</option>
              <option value="SCIENCE">SCIENCE</option>
              <option value="HISTORY">HISTORY</option>
              <option value="BIOGRAPHY">BIOGRAPHY</option>
              <option value="FANTASY">FANTASY</option>
            </select>
            <p className="text-red-500 text-sm">{errors.genre?.message}</p>
            <input
              type="hidden"
              {...register("genre", { required: "Genre is required" })}
            />
            {errors.genre && (
              <p className="text-red-500 text-sm">{errors.genre.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="isbn">ISBN</Label>
            <Input
              id="isbn"
              {...register("isbn", { required: "ISBN is required" })}
            />
            {errors.isbn && (
              <p className="text-red-500 text-sm">{errors.isbn.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Enter book description (optional)"
            />
          </div>

          <div>
            <Label htmlFor="copies">Copies</Label>
            <Input
              id="copies"
              type="number"
              min="1"
              {...register("copies", {
                required: "Number of copies is required",
                min: { value: 1, message: "Copies must be at least 1" },
              })}
            />
            {errors.copies && (
              <p className="text-red-500 text-sm">{errors.copies.message}</p>
            )}
          </div>

          <div className="flex gap-4">
            <Button type="submit">Add Book</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

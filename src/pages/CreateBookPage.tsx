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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

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
    setValue,
    reset,
    watch,
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden min-h-screen pt-24 pb-12 bg-background text-foreground"
    >
      <div className="relative overflow-hidden min-h-screen  pb-12 bg-background text-foreground">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6">📘 Add New Book</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} />
              {errors.title && (
                <p className="text-sm text-destructive mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Author */}
            <div>
              <Label htmlFor="author">Author</Label>
              <Input id="author" {...register("author")} />
              {errors.author && (
                <p className="text-sm text-destructive mt-1">
                  {errors.author.message}
                </p>
              )}
            </div>

            {/* Genre */}
            <div>
              <Label>Genre</Label>
              <Select
                onValueChange={(value: any) => setValue("genre", value)}
                defaultValue={watch("genre")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FICTION">FICTION</SelectItem>
                  <SelectItem value="NON_FICTION">NON FICTION</SelectItem>
                  <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                  <SelectItem value="HISTORY">HISTORY</SelectItem>
                  <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                  <SelectItem value="FANTASY">FANTASY</SelectItem>
                </SelectContent>
              </Select>
              {errors.genre && (
                <p className="text-sm text-destructive mt-1">
                  {errors.genre.message}
                </p>
              )}
            </div>

            {/* ISBN */}
            <div>
              <Label htmlFor="isbn">ISBN</Label>
              <Input id="isbn" {...register("isbn")} />
              {errors.isbn && (
                <p className="text-sm text-destructive mt-1">
                  {errors.isbn.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter book description (optional)"
                {...register("description")}
              />
            </div>

            {/* Copies */}
            <div>
              <Label htmlFor="copies">Copies</Label>
              <Input
                id="copies"
                type="number"
                min={1}
                {...register("copies", {
                  required: "Number of copies is required",
                  min: { value: 1, message: "Copies must be at least 1" },
                })}
              />
              {errors.copies && (
                <p className="text-sm text-destructive mt-1">
                  {errors.copies.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-end">
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
    </motion.div>
  );
}

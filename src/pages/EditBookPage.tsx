import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "@/redux/api/bookApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

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
  const { id } = useParams();
  const { data } = useGetBookByIdQuery(id!);
  const [updateBook] = useUpdateBookMutation();
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

  useEffect(() => {
    if (data?.data) {
      reset(data.data);
    }
  }, [data, reset]);

  const onSubmit = async (formData: BookFormValues) => {
    try {
      await updateBook({
        id,
        ...formData,
        available: formData.copies > 0,
      }).unwrap();
      toast.success("Book updated successfully");
      navigate("/books");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update book");
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen pt-20 pb-8">
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-semibold">Update Book</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input {...register("title")} />
            <p className="text-red-500 text-sm">{errors.title?.message}</p>
          </div>

          <div>
            <Label>Author</Label>
            <Input {...register("author")} />
            <p className="text-red-500 text-sm">{errors.author?.message}</p>
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
          </div>

          <div>
            <Label>ISBN</Label>
            <Input {...register("isbn")} />
            <p className="text-red-500 text-sm">{errors.isbn?.message}</p>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea {...register("description")} />
          </div>

          <div>
            <Label>Copies</Label>
            <Input type="number" {...register("copies")} />
            <p className="text-red-500 text-sm">{errors.copies?.message}</p>
          </div>
          <div className="flex gap-1">
            <Button type="submit">Update Book</Button>
            <Button onClick={() => navigate("/")}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

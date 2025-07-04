import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddBorrowMutation, useGetBookByIdQuery } from "@/redux/api/bookApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import z from "zod";

// Zod schema for validation
const borrowSchema = z.object({
  quantity: z.coerce.number().int().min(1, "Minimum 1 book required"),
  dueDate: z.string().refine((date) => {
    return new Date(date) > new Date();
  }, "Due date must be in the future"),
});

type BorrowFormValues = z.infer<typeof borrowSchema>;

const BorrowBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: bookData, isLoading } = useGetBookByIdQuery(id || "");
  const [addBorrow] = useAddBorrowMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BorrowFormValues>({
    resolver: zodResolver(borrowSchema),
  });

  const onSubmit = async (values: BorrowFormValues) => {
    if (!bookData?.data) return;

    if (values.quantity > bookData.data.copies) {
      toast.error(`Only ${bookData.data.copies} copies available`);
      return;
    }

    const payload = {
      book: bookData.data._id,
      quantity: values.quantity,
      dueDate: values.dueDate,
    };
    console.log(payload)

    try {
      await addBorrow(payload).unwrap();
      toast.success("Book borrowed successfully");
      navigate("/borrow-summery");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to borrow book");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  const book = bookData?.data;

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">Borrow: {book?.title}</h1>
      <p className="text-sm text-gray-600">Available Copies: {book?.copies}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Quantity</Label>
          <Input type="number" {...register("quantity")} />
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity.message}</p>
          )}
        </div>

        <div>
          <Label>Due Date</Label>
          <Input type="date" {...register("dueDate")} />
          {errors.dueDate && (
            <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
          )}
        </div>

        <Button type="submit">Confirm Borrow</Button>
      </form>
    </div>
  );
};

export default BorrowBookPage;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddBorrowMutation, useGetBookByIdQuery } from "@/redux/api/bookApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import z from "zod";
import { motion } from "framer-motion";

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
    console.log(payload);

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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden min-h-screen pt-24 pb-12 bg-background text-foreground"
    >
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 bg-card border border-border shadow-lg rounded-xl p-6 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Borrow: {book?.title}</h1>
          <p className="text-muted-foreground text-sm">
            Available Copies:{" "}
            <span className="font-medium">{book?.copies}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Quantity */}
          <div>
            <Label>Quantity</Label>
            <Input type="number" min={1} {...register("quantity")} />
            {errors.quantity && (
              <p className="text-destructive text-sm mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>

          {/* Due Date */}
          <div>
            <Label>Due Date</Label>
            <Input type="date" {...register("dueDate")} />
            {errors.dueDate && (
              <p className="text-destructive text-sm mt-1">
                {errors.dueDate.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Confirm Borrow
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default BorrowBookPage;

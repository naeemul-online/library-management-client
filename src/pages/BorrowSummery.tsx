import { useBorrowBooksQuery} from "@/redux/api/bookApi";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { UndoIcon } from "lucide-react";

export default function BorrowSummery() {
  const { data, isLoading, isError } = useBorrowBooksQuery(UndoIcon)

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to fetch borrow summary</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Borrow Summary</h1>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Total Borrowed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((entry: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{entry.book?.title || "N/A"}</TableCell>
                <TableCell>{entry.book?.isbn || "N/A"}</TableCell>
                <TableCell>{entry.totalQuantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

import { useBorrowBooksQuery } from "@/redux/api/bookApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UndoIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function BorrowSummery() {
  const { data, isLoading, isError } = useBorrowBooksQuery(UndoIcon);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to fetch borrow summary</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden min-h-screen pt-24 pb-12 bg-background text-foreground"
    >
      <section className="py-20 bg-background text-foreground min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              📖 Borrow Summary
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A snapshot of all borrowed books and their total borrow count.
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block">
            <div className="rounded-xl overflow-hidden border border-border shadow-sm">
              {/* Table Header */}
              <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-muted font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                <div>Serial</div>
                <div>Title</div>
                <div>ISBN</div>
                <div>Total Borrowed</div>
              </div>

              {/* Table Body */}
              {data?.data?.map((entry: any, index: number) => (
                <div
                  key={index}
                  className={`grid grid-cols-4 gap-4 px-6 py-4 border-t border-border ${
                    index % 2 === 1 ? "bg-muted/50" : ""
                  }`}
                >
                  <div className="font-medium">{index + 1}</div>
                  <div className="font-medium">
                    {entry.book?.title || "N/A"}
                  </div>
                  <div className="text-sm">{entry.book?.isbn || "N/A"}</div>
                  <div>{entry.totalQuantity}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden grid gap-6 sm:grid-cols-2 mt-6">
            {data?.data?.map((entry: any, index: number) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {entry.book?.title || "Untitled"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    <strong>ISBN:</strong> {entry.book?.isbn || "N/A"}
                  </p>
                  <p>
                    <strong>Total Borrowed:</strong> {entry.totalQuantity}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {data?.data?.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold mb-2">No borrow records</h3>
              <p>Borrowed books will appear here when available.</p>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}

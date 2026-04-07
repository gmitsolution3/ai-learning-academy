import { Button } from "@/components/ui/button";
import { RefreshCw, Package, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';

export default function AllCategoryEmpty({
  refetch,
}: {
  refetch: () => void;
}) {
  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Package className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            No categories found
          </h3>
          <p className="text-muted-foreground text-center mb-4">
            There are no categories available at the moment.
          </p>
          <div className="flex gap-2">
            <Button onClick={() => refetch()} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button asChild>
              <Link href="/categories/create">
                <Plus className="mr-2 h-4 w-4" />
                Create New Category
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

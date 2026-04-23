import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";

export default function BatchManagementError({ refetch }: { refetch: () => void }) {
  return (
    <section className="container mx-auto py-10 px-4 lg:px-0">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="flex flex-col items-center text-center max-w-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
              <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Failed to Load Batches</h3>
            <p className="text-muted-foreground mb-6">
              There was an error loading the batch data. This could be due to a network issue or the server might be unavailable.
            </p>
            <Button onClick={() => refetch()} className="gap-2 p-5">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
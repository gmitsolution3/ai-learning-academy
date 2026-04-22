import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";

interface BatchManagementEmptyProps {
  refetch: () => void;
  onOpenChange: (open: boolean) => void;
}

export default function BatchManagementEmpty({
  refetch,
  onOpenChange,
}: BatchManagementEmptyProps) {
  return (
    <section className="container mx-auto py-10 px-4 lg:px-0">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="flex flex-col items-center text-center max-w-md">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Batches Found</h3>
            <p className="text-muted-foreground mb-2">
              You haven't created any batches yet.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Create your first batch to start managing course enrollments.
            </p>
            <div className="flex gap-3">
              <Button onClick={() => refetch()} variant="outline" className="p-5">
                Refresh
              </Button>
              <Button onClick={() => onOpenChange(true)} className="gap-2 p-5">
                <Plus className="h-4 w-4" />
                Create First Batch
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
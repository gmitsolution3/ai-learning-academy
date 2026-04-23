import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen, Plus } from "lucide-react";

interface ModuleManagementEmptyProps {
  refetch: () => void;
  onOpenChange: (open: boolean) => void;
  courseId: string;
}

export default function ModuleManagementEmpty({
  refetch,
  onOpenChange,
  courseId,
}: ModuleManagementEmptyProps) {
  return (
    <section className="container mx-auto py-10 px-4 lg:px-0">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="flex flex-col items-center text-center max-w-md">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <FolderOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              No Modules Found
            </h3>
            <p className="text-muted-foreground mb-2">
              This course doesn't have any modules yet.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Course ID: <code className="text-xs">{courseId}</code>
            </p>
            <div className="flex gap-3">
              <Button onClick={() => refetch()} variant="outline" className="p-5">
                Refresh
              </Button>
              <Button
                onClick={() => onOpenChange(true)}
                className="gap-2 p-5"
              >
                <Plus className="h-4 w-4" />
                Create First Module
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

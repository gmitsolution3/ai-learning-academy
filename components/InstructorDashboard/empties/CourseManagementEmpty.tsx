import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function CourseManagementEmpty({
  refetch,
  onOpenChange,
}: {
  refetch: () => void;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">
              No courses found
            </h3>
            <p className="text-muted-foreground mb-4">
              There are no courses available. Create your first course
              to get started.
            </p>
            <div className="flex gap-2">

            <Button onClick={() => refetch()} variant="outline" className="p-5">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button
              className="gap-2 p-5"
              onClick={() => onOpenChange(true)}
            >
              <Plus className="h-4 w-4" />
              Create New Course
            </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

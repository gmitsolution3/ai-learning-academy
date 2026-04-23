import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import Link from "next/link";

interface LessonManagementEmptyProps {
  refetch: () => void;
  moduleId: string;
}

export default function LessonManagementEmpty({
  refetch,
  moduleId,
}: LessonManagementEmptyProps) {
  return (
    <section className="container mx-auto py-10 px-4 lg:px-0">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="flex flex-col items-center text-center max-w-md">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Lessons Found</h3>
            <p className="text-muted-foreground mb-2">
              This module doesn't have any lessons yet.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Module ID: <code className="text-xs">{moduleId}</code>
            </p>
            <div className="flex gap-3">
              <Button onClick={() => refetch()} variant="outline" className="p-5">
                Refresh
              </Button>
              <Button asChild className="gap-2 p-5">
                <Link
                  href={`/admin-dashboard/lesson-management/${moduleId}/create-lesson`}
                >
                  <Plus className="h-4 w-4" />
                  Create New Lesson
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
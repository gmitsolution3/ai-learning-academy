import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function CourseManagementEmpty({
  refetch,
}: {
  refetch: () => void;
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
            <Button onClick={() => refetch()} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

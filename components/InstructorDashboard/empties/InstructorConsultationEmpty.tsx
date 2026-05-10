import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, MessageSquare } from "lucide-react";

export default function InstructorConsultationEmpty({ refetch }: { refetch: () => void }) {
  return (
    <section className="container mx-auto py-10 px-4 lg:px-0">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="flex flex-col items-center text-center max-w-md">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Consultations Assigned</h3>
            <p className="text-muted-foreground mb-2">
              You don't have any consultation requests at the moment.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              When students request consultations and are assigned to you, they will appear here.
            </p>
            <Button onClick={() => refetch()} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
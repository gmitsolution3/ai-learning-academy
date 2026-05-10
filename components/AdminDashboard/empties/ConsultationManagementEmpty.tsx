import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, MessageSquare } from "lucide-react";

interface ConsultationManagementEmptyProps {
  refetch: () => void;
}

export default function ConsultationManagementEmpty({
  refetch,
}: ConsultationManagementEmptyProps) {
  return (
    <section className="container mx-auto py-10 px-4 lg:px-0">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="flex flex-col items-center text-center max-w-md">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Consultations Found</h3>
            <p className="text-muted-foreground mb-2">
              There are no consultation requests yet.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              When students request consultations, they will appear here.
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
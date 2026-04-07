import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { RefreshCw, AlertCircle } from "lucide-react";

export default function AllCategoryError({
  refetch,
}: {
  refetch: () => void;
}) {
  return (
    <div className="container mx-auto py-10 px-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          <span>Failed to load categories. Please try again.</span>
          <Button
            onClick={() => refetch()}
            variant="outline"
            size="sm"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}

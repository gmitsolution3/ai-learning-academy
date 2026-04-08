import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function UserManagementError({
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
              Failed to load users
            </h3>
            <p className="text-muted-foreground mb-4">
              There was an error loading the user data. Please try
              again.
            </p>
            <Button onClick={() => refetch()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

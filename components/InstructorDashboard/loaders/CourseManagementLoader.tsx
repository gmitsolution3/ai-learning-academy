import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function CourseManagementLoader() {
  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div className="h-8 w-48 bg-muted animate-pulse rounded" />
            <div className="h-10 w-32 bg-muted animate-pulse rounded" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-10 w-full bg-muted animate-pulse rounded" />
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 w-full bg-muted animate-pulse rounded"
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

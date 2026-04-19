import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ModuleManagementLoader() {
  return (
    <section className="container mx-auto py-10 px-4 lg:px-0">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-64 mt-1" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Create Button Row */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Skeleton className="h-12 w-full" />
            </div>
            <Skeleton className="h-12 w-40" />
          </div>

          {/* Table Header */}
          <div className="rounded-md border">
            <div className="p-4 border-b">
              <div className="flex gap-4">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="p-4">
                  <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-6 w-12" />
                    </div>
                    <div className="flex-1">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-3 w-64 mt-1" />
                    </div>
                    <Skeleton className="h-6 w-24" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
            <Skeleton className="h-5 w-48" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

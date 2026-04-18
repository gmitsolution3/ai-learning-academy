import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ProfileSkeletonLoader() {
  return (
    <Card className="border-white/10 bg-black/40 backdrop-blur-xl shadow-xl animate-pulse">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 w-32 bg-white/10 rounded"></div>
          <div className="h-4 w-48 bg-white/10 rounded"></div>
        </div>
        <div className="h-10 w-32 bg-white/10 rounded-full"></div>
      </CardHeader>
      <Separator className="bg-white/10" />
      <CardContent className="pt-6">
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-white/10 rounded"></div>
                  <div className="h-3 w-20 bg-white/10 rounded"></div>
                </div>
                <div className="h-4 w-full bg-white/10 rounded ml-6"></div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-white/10 rounded"></div>
              <div className="h-3 w-20 bg-white/10 rounded"></div>
            </div>
            <div className="h-4 w-full bg-white/10 rounded ml-6"></div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-white/10 rounded"></div>
              <div className="h-3 w-20 bg-white/10 rounded"></div>
            </div>
            <div className="h-20 w-full bg-white/10 rounded ml-6"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ProfileLoader() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Stats Skeletons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-white/10 bg-black/40">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white/10 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-7 w-12 bg-white/10 rounded"></div>
                  <div className="h-3 w-20 bg-white/10 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Section Skeletons */}
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="border-white/10 bg-black/40">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-white/10 rounded"></div>
              <div className="h-6 w-32 bg-white/10 rounded"></div>
            </div>
          </CardHeader>
          <Separator className="bg-white/10" />
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-white/10 rounded"></div>
                    <div className="h-3 w-20 bg-white/10 rounded"></div>
                  </div>
                  <div className="h-4 w-full bg-white/10 rounded ml-6"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

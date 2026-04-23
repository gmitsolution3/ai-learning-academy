import { Card, CardContent } from "@/components/ui/card";
import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PurchasePageError() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Card className="border border-red-500/20 bg-red-500/10 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-red-400 text-lg mb-4">
            কোর্সটি খুঁজে পাওয়া যায়নি
          </p>
          <Link href="/courses">
            <Button variant="outline">কোর্সে ফিরে যান</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

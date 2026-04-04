// app/components/CourseCard.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Clock,
  FolderOpen,
  GraduationCap,
  Infinity,
  Layers,
  RefreshCw,
  Trophy,
} from "lucide-react";

export default function CourseOverviewDetail() {
  return (
    <Card className="w-full max-w-5xl border shadow-lg">
      <div className="flex flex-col md:flex-row">
        {/* Left Column - Course Info */}
        <div className="flex-1 p-6 md:p-8">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight">
              Zero to Hero UI/UX Design – Level 1
            </CardTitle>
            <CardDescription className="mt-3 text-base text-muted-foreground leading-relaxed">
              Lorem ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages.
            </CardDescription>
          </CardHeader>
        </div>

        {/* Right Column - Pricing & Insights Card */}
        <div className="w-full md:w-80 p-6 md:p-8 border-l md:border-l md:border-t-0 border-t">
          {/* Pricing Section */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">₹690</span>
              <span className="text-lg text-muted-foreground line-through">
                ₹6,000
              </span>
              <Badge variant="destructive" className="ml-2">
                91% off
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Inclusive of all taxes
            </p>
          </div>

          <Separator className="my-4" />

          {/* Course Insights */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Layers className="h-4 w-4" />
                <span>Modules</span>
              </div>
              <span className="font-medium">14+ Modules</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>Lessons</span>
              </div>
              <span className="font-medium">80+ Lessons</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Hours</span>
              </div>
              <span className="font-medium">25+ Hours</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FolderOpen className="h-4 w-4" />
                <span>Projects</span>
              </div>
              <span className="font-medium">6+ Projects</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Trophy className="h-4 w-4" />
                <span>Level</span>
              </div>
              <Badge variant="outline" className="font-normal">
                Beginner to Hero
              </Badge>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Lifetime Access & Updates */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Infinity className="h-4 w-4 text-green-600" />
              <span>Lifetime Access</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <RefreshCw className="h-4 w-4 text-blue-600" />
              <span>Free Updates</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <GraduationCap className="h-4 w-4 text-orange-600" />
              <span>Last Updated: December 2024</span>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Enroll Button */}
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold">
            Enroll Now →
          </Button>
        </div>
      </div>
    </Card>
  );
}

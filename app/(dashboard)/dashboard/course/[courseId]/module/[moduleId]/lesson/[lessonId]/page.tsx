// app/course/[courseId]/lesson/[lessonId]/page.tsx
"use client";

import {
  ChevronLeft,
  ChevronRight,
  Lock,
  Maximize2,
  Menu,
  Minimize2,
  Volume2,
  VolumeX,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFetchById } from "@/hooks/swr/useFetchById";
import SidebarContent from "./SidebarContent";

// Mock modules data
const modules = [
  {
    id: 1,
    title: "Introduction to Web Development",
    duration: "45 min",
    lessons: [
      {
        id: "l1",
        title: "Welcome to the Course",
        youtubeId: "dQw4w9WgXcQ",
        duration: "5:23",
        isCompleted: true,
      },
      {
        id: "l2",
        title: "Setting Up Development Environment",
        youtubeId: "ysz5S6PUM-U",
        duration: "12:45",
        isCompleted: true,
      },
      {
        id: "l3",
        title: "How the Web Works",
        youtubeId: "3fumBcKC6RE",
        duration: "8:30",
        isCompleted: false,
      },
    ],
  },
  {
    id: 3,
    title: "Introduction to Web Development",
    duration: "45 min",
    lessons: [
      {
        id: "l1",
        title: "Welcome to the Course",
        youtubeId: "dQw4w9WgXcQ",
        duration: "5:23",
        isCompleted: true,
      },
      {
        id: "l2",
        title: "Setting Up Development Environment",
        youtubeId: "ysz5S6PUM-U",
        duration: "12:45",
        isCompleted: true,
      },
      {
        id: "l3",
        title: "How the Web Works",
        youtubeId: "3fumBcKC6RE",
        duration: "8:30",
        isCompleted: false,
      },
    ],
  },
  {
    id: 3,
    title: "HTML & CSS Fundamentals",
    duration: "2.5 hours",
    lessons: [
      {
        id: "l4",
        title: "HTML Basics",
        youtubeId: "dQw4w9WgXcQ",
        duration: "15:20",
        isCompleted: false,
      },
      {
        id: "l5",
        title: "CSS Styling",
        youtubeId: "ysz5S6PUM-U",
        duration: "22:10",
        isCompleted: false,
      },
      {
        id: "l6",
        title: "Responsive Design",
        youtubeId: "3fumBcKC6RE",
        duration: "18:45",
        isCompleted: false,
      },
    ],
  },
  {
    id: 5,
    title: "HTML & CSS Fundamentals",
    duration: "2.5 hours",
    lessons: [
      {
        id: "l4",
        title: "HTML Basics",
        youtubeId: "dQw4w9WgXcQ",
        duration: "15:20",
        isCompleted: false,
      },
      {
        id: "l5",
        title: "CSS Styling",
        youtubeId: "ysz5S6PUM-U",
        duration: "22:10",
        isCompleted: false,
      },
      {
        id: "l6",
        title: "Responsive Design",
        youtubeId: "3fumBcKC6RE",
        duration: "18:45",
        isCompleted: false,
      },
    ],
  },
  {
    id: 4,
    title: "JavaScript Core Concepts",
    duration: "3 hours",
    lessons: [
      {
        id: "l7",
        title: "Variables & Data Types",
        youtubeId: "dQw4w9WgXcQ",
        duration: "14:30",
        isCompleted: false,
      },
      {
        id: "l8",
        title: "Functions & Scope",
        youtubeId: "ysz5S6PUM-U",
        duration: "20:15",
        isCompleted: false,
      },
      {
        id: "l9",
        title: "DOM Manipulation",
        youtubeId: "3fumBcKC6RE",
        duration: "25:40",
        isCompleted: false,
      },
    ],
  },
];

// Calculate overall progress
const calculateProgress = () => {
  const allLessons = modules.flatMap((m) => m.lessons);
  const completedLessons = allLessons.filter(
    (l) => l.isCompleted,
  ).length;
  return (completedLessons / allLessons.length) * 100;
};

export default function PlayerPage() {
  const params = useParams();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const courseId = params.courseId as string;
  const lessonId = params.lessonId as string;

  const {
    data: moduleData,
    isLoading: moduleIsLoading,
    isError: moduleIsError,
  } = useFetchById("/modules/get-modules-by-course-id", courseId);

  const moduleList = moduleData?.data || [];

  // todo: need lesson detail by id api

  // Find current lesson
  const allLessons = modules.flatMap((m) => m.lessons);
  const currentLesson = allLessons.find((l) => l.id === lessonId);
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson =
    currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;

  const overallProgress = calculateProgress();

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#05010F] via-[#0A0418] to-[#0F0720] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex rounded-full p-[1px] bg-gradient-to-r from-secondary to-primary">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-sm text-white">
              <Lock className="h-4 w-4 text-secondary" />
              <span>Lesson Not Found</span>
            </div>
          </div>
          <p className="text-white/60">
            The lesson you're looking for doesn't exist.
          </p>
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-secondary to-primary"
          >
            <Link href={`/course/${courseId}`}>Back to Course</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#05010F] via-[#0A0418] to-[#0F0720] py-[200px]">
      <div className="container mx-auto px-5 lg:px-5">
        {/* Top Navigation Bar */}
        <div className=" border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              {/* Mobile Sidebar Trigger */}
              <Sheet
                open={isSidebarOpen}
                onOpenChange={setIsSidebarOpen}
              >
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-white hover:bg-white/10"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-80 p-0 bg-black/95 border-r border-white/10"
                >
                  <SidebarContent
                    modules={moduleList}
                  />
                </SheetContent>
              </Sheet>

              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <Link href={`/course/${courseId}`}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Link>
              </Button>

              <div className="hidden sm:block h-6 w-px bg-white/20" />

              <div className="hidden sm:block">
                <Badge
                  variant="outline"
                  className="border-secondary/50 text-secondary text-xs"
                >
                  {/* {courseId.replace(/-/g, " ")} */}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-0.5 bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-secondary to-primary transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        <div className="flex">
          {/* Left: Video Player Area */}
          <div className="flex-1 min-w-0">
            <div className="sticky top-14 bg-black/90">
              {/* Video Player */}
              <div className="relative aspect-video bg-black">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${currentLesson.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
                  title={currentLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
              <div className="p-4 md:p-6 space-y-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="space-y-2">
                    <Badge className="bg-gradient-to-r from-secondary to-primary text-white border-none">
                      Lesson {currentIndex + 1} of {allLessons.length}
                    </Badge>
                    <h1 className="text-xl md:text-2xl font-bold text-white">
                      {currentLesson.title}
                    </h1>
                    <p className="text-white/50 text-sm">
                      Duration: {currentLesson.duration}
                    </p>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex gap-2">
                    {prevLesson && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(
                            `/course/${courseId}/lesson/${prevLesson.id}`,
                          )
                        }
                        className="border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-full"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>
                    )}
                    {nextLesson && (
                      <Button
                        onClick={() =>
                          router.push(
                            `/course/${courseId}/lesson/${nextLesson.id}`,
                          )
                        }
                        className="bg-gradient-to-r from-secondary to-primary text-white rounded-full shadow-lg shadow-secondary/25"
                        size="sm"
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Course Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-white/50">
                    <span>Course Progress</span>
                    <span className="text-secondary">
                      {Math.round(overallProgress)}% Complete
                    </span>
                  </div>
                  <Progress
                    value={overallProgress}
                    className="h-1.5 bg-white/10 [&>div]:bg-gradient-to-r [&>div]:from-secondary [&>div]:to-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Desktop Sidebar */}
          <div className="hidden lg:block w-96 border-l border-white/10 bg-black/30 backdrop-blur-sm">
            <SidebarContent
              modules={moduleList}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

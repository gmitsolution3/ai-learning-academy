// app/course/[courseId]/lesson/[lessonId]/page.tsx
"use client";

import { ChevronLeft, Lock, Menu } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import VideoPlayer from "@/components/UserDashboard/dashboard/VideoPlayer";
import { useFetch } from "@/hooks/swr/useFetch";
import { useSession } from "@/lib/auth-context";
import { ILesson } from "@/types";
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
  const { session } = useSession();

  const playerRef = useRef<HTMLIFrameElement>(null);

  const courseId = params.courseId as string;
  const lessonSlug = params.lessonSlug as string;
  const moduleId = params.moduleId as string;

  const user = session?.user;

  const {
    data: moduleData,
    isLoading: moduleIsLoading,
    isError: moduleIsError,
  } = useFetch(`/modules/get-modules-with-lessons/${user?.email}`, {
    params: {
      course_id: courseId
    }
  });

  const moduleList = moduleData?.data?.modules || [];

  console.log(moduleList);

  const {
    data: lessonDetail,
    isLoading: lessonDetailIsLoading,
    isError: lessonDetailIsError,
  } = useFetch(`/lessons/get-single-lesson/${lessonSlug}`, {
    params: {
      module_id: moduleId,
    },
  });

  const currentLesson: ILesson = lessonDetail?.data;

  console.log(currentLesson);

  // Find current lesson
  /* const allLessons = modules.flatMap((m) => m.lessons);
  const currentLesson = allLessons.find((l) => l.id === lessonId);
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson =
    currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null; */

  const overallProgress = calculateProgress();

  if (!lessonDetail) {
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
                  <SidebarContent modules={moduleList} />
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
          </div>
        </div>

        <div className="flex">
          {/* Left: Video Player Area */}
          <VideoPlayer
            currentLesson={currentLesson}
            overallProgress={overallProgress}
            playerRef={playerRef}
          />

          {/* Right: Desktop Sidebar */}
          <div className="hidden lg:block w-96 border-l border-white/10 bg-black/30 backdrop-blur-sm">
            <SidebarContent modules={moduleList} />
          </div>
        </div>
      </div>
    </div>
  );
}

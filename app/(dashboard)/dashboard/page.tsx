// app/user-dashboard/page.tsx
"use client";
import { useState } from "react";
import CourseCard from "@/components/UserDashboard/CourseCard";
import {
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock course data type
interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  batch: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  image?: string;
  thumbnail?: string;
  lastAccessed?: string;
}

// Mock courses array
const mockCourses: Course[] = [
  {
    id: 1,
    title: "Digital Marketing Excellence",
    instructor: "Mhankar Jahbub",
    category: "Web Development",
    batch: "BATCH 11",
    progress: 100,
    totalModules: 42,
    completedModules: 42,
    lastAccessed: "2024-01-15",
  },
  {
    id: 2,
    title: "Advanced UI/UX Design Masterclass",
    instructor: "Tarín Jahan",
    category: "UI/UX Design",
    batch: "BATCH 8",
    progress: 65,
    totalModules: 36,
    completedModules: 23,
    lastAccessed: "2024-01-14",
  },
  {
    id: 3,
    title: "Digital Marketing Excellence",
    instructor: "Shahriar Kabir",
    category: "Marketing",
    batch: "BATCH 5",
    progress: 45,
    totalModules: 28,
    completedModules: 12,
    lastAccessed: "2024-01-13",
  },
  {
    id: 4,
    title: "Data Science Fundamentals with Python",
    instructor: "Nusrat Jahan",
    category: "Data Science",
    batch: "BATCH 3",
    progress: 30,
    totalModules: 40,
    completedModules: 12,
    lastAccessed: "2024-01-12",
  },
  {
    id: 5,
    title: "Mobile App Development with React Native",
    instructor: "Hasan Mia",
    category: "Mobile Development",
    batch: "BATCH 6",
    progress: 78,
    totalModules: 32,
    completedModules: 25,
    lastAccessed: "2024-01-15",
  },
  {
    id: 6,
    title: "Cloud Computing & AWS Basics",
    instructor: "Rafiqul Islam",
    category: "Cloud Computing",
    batch: "BATCH 4",
    progress: 15,
    totalModules: 35,
    completedModules: 5,
    lastAccessed: "2024-01-10",
  },
];

export default function UserDashboard() {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Filter courses based on search and filters
  const filteredCourses = courses.filter((course) => {
    // Status filter
    let matchesStatus = true;
    if (filterStatus === "completed") {
      matchesStatus = course.progress === 100;
    } else if (filterStatus === "in-progress") {
      matchesStatus = course.progress > 0 && course.progress < 100;
    } else if (filterStatus === "not-started") {
      matchesStatus = course.progress === 0;
    }

    return matchesStatus;
  });

  // Handle continue course action
  const handleContinueCourse = (courseId: number) => {
    console.log(`Continue course: ${courseId}`);
    // Navigate to course player or lesson
  };

  // Handle view outline action
  const handleViewOutline = (courseId: number) => {
    console.log(`View outline for course: ${courseId}`);
    // Navigate to course outline page
  };

  return (
    <section className="min-h-screen py-20 md:py-28 lg:py-32 bg-gradient-to-br from-[#05010F] via-[#0A0418] to-[#0F0720]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8 md:mb-12 text-center">
          <div className="inline-flex rounded-full p-[1px] bg-gradient-to-r from-secondary to-primary mb-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur">
              <BookOpen className="h-3 w-3 text-secondary" />
              <span>ড্যাশবোর্ড</span>
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-[#D1D5DB] to-[#707275] bg-clip-text text-transparent">
            Welcome back{" "}
            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Moin Khan
            </span>
            , ready for your next lesson?
          </h3>

          <p className="text-white/50 mt-2 text-sm">
            Continue your learning journey from where you left off
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex justify-end mb-8 space-y-4">
          {/* Status Tabs */}
          <Tabs
            defaultValue="all"
            value={filterStatus}
            onValueChange={setFilterStatus}
            className="w-auto"
          >
            <TabsList className="inline-flex h-auto bg-transparent backdrop-blur border border-white/10 rounded-full py-6 px-2">
              <TabsTrigger
                value="all"
                className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary data-[state=active]:to-primary data-[state=active]:text-white p-4"
              >
                All Courses
              </TabsTrigger>
              <TabsTrigger
                value="in-progress"
                className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary data-[state=active]:to-primary data-[state=active]:text-white p-4"
              >
                In Progress
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary data-[state=active]:to-primary data-[state=active]:text-white p-4"
              >
                Completed
              </TabsTrigger>
              <TabsTrigger
                value="not-started"
                className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary data-[state=active]:to-primary data-[state=active]:text-white p-4"
              >
                Not Started
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Courses Grid/Loop */}
        {filteredCourses.length > 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 max-w-5xl mx-auto">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                instructor={course.instructor}
                category={course.category}
                batch={course.batch}
                progress={course.progress}
                totalModules={course.totalModules}
                completedModules={course.completedModules}
                onContinue={() => handleContinueCourse(course.id)}
                onOutline={() => handleViewOutline(course.id)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center max-w-md mx-auto">
            <div className="relative mb-6">
              <div className="absolute inset-0 animate-ping rounded-full bg-secondary/20 blur-xl" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 backdrop-blur-sm border border-white/10">
                <BookOpen className="h-10 w-10 text-secondary" />
              </div>
            </div>

            <h4 className="text-xl font-semibold text-white mb-2">
              No courses found
            </h4>

            <p className="text-white/50 text-sm mb-6">
              You haven't enrolled in any courses yet. Start your
              learning journey today!
            </p>

            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-secondary to-primary text-white shadow-lg shadow-secondary/25 p-5 border-0"
            >
              <a href="/courses">Browse Courses</a>
            </Button>
          </div>
        )}

        {/* Course Count Info */}
        {filteredCourses.length > 0 && (
          <div className="text-center mt-8 text-sm text-white/40">
            Showing {filteredCourses.length} of {courses.length}{" "}
            courses
          </div>
        )}
      </div>
    </section>
  );
}

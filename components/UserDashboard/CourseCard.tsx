// components/UserDashboard/CourseCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  User,
  Play,
  FileText,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface CourseCardProps {
  id?: number;
  image?: string;
  title: string;
  instructor: string;
  category: string;
  batch?: string;
  progress: number;
  totalModules?: number;
  completedModules?: number;
  onContinue?: () => void;
  onOutline?: () => void;
  href?: string;
}

export default function CourseCard({
  id,
  image = "/course-thumbnail.jpg",
  title = "Complete Web Development Course With Programming Hero",
  instructor = "Jhankar Mahbub",
  category = "Web Development",
  batch = "BATCH 11",
  progress = 100,
  totalModules = 42,
  completedModules = 42,
  onContinue,
  onOutline,
  href = `/courses/${id}`,
}: CourseCardProps) {
  return (
    <div className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-transparant backdrop-blur-sm transition-all duration-300 hover:border-secondary/30 hover:shadow-2xl hover:shadow-secondary/10">
      <div className="relative flex flex-col md:flex-row gap-4 p-4 sm:p-5">
        {/* Left Side - Image */}
        <div className="relative w-full md:w-48 lg:w-56 flex-shrink-0">
          <div className="relative aspect-video md:aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 224px"
            />
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="flex-1 space-y-3">
          {/* Category Badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="outline"
              className="border-secondary/50 text-secondary text-xs"
            >
              {category}
            </Badge>
            {batch && (
              <Badge className="hidden md:inline-flex bg-black/50 text-white border-white/20 text-xs">
                {batch}
              </Badge>
            )}
          </div>

          {/* Course Title */}
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight line-clamp-2">
            {title}
          </h3>

          {/* Instructor Info */}
          <div className="flex items-center gap-3 text-sm text-white/60">
            <div className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-secondary" />
              <span>{instructor}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-secondary" />
              <span>{category}</span>
            </div>
          </div>

          {/* Progress Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-white/50">Course Progress</span>
              <span className="text-secondary font-semibold">
                {progress}% Complete
              </span>
            </div>

            <Progress
              value={progress}
              className="h-2 bg-white/10 [&>div]:bg-gradient-to-r [&>div]:from-secondary [&>div]:to-primary"
            />

            {totalModules && completedModules && (
              <p className="text-xs text-white/40">
                {completedModules} of {totalModules} modules completed
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              size="default"
              onClick={onContinue}
              className="flex-1 bg-gradient-to-r from-secondary to-primary hover:opacity-90 text-white rounded-full shadow-lg shadow-secondary/25 transition-all duration-300 group/btn p-5 border-0"
            >
              <Play className="mr-2 h-4 w-4 group-hover/btn:animate-pulse" />
              Continue Course
            </Button>

            <Button
              variant="outline"
              onClick={onOutline}
              className="flex-1 border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all duration-300 p-5 border-0"
            >
              <FileText className="mr-2 h-4 w-4" />
              Course Outline
              <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import CourseCard from "@/components/Home/CourseCard";

type Course = {
  title: string;
  slug: string;
  overview: string;
  description: string;
  category: string;
  difficultyLevel: string;
  totalEnrolled: number;
  rating: number;
  price: number;
  discountPercent: number;
  image: string;
};

export default function CourseTabs({
  courses,
}: {
  courses: Course[];
}) {
  const [activeTab, setActiveTab] = useState("All");

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(courses.map((c) => c.category))),
    ],
    [courses],
  );

  const filteredCourses = useMemo(() => {
    if (activeTab === "All") return courses;
    return courses.filter((c) => c.category === activeTab);
  }, [activeTab, courses]);

  return (
    <>
      {/* Tabs */}
      <div
        role="tablist"
        className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-10 sm:mt-12 md:mt-16"
      >
        {categories.map((category) => {
          const isActive = activeTab === category;

          return (
            <button
              key={category}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(category)}
              className={`px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-secondary to-primary text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-10 sm:mt-12">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400 text-lg">
              No courses found in this category.
            </p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="text-center mt-10 sm:mt-12">
        <button
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-secondary to-primary text-white text-sm sm:text-base font-semibold hover:shadow-xl hover:shadow-secondary/30 transition-all"
          aria-label="View all courses"
        >
          সকল কোর্স দেখুন
          <Sparkles className="size-4" aria-hidden />
        </button>
      </div>
    </>
  );
}

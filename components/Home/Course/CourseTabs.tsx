"use client";

import CourseCard from "@/components/Home/Course/CourseCard";
import { useFetch } from "@/hooks/swr/useFetch";
import { ICourse } from "@/types";
import { ICategoryListType } from "@/types/category.type";
import { RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";

export default function CourseTabs({
  showCTA = true,
}: {
  showCTA?: boolean;
}) {
  const [activeTab, setActiveTab] = useState("All");
  const [category, setCategory] = useState("");

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoryError,
    refetch: categoryRefetch,
  } = useFetch("/categories/get-categories");

  const categories = categoriesData?.data;

  const {
    data: coursesData,
    isLoading: isCoursesLoading,
    isError: isCoursesError,
    refetch: coursesRefetch,
  } = useFetch("/course/get-course-by-category", {
    params: {
      id: category,
    },
    dedupingInterval: 10000,
  });

  const courses = coursesData?.data;

  const handleCategoryClick = (
    category: ICategoryListType | { name: string; _id: string },
  ) => {
    setActiveTab(category.name);
    setCategory(category._id);
  };

  // Handle categories loading state
  if (isCategoriesLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="text-gray-400 mt-2">Loading categories...</p>
      </div>
    );
  }

  // Handle categories error state
  if (isCategoryError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 mb-3">Failed to load categories</p>
        <button
          onClick={() => categoryRefetch()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
        >
          <RefreshCw className="size-4" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Tabs */}
      <div
        role="tablist"
        className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-10 sm:mt-12 md:mt-16"
      >
        {/* Add "All" category button */}
        <button
          key="all"
          role="tab"
          aria-selected={activeTab === "All"}
          onClick={() =>
            handleCategoryClick({
              name: "All",
              _id: "",
            })
          }
          className={`px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
            activeTab === "All"
              ? "bg-gradient-to-r from-secondary to-primary text-white"
              : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
          }`}
        >
          All
        </button>

        {/* Map through categories */}
        {categories?.map((category: ICategoryListType) => {
          const isActive = activeTab === category.name;

          return (
            <button
              key={category._id}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleCategoryClick(category)}
              className={`px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-secondary to-primary text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Courses Grid with Loading and Error States */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-10 sm:mt-12">
        {/* Show loading state for courses */}
        {isCoursesLoading && (
          <div className="col-span-full flex justify-center items-center py-12">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="text-gray-400 mt-2">Loading courses...</p>
            </div>
          </div>
        )}

        {/* Show error state for courses */}
        {isCoursesError && !isCoursesLoading && (
          <div className="col-span-full text-center py-12">
            <p className="text-red-400 mb-3">
              Failed to load courses
            </p>
            <button
              onClick={() => coursesRefetch()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              <RefreshCw className="size-4" />
              Retry
            </button>
          </div>
        )}

        {/* Show courses when loaded successfully */}
        {!isCoursesLoading &&
          !isCoursesError &&
          courses?.length > 0 &&
          courses.map((course: ICourse) => (
            <CourseCard key={course.slug} course={course} />
          ))}

        {/* Show empty state when no courses found */}
        {!isCoursesLoading &&
          !isCoursesError &&
          courses?.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">
                No courses found in this category.
              </p>
            </div>
          )}
      </div>

      {/* CTA */}
      {showCTA && (
        <div className="text-center mt-10 sm:mt-12">
          <button
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-secondary to-primary text-white text-sm sm:text-base font-semibold hover:shadow-xl hover:shadow-secondary/30 transition-all"
            aria-label="View all courses"
          >
            সকল কোর্স দেখুন
            <Sparkles className="size-4" aria-hidden />
          </button>
        </div>
      )}
    </>
  );
}

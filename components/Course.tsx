"use client";

import { useState } from "react";
import { Sparkles, Users, Star, ShoppingCart } from "lucide-react";
import CourseCard from "./CourseCard";

const courses = [
  {
    title: "Full Stack Web Development Bootcamp",
    slug: "full-stack-web-development-bootcamp",
    overview:
      "A complete beginner-to-advanced guide to building modern web applications.",
    description:
      "Learn to build modern web applications using React, Node.js, and MongoDB.",
    category: "Web Development",
    difficultyLevel: "Intermediate",
    totalEnrolled: 1250,
    rating: 4.7,
    price: 4999,
    discountPercent: 20,
    image: "/graphics-design.png",
  },
  {
    title: "UI/UX Design Mastery",
    slug: "ui-ux-design-mastery",
    overview:
      "Design beautiful and user-friendly interfaces from scratch.",
    description:
      "Learn Figma, design principles, wireframing, prototyping, and user research.",
    category: "UI/UX Design",
    difficultyLevel: "Beginner",
    totalEnrolled: 980,
    rating: 4.6,
    price: 3999,
    discountPercent: 15,
    image: "/office-management.png",
  },
  {
    title: "Digital Marketing Pro",
    slug: "digital-marketing-pro",
    overview:
      "Master online marketing strategies to grow any business.",
    description:
      "Covers SEO, Facebook Ads, Google Ads, email marketing, and analytics.",
    category: "Digital Marketing",
    difficultyLevel: "Beginner",
    totalEnrolled: 1500,
    rating: 4.5,
    price: 3499,
    discountPercent: 25,
    image: "/basic-computer.png",
  },
  {
    title: "Advanced JavaScript Concepts",
    slug: "advanced-javascript-concepts",
    overview:
      "Deep dive into JavaScript internals and advanced patterns.",
    description:
      "Understand closures, prototypes, async patterns, and performance optimization.",
    category: "Programming",
    difficultyLevel: "Advanced",
    totalEnrolled: 720,
    rating: 4.8,
    price: 4599,
    discountPercent: 10,
    image: "/graphics-design.png",
  },
  {
    title: "Mobile App Development with React Native",
    slug: "react-native-mobile-app-development",
    overview: "Build cross-platform mobile apps using React Native.",
    description:
      "Create real-world apps for Android and iOS with a single codebase.",
    category: "App Development",
    difficultyLevel: "Intermediate",
    totalEnrolled: 860,
    rating: 4.6,
    price: 4299,
    discountPercent: 18,
    image: "/office-management.png",
  },
];

export default function Course() {
  const [activeTab, setActiveTab] = useState("UI/UX Design");

  // Filter courses based on active tab
  const filteredCourses =
    activeTab === "All"
      ? courses
      : courses.filter((course) => course.category === activeTab);

  const tabCategories = courses.map((course) => course.category);

  return (
    <section className="relative py-14 sm:py-16 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(227,185,138,0.14),transparent_28%)] -z-10" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex rounded-full p-[1px] bg-gradient-to-r from-secondary to-primary">
            <div className="inline-flex items-center gap-2 rounded-full bg-black px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm text-white backdrop-blur">
              <Sparkles className="size-4 text-secondary" />
              আমাদের কোর্স সমুহ
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 mt-4">
            <h1 className="bg-gradient-to-r from-[#F9D49B] to-[#C994FF] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight lg:py-5">
              আপনার স্বপ্নের ডিজাইন ক্যারিয়ার <br /> এখন হাতের মুঠোয়
            </h1>

            <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-white leading-6 sm:leading-7">
              প্রতিটি কোর্স সাজানো হয়েছে সহজভাবে, যাতে আপনি
              আত্মবিশ্বাসের সঙ্গে UI/UX ডিজাইন শিখতে পারেন।
            </p>
          </div>
        </div>

        {/* Tab Filter - Exactly like the picture */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-10 sm:mt-12 md:mt-16">
          <button
            onClick={() => {
              setActiveTab("All");
            }}
            className={`px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
              activeTab === "All"
                ? "bg-gradient-to-r from-secondary to-primary text-white "
                : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            All
          </button>
          {tabCategories.map((category) => (
            <button
              key={category}
              onClick={() => {
                console.log("hi");
                setActiveTab(category);
              }}
              className={`px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                activeTab === category
                  ? "bg-gradient-to-r from-secondary to-primary text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-10 sm:mt-12">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <CourseCard key={index} course={course} />
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
          <button className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-secondary to-primary text-white text-sm sm:text-base font-semibold hover:shadow-xl hover:shadow-secondary/30 transition-all">
            সকল কোর্স দেখুন
            <Sparkles className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import {
  Sparkles,
  Users,
  Star,
  ShoppingCart,
  TrendingDown,
} from "lucide-react";

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

// Difficulty level badge colors
const difficultyColors: {
  [key: string]: string;
} = {
  Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  Intermediate:
    "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function Course() {
  // Calculate discounted price
  const getDiscountedPrice = (
    price: number,
    discountPercent: number,
  ) => {
    return price - (price * discountPercent) / 100;
  };

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(227,185,138,0.14),transparent_28%)]" />

      <div className="container mx-auto px-5 lg:px-0">
        {/* Header Section */}
        <div className="text-center">
          <div className="inline-flex rounded-full p-[1px] bg-gradient-to-r from-secondary to-primary">
            <div className="inline-flex items-center gap-2 rounded-full border border-transparent bg-black px-5 py-2 text-sm text-white shadow-lg shadow-secondary/10 backdrop-blur">
              <Sparkles className="size-4 text-secondary" />
              আমাদের কোর্স সমুহ
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="bg-gradient-to-r from-[#F9D49B] to-[#C994FF] bg-clip-text text-transparent text-4xl font-black lg:text-5xl py-5 leading-17">
              আপনার স্বপ্নের ডিজাইন ক্যারিয়ার <br /> এখন হাতের মুঠোয়
            </h1>
            <p className="max-w-xl text-base leading-7 text-white sm:text-lg mx-auto">
              প্রতিটি কোর্স সাজানো হয়েছে সহজভাবে, যাতে আপনি
              আত্মবিশ্বাসের সঙ্গে UI/UX ডিজাইন শিখতে পারেন।
            </p>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {courses.map((course, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-secondary/50 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Category Badge */}
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white border border-white/20">
                  {course.category}
                </div>
              </div>

              {/* Course Content */}
              <div className="p-5">
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-secondary transition-colors">
                  {course.title}
                </h3>

                {/* Overview */}
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {course.overview}
                </p>

                {/* Description */}
                <p className="text-gray-500 text-xs mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Difficulty & Stats */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full border ${difficultyColors[course.difficultyLevel]}`}
                  >
                    {course.difficultyLevel}
                  </span>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="size-3 fill-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Users className="size-3" />
                      <span>
                        {course.totalEnrolled.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price Section */}
                <div className="flex items-end justify-between pt-3 border-t border-white/10">
                  <div>
                    {course.discountPercent > 0 ? (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-white">
                            ৳
                            {getDiscountedPrice(
                              course.price,
                              course.discountPercent,
                            ).toFixed(0)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ৳{course.price}
                          </span>
                        </div>
                        <p className="text-xs text-green-400">
                          Save ৳
                          {(
                            (course.price * course.discountPercent) /
                            100
                          ).toFixed(0)}
                        </p>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-white">
                        ৳{course.price}
                      </span>
                    )}
                  </div>
                  <button className="bg-gradient-to-r from-secondary to-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-secondary/25 transition-all duration-300">
                    <ShoppingCart className="size-4" />
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Courses Button */}
        <div className="text-center mt-12">
          <button className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-secondary to-primary text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-secondary/30">
            <span className="relative z-10">সকল কোর্স দেখুন</span>
            <Sparkles className="size-4 relative z-10 group-hover:rotate-12 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
}

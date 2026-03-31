import React from "react";
import {
  Sparkles,
  Users,
  Star,
  ShoppingCart,
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

const difficultyColors: { [key: string]: string } = {
  Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  Intermediate:
    "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function Course() {
  const getDiscountedPrice = (
    price: number,
    discountPercent: number,
  ) => {
    return price - (price * discountPercent) / 100;
  };

  return (
    <section className="relative py-14 sm:py-16 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(227,185,138,0.14),transparent_28%)]" />

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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-10 sm:mt-12 md:mt-16">
          {courses.map((course, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden hover:border-secondary/50 transition-all duration-300 sm:hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/70 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs text-white border border-white/20">
                  {course.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-secondary">
                  {course.title}
                </h3>

                <p className="text-gray-400 text-xs sm:text-sm mb-2 line-clamp-2">
                  {course.overview}
                </p>

                <p className="text-gray-500 text-[11px] sm:text-xs mb-3 line-clamp-2">
                  {course.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span
                    className={`text-[10px] sm:text-xs px-2 py-1 rounded-full border ${difficultyColors[course.difficultyLevel]}`}
                  >
                    {course.difficultyLevel}
                  </span>

                  <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="size-3 fill-yellow-400" />
                      {course.rating}
                    </div>

                    <div className="flex items-center gap-1 text-gray-400">
                      <Users className="size-3" />
                      {course.totalEnrolled.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-end justify-between pt-3 border-t border-white/10">
                  <div>
                    {course.discountPercent > 0 ? (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                            ৳
                            {getDiscountedPrice(
                              course.price,
                              course.discountPercent,
                            ).toFixed(0)}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-500 line-through">
                            ৳{course.price}
                          </span>
                        </div>

                        <p className="text-[10px] sm:text-xs text-green-400">
                          Save ৳
                          {(
                            (course.price * course.discountPercent) /
                            100
                          ).toFixed(0)}
                        </p>
                      </>
                    ) : (
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                        ৳{course.price}
                      </span>
                    )}
                  </div>

                  <button className="bg-gradient-to-r from-secondary to-primary text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-sm font-semibold flex items-center gap-1 sm:gap-2 hover:shadow-lg hover:shadow-secondary/25 transition-all">
                    <ShoppingCart className="size-3 sm:size-4" />
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
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
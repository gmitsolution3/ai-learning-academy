import { Sparkles } from "lucide-react";
import CourseTabs from "./CourseTabs";

type Course = {
  title: string;
  slug: string;
  overview: string;
  description: string;
  category: string;
  difficultyLevel: "Beginner" | "Intermediate" | "Advanced";
  totalEnrolled: number;
  rating: number;
  price: number;
  discountPercent: number;
  image: string;
};

const courses: Course[] = [
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
  return (
    <section
      className="relative py-14 sm:py-16 md:py-20"
      aria-labelledby="course-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(227,185,138,0.14),transparent_28%)] -z-10" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex rounded-full p-[1px] bg-gradient-to-r from-secondary to-primary">
            <div className="inline-flex items-center gap-2 rounded-full bg-black px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm text-white backdrop-blur">
              <Sparkles
                className="size-4 text-secondary"
                aria-hidden
              />
              <span>আমাদের কোর্স সমুহ</span>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 mt-4">
            <h2
              id="course-heading"
              className="bg-gradient-to-r from-[#F9D49B] to-[#C994FF] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight lg:py-5"
            >
              আপনার স্বপ্নের ডিজাইন ক্যারিয়ার <br /> এখন হাতের মুঠোয়
            </h2>

            <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-white leading-6 sm:leading-7">
              প্রতিটি কোর্স সাজানো হয়েছে সহজভাবে, যাতে আপনি
              আত্মবিশ্বাসের সঙ্গে UI/UX ডিজাইন শিখতে পারেন।
            </p>
          </div>
        </div>

        {/* Client Component */}
        <CourseTabs courses={courses} />
      </div>
    </section>
  );
}

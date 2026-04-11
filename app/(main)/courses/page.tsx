import GlobalBanner from "@/components/GlobalBanner";
import SectionHeading from "@/components/SectionHeading";
import CourseTabs from "@/components/Home/Course/CourseTabs";

import { ICourse } from "@/types";

const courses: any[] = [
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

export default function CoursesPage() {
  return (
    <div className="relative min-h-screen">
      <GlobalBanner>
        <div className="max-w-xl px-5 lg:px-0">
          <SectionHeading
            id="all-course-heading"
            title={"বাংলায় শিখুন ২১ শতকের ক্রিয়েটিভ স্কিল"}
            description={
              "আজকের শেখা থেকেই শুরু হোক আপনার আন্তর্জাতিক মানের ডিজাইন ক্যারিয়ার।"
            }
          />
        </div>
      </GlobalBanner>

      <div className="container mx-auto px-5 lg:px-0 relative z-10">
        <div className="relative">
          <div className="-mt-35 md:-mt-50 lg:-mt-80 pb-16 md:pb-20 lg:pb-24">
            <CourseTabs courses={courses} showCTA={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

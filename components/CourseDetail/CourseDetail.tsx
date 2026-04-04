// app/components/CourseDetail.tsx
"use client";

import { useState } from "react";
import CourseDetailNavigation from "./CourseDetailNavigation";
import CourseDetailContent from "./CourseDetailContent";
import {
  BookOpen,
  Lightbulb,
  Speech,
  Laptop,
  ListChecks,
} from "lucide-react";

export default function CourseDetail() {
  const [activeSection, setActiveSection] = useState("course-detail");

  const sections = [
    {
      id: "course-detail",
      title: "কোর্সের বিস্তারিত",
      icon: BookOpen,
    },
    {
      id: "course-curriculamn",
      title: "কোর্সের পুর্ন কারিকুলাম",
      icon: Lightbulb,
    },
    { id: "teacher", title: "যার কাছ থেকে শিখবেন", icon: Speech },
    { id: "qna", title: "প্রশ্ন এবং উত্তর", icon: Laptop },
    {
      id: "reviews",
      title: "শিক্ষার্থীদের অভিজ্ঞতা",
      icon: ListChecks,
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Fixed Left Card - Navigation */}
          <CourseDetailNavigation
            sections={sections}
            activeSection={activeSection}
            onSectionClick={scrollToSection}
          />

          {/* Right Scrollable Content */}
          <CourseDetailContent />
        </div>
      </div>
    </div>
  );
}

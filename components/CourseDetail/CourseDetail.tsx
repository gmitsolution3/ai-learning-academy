"use client";

import { useState, useEffect } from "react";
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
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetBottom
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

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

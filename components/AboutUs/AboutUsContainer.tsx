"use client";

import { useState, useEffect, useRef } from "react";
import AboutUsNavigation from "./AboutUsNavigation";
import AboutUsContent from "./AboutUsContent";

import { BookOpen, Lightbulb, Speech, Laptop } from "lucide-react";

const sections = [
  {
    id: "about-us",
    title: "আমাদের বিস্তারিত",
    icon: BookOpen,
  },
  {
    id: "our-mission",
    title: "আমাদের মিশন",
    icon: Lightbulb,
  },
  {
    id: "our-vission",
    title: "আমাদের ভিশন",
    icon: Speech,
  },
  { id: "our-team", title: "আমাদের টিম", icon: Laptop },
];

export default function AboutUsContainer() {
  const [activeSection, setActiveSection] = useState("course-detail");
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setIsScrolling(true);
      setActiveSection(id);

      element.scrollIntoView({ behavior: "smooth" });

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set a timeout to re-enable scroll highlighting after animation completes
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000); // 1 second should be enough for smooth scroll
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Don't update active section while programmatically scrolling
      if (isScrolling) return;

      const scrollPosition = window.scrollY + 150; // Increased offset for better accuracy

      // Find the current section based on scroll position
      let currentSection = sections[0]?.id;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          if (scrollPosition >= offsetTop) {
            currentSection = section.id;
            break;
          }
        }
      }

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isScrolling, activeSection]);

  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Fixed Left Card - Navigation */}
          <AboutUsNavigation
            sections={sections}
            activeSection={activeSection}
            onSectionClick={scrollToSection}
          />

          {/* Right Scrollable Content */}
          <AboutUsContent />
        </div>
      </div>
    </div>
  );
}

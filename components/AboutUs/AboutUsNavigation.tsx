"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";


interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
}

interface AboutNavigationProps {
  sections: Section[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}

export default function AboutUsNavigation({
  sections,
  activeSection,
  onSectionClick,
}: AboutNavigationProps) {
  return (
    <div className="lg:w-80 xl:w-96 flex-shrink-0">
      <div className="lg:sticky lg:top-24">
        <Card className="border-2 border-white/70 shadow-lg bg-[#03050A]">
          <CardContent className="space-y-4">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => onSectionClick(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                    activeSection === section.id
                      ? "bg-gradient-to-r from-secondary/20 to-primary/20 border-l-4 border-secondary text-white font-medium"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <section.icon size="18" />
                  {section.title}
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

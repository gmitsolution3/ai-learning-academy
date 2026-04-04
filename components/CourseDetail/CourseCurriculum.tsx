"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

export default function CourseCurriculum({
  modules,
}: {
  modules: any[];
}) {
  const [openModules, setOpenModules] = useState<number[]>([1]);
  const [heights, setHeights] = useState<{ [key: number]: number }>(
    {},
  );
  const contentRefs = useRef<{
    [key: number]: HTMLDivElement | null;
  }>({});

  const toggleModule = (moduleId: number) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId],
    );
  };

  useEffect(() => {
    // Measure heights after render
    const newHeights: { [key: number]: number } = {};
    modules.forEach((module) => {
      if (contentRefs.current[module.id]) {
        newHeights[module.id] =
          contentRefs.current[module.id]?.scrollHeight || 0;
      }
    });
    setHeights(newHeights);
  }, [modules]);

  return (
    <section id="course-curriculamn" className="scroll-mt-24">
      <Card className="border border-white/20 bg-[#03050A]/50 backdrop-blur-sm p-5">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            কোর্সের পুর্ন কারিকুলাম
          </CardTitle>
          <CardDescription className="text-white/60">
            মোট ১৪টি মডিউল | ৮০+ লেসন | ২৫+ ঘন্টা কন্টেন্ট
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {modules.map((module) => (
            <div
              key={module.id}
              className="border border-white/10 rounded-lg overflow-hidden bg-white/5"
            >
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/10 transition-all duration-300 text-left group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-secondary font-bold">
                    মডিউল {module.id}
                  </span>
                  <span className="hidden md:block text-white font-medium">
                    {module.title}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/60 text-sm">
                    {module.lessonCount}টি লেসন
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-white/60 transition-all duration-500 ease-in-out ${
                      openModules.includes(module.id)
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </div>
              </button>

              <div
                className="transition-all duration-500 ease-in-out overflow-hidden"
                style={{
                  maxHeight: openModules.includes(module.id)
                    ? `${heights[module.id] || 500}px`
                    : "0px",
                  opacity: openModules.includes(module.id) ? 1 : 0,
                }}
              >
                <div
                  ref={(el) => {
                    contentRefs.current[module.id] = el;
                  }}
                  className="border-t border-white/10 p-4 space-y-2"
                >
                  {module.lessons.map((lesson: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-white/70 text-sm py-1 transition-all duration-300 ease-in-out"
                      style={{
                        transform: openModules.includes(module.id)
                          ? "translateX(0)"
                          : "translateX(-10px)",
                        opacity: openModules.includes(module.id)
                          ? 1
                          : 0,
                        transitionDelay: openModules.includes(
                          module.id,
                        )
                          ? `${idx * 30}ms`
                          : "0ms",
                      }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                      <span>
                        লেসন {idx + 1}: {lesson}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <button className="w-full mt-4 py-3 text-center text-secondary hover:text-primary transition-all duration-300 font-medium group">
            <span className="inline-block transition-all duration-300 group-hover:scale-105">
              আরও মডিউল দেখুন
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                {" "}
                +
              </span>
            </span>
          </button>
        </CardContent>
      </Card>
    </section>
  );
}

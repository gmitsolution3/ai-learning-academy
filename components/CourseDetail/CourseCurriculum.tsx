"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CourseCurriculum({
  modules,
}: {
  modules: any[];
}) {
  const [openModules, setOpenModules] = useState<number[]>([1]);

  const toggleModule = (moduleId: number) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId],
    );
  };

  return (
    <section id="course-curriculamn" className="scroll-mt-24">
      <Card className="border border-white/20 bg-[#03050A]/50 backdrop-blur-sm">
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
              className="border border-white/10 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-secondary font-bold">
                    মডিউল {module.id}
                  </span>
                  <span className="text-white font-medium">
                    {module.title}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/60 text-sm">
                    {module.lessonCount}টি লেসন
                  </span>
                  {openModules.includes(module.id) ? (
                    <ChevronUp className="h-4 w-4 text-white/60" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white/60" />
                  )}
                </div>
              </button>

              {openModules.includes(module.id) && (
                <div className="border-t border-white/10 bg-white/5 p-4 space-y-2">
                  {module.lessons.map((lesson: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-white/70 text-sm py-1"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                      <span>
                        লেসন {idx + 1}: {lesson}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button className="w-full mt-4 py-3 text-center text-secondary hover:text-primary transition-colors font-medium">
            আরও মডিউল দেখুন +
          </button>
        </CardContent>
      </Card>
    </section>
  );
}

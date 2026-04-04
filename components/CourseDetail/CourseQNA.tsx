"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

export default function CourseQNA() {
  const [openQuestions, setOpenQuestions] = useState<number[]>([0]);
  const [heights, setHeights] = useState<{ [key: number]: number }>(
    {},
  );
  const contentRefs = useRef<{
    [key: number]: HTMLDivElement | null;
  }>({});

  const qnaData = [
    {
      question: "এই কোর্সটি কার জন্য?",
      answer:
        "এই কোর্সটি সকল স্তরের শিক্ষার্থীদের জন্য তৈরি। যারা UI/UX ডিজাইন শিখতে আগ্রহী, তাদের জন্য এটি একটি সম্পূর্ণ গাইডলাইন। শিক্ষানবিস থেকে শুরু করে অভিজ্ঞ ডিজাইনাররাও এই কোর্স থেকে উপকৃত হতে পারবেন।",
    },
    {
      question: "কোর্স শেষে সার্টিফিকেট দেওয়া হবে?",
      answer:
        "হ্যাঁ, কোর্স সফলভাবে সম্পন্ন করলে আন্তর্জাতিক মানের সার্টিফিকেট দেওয়া হবে। যা আপনার ক্যারিয়ারে গুরুত্বপূর্ণ ভূমিকা রাখবে।",
    },
    {
      question: "কোর্সের সময়সীমা কতদিন?",
      answer:
        "এই কোর্সে লাইফটাইম অ্যাক্সেস দেওয়া হবে। আপনি আপনার সুবিধামত সময়ে কোর্সটি সম্পন্ন করতে পারবেন। কোনো সময়সীমার বাধ্যবাধকতা নেই।",
    },
    {
      question: "কিভাবে সাপোর্ট পাবো?",
      answer:
        "আমাদের 24/7 লাইভ সাপোর্ট টিম সবসময় আপনার পাশে আছে। আপনি যেকোনো সময় আমাদের কমিউনিটি গ্রুপে বা সরাসরি সাপোর্ট টিমের সাথে যোগাযোগ করতে পারবেন।",
    },
    {
      question: "কোর্সটি কি অনলাইনে হবে?",
      answer:
        "হ্যাঁ, কোর্সটি সম্পূর্ণ অনলাইন প্ল্যাটফর্মে হবে। আপনি যেকোনো জায়গা থেকে, যেকোনো ডিভাইসে (মোবাইল, ট্যাব, ল্যাপটপ) কোর্সটি অ্যাক্সেস করতে পারবেন।",
    },
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestions((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index],
    );
  };

  useEffect(() => {
    const newHeights: { [key: number]: number } = {};
    qnaData.forEach((_, index) => {
      if (contentRefs.current[index]) {
        newHeights[index] =
          contentRefs.current[index]?.scrollHeight || 0;
      }
    });
    setHeights(newHeights);
  }, []);

  return (
    <section id="qna" className="scroll-mt-24">
      <Card className="border border-white/20 bg-[#03050A]/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            প্রশ্ন এবং উত্তর
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {qnaData.map((item, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-lg overflow-hidden bg-white/5"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/10 transition-all duration-300 text-left group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-secondary font-bold text-sm">
                    প্রশ্ন {index + 1}
                  </span>
                  <h4 className="text-white font-medium">
                    {item.question}
                  </h4>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-white/60 transition-all duration-500 ease-in-out ${
                    openQuestions.includes(index) ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className="transition-all duration-500 ease-in-out overflow-hidden"
                style={{
                  maxHeight: openQuestions.includes(index)
                    ? `${heights[index] || 200}px`
                    : "0px",
                  opacity: openQuestions.includes(index) ? 1 : 0,
                }}
              >
                <div
                  ref={(el) => {
                    contentRefs.current[index] = el;
                  }}
                  className="border-t border-white/10 p-4 space-y-2"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-secondary/70 text-sm font-medium">
                      উত্তর:
                    </span>
                    <p className="text-white/70 leading-relaxed text-sm">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

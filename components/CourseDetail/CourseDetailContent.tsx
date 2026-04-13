// app/components/CourseContent.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ICourseDetail } from "@/types";
import { getUserInitials, getYouTubeEmbedUrl } from "@/utils";
import { Briefcase, GraduationCap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CourseCurriculum from "./CourseCurriculum";
import CourseQNA from "./CourseQNA";

const modules = [
  {
    id: 1,
    title: "UI/UX ডিজাইনের মূলনীতি",
    lessonCount: 6,
    lessons: [
      "UI এবং UX এর মধ্যে পার্থক্য",
      "ডিজাইন থিংকিং প্রক্রিয়া",
      "ইউজার রিসার্চ পদ্ধতি",
      "ইউজার পেরসোনা তৈরি",
      "ইউজার জার্নি ম্যাপিং",
      "ওয়্যারফ্রেমিং এর গুরুত্ব",
    ],
  },
  {
    id: 2,
    title: "রিসার্চ ও অ্যানালাইসিস",
    lessonCount: 8,
    lessons: [
      "কম্পিটিটর অ্যানালাইসিস",
      "ইউজার ইন্টারভিউ টেকনিক",
      "সার্ভে ডিজাইন ও এনালাইসিস",
      "ডাটা ইন্টারপ্রিটেশন",
      "ইনসাইট থেকে অ্যাকশন",
    ],
  },
  {
    id: 3,
    title: "ওয়্যারফ্রেম ও প্রোটোটাইপ",
    lessonCount: 7,
    lessons: [
      "লো-ফাই ও হাই-ফাই ওয়্যারফ্রেম",
      "ফিগমা বেসিকস",
      "কম্পোনেন্ট ও লাইব্রেরি",
      "প্রোটোটাইপিং টেকনিক",
      "ইউজার টেস্টিং",
    ],
  },
  {
    id: 4,
    title: "ভিজুয়াল ডিজাইন ও UI",
    lessonCount: 9,
    lessons: [
      "কালার থিওরি ও সাইকোলজি",
      "টাইপোগ্রাফি ফান্ডামেন্টাল",
      "স্পেসিং ও লেআউট ডিজাইন",
      "আইকনোগ্রাফি ও ইলাস্ট্রেশন",
      "রেসপন্সিভ ডিজাইন",
    ],
  },
];

export default function CourseDetailContent({
  courseData,
}: {
  courseData: ICourseDetail;
}) {
  const embedUrl = getYouTubeEmbedUrl(courseData.preview_video);

  return (
    <div className="flex-1 space-y-12">
      {/* Section 1 - Overview */}
      <section id="course-detail" className="scroll-mt-24">
        <Card className="border border-white/20 bg-[#03050A]/50 backdrop-blur-sm p-10">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              কোর্সের বিস্তারিত
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-6">
              <Badge className="bg-secondary/20 text-secondary">
                ৩০০+ শিক্ষার্থী নথিভুক্ত
              </Badge>
              <Badge className="bg-primary/20 text-primary">
                ফিল্টারযুক্ত কন্টেন্ট
              </Badge>
              <Badge className="bg-green-500/20 text-green-400">
                ২৪/৭ লাইভ সাপোর্ট
              </Badge>
            </div>
            <p className="text-white/80 leading-relaxed">
              {courseData.full_description}
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-white/20 shadow-xl bg-gradient-to-br from-[#03050A] to-[#0a0c15] mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
            {/* Left Inner Card */}
            <Card className="border border-white/10 bg-white/5 backdrop-blur-sm hover:border-secondary/50 transition-all duration-300 bg-white/3">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg border border-white/10 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#D1D5DB] to-[#707275] bg-clip-text text-transparent">
                  প্র্যাকটিক্যাল প্রজেক্ট ও কেস স্টাডি
                </CardTitle>
                <CardDescription className="text-white/70 leading-relaxed mt-2">
                  শুধু থিওরি নয়, বাস্তব প্রজেক্ট ও রিয়েল-ওয়ার্ল্ড
                  কেস স্টাডির মাধ্যমে হাতে-কলমে শিখবেন, যা আপনার
                  স্কিলকে সুরক্ষিত করবে।
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Right Inner Card */}
            <Card className="border border-white/10 bg-white/5 backdrop-blur-sm hover:border-secondary/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg border border-white/10 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#D1D5DB] to-[#707275] bg-clip-text text-transparent">
                  জব ও ফ্রিল্যান্সিং গাইডলাইন
                </CardTitle>
                <CardDescription className="text-white/70 leading-relaxed mt-2">
                  শুধু ডিজাইন নয়, বরং পোর্টফলিও তৈরি, ক্লায়েন্ট
                  ডিলিং, CV তৈরি, ইন্টারভিউ ও প্রফেশনাল কমিউনিকেশন
                  স্কিল শেখানো হবে
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </Card>

        {courseData.preview_video && (
          <Card className="border border-white/20 bg-[#03050A]/50 backdrop-blur-sm p-10 mt-10">
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden border bg-muted">
                <iframe
                  src={embedUrl as string}
                  title="Course preview video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Section 2 - Curriculum */}
      <CourseCurriculum modules={modules} />

      {/* Section 3 - Teacher */}
      <section id="teacher" className="scroll-mt-24">
        <Card className="border border-white/20 bg-[#03050A]/50 backdrop-blur-sm p-10">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              যার কাছ থেকে শিখবেন
            </CardTitle>
          </CardHeader>
          {courseData?.instructor?.map((instructor) => (
            <CardContent key={instructor?._id}>
              <div className="flex items-center gap-6 mb-5">
                <Avatar className="h-14 w-14 ring-2 ring-secondary/20">
                  <AvatarImage
                    src={instructor?.image || ""}
                    alt={instructor?.name || "User"}
                  />
                  <AvatarFallback className="bg-gradient-to-r from-secondary to-primary text-white">
                    {getUserInitials(instructor?.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {instructor?.name}
                  </h3>
                  <p className="text-white/60">
                    Expert in {courseData?.category?.name}
                  </p>
                </div>
              </div>

              <p className="text-white/80 leading-relaxed mt-4">
                Lorem ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s.
              </p>

              {/* Statistics Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 p-4 border-b border-white/10">
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-secondary">
                    100k+
                  </p>
                  <p className="text-xs text-white/50">Students</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-secondary">
                    100k+
                  </p>
                  <p className="text-xs text-white/50">
                    YouTube Fans
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-secondary">
                    100k+
                  </p>
                  <p className="text-xs text-white/50">
                    Years of Experience
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-secondary">
                    Live
                  </p>
                  <p className="text-xs text-white/50">Course</p>
                </div>
              </div>
            </CardContent>
          ))}
        </Card>
      </section>

      {/* Section 4 - Q&A */}
      <CourseQNA />
    </div>
  );
}

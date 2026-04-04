// app/components/CourseContent.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Headphones,
  Users,
  Filter,
  Clock,
} from "lucide-react";

export default function CourseDetailContent() {
  return (
    <div className="flex-1 space-y-12">
      {/* Section 1 - Overview */}
      <section id="course-detail" className="scroll-mt-24">
        <Card className="border border-white/20 bg-[#03050A]/50 backdrop-blur-sm">
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
              Lorem ipsum is simply dummy text of the printing
              and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen
              book. It has survived not only five centuries, but
              also the leap into electronic typesetting,
              remaining essentially unchanged. It was
              popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem
              Ipsum.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Section 2 - Curriculum */}
      <section id="course-curriculamn" className="scroll-mt-24">
        <Card className="border border-white/20 bg-[#03050A]/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              কোর্সের পুর্ন কারিকুলাম
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 leading-relaxed">
              Lorem ipsum is simply dummy text of the printing
              and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen
              book. It has survived not only five centuries, but
              also the leap into electronic typesetting,
              remaining essentially unchanged. It was
              popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem
              Ipsum. Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has
              been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen
              book. It has survived not only five centuries, but
              also the leap into electronic typesetting,
              remaining essentially unchanged. It was
              popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem
              Ipsum.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Section 3 - Teacher */}
      <section id="teacher" className="scroll-mt-24">
        <Card className="border border-white/20 bg-[#03050A]/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              যার কাছ থেকে শিখবেন
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center">
                <span className="text-3xl font-bold text-white">T</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Teacher Name</h3>
                <p className="text-white/60">Expert in UI/UX Design</p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed mt-4">
              Lorem ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Section 4 - Q&A */}
      <section id="qna" className="scroll-mt-24">
        <Card className="border border-white/20 bg-[#03050A]/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              প্রশ্ন এবং উত্তর
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h4 className="font-semibold text-white mb-2">প্রশ্ন: এই কোর্সটি কার জন্য?</h4>
                <p className="text-white/70">উত্তর: এই কোর্সটি সকল স্তরের শিক্ষার্থীদের জন্য তৈরি।</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h4 className="font-semibold text-white mb-2">প্রশ্ন: কোর্স শেষে সার্টিফিকেট দেওয়া হবে?</h4>
                <p className="text-white/70">উত্তর: হ্যাঁ, কোর্স সফলভাবে সম্পন্ন করলে সার্টিফিকেট দেওয়া হবে।</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Section 5 - Reviews */}
      <section id="reviews" className="scroll-mt-24">
        <Card className="border border-white/20 bg-[#03050A]/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              শিক্ষার্থীদের অভিজ্ঞতা
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <span className="font-bold text-secondary">R</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Rakib Hasan</p>
                    <div className="flex text-yellow-500">★★★★★</div>
                  </div>
                </div>
                <p className="text-white/70 text-sm">অসাধারণ একটি কোর্স! খুবই উপকারী হয়েছে আমার জন্য।</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-bold text-primary">S</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Sadia Ahmed</p>
                    <div className="flex text-yellow-500">★★★★★</div>
                  </div>
                </div>
                <p className="text-white/70 text-sm">শিক্ষক খুবই অভিজ্ঞ এবং সহায়ক। কোর্সটি সবার জন্য রেকমেন্ড করব।</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
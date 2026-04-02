"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    id: "1",
    question:
      "প্রতিটি কোমার সাজানের প্রয়োজনে সহজভাবে, যাতে আপনি আধুনিকভিত্তিতে সঠিক UI/UX চিন্তাটির পরিচয় পাবেন",
    answer:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: "2",
    question:
      "প্রতিটি কোমার সাজানের প্রয়োজনে সহজভাবে, যাতে আপনি আধুনিকভিত্তিতে সঠিক UI/UX চিন্তাটির পরিচয় পাবেন",
    answer:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    id: "3",
    question:
      "প্রতিটি কোমার সাজানের প্রয়োজনে সহজভাবে, যাতে আপনি আধুনিকভিত্তিতে সঠিক UI/UX চিন্তাটির পরিচয় পাবেন",
    answer:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    id: "4",
    question:
      "প্রতিটি কোমার সাজানের প্রয়োজনে সহজভাবে, যাতে আপনি আধুনিকভিত্তিতে সঠিক UI/UX চিন্তাটির পরিচয় পাবেন",
    answer:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: "5",
    question:
      "প্রতিটি কোমার সাজানের প্রয়োজনে সহজভাবে, যাতে আপনি আধুনিকভিত্তিতে সঠিক UI/UX চিন্তাটির পরিচয় পাবেন",
    answer:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

export default function FAQ() {
  return (
    <section className="relative py-14 sm:py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="space-y-3 sm:space-y-4 text-center mb-6 sm:mb-8">
          <h2 className="bg-gradient-to-r from-[#F9D49B] to-[#C994FF] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight lg:py-5">
            প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-white leading-6 sm:leading-7">
            আমাদের কোর্স এবং সেবাগুলি সম্পর্কে আপনার যদি কোন প্রশ্ন
            থাকে, তাহলে এখানে আপনি প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী দেখতে
            পারেন। যদি আপনার প্রশ্নের উত্তর না পান, তাহলে আমাদের সাথে
            যোগাযোগ করতে দ্বিধা করবেন না।
          </p>
        </div>

        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-5 sm:p-8 md:p-10 lg:p-14 max-w-5xl mx-auto">
          <div>
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="py-5">
                  <AccordionTrigger className="text-left text-base lg:text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm lg:text-base text-white">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

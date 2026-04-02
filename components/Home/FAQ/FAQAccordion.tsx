"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export default function FAQAccordion({
  faqData,
}: {
  faqData: FAQItem[];
}) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqData.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id} className="py-5">
          <AccordionTrigger className="text-left text-base lg:text-lg">
            {faq.question}
          </AccordionTrigger>

          <AccordionContent className="text-sm lg:text-base text-white">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

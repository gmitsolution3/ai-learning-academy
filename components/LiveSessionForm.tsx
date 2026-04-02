import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  detail: string;
}

export default function LiveSessionForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    detail: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
    alert("ফর্ম জমা দেওয়ার জন্য ধন্যবাদ! আমরা শীঘ্রই যোগাযোগ করবো।");
    setFormData({ name: "", email: "", phone: "", detail: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-white/80 text-sm">
          আপনার নাম <span className="text-[#F9D49B]">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="আপনার নাম লিখুন"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 !p-5"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-white/80 text-sm">
          ইমেইল ঠিকানা <span className="text-[#F9D49B]">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 !p-5"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-white/80 text-sm">
          ফোন নম্বর <span className="text-[#F9D49B]">*</span>
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="০১XXXXXXXXX"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 !p-5"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="detail" className="text-white/80 text-sm">
          বিস্তারিত
        </Label>
        <Textarea
          id="detail"
          name="detail"
          placeholder="আপনার প্রশ্ন বা মন্তব্য লিখুন..."
          value={formData.detail}
          onChange={handleInputChange}
          rows={8}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 resize-none !p-5 h-[100px]"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-secondary to-primary text-white font-semibold py-3 hover:opacity-90 transition-opacity rounded-lg p-6 cursor-pointer"
      >
        সাবমিট করুন →
      </Button>
    </form>
  );
}

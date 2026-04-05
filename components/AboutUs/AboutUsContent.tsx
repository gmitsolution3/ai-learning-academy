import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { BookOpen, Lightbulb, Speech, Laptop } from "lucide-react";
import OurTeamGrid from "@/components/OurTeam/OurTeamGrid";

const teamMembers = [
  {
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    name: "Sarah Johnson",
    designation: "Founder",
    facebook: "https://facebook.com/sarah.johnson",
    whatsapp: "https://wa.me/1234567890",
    linkedin: "https://linkedin.com/in/sarahjohnson",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    name: "Michael Chen",
    designation: "Creative Director",
    facebook: "https://facebook.com/michael.chen",
    whatsapp: "https://wa.me/1234567891",
    linkedin: "https://linkedin.com/in/michaelchen",
  },
  {
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop",
    name: "Emily Rodriguez",
    designation: "Lead Designer",
    facebook: "https://facebook.com/emily.rodriguez",
    whatsapp: "https://wa.me/1234567892",
    linkedin: "https://linkedin.com/in/emilyrodriguez",
  },
];

export default function AboutUsContent() {
  return (
    <div className="flex-1 space-y-12">
      <section id="about-us" className="scroll-mt-24">
        <Card className="border border-white/20 bg-[#03050A]/50 backdrop-blur-sm p-10">
          <CardHeader>
            <span className="bg-gradient-to-r from-primary to-secondary h-12 w-12 rounded-full text-center flex items-center justify-center mb-3">
              <BookOpen />
            </span>
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              আমাদের বিস্তারিত
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 leading-relaxed">
              orem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and
              more recently with desktop publishing software like
              Aldus PageMaker including versions of Lorem Ipsum. orem
              Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and
              more recently with desktop publishing software like
              Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="our-mission" className="scroll-mt-24">
        <Card className="border border-white/20 bg-[#03050A]/50 backdrop-blur-sm p-10">
          <CardHeader>
            <span className="bg-gradient-to-r from-primary to-secondary h-12 w-12 rounded-full text-center flex items-center justify-center mb-3">
              <Lightbulb />
            </span>
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              আমাদের মিশন
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 leading-relaxed">
              orem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and
              more recently with desktop publishing software like
              Aldus PageMaker including versions of Lorem Ipsum. orem
              Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and
              more recently with desktop publishing software like
              Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="our-vission" className="scroll-mt-24">
        <Card className="border border-white/20 bg-[#03050A]/50 backdrop-blur-sm p-10">
          <CardHeader>
            <span className="bg-gradient-to-r from-primary to-secondary h-12 w-12 rounded-full text-center flex items-center justify-center mb-3">
              <Speech />
            </span>
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              আমাদের ভিশন
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 leading-relaxed">
              orem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and
              more recently with desktop publishing software like
              Aldus PageMaker including versions of Lorem Ipsum. orem
              Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and
              more recently with desktop publishing software like
              Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="our-team" className="scroll-mt-24">
        <Card className="border border-white/20 bg-[#03050A]/50 backdrop-blur-sm p-10">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              আমাদের টিম
            </CardTitle>
          </CardHeader>
          <CardContent>
            <OurTeamGrid teamMembers={teamMembers} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

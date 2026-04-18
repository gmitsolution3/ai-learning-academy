import { IUserStudentProfile } from "@/types";
import {
  Briefcase,
  Calendar,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  School,
  User,
  VenusAndMars,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import InfoItem from "@/components/UserDashboard/profile/InfoItem";

interface IProps {
  userData: IUserStudentProfile;
}

export default function ProfileInfoCard({ userData }: IProps) {
  const infoSections = [
    {
      title: "Personal Information",
      icon: User,
      fields: [
        { icon: User, label: "Full Name", value: userData?.name },
        { icon: Mail, label: "Email", value: userData?.email },
        {
          icon: Phone,
          label: "Phone",
          value: userData?.phone || "Not provided",
        },
        {
          icon: VenusAndMars,
          label: "Gender",
          value: userData?.gender || "Not provided",
        },
        {
          icon: Calendar,
          label: "Age",
          value: userData?.age
            ? `${userData.age} years`
            : "Not provided",
        },
      ],
    },
    {
      title: "Academic Information",
      icon: GraduationCap,
      fields: [
        {
          icon: School,
          label: "Institute",
          value: userData?.instituteName || "Not provided",
        },
        {
          icon: GraduationCap,
          label: "Education Level",
          value: userData?.educationLevel || "Not provided",
        },
        {
          icon: Briefcase,
          label: "Occupation",
          value: userData?.occupation || "Not provided",
        },
      ],
    },
    {
      title: "Contact Information",
      icon: MapPin,
      fields: [
        {
          icon: MapPin,
          label: "Address",
          value: userData?.address || "Not provided",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {infoSections.map((section, idx) => (
        <Card
          key={idx}
          className="border-white/10 bg-black/40 backdrop-blur-xl"
        >
          <CardHeader>
            <div className="flex items-center gap-2">
              <section.icon className="h-5 w-5 text-secondary" />
              <CardTitle className="text-white">
                {section.title}
              </CardTitle>
            </div>
          </CardHeader>
          <Separator className="bg-white/10" />
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields.map((field, fieldIdx) => (
                <InfoItem
                  key={fieldIdx}
                  icon={field.icon}
                  label={field.label}
                  value={field.value}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Bio Section */}
      {userData?.bio && (
        <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">About Me</CardTitle>
          </CardHeader>
          <Separator className="bg-white/10" />
          <CardContent className="pt-6">
            <p className="text-white/80 leading-relaxed">
              {userData.bio}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

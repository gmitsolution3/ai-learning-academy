import { Card, CardContent } from "@/components/ui/card";
import { IUserStudentProfile } from "@/types";
import { BookOpen, GraduationCap, Trophy, Users } from "lucide-react";

interface IProps {
  userData: IUserStudentProfile;
}

export default function StudentStats({ userData }: IProps) {
  const stats = [
    {
      icon: BookOpen,
      label: "Enrolled Courses",
      value: userData?.enrolledCourses?.length || 0,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Trophy,
      label: "Completed Courses",
      value: userData?.completedCourses?.length || 0,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Users,
      label: "Total Hours Learned",
      value: userData?.totalLearningHours || 0,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: GraduationCap,
      label: "Certificates Earned",
      value: userData?.certificates?.length || 0,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="border-white/10 bg-black/40 backdrop-blur-xl"
        >
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}
              >
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-white/50">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

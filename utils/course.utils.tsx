import { Badge } from "@/components/ui/badge";
import { Globe, XCircle, CheckCircle, Archive } from "lucide-react";

export const CourseLevelBadge = ({ level }: { level: string }) => {
  const variants: Record<string, string> = {
    beginner:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    intermediate:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    advanced:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  };

  const labels: Record<string, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  };

  return (
    <Badge className={variants[level] || variants.beginner}>
      {labels[level] || level}
    </Badge>
  );
};

export const CourseStatusBadge = ({ status }: { status: string }) => {
  const variants: Record<string, string> = {
    draft:
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    published:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    archived:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  };

  const icons: Record<string, React.ReactNode> = {
    draft: <XCircle className="h-3 w-3 mr-1" />,
    published: <CheckCircle className="h-3 w-3 mr-1" />,
    archived: <Archive className="h-3 w-3 mr-1" />,
  };

  const labels: Record<string, string> = {
    draft: "Draft",
    published: "Published",
    archived: "Archived",
  };

  return (
    <Badge className={variants[status] || variants.draft}>
      {icons[status]}
      {labels[status] || status}
    </Badge>
  );
};

export const LanguageBadge = ({ language }: { language: string }) => {
  const languages: Record<string, string> = {
    bangla: "বাংলা",
    english: "English",
    hindi: "हिन्दी",
  };

  return (
    <Badge variant="outline">
      <Globe className="mr-1 h-3 w-3" />
      {languages[language] || language}
    </Badge>
  );
};

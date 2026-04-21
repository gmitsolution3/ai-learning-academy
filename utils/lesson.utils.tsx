import {
  FileText,
  Video,
  LinkIcon,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";


export const ContentTypeBadge = ({ type }: { type: string }) => {
  const variants: Record<string, string> = {
    text: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    video:
      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    link: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  };

  const icons: Record<string, React.ReactNode> = {
    text: <FileText className="mr-1 h-3 w-3" />,
    video: <Video className="mr-1 h-3 w-3" />,
    link: <LinkIcon className="mr-1 h-3 w-3" />,
  };

  const labels: Record<string, string> = {
    text: "Text",
    video: "Video",
    link: "Link",
  };

  return (
    <Badge className={variants[type] || variants.text}>
      {icons[type]}
      {labels[type] || type}
    </Badge>
  );
};


export const CompletionBadge = ({
  completed,
}: {
  completed: boolean;
}) => {
  return completed ? (
    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
      <CheckCircle className="mr-1 h-3 w-3" />
      Completed
    </Badge>
  ) : (
    <Badge variant="outline" className="text-muted-foreground">
      <XCircle className="mr-1 h-3 w-3" />
      Not Started
    </Badge>
  );
};

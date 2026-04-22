import { Badge } from "@/components/ui/badge";
import { IEnrolledType } from "@/types";
import { TrendingDown, TrendingUp, Users } from "lucide-react";

export const BatchStatusBadge = ({ status }: { status: string }) => {
  const variants: Record<string, string> = {
    ongoing:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    completed:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    upcoming:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    cancelled:
      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  const labels: Record<string, string> = {
    ongoing: "Ongoing",
    completed: "Completed",
    upcoming: "Upcoming",
    cancelled: "Cancelled",
  };

  return (
    <Badge className={variants[status] || variants.upcoming}>
      {labels[status] || status}
    </Badge>
  );
};

export const ProgressBar = ({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) => {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>Progress</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export const EnrollmentSummary = ({
  types,
}: {
  types: IEnrolledType[];
}) => {
  const totalEnrolled = types.reduce((sum, t) => sum + t.enrolled, 0);
  const totalMax = types.reduce((sum, t) => sum + t.max_student, 0);
  const percentage =
    totalMax > 0 ? (totalEnrolled / totalMax) * 100 : 0;

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-sm">
        <Users className="h-3 w-3 text-muted-foreground" />
        <span className="font-medium">
          {totalEnrolled}/{totalMax}
        </span>
        <span className="text-xs text-muted-foreground">
          ({Math.round(percentage)}% filled)
        </span>
      </div>
      <div className="flex gap-2 text-xs text-muted-foreground">
        {types.map((type, idx) => (
          <span key={idx}>
            {type.type}: {type.enrolled}/{type.max_student}
          </span>
        ))}
      </div>
    </div>
  );
};

export const EnrollmentCard = ({
  type,
  max_student,
  enrolled,
}: IEnrolledType) => {
  const percentage =
    max_student > 0 ? (enrolled / max_student) * 100 : 0;
  const isFull = enrolled >= max_student;
  const isAlmostFull = percentage >= 80 && percentage < 100;

  const getStatusIcon = () => {
    if (isFull)
      return <TrendingUp className="h-4 w-4 text-red-500" />;
    if (isAlmostFull)
      return <TrendingUp className="h-4 w-4 text-yellow-500" />;
    return <TrendingDown className="h-4 w-4 text-green-500" />;
  };

  const getStatusColor = () => {
    if (isFull) return "text-red-600";
    if (isAlmostFull) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="border rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold">{type}</span>
        </div>
        {getStatusIcon()}
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Enrollment</span>
          <span className={`font-medium ${getStatusColor()}`}>
            {enrolled}/{max_student}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isFull
                ? "bg-red-500"
                : isAlmostFull
                  ? "bg-yellow-500"
                  : "bg-green-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {isFull
            ? "Fully booked"
            : isAlmostFull
              ? "Almost full"
              : `${Math.round(percentage)}% filled`}
        </p>
      </div>
    </div>
  );
};

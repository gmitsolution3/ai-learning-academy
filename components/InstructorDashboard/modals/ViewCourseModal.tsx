"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  DollarSign,
  Globe,
  BookOpen,
  User,
  Tag,
  FileText,
  Video,
  Eye,
  Users,
  Hash,
  FolderTree,
  TrendingDown,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { formatDate, formatPrice, formatDuration } from "@/utils";
import { ICourse } from "@/types";

interface ViewCourseModalProps {
  course: ICourse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Course level badge
const CourseLevelBadge = ({ level }: { level: string }) => {
  const variants: Record<string, string> = {
    beginner:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    intermediate:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    intermediated:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    advanced:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  };

  const labels: Record<string, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    intermediated: "Intermediate",
    advanced: "Advanced",
  };

  return (
    <Badge className={variants[level] || variants.beginner}>
      {labels[level] || level}
    </Badge>
  );
};

// Course status badge
const CourseStatusBadge = ({ status }: { status: string }) => {
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

// Language badge
const LanguageBadge = ({ language }: { language: string }) => {
  const languages: Record<string, string> = {
    bangla: "বাংলা",
    english: "English",
    hindi: "हिन्दी",
    spanish: "Español",
    french: "Français",
  };

  return (
    <Badge variant="outline">
      <Globe className="mr-1 h-3 w-3" />
      {languages[language] || language}
    </Badge>
  );
};

const InfoRow = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: any;
}) => (
  <div className="flex items-start justify-between p-4 border-b last:border-0">
    <div className="flex items-center gap-2 text-muted-foreground">
      {Icon && <Icon className="h-4 w-4" />}
      <span className="text-sm font-medium">{label}</span>
    </div>
    <div className="text-sm font-medium text-right">{value}</div>
  </div>
);

export default function ViewCourseModal({
  course,
  open,
  onOpenChange,
}: ViewCourseModalProps) {
  if (!course) return null;

  const hasDiscount =
    course.discount_price &&
    course.discount_price < course.regular_price;
  const savings = hasDiscount
    ? course.regular_price - course.discount_price
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            Course Details
            <CourseStatusBadge status={course.status} />
          </DialogTitle>
          <DialogDescription>
            View detailed information about this course.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Thumbnail Section */}
          {course.thumbnail && (
            <div className="rounded-lg overflow-hidden border bg-muted">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display =
                    "none";
                }}
              />
            </div>
          )}

          {/* Preview Video Section */}
          {course.preview_video &&
            (() => {
              const getYouTubeEmbedUrl = (url: string) => {
                const match = url.match(
                  /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/,
                );
                const videoId =
                  match && match[2].length === 11 ? match[2] : null;
                return videoId
                  ? `https://www.youtube.com/embed/${videoId}`
                  : null;
              };
              const embedUrl = getYouTubeEmbedUrl(
                course.preview_video,
              );
              return embedUrl ? (
                <Field>
                  <FieldLabel>Preview Video</FieldLabel>
                  <FieldContent>
                    <div className="aspect-video rounded-lg overflow-hidden border bg-muted">
                      <iframe
                        src={embedUrl}
                        title="Course preview video"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </FieldContent>
                  <FieldDescription>
                    Course preview/trailer video
                  </FieldDescription>
                </Field>
              ) : null;
            })()}

          <FieldGroup>
            {/* Course Title */}
            <Field>
              <FieldLabel>Course Title</FieldLabel>
              <FieldContent>
                <div className="text-lg font-semibold">
                  {course.title}
                </div>
              </FieldContent>
              <FieldDescription>
                The main title of the course
              </FieldDescription>
            </Field>

            {/* Slug */}
            <Field>
              <FieldLabel>Slug</FieldLabel>
              <FieldContent>
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  {course.slug}
                </code>
              </FieldContent>
              <FieldDescription>
                URL-friendly identifier for the course
              </FieldDescription>
            </Field>

            {/* Category Information */}
            {course.category && (
              <Field>
                <FieldLabel>Category</FieldLabel>
                <FieldContent>
                  <div className="flex items-center gap-2">
                    <FolderTree className="h-4 w-4 text-muted-foreground" />
                    <span>{course.category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {course.category.slug}
                    </Badge>
                  </div>
                </FieldContent>
                <FieldDescription>
                  {course.category.description || "Course category"}
                </FieldDescription>
              </Field>
            )}

            {/* Short Description */}
            <Field>
              <FieldLabel>Short Description</FieldLabel>
              <FieldContent>
                <p className="text-muted-foreground">
                  {course.short_description}
                </p>
              </FieldContent>
              <FieldDescription>
                Brief overview of the course
              </FieldDescription>
            </Field>

            {/* Full Description */}
            <Field>
              <FieldLabel>Full Description</FieldLabel>
              <FieldContent>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {course.full_description}
                  </p>
                </div>
              </FieldContent>
              <FieldDescription>
                Detailed course description
              </FieldDescription>
            </Field>

            {/* Course Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 rounded-lg border bg-muted/30">
              {/* Course Level */}
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Level
                  </p>
                  <CourseLevelBadge level={course.course_level} />
                </div>
              </div>

              {/* Language */}
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Language
                  </p>
                  <LanguageBadge language={course.language} />
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Total Duration
                  </p>
                  <p className="font-medium">
                    {formatDuration(course.total_duration)}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Price
                  </p>
                  <div>
                    {hasDiscount ? (
                      <div>
                        <span className="font-semibold text-green-600">
                          {formatPrice(course.discount_price)}
                        </span>
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          {formatPrice(course.regular_price)}
                        </span>
                        <Badge
                          variant="secondary"
                          className="ml-2 text-xs"
                        >
                          Save {formatPrice(savings)}
                        </Badge>
                      </div>
                    ) : (
                      <span className="font-semibold">
                        {formatPrice(course.regular_price)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Additional Information
              </h4>
              <div className="rounded-lg border">
                <InfoRow
                  label="Course ID"
                  value={
                    <code className="text-xs">{course._id}</code>
                  }
                  icon={Hash}
                />
                <InfoRow
                  label="Created At"
                  value={formatDate(course.created_at)}
                  icon={Calendar}
                />
                <InfoRow
                  label="Last Updated"
                  value={formatDate(course.updated_at)}
                  icon={Calendar}
                />
                <InfoRow
                  label="Number of Instructors"
                  value={course.instructor_id.length}
                  icon={Users}
                />
                <InfoRow
                  label="Instructor IDs"
                  value={
                    <div className="text-right">
                      {course.instructor_id.map((id, index) => (
                        <code key={id} className="text-xs block">
                          {id}
                          {index < course.instructor_id.length - 1 &&
                            ","}
                        </code>
                      ))}
                    </div>
                  }
                  icon={User}
                />
              </div>
            </div>

            {/* Category Details (if available) */}
            {course.category && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <FolderTree className="h-4 w-4" />
                  Category Information
                </h4>
                <div className="rounded-lg border">
                  <InfoRow
                    label="Category Name"
                    value={course.category.name}
                    icon={Tag}
                  />
                  <InfoRow
                    label="Category Slug"
                    value={
                      <code className="text-xs">
                        {course.category.slug}
                      </code>
                    }
                    icon={Hash}
                  />
                  <InfoRow
                    label="Category Description"
                    value={
                      course.category.description || "No description"
                    }
                    icon={FileText}
                  />
                  <InfoRow
                    label="Category ID"
                    value={
                      <code className="text-xs">
                        {course.category._id}
                      </code>
                    }
                    icon={Hash}
                  />
                </div>
              </div>
            )}
          </FieldGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const Archive = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="5" x="2" y="3" rx="1" />
    <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
    <path d="M10 12h4" />
  </svg>
);

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { formatDate, formatDuration } from "@/utils";
import {
  Calendar,
  CheckCircle,
  Clock,
  ExternalLink,
  FileText,
  Hash,
  Link as LinkIcon,
  Video,
  XCircle,
} from "lucide-react";

interface Lesson {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content_type: "text" | "video" | "link";
  content_url: string;
  duration: number;
  order_index: number;
  is_completed: boolean;
  created_at?: string;
  updated_at?: string;
}

interface ViewLessonModalProps {
  lesson: Lesson | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Format order index with suffix
const formatOrderIndex = (index: number) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = index % 100;
  const suffix =
    suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
  return `${index}${suffix}`;
};

// Content type badge component
const ContentTypeBadge = ({ type }: { type: string }) => {
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

// Completion status badge
const CompletionBadge = ({ completed }: { completed: boolean }) => {
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

export default function ViewLessonModal({
  lesson,
  open,
  onOpenChange,
}: ViewLessonModalProps) {
  if (!lesson) return null;

  // Helper to get YouTube embed URL if it's a YouTube video
  const getYouTubeEmbedUrl = (url: string): string | undefined => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId
      ? `https://www.youtube.com/embed/${videoId}`
      : undefined;
  };

  const isYouTubeVideo =
    lesson.content_type === "video" &&
    lesson.content_url.match(/(youtube\.com|youtu\.be)/);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Lesson Details
          </DialogTitle>
          <DialogDescription>
            View detailed information about this lesson.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <FieldGroup>
            {/* Lesson Title */}
            <Field>
              <FieldLabel>Lesson Title</FieldLabel>
              <FieldContent>
                <div className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  {lesson.title}
                </div>
              </FieldContent>
              <FieldDescription>
                The title of the lesson
              </FieldDescription>
            </Field>

            {/* Order Index */}
            <Field>
              <FieldLabel>Order Index</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="secondary" className="text-base">
                    {formatOrderIndex(lesson.order_index)} Lesson
                  </Badge>
                </div>
              </FieldContent>
              <FieldDescription>
                The position of this lesson in the module
              </FieldDescription>
            </Field>

            {/* Slug */}
            <Field>
              <FieldLabel>Slug</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-muted-foreground" />
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {lesson.slug}
                  </code>
                </div>
              </FieldContent>
              <FieldDescription>
                URL-friendly identifier for the lesson
              </FieldDescription>
            </Field>

            {/* Content Type & Status Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Content Type</FieldLabel>
                <FieldContent>
                  <ContentTypeBadge type={lesson.content_type} />
                </FieldContent>
                <FieldDescription>
                  Type of lesson content
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel>Completion Status</FieldLabel>
                <FieldContent>
                  <CompletionBadge completed={lesson.is_completed} />
                </FieldContent>
                <FieldDescription>
                  Student's progress status
                </FieldDescription>
              </Field>
            </div>

            {/* Duration */}
            <Field>
              <FieldLabel>Duration</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {formatDuration(lesson.duration)}
                  </span>
                </div>
              </FieldContent>
              <FieldDescription>
                Estimated time to complete this lesson
              </FieldDescription>
            </Field>

            {/* Content URL */}
            <Field>
              <FieldLabel>Content URL</FieldLabel>
              <FieldContent>
                <div className="space-y-3 w-full">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    <code className="text-sm bg-muted px-2 py-1 rounded break-all flex-1">
                      {lesson.content_url}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() =>
                        window.open(lesson.content_url, "_blank")
                      }
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Content Preview for Videos */}
                  {lesson.content_type === "video" &&
                    isYouTubeVideo && (
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-2">
                          Video Preview:
                        </p>
                        <div className="aspect-video rounded-lg overflow-hidden border bg-muted">
                          <iframe
                            src={getYouTubeEmbedUrl(
                              lesson.content_url
                            )}
                            title="YouTube video player"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    )}
                </div>
              </FieldContent>
              <FieldDescription>
                Link to the lesson content
              </FieldDescription>
            </Field>

            {/* Description */}
            {lesson.description && (
              <Field>
                <FieldLabel>Description</FieldLabel>
                <FieldContent>
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {lesson.description}
                  </div>
                </FieldContent>
                <FieldDescription>
                  Detailed description of the lesson content
                </FieldDescription>
              </Field>
            )}

            {/* Lesson ID */}
            <Field>
              <FieldLabel>Lesson ID</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <code className="text-xs bg-muted px-2 py-1 rounded break-all">
                    {lesson._id}
                  </code>
                </div>
              </FieldContent>
              <FieldDescription>
                Unique identifier for the lesson
              </FieldDescription>
            </Field>

            {/* Timestamps */}
            {(lesson.created_at || lesson.updated_at) && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Timestamps
                </h4>
                <div className="rounded-lg border">
                  {lesson.created_at && (
                    <div className="flex items-start justify-between py-2 px-4 border-b last:border-0">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Created At
                        </span>
                      </div>
                      <div className="text-sm font-medium text-right">
                        {formatDate(lesson.created_at)}
                      </div>
                    </div>
                  )}
                  {lesson.updated_at && (
                    <div className="flex items-start justify-between py-2 px-4 border-b last:border-0">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Last Updated
                        </span>
                      </div>
                      <div className="text-sm font-medium text-right">
                        {formatDate(lesson.updated_at)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </FieldGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
}

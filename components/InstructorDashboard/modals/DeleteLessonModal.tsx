import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDelete } from "@/hooks/swr/useDelete";
import { formatDuration } from "@/utils";
import { notify } from "@/utils/notify";
import { Dispatch, SetStateAction } from "react";

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
}

interface DeleteLessonModalProps {
  lesson: Lesson | null;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

// Format order index with suffix
const formatOrderIndex = (index: number) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = index % 100;
  const suffix =
    suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
  return `${index}${suffix}`;
};

// Content type label
const getContentTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    text: "Text",
    video: "Video",
    link: "Link",
  };
  return labels[type] || type;
};

export default function DeleteLessonModal({
  lesson,
  open,
  onOpenChange,
}: DeleteLessonModalProps) {
  const { mutate: deleteLesson, isLoading } = useDelete(
    `/lessons/delete-lesson/${lesson?._id}`,
    {
      revalidateKey: `/lessons/get-lesson-by-module-id?moduleId=${lesson?._id}`,
    },
  );

  const handleDelete = async (lesson: Lesson) => {
    try {
      const res = await deleteLesson(lesson._id);

      if (res?.success) {
        notify.success("Lesson deleted successfully");
        onOpenChange(false);
      } else {
        notify.error(res?.message || "Failed to delete lesson");
      }
    } catch (error) {
      console.error("Error deleting lesson:", error);
      notify.error("An error occurred while deleting the lesson");
    }
  };

  if (!lesson) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Lesson</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{lesson.title}"? This
            action cannot be undone.
            {lesson.order_index !== undefined && (
              <p className="mt-2 text-yellow-600">
                Note: This is the{" "}
                {formatOrderIndex(lesson.order_index)} lesson in the
                module. Deleting it will reorder the remaining
                lessons.
              </p>
            )}
            {lesson.content_type && (
              <p className="mt-2 text-yellow-600">
                Note: This lesson contains{" "}
                {getContentTypeLabel(lesson.content_type)} content
                that will be permanently removed.
              </p>
            )}
            {lesson.duration > 0 && (
              <p className="mt-2 text-yellow-600">
                Note: This lesson has an estimated duration of{" "}
                {formatDuration(lesson.duration)}.
              </p>
            )}
            {lesson.description && (
              <p className="mt-2 text-yellow-600">
                Note: This lesson has a description that will be
                permanently removed.
              </p>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDelete(lesson)}
            disabled={isLoading}
          >
            {isLoading && (
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
            )}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

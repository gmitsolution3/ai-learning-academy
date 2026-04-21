import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { axiosInstance } from "@/lib/axios";
import { ILesson } from "@/types";
import { formatDuration } from "@/utils";
import { formatOrderIndex } from "@/utils/module.utils";
import { notify } from "@/utils/notify";
import { Dispatch, SetStateAction, useState } from "react";
import { mutate } from "swr";

interface DeleteLessonModalProps {
  lesson: ILesson | null;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  moduleId: string;
}

// Content type label
const getContentTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    text: "Text",
    video: "Video",
    link: "Link",
  };
  return labels[type] || type;
};

async function deleteLesson(lessonSlug: string, moduleId: string) {
  const res = await axiosInstance.delete(
    `/lessons/delete-single-lesson/${lessonSlug}?module_id=${moduleId}`,
  );
  return res.data;
}

export default function DeleteLessonModal({
  lesson,
  open,
  onOpenChange,
  moduleId,
}: DeleteLessonModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (lesson: ILesson) => {
    setIsLoading(true);
    try {
      const res = await deleteLesson(lesson.slug, moduleId);

      if (res?.success) {
        mutate(
          (key) => typeof key === "string" && key.startsWith("/lessons")
        );

        notify.success("Lesson deleted successfully");
        onOpenChange(false);
      } else {
        notify.error(res?.message || "Failed to delete lesson");
      }
    } catch (error) {
      console.error("Error deleting lesson:", error);
      notify.error("An error occurred while deleting the lesson");
    } finally {
      setIsLoading(false);
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

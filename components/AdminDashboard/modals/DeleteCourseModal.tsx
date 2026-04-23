import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDelete } from "@/hooks/swr/useDelete";
import { notify } from "@/utils/notify";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { ICourse } from "@/types";

interface DeleteCourseModalProps {
  course: ICourse | null;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

// Check if course has any enrollments (you can implement this based on your API)
const hasEnrollments = async (courseId: string) => {
  // Implement logic to check if course has enrolled students
  // This could be an API call or checking from props
  return false;
};

// Check if course has any published lectures
const hasPublishedContent = (course: ICourse) => {
  return course.status === "published";
};

export default function DeleteCourseModal({
  course,
  open,
  onOpenChange,
}: DeleteCourseModalProps) {
  const { mutate: deleteCourse, isLoading } = useDelete(
    `/course/delete-course`,
    {
      revalidateKey: "/course/get-all-courses",
    },
  );

  const handleDelete = async (course: ICourse) => {
    // Check if course has enrolled students
    const hasActiveEnrollments = await hasEnrollments(course._id);

    if (hasActiveEnrollments) {
      notify.warning("Cannot delete: course has enrolled students");
      onOpenChange(false);
      return;
    }

    // Check if course is published with content
    if (hasPublishedContent(course)) {
      notify.warning(
        "Cannot delete: published course must be archived first",
      );
      onOpenChange(false);
      return;
    }

    try {
      const res = await deleteCourse(course._id);

      if (res?.success) {
        notify.success("Course deleted successfully");
        onOpenChange(false);
      } else {
        notify.error(res?.message || "Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      notify.error("An error occurred while deleting the course");
    }
  };

  if (!course) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Course</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{course.title}"? This
            action cannot be undone.
            {course.status === "published" && (
              <p className="mt-2 text-yellow-600">
                Note: This course is currently published. Please
                archive it first before deleting.
              </p>
            )}
            {course.instructor_id &&
              course.instructor_id.length > 0 && (
                <p className="mt-2 text-yellow-600">
                  Note: This course has {course.instructor_id.length}{" "}
                  instructor(s) assigned. Deleting it will remove
                  their association.
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
            onClick={() => handleDelete(course)}
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

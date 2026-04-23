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
import { formatDate } from "@/utils";
import { IBatch } from "@/types";

interface DeleteBatchModalProps {
  batch: IBatch | null;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

// Batch status label
const getBatchStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    ongoing: "Ongoing",
    completed: "Completed",
    upcoming: "Upcoming",
    cancelled: "Cancelled",
  };
  return labels[status] || status;
};

export default function DeleteBatchModal({
  batch,
  open,
  onOpenChange,
}: DeleteBatchModalProps) {
  const { mutate: deleteBatch, isLoading } = useDelete(
    `/batch/deleted-batch`,
    {
      revalidateKey: "/batch/get-all-batches",
    },
  );

  const handleDelete = async (batch: IBatch) => {
    try {
      const res = await deleteBatch(batch._id);

      if (res?.success) {
        notify.success("Batch deleted successfully");
        onOpenChange(false);
      } else {
        notify.error(res?.message || "Failed to delete batch");
      }
    } catch (error) {
      console.error("Error deleting batch:", error);
      notify.error("An error occurred while deleting the batch");
    }
  };

  if (!batch) return null;

  const totalEnrolled = batch.enrolled_type.reduce(
    (sum, t) => sum + t.enrolled,
    0,
  );
  const hasEnrolledStudents = totalEnrolled > 0;
  const isOngoing = batch.batch_status === "ongoing";
  const isCompleted = batch.batch_status === "completed";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Batch</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{batch.batch_name}"? This
            action cannot be undone.
            {isOngoing && (
              <p className="mt-2 text-red-600 font-medium">
                Warning: This batch is currently ongoing. Deleting it will affect all enrolled students.
              </p>
            )}
            {isCompleted && (
              <p className="mt-2 text-yellow-600">
                Note: This batch is marked as completed. Deleting it will remove all completion records.
              </p>
            )}
            {hasEnrolledStudents && (
              <p className="mt-2 text-red-600">
                Warning: This batch has {totalEnrolled} enrolled student(s). 
                Deleting it will remove their enrollment records.
              </p>
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Batch Information Summary */}
        <div className="my-4 p-4 rounded-lg border bg-muted/30 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Course:</span>
            <span className="font-medium">{batch.course.title}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Status:</span>
            <span className="font-medium">{getBatchStatusLabel(batch.batch_status)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Date Range:</span>
            <span className="font-medium">
              {formatDate(batch.batch_starting_date)} - {formatDate(batch.batch_ending_date)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Module Progress:</span>
            <span className="font-medium">
              {batch.completed_module}/{batch.total_module} completed
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Enrolled:</span>
            <span className="font-medium">{totalEnrolled} students</span>
          </div>
        </div>

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
            onClick={() => handleDelete(batch)}
            disabled={isLoading}
          >
            {isLoading && (
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
            )}
            Delete Batch
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
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
import { IModule } from "@/types";
import { formatOrderIndex } from "@/utils/module.utils";
import { notify } from "@/utils/notify";
import { Dispatch, SetStateAction } from "react";

interface DeleteModuleModalProps {
  module: IModule | null;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteModuleModal({
  module,
  open,
  onOpenChange,
}: DeleteModuleModalProps) {
  const { mutate: deleteModule, isLoading } = useDelete(
    `/modules/delete-modules`,
    {
      revalidateKey: `/modules/get-modules-by-course-id/${module?.course_id}`,
    },
  );

  const handleDelete = async (module: IModule) => {
    try {
      const res = await deleteModule(module._id);

      if (res?.success) {
        notify.success("Module deleted successfully");
        onOpenChange(false);
      } else {
        notify.error(res?.message || "Failed to delete module");
      }
    } catch (error) {
      console.error("Error deleting module:", error);
      notify.error("An error occurred while deleting the module");
    }
  };

  if (!module) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Module</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{module.title}"? This
            action cannot be undone.
            {module.order_index !== undefined && (
              <p className="mt-2 text-yellow-600">
                Note: This is the{" "}
                {formatOrderIndex(module.order_index)} module in the
                course. Deleting it will reorder the remaining
                modules.
              </p>
            )}
            {module.description && (
              <p className="mt-2 text-yellow-600">
                Note: This module has a description that will be
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
            onClick={() => handleDelete(module)}
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

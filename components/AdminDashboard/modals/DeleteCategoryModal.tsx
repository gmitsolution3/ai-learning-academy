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
import { ICategoryListType } from "@/types";
import { Button } from "@/components/ui/button";
import { Dispatch } from "react";
import { SetStateAction } from "react";

const hasChildren = (categories: ICategoryListType[], id: string) => {
  return categories.some((cat) => cat.parent_id?._id === id);
};

export default function DeleteCategoryModal({
  category,
  categories,
  open,
  onOpenChange,
}: {
  category: ICategoryListType;
  categories: ICategoryListType[];
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) {
  const { mutate: deleteCategory, isLoading } = useDelete(
    `/categories/delete-category`,
    {
      revalidateKey: "/categories/get-categories",
    },
  );

  const handleDelete = async (category: ICategoryListType) => {
    if (hasChildren(categories, category._id)) {
      notify.warning("Cannot delete: category has child categories");
      onOpenChange(false);
      return;
    }

    try {
      const res = await deleteCategory(category._id);

      if (res?.success) {
        notify.success("Category deleted successfully");
        onOpenChange(false);
      } else {
        notify.error(res?.message || "Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      notify.error("An error occurred while deleting the category");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{category.name}"? This
            action cannot be undone.
            {category.parent_id !== null && category.parent_id && (
              <p className="mt-2 text-yellow-600">
                Note: This category has a parent category(
                {category.parent_id.name}). Deleting it may affect
                subcategories.
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
            onClick={() => handleDelete(category)}
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

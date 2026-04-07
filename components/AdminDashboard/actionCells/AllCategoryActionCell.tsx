import { useState } from "react";
import { ICategoryListType } from "@/types/category.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ViewCategoryModal from "@/components/AdminDashboard/modals/ViewCategoryModal";
import EditCategoryModal from "@/components/AdminDashboard/modals/EditCategoryModal";
import DeleteCategoryModal from "@/components/AdminDashboard/modals/DeleteCategoryModal";

export default function AllCategoryActionCell({
  category,
  categories,
}: {
  category: ICategoryListType;
  categories?: ICategoryListType[];
}) {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setShowViewModal(true)}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowEditModal(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteCategoryModal
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        category={category}
        categories={categories as ICategoryListType[]}
      />

      <ViewCategoryModal
        category={category}
        open={showViewModal}
        onOpenChange={setShowViewModal}
      />

      <EditCategoryModal
        category={category}
        open={showEditModal}
        onOpenChange={setShowEditModal}
        onSuccess={() => {
          setShowEditModal(false);
        }}
        categories={categories}
      />
    </>
  );
}

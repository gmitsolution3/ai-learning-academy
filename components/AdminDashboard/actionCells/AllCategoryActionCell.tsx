import { useState } from "react";
import { ICategoryListType } from "@/types/category.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Edit, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import ViewCategoryModal from "@/components/AdminDashboard/modals/ViewCategoryModal";
import EditCategoryModal from "@/components/AdminDashboard/modals/EditCategoryModal";

export default function AllCategoryActionCell({
  category,
  categories,
}: {
  category: ICategoryListType;
  categories?: ICategoryListType[];
}) {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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
        </DropdownMenuContent>
      </DropdownMenu>

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

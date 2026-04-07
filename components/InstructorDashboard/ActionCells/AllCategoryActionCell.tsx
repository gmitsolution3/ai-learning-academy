import { useState } from "react";
import { ICategory } from "@/types/category.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Edit, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ViewCategoryModal from "../modals/ViewCategoryModal";

export default function AllCategoryActionCell({
  category,
}: {
  category: ICategory;
}) {
  const [showViewModal, setShowViewModal] = useState(false);

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
          <DropdownMenuItem asChild>
            <Link
              href={`/categories/edit/${category._id}`}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ViewCategoryModal
        category={category}
        open={showViewModal}
        onOpenChange={setShowViewModal}
      />
    </>
  );
}

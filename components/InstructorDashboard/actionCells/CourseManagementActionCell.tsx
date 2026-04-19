"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ICourse } from "@/types";
import {
  Edit,
  Eye,
  MoreHorizontal,
  Trash2,
  VectorSquare,
} from "lucide-react";
import { useState } from "react";

import DeleteCourseModal from "../modals/DeleteCourseModal";
import ViewCourseModal from "../modals/ViewCourseModal";
import EditCourseModal from "./../modals/EditCourseModal";
import { useRouter } from "next/navigation";

export default function CourseManagementActionCell({
  course,
  categories,
  instructors,
}: {
  course: ICourse;
  categories?: any[];
  instructors?: any[];
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const router = useRouter();

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
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `/instructor-dashboard/modules-management/${course?._id}`,
              )
            }
          >
            <VectorSquare className="mr-2 h-4 w-4" />
            Modules
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowViewModal(true)}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowEditModal(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modals would go here - you can create similar modal components for courses */}
      <ViewCourseModal
        course={course}
        open={showViewModal}
        onOpenChange={setShowViewModal}
      />

      <EditCourseModal
        course={course}
        open={showEditModal}
        onOpenChange={setShowEditModal}
        onSuccess={() => {
          setShowEditModal(false);
        }}
        categories={categories}
        instructors={instructors}
      />

      <DeleteCourseModal
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        course={course}
      />
    </>
  );
}

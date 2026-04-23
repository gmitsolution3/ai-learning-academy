import EditLessonModal from "@/components/AdminDashboard/modals/EditLessonModal";
import ViewLessonModal from "@/components/AdminDashboard/modals/ViewLessonModal";
import DeleteLessonModal from "@/components/AdminDashboard/modals/DeleteLessonModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ILesson } from "@/types";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";


export default function LessonManagementActionCell({
  lesson,
  moduleId,
}: {
  lesson: ILesson;
  moduleId: string;
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

      <EditLessonModal
        lesson={lesson}
        open={showEditModal}
        onOpenChange={setShowEditModal}
        onSuccess={() => {
          setShowEditModal(false);
        }}
        moduleId={moduleId}
      />

      <ViewLessonModal
        lesson={lesson}
        open={showViewModal}
        onOpenChange={setShowViewModal}
      />

      <DeleteLessonModal
        lesson={lesson}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        moduleId={moduleId}
      />
    </>
  );
}

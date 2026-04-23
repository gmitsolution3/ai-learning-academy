import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IModule } from "@/types/module.type";
import {
  BookCheck,
  Edit,
  Eye,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import DeleteModuleModal from "@/components/InstructorDashboard/modals/DeleteModuleModal";
import EditModuleModal from "@/components/InstructorDashboard/modals/EditModuleModal";
import ViewModuleModal from "@/components/InstructorDashboard/modals/ViewModuleModal";

export default function ModuleManagementActionCell({
  module,
  courseId,
}: {
  module: IModule;
  courseId: string;
}) {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
                `/instructor-dashboard/lesson-management/${module._id}`,
              )
            }
          >
            <BookCheck className="mr-2 h-4 w-4" />
            Lessons
          </DropdownMenuItem>
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

      <ViewModuleModal
        module={module}
        open={showViewModal}
        onOpenChange={setShowViewModal}
      />

      <DeleteModuleModal
        module={module}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />

      <EditModuleModal
        module={module}
        open={showEditModal}
        onOpenChange={setShowEditModal}
        onSuccess={() => {
          setShowEditModal(false);
        }}
        courseId={courseId}
      />
    </>
  );
}

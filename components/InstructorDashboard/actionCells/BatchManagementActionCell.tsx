import { useState } from "react";
import { IBatch, ICourse } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Edit, MoreHorizontal, Trash2, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import ViewBatchModal from "@/components/InstructorDashboard/modals/ViewBatchModal";
import EditBatchModal from "@/components/InstructorDashboard/modals/EditBatchModal";
// import DeleteBatchModal from "@/components/InstructorDashboard/modals/DeleteBatchModal";

export default function BatchManagementActionCell({
  batch,
  courses,
}: {
  batch: IBatch;
  courses?: ICourse[];
}) {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  // const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
          {/* <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>

      <ViewBatchModal
        batch={batch}
        open={showViewModal}
        onOpenChange={setShowViewModal}
      />

      <EditBatchModal
        batch={batch}
        open={showEditModal}
        onOpenChange={setShowEditModal}
        onSuccess={() => {
          setShowEditModal(false);
        }}
        courses={courses}
      />

      {/* <DeleteBatchModal
        batch={batch}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      /> */}
    </>
  );
}
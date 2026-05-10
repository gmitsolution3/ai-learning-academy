import { useState } from "react";
import { IConsultation } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Edit, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import ViewConsultationModal from "@/components/AdminDashboard/modals/ViewConsultationModal";
import EditConsultationModal from "@/components/AdminDashboard/modals/EditConsultationModal";
import { IUser } from "@/types";

interface ConsultationActionsCellProps {
  consultation: IConsultation;
  instructors?: IUser[];
}

export default function ConsultationActionsCell({
  consultation,
  instructors = [],
}: ConsultationActionsCellProps) {
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

      <ViewConsultationModal
        consultation={consultation}
        open={showViewModal}
        onOpenChange={setShowViewModal}
      />

      <EditConsultationModal
        consultation={consultation}
        open={showEditModal}
        onOpenChange={setShowEditModal}
        onSuccess={() => {
          setShowEditModal(false);
        }}
        instructors={instructors}
      />
    </>
  );
}
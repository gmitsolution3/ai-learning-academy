import ViewInstructorConsultationModal from "@/components/InstructorDashboard/modals/ViewInstructorConsultationModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IConsultation } from "@/types";
import { Eye, MoreHorizontal } from "lucide-react";
import {} from "radix-ui";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const ConsultationActionsCell = ({
  consultation,
}: {
  consultation: IConsultation;
}) => {
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
        </DropdownMenuContent>
      </DropdownMenu>

      <ViewInstructorConsultationModal
        consultation={consultation}
        open={showViewModal}
        onOpenChange={setShowViewModal}
      />
    </>
  );
};

export default ConsultationActionsCell;

"use state";

import { Button } from "@/components/ui/button";
import { IUser } from "@/types";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/lib/auth-context";
import { Trash2, UserCog } from "lucide-react";
import UpdateRoleModal from "../modals/UpdateRoleModal";
import DeleteUserModal from "./../modals/DeleteUserModal";
import { ADMIN, INSTRUCTOR } from "@/constants/role.constant";

export default function UserActionCell({ user }: { user: IUser }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const { session } = useSession();

  const loggedInUser = session?.user;

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
          <DropdownMenuSeparator />
          {loggedInUser?.role === ADMIN && (
            <>
              <DropdownMenuItem
                onClick={() => setShowRoleModal(true)}
              >
                <UserCog className="mr-2 h-4 w-4" />
                Update Role
              </DropdownMenuItem>
              <DropdownMenuItem className="text-yellow-500 focus:text-yellow-500">
                <UserCog className="mr-2 h-4 w-4" />
                Ban user
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </>
          )}

          {loggedInUser?.role === INSTRUCTOR && (
            <>
              <DropdownMenuItem className="text-yellow-500 focus:text-yellow-500">
                <UserCog className="mr-2 h-4 w-4" />
                Ban user
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Modals would go here - you can create similar modal components for users */}
      <DeleteUserModal
        user={user}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />

      <UpdateRoleModal
        user={user}
        open={showRoleModal}
        onOpenChange={setShowRoleModal}
      />
    </>
  );
}

"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Trash2,
  User,
  Mail,
  Calendar,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { formatJoinedDate, getUserInitials } from "@/utils";
import { IUser } from "@/types";
import { notify } from "@/utils/notify";
import { useDelete } from "@/hooks/swr/useDelete";

import { useSession } from "@/lib/auth-context";

interface IProps {
  user: IUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RoleBadge = ({ role }: { role: string }) => {
  const roleColors: Record<string, string> = {
    admin:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    instructor:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    user: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  };

  return (
    <Badge className={roleColors[role] || roleColors.user}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </Badge>
  );
};

export default function DeleteUserModal({
  user,
  open,
  onOpenChange,
}: IProps) {
  const { session } = useSession();
  // Check if user is admin for special warning.
  const isAdmin = user?.role === "admin";

  const isUserSuperAdmin = user?.isSuperAdmin;

  // Check if user is currently logged in.
  const isCurrentUser = session?.user?.id === user?._id;

  const { mutate: deleteUser, isLoading } = useDelete(
    `/users/delete-user`,
    {
      revalidateKey: "/users/get-all-users",
    },
  );

  const handleDelete = async (user: IUser) => {
    if (isUserSuperAdmin) {
      notify.warning(
        "This account is super admin and can not be deleted!",
      );
      return;
    }

    if (isCurrentUser) {
      notify.warning("You can not delete your own account!");
      return;
    }

    try {
      const res = await deleteUser(user._id);

      if (res?.success) {
        notify.success("User deleted successfully");
        onOpenChange(false);
      } else {
        notify.error(res?.message || "Failed to delete User");
      }
    } catch (error) {
      console.error("Error deleting User:", error);
      notify.error("An error occurred while deleting the User");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <DialogTitle className="text-xl">Delete User</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Are you sure you want to delete this user? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {/* User Information Preview */}
        <div className="my-4 p-4 rounded-lg border bg-muted/30">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.image} alt={user?.name} />
              <AvatarFallback>
                {getUserInitials(user?.name as string)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-semibold text-lg">
                  {user?.name}
                </h4>
                <RoleBadge role={user?.role as string} />
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  <span className="truncate">{user?.email}</span>
                </div>
                {user?.phone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-mono text-xs">📞</span>
                    <span>{user?.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    Joined{" "}
                    {formatJoinedDate(user?.createdAt as string)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Messages */}
        <div className="space-y-3">
          {isAdmin && (
            <div className="p-3 rounded-md bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-red-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-red-800 dark:text-red-400">
                    Warning: Admin User
                  </p>
                  <p className="text-red-700 dark:text-red-300">
                    This user has administrator privileges. Deleting
                    them may affect system management.
                  </p>
                </div>
              </div>
            </div>
          )}

          {isCurrentUser && (
            <div className="p-3 rounded-md bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-yellow-800 dark:text-yellow-400">
                    Warning: Current User
                  </p>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    You are trying to delete your own account. This
                    action will log you out immediately.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
            <div className="flex items-start gap-2">
              <Trash2 className="h-4 w-4 text-destructive mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-destructive">
                  This action will:
                </p>
                <ul className="list-disc list-inside mt-1 text-muted-foreground">
                  <li>Permanently delete the user account</li>
                  <li>
                    Remove all user data associated with this account
                  </li>
                  <li>Cannot be recovered after confirmation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="p-3 me-2"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDelete(user as IUser)}
            disabled={isLoading}
            className="gap-2 p-3"
          >
            {isLoading && (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
            )}
            <Trash2 className="h-4 w-4" />
            Delete User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

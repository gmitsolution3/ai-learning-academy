"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  AlertTriangle,
  Loader2,
  UserCog,
} from "lucide-react";
import { usePatch } from "@/hooks/swr/usePatch";
import { IUser } from "@/types";
import { notify } from "@/utils/notify";
import { getUserInitials } from "@/utils";

import { useSession } from "@/lib/auth-context";

interface IProps {
  user: IUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RoleBadge = ({ role }: { role: string }) => {
  const roleColors: Record<string, string> = {
    admin:
      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    instructor:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    user: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  };

  const roleIcons: Record<string, string> = {
    admin: "👑",
    instructor: "📚",
    user: "👤",
  };

  return (
    <Badge className={roleColors[role] || roleColors.user}>
      <span className="mr-1">{roleIcons[role] || "👤"}</span>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </Badge>
  );
};

const getRoleChangeWarning = (
  user: IUser,
  roleChanged: boolean,
  selectedRole: string,
) => {
  if (!roleChanged) return null;

  const warnings = {
    admin_to_instructor:
      "Downgrading from Admin to Instructor will remove administrative privileges.",
    admin_to_user:
      "Downgrading from Admin to User will remove all administrative privileges.",
    instructor_to_admin:
      "Upgrading to Admin will grant full system access and permissions.",
    user_to_admin:
      "Upgrading to Admin will grant full system access and permissions.",
  };

  const key =
    `${user.role}_to_${selectedRole}` as keyof typeof warnings;
  return warnings[key] || null;
};

export default function UpdateRoleModal({
  user,
  open,
  onOpenChange,
}: IProps) {
  const [selectedRole, setSelectedRole] = useState<string>("");

  const { session } = useSession();

  const { mutate: updateRole, isLoading } = usePatch(
    `/users/user-role-update`,
    {
      revalidateKey: "/users/get-all-users",
    },
  );

  // Check if user is admin for special warning.
  const isAdmin = user?.role === "admin";

  // Check is user is super admin
  const isUserSuperAdmin = user?.isSuperAdmin;

  // Check if user is currently logged in.
  const isCurrentUser = session?.user?.id === user?._id;

  const roleChanged = selectedRole !== user?.role;

  const warning = getRoleChangeWarning(
    user as IUser,
    roleChanged,
    selectedRole,
  );

  useEffect(() => {
    if (user && open) {
      setSelectedRole(user.role);
    }
  }, [user, open]);

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
  };

  const handleSubmit = async () => {
    if (!user || !selectedRole) return;

    if (isUserSuperAdmin) {
      notify.warning(
        "This account is super admin and can not be updated!",
      );
      return;
    }

    if (isCurrentUser) {
      notify.warning("You can not update your own account!");
      return;
    }

    // Check if role actually changed
    if (selectedRole === user.role) {
      notify.warning("No changes to update");
      onOpenChange(false);
      return;
    }

    try {
      const res = await updateRole({
        id: user._id,
        data: { role: selectedRole },
      });

      if (res?.success) {
        notify.success(
          `User role updated to ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} successfully`,
        );
        onOpenChange(false);
      } else {
        notify.error(res?.message || "Failed to update user role");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      notify.error("An error occurred while updating the user role");
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <UserCog className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-xl">
              Update User Role
            </DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Change the role permissions for this user.
          </DialogDescription>
        </DialogHeader>

        {/* User Information Preview */}
        <div className="my-4 p-4 rounded-lg border bg-muted/30">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>
                {getUserInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-semibold text-lg">{user.name}</h4>
                <RoleBadge role={user.role} />
              </div>
              <div className="mt-2">
                <p className="text-sm text-muted-foreground truncate">
                  {user.email}
                </p>
                {user.phone && (
                  <p className="text-sm text-muted-foreground">
                    {user.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <FieldGroup>
          {/* Role Selection */}
          <Field>
            <FieldLabel>Select New Role</FieldLabel>
            <FieldContent>
              <Select
                value={selectedRole}
                onValueChange={handleRoleChange}
              >
                <SelectTrigger className="w-full p-5">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <span>👑</span>
                      <span>Admin</span>
                      <Badge
                        variant="outline"
                        className="ml-2 text-xs"
                      >
                        Full Access
                      </Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="instructor">
                    <div className="flex items-center gap-2">
                      <span>📚</span>
                      <span>Instructor</span>
                      <Badge
                        variant="outline"
                        className="ml-2 text-xs"
                      >
                        Course Management
                      </Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="user">
                    <div className="flex items-center gap-2">
                      <span>👤</span>
                      <span>User</span>
                      <Badge
                        variant="outline"
                        className="ml-2 text-xs"
                      >
                        Student Access
                      </Badge>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </FieldContent>
            <FieldDescription>
              {selectedRole === "admin" &&
                "Admins have full system access and can manage all users and content."}
              {selectedRole === "instructor" &&
                "Instructors can create and manage courses, but have limited user management access."}
              {selectedRole === "user" &&
                "Users can browse and purchase courses, with basic account access."}
            </FieldDescription>
            <FieldError />
          </Field>
        </FieldGroup>

        {/* Warning Messages */}
        {warning && (
          <div className="p-3 rounded-md bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-yellow-800 dark:text-yellow-400">
                  Role Change Notice
                </p>
                <p className="text-yellow-700 dark:text-yellow-300">
                  {warning}
                </p>
              </div>
            </div>
          </div>
        )}

        {isAdmin && roleChanged && selectedRole !== "admin" && (
          <div className="p-3 rounded-md bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-red-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-red-800 dark:text-red-400">
                  Admin Privileges Will Be Removed
                </p>
                <p className="text-red-700 dark:text-red-300">
                  This user will lose all administrative access. Make
                  sure to transfer any important responsibilities
                  before downgrading.
                </p>
              </div>
            </div>
          </div>
        )}

        {isCurrentUser && roleChanged && (
          <div className="p-3 rounded-md bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-yellow-800 dark:text-yellow-400">
                  Updating Your Own Role
                </p>
                <p className="text-yellow-700 dark:text-yellow-300">
                  Changing your own role may affect your access to
                  certain features. You may need to log out and back
                  in for changes to take effect.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Role Comparison */}
        {roleChanged && (
          <div className="p-3 rounded-md bg-muted">
            <p className="text-sm font-semibold mb-2">
              Role Change Summary:
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">
                  Current
                </p>
                <RoleBadge role={user.role} />
              </div>
              <Shield className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">New</p>
                <RoleBadge role={selectedRole} />
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !roleChanged}
            className="gap-2"
          >
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <UserCog className="h-4 w-4" />
            Update Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

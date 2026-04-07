"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ICategory } from "@/types";
import { formatDate } from "@/utils";
import {
  Calendar,
  User,
  Link as LinkIcon,
  FileText,
  Image as ImageIcon,
  FolderTree,
} from "lucide-react";
import Image from "next/image";

interface IProps {
  category: ICategory | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ViewCategoryModal({
  category,
  open,
  onOpenChange,
}: IProps) {
  if (!category) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Category Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Image Section */}
          {category.image && (
            <div className="flex justify-center">
              <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  height={300}
                  width={300}
                />
              </div>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FolderTree className="h-4 w-4" />
                <span>Name</span>
              </div>
              <p className="font-medium">{category.name}</p>
            </div>

            {/* Slug */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LinkIcon className="h-4 w-4" />
                <span>Slug</span>
              </div>
              <p className="font-mono text-sm">{category.slug}</p>
            </div>

            {/* Parent Category */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FolderTree className="h-4 w-4" />
                <span>Parent Category</span>
              </div>
              <p>
                {category.parent_id === "null" || !category.parent_id
                  ? "None"
                  : category.parent_id}
              </p>
            </div>

            {/* Created At */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Created At</span>
              </div>
              <p>{formatDate(category.created_at)}</p>
            </div>

            {/* Updated At */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Updated At</span>
              </div>
              <p>{formatDate(category.updated_at)}</p>
            </div>

            {/* ID */}
            <div className="space-y-1 md:col-span-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Category ID</span>
              </div>
              <p className="font-mono text-sm break-all">
                {category._id}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-1 md:col-span-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>Description</span>
              </div>
              <p className="text-muted-foreground">
                {category.description || "No description provided"}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Hash, FileText, Link as LinkIcon, BookOpen } from "lucide-react";
import { formatDate } from "@/utils";
import { IModule } from "@/types";

interface ViewModuleModalProps {
  module: IModule | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Format order index with suffix
const formatOrderIndex = (index: number) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = index % 100;
  const suffix = suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
  return `${index}${suffix}`;
};

export default function ViewModuleModal({
  module,
  open,
  onOpenChange,
}: ViewModuleModalProps) {
  if (!module) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Module Details</DialogTitle>
          <DialogDescription>
            View detailed information about this module.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <FieldGroup>
            {/* Module Title */}
            <Field>
              <FieldLabel>Module Title</FieldLabel>
              <FieldContent>
                <div className="text-lg font-semibold flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  {module.title}
                </div>
              </FieldContent>
              <FieldDescription>
                The title of the module
              </FieldDescription>
            </Field>

            {/* Order Index */}
            <Field>
              <FieldLabel>Order Index</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="secondary" className="text-base">
                    {formatOrderIndex(module.order_index)} Module
                  </Badge>
                </div>
              </FieldContent>
              <FieldDescription>
                The position of this module in the course curriculum
              </FieldDescription>
            </Field>

            {/* Slug */}
            <Field>
              <FieldLabel>Slug</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-muted-foreground" />
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {module.slug}
                  </code>
                </div>
              </FieldContent>
              <FieldDescription>
                URL-friendly identifier for the module
              </FieldDescription>
            </Field>

            {/* Description */}
            {module.description && (
              <Field>
                <FieldLabel>Description</FieldLabel>
                <FieldContent>
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {module.description}
                  </div>
                </FieldContent>
                <FieldDescription>
                  Detailed description of the module content
                </FieldDescription>
              </Field>
            )}

            {/* Course ID */}
            <Field>
              <FieldLabel>Course ID</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <code className="text-xs bg-muted px-2 py-1 rounded break-all">
                    {module.course_id}
                  </code>
                </div>
              </FieldContent>
              <FieldDescription>
                The unique identifier of the parent course
              </FieldDescription>
            </Field>

            {/* Created At */}
            <Field>
              <FieldLabel>Created At</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(module.created_at)}</span>
                </div>
              </FieldContent>
              <FieldDescription>
                When this module was created
              </FieldDescription>
            </Field>

            {/* Updated At */}
            <Field>
              <FieldLabel>Last Updated</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(module.updated_at)}</span>
                </div>
              </FieldContent>
              <FieldDescription>
                When this module was last modified
              </FieldDescription>
            </Field>

            {/* Module ID */}
            <Field>
              <FieldLabel>Module ID</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <code className="text-xs bg-muted px-2 py-1 rounded break-all">
                    {module._id}
                  </code>
                </div>
              </FieldContent>
              <FieldDescription>
                Unique identifier for the module
              </FieldDescription>
            </Field>
          </FieldGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
}
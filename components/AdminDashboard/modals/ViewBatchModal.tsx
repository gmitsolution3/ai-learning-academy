"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { IBatch } from "@/types";
import { formatDate } from "@/utils";
import {
  BatchStatusBadge,
  EnrollmentCard,
} from "@/utils/batch.utils";
import {
  Calendar,
  Clock,
  FileText,
  GraduationCap,
  Hash,
  Users,
} from "lucide-react";

interface ViewBatchModalProps {
  batch: IBatch | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ViewBatchModal({
  batch,
  open,
  onOpenChange,
}: ViewBatchModalProps) {
  if (!batch) return null;

  const totalEnrolled = batch.enrolled_type.reduce(
    (sum, t) => sum + t.enrolled,
    0,
  );
  const totalMax = batch.enrolled_type.reduce(
    (sum, t) => sum + t.max_student,
    0,
  );
  const totalEnrollmentPercentage =
    totalMax > 0 ? (totalEnrolled / totalMax) * 100 : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">
              Batch Details
            </DialogTitle>
            <BatchStatusBadge status={batch.batch_status} />
          </div>
          <DialogDescription>
            View detailed information about this batch.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <FieldGroup>
            {/* Batch Name */}
            <Field>
              <FieldLabel>Batch Name</FieldLabel>
              <FieldContent>
                <div className="text-lg font-semibold flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-muted-foreground" />
                  {batch.batch_name}
                </div>
              </FieldContent>
              <FieldDescription>
                The name of the batch
              </FieldDescription>
            </Field>

            {/* Batch Slug */}
            <Field>
              <FieldLabel>Batch Slug</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {batch.batch_slug}
                  </code>
                </div>
              </FieldContent>
              <FieldDescription>
                URL-friendly identifier for the batch
              </FieldDescription>
            </Field>

            {/* Course Information */}
            <Field>
              <FieldLabel>Course</FieldLabel>
              <FieldContent>
                <div className="space-y-1">
                  <p className="font-medium">{batch.course.title}</p>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {batch.course.slug}
                  </code>
                </div>
              </FieldContent>
              <FieldDescription>
                The course associated with this batch
              </FieldDescription>
            </Field>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Start Date</FieldLabel>
                <FieldContent>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {formatDate(batch.batch_starting_date)}
                    </span>
                  </div>
                </FieldContent>
                <FieldDescription>
                  When the batch starts
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel>End Date</FieldLabel>
                <FieldContent>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(batch.batch_ending_date)}</span>
                  </div>
                </FieldContent>
                <FieldDescription>
                  When the batch ends
                </FieldDescription>
              </Field>
            </div>

            {/* Enrollment Summary */}
            <Field>
              <FieldLabel>Enrollment Overview</FieldLabel>
              <FieldContent>
                <div className="space-y-4 w-full">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <span className="font-semibold">
                          Total Enrollment
                        </span>
                      </div>
                      <span className="text-2xl font-bold">
                        {totalEnrolled}/{totalMax}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{
                          width: `${totalEnrollmentPercentage}%`,
                        }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {Math.round(totalEnrollmentPercentage)}% of
                      total capacity filled
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {batch.enrolled_type.map((type, index) => (
                      <EnrollmentCard key={index} {...type} />
                    ))}
                  </div>
                </div>
              </FieldContent>
              <FieldDescription>
                Student enrollment by batch type
              </FieldDescription>
            </Field>

            {/* Timestamps */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Additional Information
              </h4>
              <div className="rounded-lg border">
                <div className="flex items-start justify-between py-2 px-4 border-b last:border-0">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Created At
                    </span>
                  </div>
                  <div className="text-sm font-medium text-right">
                    {formatDate(batch.created_at)}
                  </div>
                </div>
                <div className="flex items-start justify-between py-2 px-4 border-b last:border-0">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Hash className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Batch ID
                    </span>
                  </div>
                  <div className="text-sm font-medium text-right">
                    <code className="text-xs bg-muted px-2 py-1 rounded break-all">
                      {batch._id}
                    </code>
                  </div>
                </div>
                <div className="flex items-start justify-between py-2 px-4 border-b last:border-0">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Course ID
                    </span>
                  </div>
                  <div className="text-sm font-medium text-right">
                    <code className="text-xs bg-muted px-2 py-1 rounded break-all">
                      {batch.course._id}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </FieldGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState, useEffect } from "react";
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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { usePatch } from "@/hooks/swr/usePatch";
import { notify } from "@/utils/notify";
import { Badge } from "@/components/ui/badge";
import { IConsultation, IUser } from "@/types";

// Form validation schema
const consultationSchema = z.object({
  consultancy_type: z.enum(["Online", "Offline", "Hybrid"], {
    message: "Consultancy type is required",
  }),
  topic: z
    .string()
    .min(1, "Topic is required")
    .min(5, "Topic must be at least 5 characters")
    .max(200, "Topic must be less than 200 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description must be less than 2000 characters"),
  instructorId: z.string().optional(),
  isEnrolledCourse: z.boolean(),
});

type ConsultationFormValues = z.infer<typeof consultationSchema>;

interface EditConsultationModalProps {
  consultation: IConsultation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  instructors?: IUser[];
}

export default function EditConsultationModal({
  consultation,
  open,
  onOpenChange,
  onSuccess,
  instructors = [],
}: EditConsultationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: updateConsultation } = usePatch(
    `/consultancy/update-consultancy`,
    {
      revalidateKey: "/consultancy/get-all-consultancy",
    }
  );

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      consultancy_type: "Online",
      topic: "",
      description: "",
      instructorId: "",
      isEnrolledCourse: false,
    },
  });

  // Populate form when consultation data is available
  useEffect(() => {
    if (consultation && open) {
      form.reset({
        consultancy_type: consultation.consultancy_type,
        topic: consultation.topic,
        description: consultation.description,
        instructorId: consultation.instructorId || "",
        isEnrolledCourse: consultation.isEnrolledCourse,
      });
    }
  }, [consultation, open, form]);

  const onSubmit = async (values: ConsultationFormValues) => {
    if (!consultation) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...values,
      };

      const res = await updateConsultation({
        id: consultation._id,
        data: payload,
      });

      if (res?.success) {
        notify.success("Consultation updated successfully");
        onOpenChange(false);

        if (onSuccess) {
          onSuccess();
        }
      } else {
        notify.error(res?.message || "Failed to update consultation");
      }
    } catch (error) {
      console.error("Error updating consultation:", error);
      notify.error("An error occurred while updating the consultation");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!consultation) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Consultation</DialogTitle>
          <DialogDescription>
            Update the details of consultation request from{" "}
            <span className="font-semibold">{consultation.user.name}</span>.
          </DialogDescription>
        </DialogHeader>

        {/* Student Info Banner */}
        <div className="p-4 rounded-lg border bg-muted/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <p className="text-sm text-muted-foreground">Student</p>
              <p className="font-semibold">{consultation.user.name}</p>
              <p className="text-sm text-muted-foreground">{consultation.user.email}</p>
              <p className="text-sm text-muted-foreground">{consultation.user.phone}</p>
            </div>
            {consultation.isEnrolledCourse && consultation.courseDetails && (
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Enrolled Course</p>
                <p className="font-medium">{consultation.courseDetails.course.name}</p>
                <p className="text-sm text-muted-foreground">
                  Batch: {consultation.courseDetails.batch.name}
                </p>
              </div>
            )}
            {!consultation.isEnrolledCourse && (
              <Badge variant="outline" className="h-fit">
                Not Enrolled
              </Badge>
            )}
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            {/* Consultancy Type */}
            <Field>
              <FieldLabel>Consultancy Type *</FieldLabel>
              <FieldContent>
                <Select
                  onValueChange={(value: any) =>
                    form.setValue("consultancy_type", value, {
                      shouldValidate: true,
                    })
                  }
                  value={form.getValues("consultancy_type")}
                >
                  <SelectTrigger className="p-5 w-full">
                    <SelectValue placeholder="Select consultancy type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Offline">Offline</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </FieldContent>
              <FieldDescription>
                Select the mode of consultation delivery.
              </FieldDescription>
              <FieldError>
                {form.formState.errors.consultancy_type?.message}
              </FieldError>
            </Field>

            {/* Topic */}
            <Field>
              <FieldLabel>Topic *</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="e.g., Career guidance in Web Development"
                  {...form.register("topic")}
                  className="p-5"
                />
              </FieldContent>
              <FieldDescription>
                The main subject of the consultation request.
              </FieldDescription>
              <FieldError>
                {form.formState.errors.topic?.message}
              </FieldError>
            </Field>

            {/* Description */}
            <Field>
              <FieldLabel>Description *</FieldLabel>
              <FieldContent>
                <Textarea
                  placeholder="Detailed description of what the student needs help with..."
                  className="min-h-[150px] p-5"
                  {...form.register("description")}
                />
              </FieldContent>
              <FieldDescription>
                {form.watch("description")?.length || 0}/2000 characters.
                Provide detailed information about the consultation request.
              </FieldDescription>
              <FieldError>
                {form.formState.errors.description?.message}
              </FieldError>
            </Field>

            {/* Assign Instructor (Optional) */}
            <Field>
              <FieldLabel>Assign Instructor</FieldLabel>
              <FieldContent>
                <Select
                  onValueChange={(value) =>
                    form.setValue("instructorId", value, {
                      shouldValidate: true,
                    })
                  }
                  value={form.getValues("instructorId") || "unassigned"}
                >
                  <SelectTrigger className="p-5 w-full">
                    <SelectValue placeholder="Select an instructor (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {instructors.map((instructor) => (
                      <SelectItem key={instructor._id} value={instructor._id}>
                        {instructor.name} - {instructor.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldContent>
              <FieldDescription>
                Assign an instructor to handle this consultation request.
              </FieldDescription>
              <FieldError>
                {form.formState.errors.instructorId?.message}
              </FieldError>
            </Field>

            {/* Enrollment Status (Read-only display) */}
            <div className="p-3 rounded-md bg-muted/30">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Enrollment Status:</span>{" "}
                {consultation.isEnrolledCourse ? (
                  <span className="text-green-600">Enrolled Student</span>
                ) : (
                  <span className="text-yellow-600">Not Enrolled</span>
                )}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Enrollment status cannot be changed from here. It reflects the
                student's current enrollment in any course.
              </p>
            </div>

            {/* Consultation ID Info */}
            <div className="p-3 rounded-md bg-muted/50">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Consultation ID:</span>{" "}
                <code className="text-xs">{consultation._id}</code>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="font-medium">Requested On:</span>{" "}
                {new Date(consultation.created_at).toLocaleString()}
              </p>
            </div>

            {/* Required fields indicator */}
            <div className="text-sm text-muted-foreground mt-2">
              * Required fields
            </div>
          </FieldGroup>

          {/* Form Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                onOpenChange(false);
              }}
              className="p-5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="p-5"
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update Consultation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
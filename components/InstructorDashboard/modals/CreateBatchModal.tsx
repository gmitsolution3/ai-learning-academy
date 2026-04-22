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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Plus, Trash2, Users } from "lucide-react";
import { usePost } from "@/hooks/swr/usePost";
import { notify } from "@/utils/notify";
import { generateSlug } from "@/utils";

// Types
interface Course {
  _id: string;
  title: string;
  slug: string;
}

// Enrolled type schema
const enrolledTypeSchema = z.object({
  type: z.enum(["Online", "Offline", "Hybrid"], {
    message: "Enrollment type is required",
  }),
  max_student: z
    .number()
    .min(1, "Max students must be at least 1")
    .max(9999, "Max students must be less than 10000"),
  enrolled: z
    .number()
    .min(0, "Enrolled students must be 0 or greater")
    .max(9999, "Enrolled students must be less than 10000"),
});

// Form validation schema
const batchSchema = z.object({
  batch_name: z
    .string()
    .min(1, "Batch name is required")
    .min(3, "Batch name must be at least 3 characters")
    .max(100, "Batch name must be less than 100 characters"),
  batch_slug: z
    .string()
    .min(1, "Batch slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase with hyphens only",
    ),
  course_id: z.string().min(1, "Course is required"),
  total_module: z
    .number()
    .min(1, "Total modules must be at least 1")
    .max(999, "Total modules must be less than 1000"),
  completed_module: z
    .number()
    .min(0, "Completed modules must be 0 or greater")
    .max(999, "Completed modules must be less than 1000"),
  batch_starting_date: z.string().min(1, "Start date is required"),
  batch_ending_date: z.string().min(1, "End date is required"),
  batch_status: z.enum(["ongoing", "completed", "upcoming", "cancelled"], {
    message: "Batch status is required",
  }),
  enrolled_type: z.array(enrolledTypeSchema).min(1, "At least one enrollment type is required"),
}).refine((data) => data.completed_module <= data.total_module, {
  message: "Completed modules cannot exceed total modules",
  path: ["completed_module"],
}).refine((data) => new Date(data.batch_ending_date) >= new Date(data.batch_starting_date), {
  message: "End date must be after or equal to start date",
  path: ["batch_ending_date"],
});

type BatchFormValues = z.infer<typeof batchSchema>;
type EnrolledTypeValues = z.infer<typeof enrolledTypeSchema>;

interface CreateBatchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  courses?: Course[];
}

export default function CreateBatchModal({
  open,
  onOpenChange,
  onSuccess,
  courses = [],
}: CreateBatchModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: createBatch } = usePost("/batch/create-batch", {
    revalidateKey: "/batch/get-all-batches",
  });

  const form = useForm<BatchFormValues>({
    resolver: zodResolver(batchSchema),
    defaultValues: {
      batch_name: "",
      batch_slug: "",
      course_id: "",
      total_module: 0,
      completed_module: 0,
      batch_starting_date: "",
      batch_ending_date: "",
      batch_status: "upcoming",
      enrolled_type: [
        {
          type: "Online",
          max_student: 0,
          enrolled: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "enrolled_type",
  });

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      form.reset({
        batch_name: "",
        batch_slug: "",
        course_id: "",
        total_module: 0,
        completed_module: 0,
        batch_starting_date: "",
        batch_ending_date: "",
        batch_status: "upcoming",
        enrolled_type: [
          {
            type: "Online",
            max_student: 0,
            enrolled: 0,
          },
        ],
      });
    }
  }, [open, form]);

  // Auto-generate slug from batch name
  const generateSlugFromName = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const onSubmit = async (values: BatchFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...values,
        total_module: Number(values.total_module),
        completed_module: Number(values.completed_module),
      };

      const res = await createBatch(payload);

      if (res?.success) {
        notify.success("Batch created successfully");
        form.reset();
        onOpenChange(false);

        if (onSuccess) {
          onSuccess();
        }
      } else {
        notify.error(res?.message || "Failed to create batch");
      }
    } catch (error) {
      console.error("Error creating batch:", error);
      notify.error("An error occurred while creating the batch");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addEnrollmentType = () => {
    append({
      type: "Online",
      max_student: 0,
      enrolled: 0,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Batch</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new course batch.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            {/* Batch Name */}
            <Field>
              <FieldLabel>Batch Name *</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="e.g., Web Development - Batch 25"
                  {...form.register("batch_name")}
                  onChange={(e) => {
                    const value = e.target.value;
                    form.setValue("batch_name", value, {
                      shouldValidate: true,
                    });
                    // Auto-generate slug if slug field is empty
                    const currentSlug = form.getValues("batch_slug");
                    if (
                      !currentSlug ||
                      currentSlug === generateSlug(currentSlug)
                    ) {
                      form.setValue("batch_slug", generateSlugFromName(value), {
                        shouldValidate: true,
                      });
                    }
                  }}
                  className="p-5"
                />
              </FieldContent>
              <FieldDescription>
                Enter a unique name for the batch.
              </FieldDescription>
              <FieldError>
                {form.formState.errors.batch_name?.message}
              </FieldError>
            </Field>

            {/* Batch Slug */}
            <Field>
              <FieldLabel>Batch Slug *</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="e.g., web-dev-batch-25"
                  {...form.register("batch_slug")}
                  className="p-5"
                />
              </FieldContent>
              <FieldDescription>
                URL-friendly version of the batch name (auto-generated but can be edited).
              </FieldDescription>
              <FieldError>
                {form.formState.errors.batch_slug?.message}
              </FieldError>
            </Field>

            {/* Course Selection */}
            <Field>
              <FieldLabel>Course *</FieldLabel>
              <FieldContent>
                <Select
                  onValueChange={(value) =>
                    form.setValue("course_id", value, { shouldValidate: true })
                  }
                  value={form.getValues("course_id")}
                >
                  <SelectTrigger className="w-full p-5">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course._id} value={course._id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldContent>
              <FieldDescription>
                Select the course for this batch.
              </FieldDescription>
              <FieldError>
                {form.formState.errors.course_id?.message}
              </FieldError>
            </Field>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Start Date *</FieldLabel>
                <FieldContent>
                  <Input
                    type="datetime-local"
                    {...form.register("batch_starting_date")}
                    className="p-5"
                  />
                </FieldContent>
                <FieldError>
                  {form.formState.errors.batch_starting_date?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel>End Date *</FieldLabel>
                <FieldContent>
                  <Input
                    type="datetime-local"
                    {...form.register("batch_ending_date")}
                    className="p-5"
                  />
                </FieldContent>
                <FieldError>
                  {form.formState.errors.batch_ending_date?.message}
                </FieldError>
              </Field>
            </div>

            {/* Module Progress */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Total Modules *</FieldLabel>
                <FieldContent>
                  <Input
                    type="number"
                    placeholder="e.g., 45"
                    {...form.register("total_module", {
                      valueAsNumber: true,
                    })}
                    className="p-5"
                  />
                </FieldContent>
                <FieldError>
                  {form.formState.errors.total_module?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel>Completed Modules *</FieldLabel>
                <FieldContent>
                  <Input
                    type="number"
                    placeholder="e.g., 20"
                    {...form.register("completed_module", {
                      valueAsNumber: true,
                    })}
                    className="p-5"
                  />
                </FieldContent>
                <FieldError>
                  {form.formState.errors.completed_module?.message}
                </FieldError>
              </Field>
            </div>

            {/* Batch Status */}
            <Field>
              <FieldLabel>Batch Status *</FieldLabel>
              <FieldContent>
                <Select
                  onValueChange={(value: any) =>
                    form.setValue("batch_status", value, { shouldValidate: true })
                  }
                  value={form.getValues("batch_status")}
                >
                  <SelectTrigger className="p-5">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </FieldContent>
              <FieldDescription>
                Set the current status of the batch.
              </FieldDescription>
              <FieldError>
                {form.formState.errors.batch_status?.message}
              </FieldError>
            </Field>

            {/* Enrollment Types Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Enrollment Types</h3>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addEnrollmentType}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Enrollment Type
                </Button>
              </div>

              <FieldError>
                {form.formState.errors.enrolled_type?.message}
              </FieldError>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative border rounded-lg p-4 space-y-4 bg-muted/5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Enrollment Type {index + 1}</h4>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Field>
                      <FieldLabel>Type *</FieldLabel>
                      <FieldContent>
                        <Select
                          onValueChange={(value: any) =>
                            form.setValue(`enrolled_type.${index}.type`, value, {
                              shouldValidate: true,
                            })
                          }
                          value={form.watch(`enrolled_type.${index}.type`)}
                        >
                          <SelectTrigger className="p-5">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Online">Online</SelectItem>
                            <SelectItem value="Offline">Offline</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </FieldContent>
                      <FieldError>
                        {form.formState.errors.enrolled_type?.[index]?.type?.message}
                      </FieldError>
                    </Field>

                    <Field>
                      <FieldLabel>Max Students *</FieldLabel>
                      <FieldContent>
                        <Input
                          type="number"
                          placeholder="Max capacity"
                          {...form.register(`enrolled_type.${index}.max_student`, {
                            valueAsNumber: true,
                          })}
                          className="p-5"
                        />
                      </FieldContent>
                      <FieldError>
                        {form.formState.errors.enrolled_type?.[index]?.max_student?.message}
                      </FieldError>
                    </Field>

                    <Field>
                      <FieldLabel>Enrolled Students *</FieldLabel>
                      <FieldContent>
                        <Input
                          type="number"
                          placeholder="Currently enrolled"
                          {...form.register(`enrolled_type.${index}.enrolled`, {
                            valueAsNumber: true,
                          })}
                          className="p-5"
                        />
                      </FieldContent>
                      <FieldError>
                        {form.formState.errors.enrolled_type?.[index]?.enrolled?.message}
                      </FieldError>
                    </Field>
                  </div>
                </div>
              ))}
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
              Create Batch
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
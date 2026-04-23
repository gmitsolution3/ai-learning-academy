"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePost } from "@/hooks/swr/usePost";
import { cn } from "@/lib/utils";
import { generateSlug } from "@/utils";
import { notify } from "@/utils/notify";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  Loader2,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { ICourse } from "@/types";

// Enrolled type schema with custom refinement for duplicate types
const enrolledTypeSchema = z.object({
  type: z.enum(["Online", "Offline"], {
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
const batchSchema = z
  .object({
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
    batch_starting_date: z.date({
      message: "Start date is required",
    }),
    batch_ending_date: z.date({
      message: "End date is required",
    }),
    batch_status: z.enum(
      ["ongoing", "completed", "upcoming", "cancelled"],
      {
        message: "Batch status is required",
      },
    ),
    enrolled_type: z
      .array(enrolledTypeSchema)
      .min(1, "At least one enrollment type is required")
      .max(2, "Maximum 2 enrollment types allowed")
      .refine(
        (types) => {
          // Check for duplicate types
          const uniqueTypes = new Set(types.map((t) => t.type));
          return uniqueTypes.size === types.length;
        },
        {
          message: "Enrollment types must be unique",
        },
      ),
  })
  .refine((data) => data.completed_module <= data.total_module, {
    message: "Completed modules cannot exceed total modules",
    path: ["completed_module"],
  })
  .refine(
    (data) => data.batch_ending_date >= data.batch_starting_date,
    {
      message: "End date must be after or equal to start date",
      path: ["batch_ending_date"],
    },
  );

type BatchFormValues = z.infer<typeof batchSchema>;

interface CreateBatchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  courses?: ICourse[];
}

export default function CreateBatchModal({
  open,
  onOpenChange,
  onSuccess,
  courses = [],
}: CreateBatchModalProps) {

  const { mutate: createBatch, isLoading } = usePost("/batch/insert-batch", {
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
      batch_starting_date: undefined,
      batch_ending_date: undefined,
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
        batch_starting_date: undefined,
        batch_ending_date: undefined,
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

  const onSubmit = async (values: BatchFormValues) => {
    try {
      const payload = {
        ...values,
        total_module: Number(values.total_module),
        completed_module: Number(values.completed_module),
        batch_starting_date: values.batch_starting_date.toISOString(),
        batch_ending_date: values.batch_ending_date.toISOString(),
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
    }
  };

  const addEnrollmentType = () => {
    // Get existing types to suggest a different one
    const existingTypes = form
      .getValues("enrolled_type")
      .map((t) => t.type);
    const availableTypes = ["Online", "Offline", "Hybrid"].filter(
      (type) => !existingTypes.includes(type as any),
    );

    append({
      type: (availableTypes[0] as any) || "Online",
      max_student: 0,
      enrolled: 0,
    });
  };

  // Get available enrollment types for the select dropdown
  const getAvailableTypes = (currentIndex: number) => {
    const allTypes = ["Online", "Offline"] as const;
    const currentValues = form.getValues("enrolled_type");
    const selectedTypes = currentValues.map((t, idx) =>
      idx !== currentIndex ? t.type : null,
    );

    return allTypes.filter((type) => !selectedTypes.includes(type));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Create New Batch
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new course batch.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
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
                      form.setValue(
                        "batch_slug",
                        generateSlug(value),
                        {
                          shouldValidate: true,
                        },
                      );
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
                URL-friendly version of the batch name (auto-generated
                but can be edited).
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
                    form.setValue("course_id", value, {
                      shouldValidate: true,
                    })
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

            {/* Date Range with Date Picker */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Start Date *</FieldLabel>
                <FieldContent>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal p-5",
                          !form.getValues("batch_starting_date") &&
                            "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.getValues("batch_starting_date") ? (
                          format(
                            form.getValues("batch_starting_date"),
                            "PPP",
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={form.getValues(
                          "batch_starting_date",
                        )}
                        onSelect={(date) =>
                          form.setValue(
                            "batch_starting_date",
                            date || new Date(),
                            {
                              shouldValidate: true,
                            },
                          )
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FieldContent>
                <FieldError>
                  {form.formState.errors.batch_starting_date?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel>End Date *</FieldLabel>
                <FieldContent>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal p-5",
                          !form.getValues("batch_ending_date") &&
                            "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.getValues("batch_ending_date") ? (
                          format(
                            form.getValues("batch_ending_date"),
                            "PPP",
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={form.getValues("batch_ending_date")}
                        onSelect={(date) =>
                          form.setValue(
                            "batch_ending_date",
                            date || new Date(),
                            {
                              shouldValidate: true,
                            },
                          )
                        }
                        disabled={(date) =>
                          form.getValues("batch_starting_date")
                            ? date <
                              form.getValues("batch_starting_date")
                            : false
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                    form.setValue("batch_status", value, {
                      shouldValidate: true,
                    })
                  }
                  value={form.getValues("batch_status")}
                >
                  <SelectTrigger className="p-5 w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">
                      Completed
                    </SelectItem>
                    <SelectItem value="cancelled">
                      Cancelled
                    </SelectItem>
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
                  <h3 className="text-lg font-semibold">
                    Enrollment Types
                  </h3>
                </div>
                {fields.length < 2 && (
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
                )}
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
                    <h4 className="font-medium">
                      Enrollment Type {index + 1}
                    </h4>
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
                            form.setValue(
                              `enrolled_type.${index}.type`,
                              value,
                              {
                                shouldValidate: true,
                              },
                            )
                          }
                          value={form.watch(
                            `enrolled_type.${index}.type`,
                          )}
                        >
                          <SelectTrigger className="p-5">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableTypes(index).map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FieldContent>
                      <FieldError>
                        {
                          form.formState.errors.enrolled_type?.[index]
                            ?.type?.message
                        }
                      </FieldError>
                    </Field>

                    <Field>
                      <FieldLabel>Max Students *</FieldLabel>
                      <FieldContent>
                        <Input
                          type="number"
                          placeholder="Max capacity"
                          {...form.register(
                            `enrolled_type.${index}.max_student`,
                            {
                              valueAsNumber: true,
                            },
                          )}
                          className="p-5"
                        />
                      </FieldContent>
                      <FieldError>
                        {
                          form.formState.errors.enrolled_type?.[index]
                            ?.max_student?.message
                        }
                      </FieldError>
                    </Field>

                    <Field>
                      <FieldLabel>Enrolled Students *</FieldLabel>
                      <FieldContent>
                        <Input
                          type="number"
                          placeholder="Currently enrolled"
                          {...form.register(
                            `enrolled_type.${index}.enrolled`,
                            {
                              valueAsNumber: true,
                            },
                          )}
                          className="p-5"
                        />
                      </FieldContent>
                      <FieldError>
                        {
                          form.formState.errors.enrolled_type?.[index]
                            ?.enrolled?.message
                        }
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
              disabled={isLoading}
              className="p-5"
            >
              {isLoading && (
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

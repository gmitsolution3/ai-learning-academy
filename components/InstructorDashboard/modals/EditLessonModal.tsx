"use client";

import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/lib/axios";
import { ILesson } from "@/types";
import { generateSlug } from "@/utils";
import { notify } from "@/utils/notify";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { mutate } from "swr";

// Form validation schema
const lessonSchema = z.object({
  title: z
    .string()
    .min(1, "Lesson title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase with hyphens only",
    ),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  content_type: z.enum(["text", "video", "link"], {
    message: "Content type is required",
  }),
  content_url: z
    .string()
    .min(1, "Content URL is required")
    .url("Must be a valid URL"),
  duration: z
    .number()
    .min(1, "Duration is required")
    .max(10000, "Duration must be less than 10000 minutes"),
  order_index: z
    .number()
    .min(0, "Order index must be 0 or greater")
    .max(999, "Order index must be less than 1000"),
  is_completed: z.boolean().default(false),
});

type LessonFormValues = z.infer<typeof lessonSchema>;

interface EditLessonModalProps {
  lesson: ILesson | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  moduleId: string;
}

async function updateLesson(
  lessonSlug: string,
  moduleId: string,
  data: any,
) {
  const res = await axiosInstance.patch(
    `/lessons/update-single-lesson-by-slug/${lessonSlug}?module_id=${moduleId}`,
    data,
  );
  return res.data;
}

export default function EditLessonModal({
  lesson,
  open,
  onOpenChange,
  onSuccess,
  moduleId,
}: EditLessonModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<
    z.input<typeof lessonSchema>,
    any,
    z.output<typeof lessonSchema>
  >({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      content_type: "text",
      content_url: "",
      duration: 0,
      order_index: 0,
      is_completed: false,
    },
  });

  // Populate form when lesson data is available
  useEffect(() => {
    if (lesson && open) {
      form.reset({
        title: lesson.title,
        slug: lesson.slug,
        description: lesson.description || "",
        content_type: lesson.content_type,
        content_url: lesson.content_url,
        duration: lesson.duration,
        order_index: lesson.order_index,
        is_completed: lesson.is_completed,
      });
    }
  }, [lesson, open, form]);

  const onSubmit = async (values: LessonFormValues) => {
    if (!lesson) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...values,
        module_id: moduleId,
      };

      const res = await updateLesson(lesson.slug, moduleId, payload);

      if (res?.success) {
        mutate(
          (key) =>
            typeof key === "string" && key.startsWith("/lessons"),
        );

        notify.success("Lesson updated successfully");
        onOpenChange(false);

        if (onSuccess) {
          onSuccess();
        }
      } else {
        notify.error(res?.message || "Failed to update lesson");
      }
    } catch (error) {
      console.error("Error updating lesson:", error);
      notify.error("An error occurred while updating the lesson");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!lesson) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Lesson</DialogTitle>
          <DialogDescription>
            Update the details of "{lesson.title}" lesson.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FieldGroup>
            {/* Lesson Title */}
            <Field>
              <FieldLabel>Lesson Title *</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="e.g., Introduction to NoSQL"
                  {...form.register("title")}
                  onChange={(e) => {
                    const value = e.target.value;
                    form.setValue("title", value, {
                      shouldValidate: true,
                    });
                    // Auto-generate slug if slug field hasn't been manually edited
                    const currentSlug = form.getValues("slug");
                    if (
                      !currentSlug ||
                      currentSlug === generateSlug(currentSlug)
                    ) {
                      form.setValue("slug", generateSlug(value), {
                        shouldValidate: true,
                      });
                    }
                  }}
                  className="p-5"
                />
              </FieldContent>
              <FieldDescription>
                Enter a descriptive title for the lesson.
              </FieldDescription>
              <FieldError>
                {form.formState.errors.title?.message}
              </FieldError>
            </Field>

            {/* Slug */}
            <Field>
              <FieldLabel>Slug *</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="e.g., introduction-to-nosql"
                  {...form.register("slug")}
                  className="p-5"
                />
              </FieldContent>
              <FieldDescription>
                URL-friendly version of the title (auto-generated but
                can be edited).
              </FieldDescription>
              <FieldError>
                {form.formState.errors.slug?.message}
              </FieldError>
            </Field>

            {/* Content Type */}
            <Field>
              <FieldLabel>Content Type *</FieldLabel>
              <FieldContent>
                <Select
                  onValueChange={(value: any) =>
                    form.setValue("content_type", value, {
                      shouldValidate: true,
                    })
                  }
                  value={form.watch("content_type")}
                >
                  <SelectTrigger className="p-5">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                  </SelectContent>
                </Select>
              </FieldContent>
              <FieldDescription>
                Select the type of content for this lesson.
              </FieldDescription>
              <FieldError>
                {form.formState.errors.content_type?.message}
              </FieldError>
            </Field>

            {/* Content URL */}
            <Field>
              <FieldLabel>Content URL *</FieldLabel>
              <FieldContent>
                <Input
                  type="url"
                  placeholder="https://..."
                  {...form.register("content_url")}
                  className="p-5"
                />
              </FieldContent>
              <FieldDescription>
                URL to the lesson content.
              </FieldDescription>
              <FieldError>
                {form.formState.errors.content_url?.message}
              </FieldError>
            </Field>

            {/* Duration */}
            <Field>
              <FieldLabel>Duration (minutes) *</FieldLabel>
              <FieldContent>
                <Input
                  type="number"
                  placeholder="e.g., 450"
                  {...form.register("duration", {
                    valueAsNumber: true,
                  })}
                  className="p-5"
                />
              </FieldContent>
              <FieldDescription>
                Estimated time to complete this lesson in minutes.
              </FieldDescription>
              <FieldError>
                {form.formState.errors.duration?.message}
              </FieldError>
            </Field>

            {/* Order Index */}
            <Field>
              <FieldLabel>Order Index *</FieldLabel>
              <FieldContent>
                <Input
                  type="number"
                  placeholder="e.g., 1"
                  {...form.register("order_index", {
                    valueAsNumber: true,
                  })}
                  className="p-5"
                />
              </FieldContent>
              <FieldDescription>
                Determines the order of lessons in the module. Current
                position: {lesson.order_index}
              </FieldDescription>
              <FieldError>
                {form.formState.errors.order_index?.message}
              </FieldError>
            </Field>

            {/* Description */}
            <Field>
              <FieldLabel>Description</FieldLabel>
              <FieldContent>
                <Textarea
                  placeholder="Brief description of the lesson (optional)"
                  className="min-h-[100px] p-5"
                  {...form.register("description")}
                />
              </FieldContent>
              <FieldDescription>
                Max 500 characters. Describe what students will learn
                in this lesson.
                {form.watch("description")?.length !== undefined && (
                  <span className="block mt-1">
                    {form.watch("description")?.length || 0}/500
                    characters
                  </span>
                )}
              </FieldDescription>
              <FieldError>
                {form.formState.errors.description?.message}
              </FieldError>
            </Field>

            {/* Completion Status */}
            <Field>
              <FieldLabel>Completion Status</FieldLabel>
              <FieldContent>
                <Select
                  onValueChange={(value: any) =>
                    form.setValue("is_completed", value === "true", {
                      shouldValidate: true,
                    })
                  }
                  value={
                    form.watch("is_completed") ? "true" : "false"
                  }
                >
                  <SelectTrigger className="p-5">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">Not Started</SelectItem>
                    <SelectItem value="true">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </FieldContent>
              <FieldDescription>
                Mark this lesson as completed or not.
              </FieldDescription>
              <FieldError>
                {form.formState.errors.is_completed?.message}
              </FieldError>
            </Field>

            {/* Module ID Info */}
            <div className="p-3 rounded-md bg-muted/50">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Module ID:</span>{" "}
                <code className="text-xs">{moduleId}</code>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="font-medium">Lesson Name:</span>{" "}
                <code className="text-xs">{lesson.title}</code>
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
              Update Lesson
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

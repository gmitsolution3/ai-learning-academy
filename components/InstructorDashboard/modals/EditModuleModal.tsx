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
import { Textarea } from "@/components/ui/textarea";
import { usePatch } from "@/hooks/swr/usePatch";
import { generateSlug } from "@/utils";
import { notify } from "@/utils/notify";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { IModule } from "@/types";

// Form validation schema
const moduleSchema = z.object({
  title: z
    .string()
    .min(1, "Module title is required")
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
  order_index: z
    .number()
    .min(0, "Order index must be 0 or greater")
    .max(999, "Order index must be less than 1000"),
});

type ModuleFormValues = z.infer<typeof moduleSchema>;

interface EditModuleModalProps {
  module: IModule | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  courseId: string;
}

export default function EditModuleModal({
  module,
  open,
  onOpenChange,
  onSuccess,
  courseId,
}: EditModuleModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: updateModule } = usePatch(
    `/modules/update-modules`,
    {
      revalidateKey: `/modules/get-modules-by-course-id/${courseId}`,
    },
  );

  const form = useForm<ModuleFormValues>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      order_index: 0,
    },
  });

  // Populate form when module data is available
  useEffect(() => {
    if (module && open) {
      form.reset({
        title: module.title,
        slug: module.slug,
        description: module.description || "",
        order_index: module.order_index,
      });
    }
  }, [module, open, form]);

  const onSubmit = async (values: ModuleFormValues) => {
    if (!module) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...values,
        course_id: courseId,
      };

      const res = await updateModule({
        id: module._id,
        data: payload,
      });

      if (res?.success) {
        notify.success("Module updated successfully");
        onOpenChange(false);

        if (onSuccess) {
          onSuccess();
        }
      } else {
        notify.error(res?.message || "Failed to update module");
      }
    } catch (error) {
      console.error("Error updating module:", error);
      notify.error("An error occurred while updating the module");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!module) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Module</DialogTitle>
          <DialogDescription>
            Update the details of "{module.title}" module.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FieldGroup>
            {/* Module Title */}
            <Field>
              <FieldLabel>Module Title *</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="e.g., Introduction to Web Development"
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
                      form.setValue(
                        "slug",
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
                Enter a descriptive title for the module.
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
                  placeholder="e.g., introduction-to-web-development"
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
                Determines the order of modules in the course (0, 1,
                2, ...). Current position: {module.order_index}
              </FieldDescription>
              <FieldError>
                {form.formState.errors.order_index?.message}
              </FieldError>
            </Field>

            {/* Description (Optional) */}
            <Field>
              <FieldLabel>Description</FieldLabel>
              <FieldContent>
                <Textarea
                  placeholder="Brief description of what this module covers (optional)"
                  className="min-h-[100px] p-5"
                  {...form.register("description")}
                />
              </FieldContent>
              <FieldDescription>
                Max 500 characters. Describe what students will learn
                in this module.
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

            {/* Course ID Info */}
            <div className="p-3 rounded-md bg-muted/50">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Course ID:</span>{" "}
                <code className="text-xs">{courseId}</code>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="font-medium">Module ID:</span>{" "}
                <code className="text-xs">{module._id}</code>
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
              Update Module
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

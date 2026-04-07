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
import { Loader2, X, Image as ImageIcon } from "lucide-react";
import { ICategory } from "@/types";
import { generateSlug } from "@/utils";
import { usePost } from "@/hooks/swr/usePost";

// Form validation schema
const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase with hyphens only",
    ),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  parent_id: z.string().nullable(),
  image: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CreateCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  categories?: ICategory[];
}

export default function CreateCategoryModal({
  open,
  onOpenChange,
  onSuccess,
  categories = [],
}: CreateCategoryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const { mutate } = usePost("/categories/create-categories", {
    revalidateKey: "/categories/get-categories",
  });

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      parent_id: null,
      image: "",
    },
  });

  const parentId = form.watch("parent_id");

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!open) {
      form.reset();
      setImagePreview("");
    }
  }, [open, form]);

  const onSubmit = async (values: CategoryFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await mutate(values);

      if (res?.success) {
        form.reset();
        setImagePreview("");
        onOpenChange(false);

        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error("Error creating category:", error);
      // Handle error (show toast notification, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUrlChange = (url: string) => {
    setImagePreview(url);
    form.setValue("image", url, { shouldValidate: true });
  };

  const handleParentChange = (value: string) => {
    form.setValue("parent_id", value === "none" ? null : value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Create New Category
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new category.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FieldGroup>
            {/* Category Name */}
            <Field>
              <FieldLabel>Category Name *</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="e.g., Web Development"
                  {...form.register("name")}
                  onChange={(e) => {
                    const value = e.target.value;
                    form.setValue("name", value, {
                      shouldValidate: true,
                    });
                    // Auto-generate slug if slug field is empty or if user hasn't manually edited it
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
                Enter a unique name for the category.
              </FieldDescription>
              <FieldError>
                {form.formState.errors.name?.message}
              </FieldError>
            </Field>

            {/* Slug */}
            <Field>
              <FieldLabel>Slug *</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="e.g., web-development"
                  {...form.register("slug")}
                  className="p-5"
                />
              </FieldContent>
              <FieldDescription>
                URL-friendly version of the name (auto-generated but
                can be edited).
              </FieldDescription>
              <FieldError>
                {form.formState.errors.slug?.message}
              </FieldError>
            </Field>

            {/* Parent Category */}
            <Field>
              <FieldLabel>Parent Category</FieldLabel>
              <FieldContent>
                <Select
                  value={parentId === null ? "none" : parentId}
                  onValueChange={handleParentChange}
                >
                  <SelectTrigger className="w-full p-5">
                    <SelectValue placeholder="Select parent category (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">
                      None (Top Level Category)
                    </SelectItem>
                    {categories.map((category) => (
                      <SelectItem
                        key={category._id}
                        value={category._id}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldContent>
              <FieldDescription>
                Select a parent category if this is a subcategory.
              </FieldDescription>
              <FieldError>
                {form.formState.errors.parent_id?.message}
              </FieldError>
            </Field>

            {/* Image URL - Optional */}
            <Field>
              <FieldLabel>Image URL</FieldLabel>
              <FieldContent>
                <div className="space-y-3 w-full">
                  <Input
                    placeholder="https://example.com/image.jpg (optional)"
                    {...form.register("image")}
                    onChange={(e) => {
                      const value = e.target.value;
                      form.setValue("image", value, {
                        shouldValidate: true,
                      });
                      handleImageUrlChange(value);
                    }}
                    className="p-5"
                  />
                  {imagePreview ? (
                    <div className="relative inline-block">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={() => setImagePreview("")}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={() => {
                          setImagePreview("");
                          form.setValue("image", "", {
                            shouldValidate: true,
                          });
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ImageIcon className="h-4 w-4" />
                      <span>No image selected</span>
                    </div>
                  )}
                </div>
              </FieldContent>
              <FieldDescription>
                Provide a valid image URL for the category (optional).
              </FieldDescription>
              <FieldError>
                {form.formState.errors.image?.message}
              </FieldError>
            </Field>

            {/* Description */}
            <Field>
              <FieldLabel>Description *</FieldLabel>
              <FieldContent>
                <Textarea
                  placeholder="Describe the category..."
                  className="min-h-[100px] p-5"
                  {...form.register("description")}
                />
              </FieldContent>
              <FieldDescription>
                Max 500 characters. Describe what this category is
                about.
              </FieldDescription>
              <FieldError>
                {form.formState.errors.description?.message}
              </FieldError>
            </Field>

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
                setImagePreview("");
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
              Create Category
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

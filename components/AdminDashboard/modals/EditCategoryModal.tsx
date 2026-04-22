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
import { ICategoryListType } from "@/types";
import { generateSlug } from "@/utils";
import { usePatch } from "@/hooks/swr/usePatch";
import { ImageUploader } from "@/components/ImageUploader";
import { notify } from "@/utils/notify";

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
  parent_id: z
    .object({
      _id: z.string(),
    })
    .nullable()
    .optional(),
  image: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface EditCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  category: ICategoryListType | null;
  categories?: ICategoryListType[];
}

export default function EditCategoryModal({
  open,
  onOpenChange,
  onSuccess,
  category,
  categories = [],
}: EditCategoryModalProps) {
  const [imagePublicId, setImagePublicId] = useState("");

  const { mutate: updateCategory, isLoading } = usePatch(
    `/categories/updated-category`,
    {
      revalidateKey: "/categories/get-categories",
    },
  );

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

  // Populate form when category data is available
  useEffect(() => {
    if (category && open) {
      form.reset({
        name: category.name,
        slug: category.slug,
        description: category.description,
        parent_id: category.parent_id || null,
        image: category.image || "",
      });

      setImagePublicId(category.imagePublicId || "");
    }
  }, [category, open, form]);

  const onSubmit = async (values: CategoryFormValues) => {
    if (!category) return;

    try {
      // Prepare payload - send parent_id as string if exists
      const payload = {
        name: values.name,
        slug: values.slug,
        description: values.description,
        parent_id: values.parent_id?._id || null,
        image: values.image,
        imagePublicId: imagePublicId || undefined,
      };

      const res = await updateCategory({
        id: category._id,
        data: payload,
      });

      if (res?.success) {
        notify.success("Category updated successfully");
        form.reset();
        onOpenChange(false);

        if (onSuccess) {
          onSuccess();
        }
      } else {
        notify.error(res?.message || "Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      notify.error("An error occurred while updating the category");
    }
  };

  const handleImageChange = (url: string, public_id: string) => {
    form.setValue("image", url, { shouldValidate: true });
    setImagePublicId(public_id);
  };

  const handleParentChange = (value: string) => {
    if (value === "none") {
      form.setValue("parent_id", null, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      // Find the selected category object
      const selectedCategory = categories.find(
        (cat) => cat._id === value,
      );
      if (selectedCategory) {
        form.setValue("parent_id", selectedCategory, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }
  };

  // Helper function to get the current parent ID as string for Select value
  const getCurrentParentId = () => {
    const parent = form.getValues("parent_id");
    return parent?._id || "none";
  };

  // Filter out current category from parent options to prevent self-parenting
  const availableParentCategories = categories.filter(
    (cat) => cat._id !== category?._id,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Edit Category
          </DialogTitle>
          <DialogDescription>
            Update the details of "{category?.name}" category.
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
                  value={getCurrentParentId()}
                  onValueChange={handleParentChange}
                >
                  <SelectTrigger className="w-full p-5">
                    <SelectValue placeholder="Select parent category (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">
                      None (Top Level Category)
                    </SelectItem>
                    {availableParentCategories.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
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

            {/* Image Uploader */}
            <Field>
              <FieldLabel>Category Image</FieldLabel>
              <FieldContent>
                <ImageUploader
                  value={form.getValues("image")}
                  imagePublicId={imagePublicId}
                  onChange={handleImageChange}
                />
              </FieldContent>
              <FieldDescription>
                Upload an image for the category (optional).
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
              Update Category
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

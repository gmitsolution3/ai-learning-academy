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
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { usePatch } from "@/hooks/swr/usePatch";
import { notify } from "@/utils/notify";
import { generateSlug } from "@/utils";
import { ImageUploader } from "@/components/ImageUploader";
import { ICourse } from "@/types";

// Types
interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Course {
  _id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  thumbnail: string;
  preview_video: string;
  category_id: string;
  instructor_id: string[];
  regular_price: number;
  discount_price: number;
  course_level: string;
  language: string;
  total_duration: number;
  status: string;
}

// Form validation schema
const courseSchema = z.object({
  title: z
    .string()
    .min(1, "Course title is required")
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase with hyphens only",
    ),
  short_description: z
    .string()
    .min(1, "Short description is required")
    .max(200, "Short description must be less than 200 characters"),
  full_description: z
    .string()
    .min(1, "Full description is required")
    .max(5000, "Full description must be less than 5000 characters"),
  thumbnail: z
    .string()
    .min(1, "Thumbnail image is required")
    .url("Must be a valid URL"),
  preview_video: z
    .string()
    .min(1, "Preview video is required")
    .url("Must be a valid YouTube URL")
    .regex(
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
      "Please enter a valid YouTube URL",
    ),
  category_id: z.string().min(1, "Category is required"),
  instructor_id: z
    .array(z.string())
    .min(1, "At least one instructor is required"),
  regular_price: z
    .number()
    .min(0, "Price must be greater than or equal to 0")
    .max(9999, "Price must be less than 9999"),
  discount_price: z
    .number()
    .min(0, "Discount price must be greater than or equal to 0")
    .max(9999, "Discount price must be less than 9999"),
  course_level: z.enum(["beginner", "intermediate", "advanced"], {
    message: "Course level is required",
  }),
  language: z.enum(
    ["bangla", "english", "hindi", "spanish", "french"],
    {
      message: "Language is required",
    },
  ),
  total_duration: z
    .number()
    .min(1, "Duration is required")
    .max(10000, "Duration must be less than 10000 minutes"),
  status: z.enum(["draft", "published", "archived"], {
    message: "Status is required",
  }),
});

type CourseFormValues = z.infer<typeof courseSchema>;

interface EditCourseModalProps {
  course: ICourse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  categories?: Category[];
  instructors?: User[];
}

// Function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Function to get YouTube embed URL
const getYouTubeEmbedUrl = (url: string) => {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

export default function EditCourseModal({
  course,
  open,
  onOpenChange,
  onSuccess,
  categories = [],
  instructors = [],
}: EditCourseModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnailPublicId, setThumbnailPublicId] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");

  const { mutate: updateCourse } = usePatch(`/course/update-course`, {
    revalidateKey: "/course/get-all-courses",
  });

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      slug: "",
      short_description: "",
      full_description: "",
      thumbnail: "",
      preview_video: "",
      category_id: "",
      instructor_id: [],
      regular_price: 0,
      discount_price: 0,
      course_level: "beginner",
      language: "english",
      total_duration: 0,
      status: "draft",
    },
  });

  // Populate form when course data is available
  useEffect(() => {
    if (course && open) {
      form.reset({
        title: course.title,
        slug: course.slug,
        short_description: course.short_description,
        full_description: course.full_description,
        thumbnail: course.thumbnail || "",
        preview_video: course.preview_video || "",
        category_id: course.category._id,
        instructor_id: course.instructor_id,
        regular_price: course.regular_price,
        discount_price: course.discount_price,
        course_level: course.course_level as any,
        language: course.language as any,
        total_duration: course.total_duration,
        status: course.status as any,
      });

      setThumbnailPreview(course.thumbnail || "");
      setThumbnailPublicId("");

      // Set video preview if exists
      if (course.preview_video) {
        const embedUrl = getYouTubeEmbedUrl(course.preview_video);
        setVideoPreviewUrl(embedUrl || "");
      }
    }
  }, [course, open, form]);

  // Watch video URL for preview
  const videoUrl = form.watch("preview_video");

  // Update video preview when URL changes
  useEffect(() => {
    if (
      videoUrl &&
      videoUrl.match(
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
      )
    ) {
      const embedUrl = getYouTubeEmbedUrl(videoUrl);
      setVideoPreviewUrl(embedUrl || "");
    } else {
      setVideoPreviewUrl("");
    }
  }, [videoUrl]);

  // Auto-generate slug from title
  const generateSlugFromTitle = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const onSubmit = async (values: CourseFormValues) => {
    if (!course) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...values,
        thumbnail: thumbnailPreview || values.thumbnail,
        thumbnailPublicId: thumbnailPublicId || undefined,
        regular_price: Number(values.regular_price),
        discount_price: Number(values.discount_price),
        total_duration: Number(values.total_duration),
      };

      const res = await updateCourse({
        id: course._id,
        data: payload,
      });

      if (res?.success) {
        notify.success("Course updated successfully");
        onOpenChange(false);

        if (onSuccess) {
          onSuccess();
        }
      } else {
        notify.error(res?.message || "Failed to update course");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      notify.error("An error occurred while updating the course");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleThumbnailChange = (url: string, public_id: string) => {
    form.setValue("thumbnail", url, { shouldValidate: true });
    setThumbnailPreview(url);
    setThumbnailPublicId(public_id);
  };

  // Filter instructors (only show users with role instructor or admin)
  const availableInstructors = instructors.filter(
    (user) => user.role === "instructor" || user.role === "admin",
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Course</DialogTitle>
          <DialogDescription>
            Update the details of "{course?.title}" course.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FieldGroup>
            {/* Course Title */}
            <Field>
              <FieldLabel>Course Title *</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="e.g., Full Stack Web Development Bootcamp"
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
                        generateSlugFromTitle(value),
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
                Enter a descriptive title for the course.
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
                  placeholder="e.g., full-stack-web-development-bootcamp"
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

            {/* Category Selection */}
            <Field>
              <FieldLabel>Category *</FieldLabel>
              <FieldContent>
                <Select
                  disabled
                  onValueChange={(value) =>
                    form.setValue("category_id", value, {
                      shouldValidate: true,
                    })
                  }
                  value={form.getValues("category_id")}
                >
                  <SelectTrigger className="w-full p-5">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
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
                Select the category this course belongs to.
              </FieldDescription>
              <FieldError>
                {form.formState.errors.category_id?.message}
              </FieldError>
            </Field>

            {/* Instructors Selection (Multi-Select) */}
            <Field>
              <FieldLabel>Instructors *</FieldLabel>
              <FieldContent>
                <MultiSelect
                  values={form.watch("instructor_id")}
                  onValuesChange={(value: string[]) => {
                    form.setValue("instructor_id", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                >
                  <MultiSelectTrigger className="p-5 w-full">
                    <MultiSelectValue placeholder="Select instructors" />
                  </MultiSelectTrigger>
                  <MultiSelectContent>
                    {availableInstructors.map((instructor) => (
                      <MultiSelectItem
                        key={instructor._id}
                        value={instructor._id}
                      >
                        <div className="flex flex-col">
                          <span>{instructor.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {instructor.email} • {instructor.role}
                          </span>
                        </div>
                      </MultiSelectItem>
                    ))}
                  </MultiSelectContent>
                </MultiSelect>
              </FieldContent>
              <FieldDescription>
                Select one or more instructors for this course.
              </FieldDescription>
              <FieldError>
                {form.formState.errors.instructor_id?.message}
              </FieldError>
            </Field>

            {/* Short Description */}
            <Field>
              <FieldLabel>Short Description *</FieldLabel>
              <FieldContent>
                <Textarea
                  placeholder="Brief description of the course (max 200 characters)"
                  className="min-h-[80px] p-5"
                  {...form.register("short_description")}
                />
              </FieldContent>
              <FieldDescription>
                {form.watch("short_description")?.length || 0}/200
                characters
              </FieldDescription>
              <FieldError>
                {form.formState.errors.short_description?.message}
              </FieldError>
            </Field>

            {/* Full Description */}
            <Field>
              <FieldLabel>Full Description *</FieldLabel>
              <FieldContent>
                <Textarea
                  placeholder="Detailed description of the course content, requirements, and outcomes"
                  className="min-h-[150px] p-5"
                  {...form.register("full_description")}
                />
              </FieldContent>
              <FieldDescription>
                {form.watch("full_description")?.length || 0}/5000
                characters
              </FieldDescription>
              <FieldError>
                {form.formState.errors.full_description?.message}
              </FieldError>
            </Field>

            {/* Thumbnail Upload */}
            <Field>
              <FieldLabel>Thumbnail Image *</FieldLabel>
              <FieldContent>
                <ImageUploader
                  value={form.getValues("thumbnail")}
                  imagePublicId={thumbnailPublicId}
                  onChange={handleThumbnailChange}
                />
              </FieldContent>
              <FieldDescription>
                Upload a thumbnail image for the course (recommended
                size: 1280x720).
              </FieldDescription>
              <FieldError>
                {form.formState.errors.thumbnail?.message}
              </FieldError>
            </Field>

            {/* Preview Video URL Input */}
            <Field>
              <FieldLabel>Preview Video (YouTube URL) *</FieldLabel>
              <FieldContent>
                <div className="space-y-3 w-full">
                  <div className="relative">
                    {/* <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" /> */}
                    <Input
                      type="text"
                      placeholder="https://www.youtube.com/watch?v=..."
                      {...form.register("preview_video")}
                      className="pl-10 p-5"
                    />
                  </div>
                  {videoPreviewUrl && (
                    <div className="mt-3">
                      <p className="text-sm font-medium mb-2">
                        Video Preview:
                      </p>
                      <div className="aspect-video rounded-lg overflow-hidden border bg-muted">
                        <iframe
                          src={videoPreviewUrl}
                          title="YouTube video preview"
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}
                </div>
              </FieldContent>
              <FieldDescription>
                Enter a YouTube video URL for the course
                preview/trailer.
              </FieldDescription>
              <FieldError>
                {form.formState.errors.preview_video?.message}
              </FieldError>
            </Field>

            {/* Course Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Regular Price */}
              <Field>
                <FieldLabel>Regular Price ($) *</FieldLabel>
                <FieldContent>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...form.register("regular_price", {
                      valueAsNumber: true,
                    })}
                    className="p-5"
                  />
                </FieldContent>
                <FieldError>
                  {form.formState.errors.regular_price?.message}
                </FieldError>
              </Field>

              {/* Discount Price */}
              <Field>
                <FieldLabel>Discount Price ($) *</FieldLabel>
                <FieldContent>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...form.register("discount_price", {
                      valueAsNumber: true,
                    })}
                    className="p-5"
                  />
                </FieldContent>
                <FieldDescription>
                  Enter 0 for no discount
                </FieldDescription>
                <FieldError>
                  {form.formState.errors.discount_price?.message}
                </FieldError>
              </Field>

              {/* Course Level */}
              <Field>
                <FieldLabel>Course Level *</FieldLabel>
                <FieldContent>
                  <Select
                    onValueChange={(value: any) =>
                      form.setValue("course_level", value, {
                        shouldValidate: true,
                      })
                    }
                    value={form.getValues("course_level")}
                  >
                    <SelectTrigger className="p-5 w-full">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">
                        Beginner
                      </SelectItem>
                      <SelectItem value="intermediate">
                        Intermediate
                      </SelectItem>
                      <SelectItem value="advanced">
                        Advanced
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FieldContent>
                <FieldError>
                  {form.formState.errors.course_level?.message}
                </FieldError>
              </Field>

              {/* Language */}
              <Field>
                <FieldLabel>Language *</FieldLabel>
                <FieldContent>
                  <Select
                    onValueChange={(value: any) =>
                      form.setValue("language", value, {
                        shouldValidate: true,
                      })
                    }
                    value={form.getValues("language")}
                  >
                    <SelectTrigger className="p-5 w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bangla">
                        বাংলা (Bangla)
                      </SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">
                        हिन्दी (Hindi)
                      </SelectItem>
                      <SelectItem value="spanish">
                        Español (Spanish)
                      </SelectItem>
                      <SelectItem value="french">
                        Français (French)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FieldContent>
                <FieldError>
                  {form.formState.errors.language?.message}
                </FieldError>
              </Field>

              {/* Total Duration */}
              <Field>
                <FieldLabel>Total Duration (minutes) *</FieldLabel>
                <FieldContent>
                  <Input
                    type="number"
                    placeholder="e.g., 900"
                    {...form.register("total_duration", {
                      valueAsNumber: true,
                    })}
                    className="p-5"
                  />
                </FieldContent>
                <FieldDescription>
                  Total course duration in minutes
                </FieldDescription>
                <FieldError>
                  {form.formState.errors.total_duration?.message}
                </FieldError>
              </Field>

              {/* Status */}
              <Field>
                <FieldLabel>Status *</FieldLabel>
                <FieldContent>
                  <Select
                    onValueChange={(value: any) =>
                      form.setValue("status", value, {
                        shouldValidate: true,
                      })
                    }
                    value={form.getValues("status")}
                  >
                    <SelectTrigger className="p-5 w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">
                        Published
                      </SelectItem>
                      <SelectItem value="archived">
                        Archived
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FieldContent>
                <FieldDescription>
                  Set the course visibility status
                </FieldDescription>
                <FieldError>
                  {form.formState.errors.status?.message}
                </FieldError>
              </Field>
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
                setThumbnailPreview("");
                setVideoPreviewUrl("");
                setThumbnailPublicId("");
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
              Update Course
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

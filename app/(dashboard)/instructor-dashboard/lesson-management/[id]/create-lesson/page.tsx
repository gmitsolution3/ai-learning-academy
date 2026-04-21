"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { usePost } from "@/hooks/swr/usePost";
import { generateSlug } from "@/utils";
import { notify } from "@/utils/notify";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  GripVertical,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

// Single lesson schema
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
  order_index: z.number().min(0, "Order index must be 0 or greater"),
  is_completed: z.boolean().default(false),
});

// Bulk create schema
const bulkLessonSchema = z.object({
  lessons: z
    .array(lessonSchema)
    .min(1, "At least one lesson is required"),
});

type BulkLessonFormValues = z.infer<typeof bulkLessonSchema>;

export default function CreateLessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: moduleId } = use(params);
  const router = useRouter();

  const { mutate: createLessons, isLoading } = usePost(
    "/lessons/create-module-lessons",
    {
      revalidateKey: `/lessons/get-lesson-by-module-id/${moduleId}`,
    },
  );

  const form = useForm<
    z.input<typeof bulkLessonSchema>,
    any,
    z.output<typeof bulkLessonSchema>
  >({
    resolver: zodResolver(bulkLessonSchema),
    defaultValues: {
      lessons: [
        {
          title: "",
          slug: "",
          description: "",
          content_type: "text",
          content_url: "",
          duration: 0,
          order_index: 1,
          is_completed: false,
        },
      ],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "lessons",
  });

  const onSubmit = async (values: BulkLessonFormValues) => {
    if (values.lessons.length === 0) {
      notify.error("Please add at least one lesson");
      return;
    }

    try {
      const payload = {
        module_id: moduleId,
        lessons: values.lessons,
      };

      const res = await createLessons(payload);

      if (res?.success) {
        notify.success(
          `${values.lessons.length} lesson(s) created successfully`,
        );
        router.push(
          `/instructor-dashboard/lesson-management/${moduleId}`,
        );
      } else {
        notify.error(res?.message || "Failed to create lessons");
      }
    } catch (error) {
      console.error("Error creating lessons:", error);
      notify.error("An error occurred while creating the lessons");
    }
  };

  const addLesson = () => {
    const nextOrderIndex = fields.length + 1;
    append({
      title: "",
      slug: "",
      description: "",
      content_type: "text",
      content_url: "",
      duration: 0,
      order_index: nextOrderIndex,
      is_completed: false,
    });
  };

  const removeLesson = (index: number) => {
    if (fields.length === 1) {
      notify.warning("You need at least one lesson");
      return;
    }
    remove(index);
    // Reorder remaining lessons
    const remainingLessons = form.getValues("lessons");
    remainingLessons.forEach((_, idx) => {
      form.setValue(`lessons.${idx}.order_index`, idx + 1);
    });
  };

  return (
    <div className="container mx-auto py-10 px-4 lg:px-0">
      <div className="mb-6">
        <Link
          href={`/instructor-dashboard/lesson-management/${moduleId}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Lessons
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">
                Create Lessons For Module
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Module ID: <code className="text-xs">{moduleId}</code>
              </p>
            </div>
            <Button
              type="button"
              onClick={addLesson}
              variant="outline"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Another Lesson
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="relative border rounded-lg p-6 space-y-4 bg-muted/5 max-w-4xl mx-auto"
              >
                {/* Lesson Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                    <h3 className="text-lg font-semibold">
                      Lesson {index + 1}
                    </h3>
                  </div>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLesson(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  )}
                </div>

                <FieldGroup>
                  {/* Lesson Title */}
                  <Field>
                    <FieldLabel>Lesson Title *</FieldLabel>
                    <FieldContent>
                      <Input
                        placeholder="e.g., Introduction to NoSQL"
                        {...form.register(`lessons.${index}.title`)}
                        onChange={(e) => {
                          const value = e.target.value;
                          form.setValue(
                            `lessons.${index}.title`,
                            value,
                            {
                              shouldValidate: true,
                            },
                          );
                          const currentSlug = form.getValues(
                            `lessons.${index}.slug`,
                          );
                          if (
                            !currentSlug ||
                            currentSlug === generateSlug(currentSlug)
                          ) {
                            form.setValue(
                              `lessons.${index}.slug`,
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
                      Enter a descriptive title for the lesson.
                    </FieldDescription>
                    <FieldError>
                      {
                        form.formState.errors.lessons?.[index]?.title
                          ?.message
                      }
                    </FieldError>
                  </Field>

                  {/* Slug */}
                  <Field>
                    <FieldLabel>Slug *</FieldLabel>
                    <FieldContent>
                      <Input
                        placeholder="e.g., introduction-to-nosql"
                        {...form.register(`lessons.${index}.slug`)}
                        className="p-5"
                      />
                    </FieldContent>
                    <FieldDescription>
                      URL-friendly version of the title.
                    </FieldDescription>
                    <FieldError>
                      {
                        form.formState.errors.lessons?.[index]?.slug
                          ?.message
                      }
                    </FieldError>
                  </Field>

                  {/* Content Type */}
                  <Field>
                    <FieldLabel>Content Type *</FieldLabel>
                    <FieldContent>
                      <Select
                        onValueChange={(value: any) =>
                          form.setValue(
                            `lessons.${index}.content_type`,
                            value,
                            {
                              shouldValidate: true,
                            },
                          )
                        }
                        value={form.watch(
                          `lessons.${index}.content_type`,
                        )}
                      >
                        <SelectTrigger className="p-5 w-full">
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
                      {
                        form.formState.errors.lessons?.[index]
                          ?.content_type?.message
                      }
                    </FieldError>
                  </Field>

                  {/* Content URL */}
                  <Field>
                    <FieldLabel>Content URL *</FieldLabel>
                    <FieldContent>
                      <Input
                        type="url"
                        placeholder="https://..."
                        {...form.register(
                          `lessons.${index}.content_url`,
                        )}
                        className="p-5"
                      />
                    </FieldContent>
                    <FieldDescription>
                      URL to the lesson content.
                    </FieldDescription>
                    <FieldError>
                      {
                        form.formState.errors.lessons?.[index]
                          ?.content_url?.message
                      }
                    </FieldError>
                  </Field>

                  {/* Duration */}
                  <Field>
                    <FieldLabel>Duration (minutes) *</FieldLabel>
                    <FieldContent>
                      <Input
                        type="number"
                        placeholder="e.g., 450"
                        {...form.register(
                          `lessons.${index}.duration`,
                          {
                            valueAsNumber: true,
                          },
                        )}
                        className="p-5"
                      />
                    </FieldContent>
                    <FieldDescription>
                      Estimated time to complete this lesson in
                      minutes.
                    </FieldDescription>
                    <FieldError>
                      {
                        form.formState.errors.lessons?.[index]
                          ?.duration?.message
                      }
                    </FieldError>
                  </Field>

                  {/* Description */}
                  <Field>
                    <FieldLabel>Description</FieldLabel>
                    <FieldContent>
                      <Textarea
                        placeholder="Brief description of the lesson (optional)"
                        className="min-h-[80px] p-5"
                        {...form.register(
                          `lessons.${index}.description`,
                        )}
                      />
                    </FieldContent>
                    <FieldDescription>
                      {form.watch(`lessons.${index}.description`)
                        ?.length || 0}
                      /500 characters
                    </FieldDescription>
                    <FieldError>
                      {
                        form.formState.errors.lessons?.[index]
                          ?.description?.message
                      }
                    </FieldError>
                  </Field>

                  {/* Order Index (Hidden but tracked) */}
                  <input
                    type="hidden"
                    {...form.register(
                      `lessons.${index}.order_index`,
                      {
                        valueAsNumber: true,
                      },
                    )}
                    value={index + 1}
                  />

                  {/* is_completed (Hidden, always false for new lessons) */}
                  <input
                    type="hidden"
                    {...form.register(
                      `lessons.${index}.is_completed`,
                    )}
                    value="false"
                  />
                </FieldGroup>
              </div>
            ))}

            {/* Summary Section */}
            <div className="sticky bottom-4 bg-background border rounded-lg p-4 shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  Total Lessons:{" "}
                  <span className="font-semibold text-foreground">
                    {fields.length}
                  </span>
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="p-5"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || fields.length === 0}
                    className="gap-2 p-5"
                  >
                    {isLoading && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    Create {fields.length} Lesson
                    {fields.length > 1 ? "s" : ""}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

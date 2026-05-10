"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFetchById } from "@/hooks/swr/useFetchById";
import { usePost } from "@/hooks/swr/usePost";
import { useSession } from "@/lib/auth-context";
import { notify } from "@/utils/notify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ConsultancyType enum (adjust based on your actual enum)
enum ConsultancyType {
  Online = "Online",
  Offline = "Offline",
}

// Form Schema
const formSchema = z.object({
  name: z
    .string()
    .min(2, "নাম ২ অক্ষরের হতে হবে")
    .max(50, "নাম ৫০ অক্ষরের বেশি হতে হবে না"),
  email: z.string().email("বৈধ ইমেইল ঠিকানা প্রদান করুন"),
  phone: z
    .string()
    .min(11, "ফোন নম্বর ১১ ডিজিটের হতে হবে")
    .max(11, "ফোন নম্বর 11 ডিজিটের বেশি হতে পারে না")
    .regex(/^[0-9+-\s]+$/, "শুধুমাত্র সংখ্যা ব্যবহার করুন"),
  topic: z
    .string()
    .min(5, "বিষয় কমপক্ষে ৫ অক্ষরের হতে হবে")
    .max(200, "বিষয় ২০০ অক্ষরের বেশি হতে পারে না"),
  description: z
    .string()
    .min(50, "বিস্তারিত কমপক্ষে ৫০ অক্ষরের হতে হবে")
    .max(1000, "বিস্তারিত ১০০০ অক্ষরের বেশি হতে পারে না"),
  isEnrolledCourse: z.boolean().default(false),
  courseId: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

// Types for API responses
interface EnrolledCourse {
  _id: string;
  category_id: string;
  title: string;
  slug: string;
  thumbnail: string;
  instructor_id: string[];
  regular_price: number;
  discount_price: number;
}

interface Batch {
  _id: string;
  created_at: string;
  course_id: string;
  batch_name: string;
  batch_slug: string;
  total_module: number;
  batch_starting_date: string;
  batch_ending_date: string;
  enrolled_type: Array<{
    type: string;
    max_student: number;
    enrolled: number;
  }>;
  completed_module: number;
  batch_status: string;
  update_at: string;
}

interface UserEnrolledData {
  course: EnrolledCourse[];
  batch: Batch; // Single object, not array
}

interface PayloadUser {
  name: string;
  email: string;
  phone: string;
}

interface PayloadCourseDetails {
  course: {
    _id: string;
    name: string;
  };
  batch: {
    _id: string;
    name: string;
  };
}

interface Payload {
  user: PayloadUser;
  consultancy_type: ConsultancyType;
  topic: string;
  isEnrolledCourse: boolean;
  courseDetails?: PayloadCourseDetails;
  description: string;
  instructorId: string;
}

export default function ConsultationForm() {
  const [selectedCourse, setSelectedCourse] =
    useState<EnrolledCourse | null>(null);

  const { session } = useSession();
  const router = useRouter();

  const user = session?.user;

  const { data: userData, isLoading: userDetailIsLoading } =
    useFetchById("/enrolled/get-user-enrolled-data", user?.email);

  const { mutate: submitData, isLoading } = usePost(
    "/consultancy/booked-consultancy",
  );

  const userDetail = (userData?.data || {}) as UserEnrolledData;
  const enrolledCourses = userDetail?.course || [];
  const enrolledBatch = userDetail?.batch; // Single object

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<
    z.input<typeof formSchema>,
    any,
    z.output<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      topic: "",
      description: "",
      isEnrolledCourse: false,
      courseId: "",
    },
  });

  const isEnrolledCourse = watch("isEnrolledCourse");
  const selectedCourseId = watch("courseId");

  // Find selected course details
  useEffect(() => {
    if (selectedCourseId && enrolledCourses.length > 0) {
      const course = enrolledCourses.find(
        (c) => c._id === selectedCourseId,
      );
      setSelectedCourse(course || null);

      setValue("isEnrolledCourse", true);
    } else {
      setSelectedCourse(null);
    }
  }, [selectedCourseId, enrolledCourses]);

  // Auto-fill user data when available
  useEffect(() => {
    if (user) {
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setValue("phone", user.phone || "");
    }
  }, [user, setValue]);

  const onSubmit = useCallback(
    async (data: FormData) => {
      // Validate courseDetails if isEnrolledCourse is true
      if (data.isEnrolledCourse) {
        if (!data.courseId) {
          setError("courseId", {
            message: "দয়া করে একটি কোর্স নির্বাচন করুন",
          });
          return;
        }
        clearErrors("courseId");
      }

      try {
        // Find selected course details
        const selectedCourseDetails = enrolledCourses.find(
          (c) => c._id === data.courseId,
        );

        // Prepare payload according to the required structure
        const payload: Payload = {
          user: {
            name: data.name,
            email: data.email,
            phone: data.phone,
          },
          consultancy_type: ConsultancyType.Online,
          topic: data.topic,
          isEnrolledCourse: data.isEnrolledCourse,
          description: data.description,
          instructorId: "",
        };

        // Only include courseDetails if enrolled in a course
        if (
          data.isEnrolledCourse &&
          selectedCourseDetails &&
          enrolledBatch
        ) {
          payload.courseDetails = {
            course: {
              _id: selectedCourseDetails._id,
              name: selectedCourseDetails.title,
            },
            batch: {
              _id: enrolledBatch._id,
              name: enrolledBatch.batch_name,
            },
          };
        }

        const res = await submitData(payload);

        if (res.success) {
          notify.success("Consultation booked successfully.");

          reset({
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            topic: "",
            description: "",
            isEnrolledCourse: false,
            courseId: "",
          });
          setSelectedCourse(null);

          router.push("/");
        }
      } catch (error) {
        console.error("Form submission error:", error);
        notify.error(
          "দুঃখিত, ফর্ম জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        );
      }
    },
    [
      reset,
      user,
      enrolledCourses,
      enrolledBatch,
      setError,
      clearErrors,
    ],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 w-full"
    >
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-white/80 text-sm">
          আপনার নাম <span className="text-[#F9D49B]">*</span>
        </Label>
        <Input
          id="name"
          type="text"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby="name-error"
          placeholder="আপনার নাম লিখুন"
          className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 !p-5 ${
            errors.name ? "border-red-500 focus:border-red-500" : ""
          }`}
          {...register("name")}
        />
        {errors.name && (
          <p id="name-error" className="text-red-400 text-xs mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white/80 text-sm">
          ইমেইল ঠিকানা <span className="text-[#F9D49B]">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
          placeholder="you@example.com"
          className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 !p-5 ${
            errors.email ? "border-red-500 focus:border-red-500" : ""
          }`}
          {...register("email")}
        />
        {errors.email && (
          <p id="email-error" className="text-red-400 text-xs mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-white/80 text-sm">
          ফোন নম্বর <span className="text-[#F9D49B]">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={!!errors.phone}
          aria-describedby="phone-error"
          placeholder="০১XXXXXXXXX"
          className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 !p-5 ${
            errors.phone ? "border-red-500 focus:border-red-500" : ""
          }`}
          {...register("phone")}
        />
        {errors.phone && (
          <p id="phone-error" className="text-red-400 text-xs mt-1">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Topic */}
      <div className="space-y-2">
        <Label htmlFor="topic" className="text-white/80 text-sm">
          বিষয় <span className="text-[#F9D49B]">*</span>
        </Label>
        <Input
          id="topic"
          type="text"
          aria-invalid={!!errors.topic}
          aria-describedby="topic-error"
          placeholder="যেমন: ক্যারিয়ার গাইডেন্স, ওয়েব ডেভেলপমেন্ট"
          className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 !p-5 ${
            errors.topic ? "border-red-500 focus:border-red-500" : ""
          }`}
          {...register("topic")}
        />
        {errors.topic && (
          <p id="topic-error" className="text-red-400 text-xs mt-1">
            {errors.topic.message}
          </p>
        )}
      </div>

      {/* Is Enrolled Course Checkbox */}
      <div className="flex items-center space-x-2 py-2">
        <Checkbox
          id="isEnrolledCourse"
          checked={isEnrolledCourse}
          disabled={!isEnrolledCourse}
          onCheckedChange={(checked) => {
            setValue("isEnrolledCourse", checked as boolean);
            if (!checked) {
              setValue("courseId", "");
              setSelectedCourse(null);
              clearErrors("courseId");
            }
          }}
          className="border-white/40 data-[state=checked]:bg-[#C994FF] data-[state=checked]:border-[#C994FF]"
        />
        <Label
          htmlFor="isEnrolledCourse"
          className="text-white/80 text-sm cursor-pointer"
        >
          আমি ইতিমধ্যে একটি কোর্সে এনরোলড আছি
        </Label>
      </div>

      {/* Course Selection (conditional) */}
      {isEnrolledCourse && (
        <div className="space-y-4 pl-6 border-l-2 border-[#C994FF]/30">
          {/* Course Selection */}
          <div className="space-y-2">
            <Label
              htmlFor="courseId"
              className="text-white/80 text-sm"
            >
              আপনার কোর্স নির্বাচন করুন{" "}
              <span className="text-[#F9D49B]">*</span>
            </Label>
            <Select
              value={watch("courseId")}
              onValueChange={(value) => {
                setValue("courseId", value);
                clearErrors("courseId");
              }}
            >
              <SelectTrigger
                className={`bg-white/10 border-white/20 text-white focus:border-[#C994FF] focus:ring-[#C994FF]/20 ${
                  errors.courseId ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder="কোর্স নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/20 text-white">
                {userDetailIsLoading ? (
                  <SelectItem value="loading" disabled>
                    লোড হচ্ছে...
                  </SelectItem>
                ) : enrolledCourses.length === 0 ? (
                  <SelectItem value="none" disabled>
                    কোন কোর্স পাওয়া যায়নি
                  </SelectItem>
                ) : (
                  enrolledCourses.map((course) => (
                    <SelectItem key={course._id} value={course._id}>
                      {course.title}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {errors.courseId && (
              <p className="text-red-400 text-xs mt-1">
                {errors.courseId.message}
              </p>
            )}
          </div>

          {/* Display Batch Info if course is selected */}
          {selectedCourse && enrolledBatch && (
            <div className="bg-white/5 rounded-lg p-4 space-y-2">
              <div>
                <p className="text-white/60 text-xs">
                  নির্বাচিত কোর্স:
                </p>
                <p className="text-white text-sm font-medium">
                  {selectedCourse.title}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10">
                <p className="text-white/60 text-xs">আপনার ব্যাচ:</p>
                <p className="text-white text-sm font-medium">
                  {enrolledBatch.batch_name}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Description */}
      <div className="space-y-2">
        <Label
          htmlFor="description"
          className="text-white/80 text-sm"
        >
          বিস্তারিত বিবরণ <span className="text-[#F9D49B]">*</span>
        </Label>
        <Textarea
          id="description"
          rows={8}
          aria-invalid={!!errors.description}
          aria-describedby="description-error"
          placeholder="আপনার প্রশ্ন বা মন্তব্য বিস্তারিত লিখুন..."
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 resize-none !p-5"
          {...register("description")}
        />
        {errors.description && (
          <p
            id="description-error"
            className="text-red-400 text-xs mt-1"
          >
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading || userDetailIsLoading}
        className="w-full bg-gradient-to-r from-secondary to-primary text-white font-semibold py-3 hover:opacity-90 transition-opacity rounded-lg p-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "জমা হচ্ছে..." : "সাবমিট করুন →"}
      </Button>
    </form>
  );
}

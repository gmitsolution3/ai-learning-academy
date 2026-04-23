"use client";
import PurchasePageError from "@/components/Home/PurchaseCourse/error";
import PurchasePageLoader from "@/components/Home/PurchaseCourse/loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useFetchById } from "@/hooks/swr/useFetchById";
import { usePost } from "@/hooks/swr/usePost";
import { useSession } from "@/lib/auth-context";
import { formatDuration, formatPrice } from "@/utils";
import { notify } from "@/utils/notify";
import {
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Headphones,
  Monitor,
  Shield,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";

export default function PurchaseCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading, isError } = useFetchById(
    "/course/get-course-details",
    id,
  );
  const { mutate: purchaseCourse, isLoading: isPurchasing } = usePost(
    "/enrolled/student-enrolled",
  );

  const courseData = data?.data || {};
  const { session } = useSession();
  const user = session?.user;

  // Form states
  const [courseType, setCourseType] = useState<string>("Online");
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  // Get batch enrollment info
  const onlineBatch = courseData?.batch?.enrolled_type?.find(
    (type: any) => type.type === "Online",
  );
  const offlineBatch = courseData?.batch?.enrolled_type?.find(
    (type: any) => type.type === "Offline",
  );

  const totalEnrolled =
    (onlineBatch?.enrolled || 0) + (offlineBatch?.enrolled || 0);

  // Check seat availability based on selected course type
  const getAvailableSeatsForType = () => {
    if (courseType === "Online" && onlineBatch) {
      return onlineBatch.max_student - onlineBatch.enrolled;
    }
    if (courseType === "Offline" && offlineBatch) {
      return offlineBatch.max_student - offlineBatch.enrolled;
    }
    return 0;
  };

  const availableSeatsForType = getAvailableSeatsForType();
  const isSeatAvailable = availableSeatsForType > 0;

  const finalPrice =
    courseData?.discount_price > 0
      ? courseData?.discount_price
      : courseData?.regular_price;

  const discountPercentage =
    courseData?.discount_price && courseData?.regular_price
      ? Math.round(
          ((courseData.regular_price - courseData.discount_price) /
            courseData.regular_price) *
            100,
        )
      : 0;

  const handlePurchase = async (data: any) => {
    // Check if user is logged in
    if (!user) {
      notify.error("দয়া করে প্রথমে লগইন করুন");
      return;
    }

    // Validate form
    if (!courseType) {
      notify.error("দয়া করে কোর্স টাইপ নির্বাচন করুন");
      return;
    }

    if (!paymentMethod) {
      notify.error("দয়া করে পেমেন্ট মেথড নির্বাচন করুন");
      return;
    }

    if (!isSeatAvailable) {
      notify.error(`দুঃখিত, ${courseType} এ আর আসন বাকি নেই`);
      return;
    }

    // Prepare payload
    const payload = {
      course_id: courseData._id,
      batch_id: courseData.batch?._id,
      enroll_date: new Date().toISOString(),
      user_id: user._id || user.id,
      user_email: user.email,
      status: "active",
      progress: 0,
      last_accessed: new Date().toISOString(),
      payment_status: "not_paid",
      course_type: courseType,
      payment_method: paymentMethod,
      price: finalPrice,
      certificate_issued: false,
    };

    console.log("Payload to send:", payload);

    try {
      const response = await purchaseCourse(payload);
      console.log("Enrollment response:", response);

      if (response?.data?.acknowledged) {
        notify.success("এনরোলমেন্ট সফল হয়েছে!");
        // Redirect to payment page or dashboard
        // router.push("/dashboard/my-courses");
      } else {
        notify.error(response?.data?.message || "এনরোলমেন্ট ব্যর্থ হয়েছে");
      }
    } catch (error) {
      console.error("Enrollment error:", error);
      notify.error("কিছু সমস্যা হয়েছে, পরে আবার চেষ্টা করুন");
    } 
  };

  if (isLoading) {
    return <PurchasePageLoader />;
  }

  if (isError || !courseData?._id) {
    return <PurchasePageError />;
  }

  return (
    <div className="min-h-screen py-[150px]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
          <Link
            href="/"
            className="hover:text-secondary transition-colors"
          >
            হোম
          </Link>
          <span>/</span>
          <Link
            href="/courses"
            className="hover:text-secondary transition-colors"
          >
            কোর্স
          </Link>
          <span>/</span>
          <span className="text-white/80">{courseData.title}</span>
          <span>/</span>
          <span className="text-secondary">পেমেন্ট</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Title */}
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                {courseData.title}
              </h1>
              {courseData?.batch?.batch_name && (
                <Badge className="bg-secondary/20 text-secondary text-sm">
                  {courseData.batch.batch_name}
                </Badge>
              )}
            </div>

            {/* Course Thumbnail */}
            <Card className="overflow-hidden border border-white/20 bg-[#03050A]/50 backdrop-blur-sm">
              <div className="relative aspect-video">
                {courseData.thumbnail ? (
                  <Image
                    src={courseData.thumbnail}
                    alt={courseData.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                    <span className="text-white/50">
                      No image available
                    </span>
                  </div>
                )}
              </div>
            </Card>

            {/* Course Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border border-white/20 bg-white/5 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-white/60 mb-1">
                    <Clock className="size-4" />
                    <span className="text-xs">মোট সময়</span>
                  </div>
                  <p className="text-white font-semibold">
                    {formatDuration(courseData.total_duration || 0)}
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-white/20 bg-white/5 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-white/60 mb-1">
                    <Users className="size-4" />
                    <span className="text-xs">নথিভুক্ত</span>
                  </div>
                  <p className="text-white font-semibold">
                    {totalEnrolled}+ শিক্ষার্থী
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-white/20 bg-white/5 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-white/60 mb-1 capitalize">
                    <span className="text-xs">দক্ষতা স্তর</span>
                  </div>
                  <p className="text-white font-semibold capitalize">
                    {courseData.course_level}
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-white/20 bg-white/5 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-white/60 mb-1">
                    <span className="text-xs">ভাষা</span>
                  </div>
                  <p className="text-white font-semibold capitalize">
                    {courseData.language === "bangla"
                      ? "বাংলা"
                      : courseData.language}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Course Description */}
            <Card className="border border-white/20 bg-[#03050A]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">
                  কোর্স সম্পর্কে
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 leading-relaxed">
                  {courseData.full_description ||
                    courseData.short_description}
                </p>
              </CardContent>
            </Card>

            {/* Batch Details */}
            {courseData?.batch && (
              <Card className="border border-white/20 bg-[#03050A]/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white">
                    ব্যাচের তথ্য
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="size-5 text-secondary" />
                      <div>
                        <p className="text-xs text-white/60">
                          শুরুর তারিখ
                        </p>
                        <p className="text-white font-medium">
                          {new Date(
                            courseData.batch.batch_starting_date,
                          ).toLocaleDateString("bn-BD", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="size-5 text-secondary" />
                      <div>
                        <p className="text-xs text-white/60">
                          শেষের তারিখ
                        </p>
                        <p className="text-white font-medium">
                          {new Date(
                            courseData.batch.batch_ending_date,
                          ).toLocaleDateString("bn-BD", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Monitor className="size-5 text-secondary" />
                      <div>
                        <p className="text-xs text-white/60">
                          মোট মডিউল
                        </p>
                        <p className="text-white font-medium">
                          {courseData.batch.total_module} টি
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="size-5" />
                      <div>
                        <p className="text-xs text-white/60">
                          সম্পন্ন মডিউল
                        </p>
                        <p className="text-white font-medium">
                          {courseData.batch.completed_module} টি
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* What You'll Get */}
            <Card className="border border-white/20 bg-[#03050A]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">
                  যা যা পাচ্ছেন
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: CheckCircle, text: "লাইফটাইম এক্সেস" },
                    {
                      icon: CheckCircle,
                      text: "সার্টিফিকেট অফ কমপ্লিশন",
                    },
                    {
                      icon: CheckCircle,
                      text: "প্রাকটিক্যাল প্রজেক্ট",
                    },
                    { icon: CheckCircle, text: "২৪/৭ সাপোর্ট" },
                    { icon: CheckCircle, text: "রেকর্ডেড ক্লাস" },
                    { icon: CheckCircle, text: "রেজিউমি রিভিউ" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2"
                    >
                      <item.icon className="size-4 text-secondary" />
                      <span className="text-white/80 text-sm">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Purchase Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-2 border-secondary/30 bg-gradient-to-br from-[#191B22] to-[#0a0c15] shadow-xl shadow-secondary/10">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white text-center">
                    এনরোল করুন
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Price */}
                  <div className="text-center">
                    {discountPercentage > 0 ? (
                      <>
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-3xl font-bold text-green-500">
                            {formatPrice(finalPrice)}
                          </span>
                          <span className="text-lg text-gray-500 line-through">
                            {formatPrice(courseData.regular_price)}
                          </span>
                        </div>
                        <Badge className="mt-2 bg-secondary/20 text-secondary">
                          {discountPercentage}% ছাড়
                        </Badge>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-white">
                        {formatPrice(courseData.regular_price)}
                      </span>
                    )}
                  </div>

                  <Separator className="bg-white/10" />

                  {/* Course Type Selection - Radio Buttons */}
                  <div className="space-y-3">
                    <Label className="text-white text-sm font-medium">
                      কোর্স টাইপ নির্বাচন করুন{" "}
                      <span className="text-red-400">*</span>
                    </Label>
                    <RadioGroup
                      value={courseType}
                      onValueChange={setCourseType}
                      className="grid grid-cols-2 gap-4"
                    >
                      {onlineBatch && (
                        <div className="relative">
                          <RadioGroupItem
                            value="Online"
                            id="online"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="online"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-white/20 bg-white/5 p-4 hover:bg-white/10 peer-data-[state=checked]:border-secondary peer-data-[state=checked]:bg-secondary/20 cursor-pointer transition-all"
                          >
                            <Monitor className="mb-2 size-5" />
                            <span className="text-white text-sm font-medium">
                              অনলাইন
                            </span>
                            <span className="text-xs text-white/60">
                              আসন:{" "}
                              {onlineBatch.max_student -
                                onlineBatch.enrolled}
                              /{onlineBatch.max_student}
                            </span>
                          </Label>
                        </div>
                      )}

                      {offlineBatch && (
                        <div className="relative">
                          <RadioGroupItem
                            value="Offline"
                            id="offline"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="offline"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-white/20 bg-white/5 p-4 hover:bg-white/10 peer-data-[state=checked]:border-secondary peer-data-[state=checked]:bg-secondary/20 cursor-pointer transition-all"
                          >
                            <Users className="mb-2 size-5" />
                            <span className="text-white text-sm font-medium">
                              অফলাইন
                            </span>
                            <span className="text-xs text-white/60">
                              আসন:{" "}
                              {offlineBatch.max_student -
                                offlineBatch.enrolled}
                              /{offlineBatch.max_student}
                            </span>
                          </Label>
                        </div>
                      )}
                    </RadioGroup>

                    {!isSeatAvailable && courseType && (
                      <p className="text-red-400 text-xs text-center">
                        ⚠️ {courseType} এ আর আসন বাকি নেই
                      </p>
                    )}
                  </div>

                  {/* Payment Method Selection - Select Dropdown */}
                  <div className="space-y-3">
                    <Label className="text-white text-sm font-medium">
                      পেমেন্ট মেথড নির্বাচন করুন{" "}
                      <span className="text-red-400">*</span>
                    </Label>
                    <Select
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                    >
                      <SelectTrigger className="border-white/20 bg-white/5 text-white">
                        <SelectValue placeholder="পেমেন্ট মেথড নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#191B22] border-white/20">
                        <SelectItem value="SSLCommerz (bKash)">
                          SSLCommerz (bKash)
                        </SelectItem>
                        <SelectItem value="SSLCommerz (Nagad)">
                          SSLCommerz (Nagad)
                        </SelectItem>
                        <SelectItem value="SSLCommerz (Rocket)">
                          SSLCommerz (Rocket)
                        </SelectItem>
                        <SelectItem value="SSLCommerz (Bank)">
                          SSLCommerz (Bank)
                        </SelectItem>
                        <SelectItem value="Stripe (Credit Card)">
                          Stripe (Credit Card)
                        </SelectItem>
                        <SelectItem value="Bank Transfer">
                          ব্যাংক ট্রান্সফার
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="bg-white/10" />

                  {/* Available Seats Warning for selected type */}
                  {availableSeatsForType <= 5 &&
                    availableSeatsForType > 0 && (
                      <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <p className="text-yellow-400 text-sm text-center font-medium">
                          ⚠️ {courseType} এ শুধুমাত্র{" "}
                          {availableSeatsForType} টি আসন বাকি!
                        </p>
                      </div>
                    )}

                  {/* Enrollment Details */}
                  {onlineBatch && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">
                          অনলাইন ক্লাস
                        </span>
                        <span className="text-white font-medium">
                          {onlineBatch.enrolled}/
                          {onlineBatch.max_student}
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-secondary to-primary h-2 rounded-full transition-all"
                          style={{
                            width: `${(onlineBatch.enrolled / onlineBatch.max_student) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {offlineBatch && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">
                          অফলাইন ক্লাস
                        </span>
                        <span className="text-white font-medium">
                          {offlineBatch.enrolled}/
                          {offlineBatch.max_student}
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-secondary to-primary h-2 rounded-full transition-all"
                          style={{
                            width: `${(offlineBatch.enrolled / offlineBatch.max_student) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <Separator className="bg-white/10" />

                  {/* Payment Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={() => handlePurchase(courseData)}
                      disabled={
                        isPurchasing ||
                        !isSeatAvailable ||
                        !paymentMethod
                      }
                      className="w-full bg-gradient-to-r from-secondary to-primary hover:shadow-lg hover:shadow-secondary/25 transition-all py-6 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Shield className="size-4 mr-2" />
                      {isPurchasing
                        ? "প্রসেসিং..."
                        : `এখনই কিনুন - ${formatPrice(finalPrice)}`}
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-white/20 hover:border-secondary/50 text-white py-6 text-base"
                    >
                      <Headphones className="size-4 mr-2" />
                      ফ্রি কনসালটেশন বুক করুন
                    </Button>
                  </div>

                  {/* Trust Badges */}
                  <div className="pt-4">
                    <div className="flex items-center justify-center gap-2 text-xs text-white/40">
                      <Award className="size-3" />
                      <span>সার্টিফাইড কোর্স</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <Shield className="size-3" />
                      <span>সিকিউর পেমেন্ট</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Instructor Info */}
              {courseData.instructor &&
                courseData.instructor.length > 0 && (
                  <Card className="mt-4 border border-white/20 bg-white/5 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-sm font-medium text-white/60">
                        ইনস্ট্রাক্টর
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {courseData.instructor.map(
                        (instructor: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center gap-3"
                          >
                            {instructor.image && (
                              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                <Image
                                  src={instructor.image}
                                  alt={instructor.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <p className="text-white font-medium text-sm">
                                {instructor.name}
                              </p>
                              <p className="text-white/40 text-xs capitalize">
                                {instructor.role}
                              </p>
                            </div>
                          </div>
                        ),
                      )}
                    </CardContent>
                  </Card>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

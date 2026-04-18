"use client";

import { useSession } from "@/lib/auth-context";
import { notify } from "@/utils/notify";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  BookOpen,
  Calendar,
  Camera,
  Edit2,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Save,
  School,
  Trophy,
  User,
  Users,
  VenusAndMars,
  X,
  Briefcase
} from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { ImageUploader } from "@/components/ImageUploader";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFetchById } from "@/hooks/swr/useFetchById";
import { IUserProfile } from "@/types";
import { formatDate, getUserInitials } from "@/utils";
import { mutate } from "swr";

// Form validation schema
const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits."),
  address: z.string().optional(),
  gender: z.string().optional(),
  age: z.number().min(1).max(120).optional(),
  instituteName: z.string().optional(),
  educationLevel: z.string().optional(),
  bio: z
    .string()
    .max(500, "Bio must be at most 500 characters.")
    .optional(),
  occupation: z.string().optional(),
  image: z.string().optional(),
  imagePublicId: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Student Stats Component
function StudentStats({ userData }: { userData: any }) {
  const stats = [
    {
      icon: BookOpen,
      label: "Enrolled Courses",
      value: userData?.enrolledCourses?.length || 0,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Trophy,
      label: "Completed Courses",
      value: userData?.completedCourses?.length || 0,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Users,
      label: "Total Hours Learned",
      value: userData?.totalLearningHours || 0,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: GraduationCap,
      label: "Certificates Earned",
      value: userData?.certificates?.length || 0,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="border-white/10 bg-black/40 backdrop-blur-xl">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/50">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Profile Info Card Component
function ProfileInfoCard({ userData, isEditing, form }: any) {
  const infoSections = [
    {
      title: "Personal Information",
      icon: User,
      fields: [
        { icon: User, label: "Full Name", value: userData?.name },
        { icon: Mail, label: "Email", value: userData?.email },
        { icon: Phone, label: "Phone", value: userData?.phone || "Not provided" },
        { icon: VenusAndMars, label: "Gender", value: userData?.gender || "Not provided" },
        { icon: Calendar, label: "Age", value: userData?.age ? `${userData.age} years` : "Not provided" },
      ],
    },
    {
      title: "Academic Information",
      icon: GraduationCap,
      fields: [
        { icon: School, label: "Institute", value: userData?.instituteName || "Not provided" },
        { icon: GraduationCap, label: "Education Level", value: userData?.educationLevel || "Not provided" },
        { icon: Briefcase, label: "Occupation", value: userData?.occupation || "Not provided" },
      ],
    },
    {
      title: "Contact Information",
      icon: MapPin,
      fields: [
        { icon: MapPin, label: "Address", value: userData?.address || "Not provided" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {infoSections.map((section, idx) => (
        <Card key={idx} className="border-white/10 bg-black/40 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <section.icon className="h-5 w-5 text-secondary" />
              <CardTitle className="text-white">{section.title}</CardTitle>
            </div>
          </CardHeader>
          <Separator className="bg-white/10" />
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields.map((field, fieldIdx) => (
                <InfoItem
                  key={fieldIdx}
                  icon={field.icon}
                  label={field.label}
                  value={field.value}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* Bio Section */}
      {userData?.bio && (
        <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">About Me</CardTitle>
          </CardHeader>
          <Separator className="bg-white/10" />
          <CardContent className="pt-6">
            <p className="text-white/80 leading-relaxed">{userData.bio}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Right Column Skeleton Loader
function ProfileInfoSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Stats Skeletons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-white/10 bg-black/40">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white/10 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-7 w-12 bg-white/10 rounded"></div>
                  <div className="h-3 w-20 bg-white/10 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Section Skeletons */}
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="border-white/10 bg-black/40">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-white/10 rounded"></div>
              <div className="h-6 w-32 bg-white/10 rounded"></div>
            </div>
          </CardHeader>
          <Separator className="bg-white/10" />
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-white/10 rounded"></div>
                    <div className="h-3 w-20 bg-white/10 rounded"></div>
                  </div>
                  <div className="h-4 w-full bg-white/10 rounded ml-6"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-sm text-white/50">
        <Icon className="h-4 w-4 text-secondary" />
        <span>{label}</span>
      </div>
      <p className="text-white/80 pl-6">{value}</p>
    </div>
  );
}

export default function ProfilePage() {
  const { session, setSession } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  const user = session?.user as IUserProfile;

  const {
    data,
    isLoading: userIsLoading,
    refetch,
  } = useFetchById("/users/get-user-details", user?.id);

  const userData = data?.data;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      address: userData?.address || "",
      gender: userData?.gender || "",
      age: userData?.age || undefined,
      instituteName: userData?.instituteName || "",
      educationLevel: userData?.educationLevel || "",
      bio: userData?.bio || "",
      occupation: userData?.occupation || "",
      image: userData?.image || "",
      imagePublicId: userData?.imagePublicId || "",
    },
  });

  useEffect(() => {
    form.reset({
      name: userData?.name || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      address: userData?.address || "",
      gender: userData?.gender || "",
      age: userData?.age || undefined,
      instituteName: userData?.instituteName || "",
      educationLevel: userData?.educationLevel || "",
      bio: userData?.bio || "",
      occupation: userData?.occupation || "",
      image: userData?.image || "",
      imagePublicId: userData?.imagePublicId || "",
    });
  }, [form, userData, userIsLoading]);

  const handleImageChange = (url: string, public_id: string) => {
    form.setValue("image", url);
    form.setValue("imagePublicId", public_id);
    setIsImageDialogOpen(false);
  };

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/user/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        const updatedUser = result?.user;
        mutate(`/users/get-user-details/${user.id}`);

        setSession({
          ...session,
          user: {
            ...user,
            name: updatedUser?.name,
            image: updatedUser?.image,
            phone: updatedUser?.phone,
          },
        });
        notify.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      notify.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#05010F] via-[#0A0418] to-[#0F0720] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex rounded-full p-[1px] bg-gradient-to-r from-secondary to-primary">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-sm text-white">
              <AlertCircle className="h-4 w-4 text-secondary" />
              <span>User Not Found</span>
            </div>
          </div>
          <p className="text-white/60">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#05010F] via-[#0A0418] to-[#0F0720] py-10 md:py-16">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex rounded-full p-[1px] bg-gradient-to-r from-secondary to-primary mb-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur">
              <User className="h-3 w-3 text-secondary" />
              <span>Student Profile</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#F9D49B] to-[#C994FF] bg-clip-text text-transparent">
            My Learning Journey
          </h1>
          <p className="text-white/50 mt-2 text-sm">
            Track your progress and manage your profile
          </p>
        </div>

        {/* Profile Header Card */}
        <Card className="border-white/10 bg-black/40 backdrop-blur-xl shadow-xl mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* Avatar Section */}
              <div className="relative">
                <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-secondary/30 shadow-xl">
                  <AvatarImage
                    src={form.watch("image") || user.image || ""}
                    alt={user.name}
                  />
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-secondary to-primary text-white">
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>

                <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      disabled={!isEditing}
                      size="icon"
                      variant="outline"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full border-white/20 bg-black/80 hover:bg-white/10"
                    >
                      <Camera className="h-4 w-4 text-white" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="border-white/10 bg-black/95 backdrop-blur-xl text-white sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Profile Picture</DialogTitle>
                      <DialogDescription className="text-white/50">
                        Upload a new profile picture or remove the current one.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <ImageUploader
                        value={form.watch("image") || user.image}
                        imagePublicId={form.watch("imagePublicId") || user.imagePublicId}
                        onChange={handleImageChange}
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsImageDialogOpen(false)}
                        className="border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-full"
                      >
                        Close
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{user.name}</h2>
                    <p className="text-white/50">{user.email}</p>
                    <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                      <Badge className="bg-gradient-to-r from-secondary to-primary text-white border-none">
                        Student
                      </Badge>
                      {!user.emailVerified && (
                        <Badge variant="outline" className="border-yellow-500/50 text-yellow-500">
                          Email Not Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => {
                      if (isEditing) {
                        form.reset();
                      }
                      setIsEditing(!isEditing);
                    }}
                    variant={isEditing ? "outline" : "default"}
                    className={
                      isEditing
                        ? "border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-full"
                        : "bg-gradient-to-r from-secondary to-primary text-white rounded-full"
                    }
                  >
                    {isEditing ? (
                      <>
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        {userIsLoading ? (
          <ProfileInfoSkeleton />
        ) : isEditing ? (
          // Edit Form
          <Card className="border-white/10 bg-black/40 backdrop-blur-xl shadow-xl">
            <CardHeader>
              <CardTitle className="text-white">Edit Profile</CardTitle>
              <CardDescription className="text-white/50">
                Update your personal information
              </CardDescription>
            </CardHeader>
            <Separator className="bg-white/10" />
            <CardContent className="pt-6">
              <form id="profile-form" onSubmit={form.handleSubmit(onSubmit)}>
                <input type="hidden" {...form.register("image")} />
                <input type="hidden" {...form.register("imagePublicId")} />

                <FieldGroup className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <Controller
                      name="name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="profile-name">Full Name</FieldLabel>
                          <Input
                            {...field}
                            id="profile-name"
                            aria-invalid={fieldState.invalid}
                            placeholder="Your full name"
                            className="border-white/10 bg-black/40 text-white placeholder:text-white/30 focus:border-secondary"
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />

                    {/* Email Field (Disabled) */}
                    <Controller
                      name="email"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="profile-email">Email</FieldLabel>
                          <Input
                            {...field}
                            id="profile-email"
                            disabled
                            className="border-white/10 bg-black/40 text-white/50 cursor-not-allowed"
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />

                    {/* Phone Field */}
                    <Controller
                      name="phone"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="profile-phone">Phone Number</FieldLabel>
                          <Input
                            {...field}
                            id="profile-phone"
                            aria-invalid={fieldState.invalid}
                            placeholder="Your phone number"
                            className="border-white/10 bg-black/40 text-white placeholder:text-white/30 focus:border-secondary"
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />

                    {/* Gender Field */}
                    <Controller
                      name="gender"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="profile-gender">Gender</FieldLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                            <SelectTrigger id="profile-gender" className="border-white/10 bg-black/40 text-white focus:border-secondary">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent className="bg-black/95 border-white/10 text-white">
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />

                    {/* Age Field */}
                    <Controller
                      name="age"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="profile-age">Age</FieldLabel>
                          <Input
                            type="number"
                            {...field}
                            id="profile-age"
                            aria-invalid={fieldState.invalid}
                            placeholder="Your age"
                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                            className="border-white/10 bg-black/40 text-white placeholder:text-white/30 focus:border-secondary"
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />

                    {/* Education Level Field */}
                    <Controller
                      name="educationLevel"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="profile-education">Education Level</FieldLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                            <SelectTrigger id="profile-education" className="border-white/10 bg-black/40 text-white focus:border-secondary">
                              <SelectValue placeholder="Select education level" />
                            </SelectTrigger>
                            <SelectContent className="bg-black/95 border-white/10 text-white">
                              <SelectItem value="high-school">High School</SelectItem>
                              <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                              <SelectItem value="master">Master's Degree</SelectItem>
                              <SelectItem value="phd">PhD</SelectItem>
                              <SelectItem value="diploma">Diploma</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />

                    {/* Institute Name Field - Full Width */}
                    <div className="md:col-span-2">
                      <Controller
                        name="instituteName"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="profile-institute">Institute Name</FieldLabel>
                            <Input
                              {...field}
                              id="profile-institute"
                              aria-invalid={fieldState.invalid}
                              placeholder="Your educational institute"
                              className="border-white/10 bg-black/40 text-white placeholder:text-white/30 focus:border-secondary"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />
                    </div>

                    {/* Occupation Field */}
                    <div className="md:col-span-2">
                      <Controller
                        name="occupation"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="profile-occupation">Occupation</FieldLabel>
                            <Input
                              {...field}
                              id="profile-occupation"
                              aria-invalid={fieldState.invalid}
                              placeholder="Your current occupation"
                              className="border-white/10 bg-black/40 text-white placeholder:text-white/30 focus:border-secondary"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />
                    </div>

                    {/* Address Field - Full Width */}
                    <div className="md:col-span-2">
                      <Controller
                        name="address"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="profile-address">Address</FieldLabel>
                            <Input
                              {...field}
                              id="profile-address"
                              aria-invalid={fieldState.invalid}
                              placeholder="Your address"
                              className="border-white/10 bg-black/40 text-white placeholder:text-white/30 focus:border-secondary"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />
                    </div>

                    {/* Bio Field */}
                    <div className="md:col-span-2">
                      <Controller
                        name="bio"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="profile-bio">Bio</FieldLabel>
                            <InputGroup>
                              <InputGroupTextarea
                                {...field}
                                id="profile-bio"
                                placeholder="Tell us a little about yourself..."
                                rows={4}
                                className="min-h-24 resize-none border-white/10 bg-black/40 text-white placeholder:text-white/30 focus:border-secondary"
                                aria-invalid={fieldState.invalid}
                              />
                              <InputGroupAddon align="block-end">
                                <InputGroupText className="tabular-nums bg-black/60 border-white/10 text-white/60">
                                  {field.value?.length || 0}/500 characters
                                </InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>
                            <FieldDescription className="text-white/40">
                              Share your background, expertise, or interests
                            </FieldDescription>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />
                    </div>
                  </div>
                </FieldGroup>
              </form>
            </CardContent>
            <CardFooter>
              <Field orientation="horizontal" className="gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-full"
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  form="profile-form"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-secondary to-primary text-white rounded-full"
                >
                  {isLoading ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
                </Button>
              </Field>
            </CardFooter>
          </Card>
        ) : (
          // View Mode
          <>
            <StudentStats userData={userData} />
            <ProfileInfoCard userData={userData} isEditing={isEditing} form={form} />
          </>
        )}
      </div>
    </section>
  );
}
"use client";

import { useSession } from "@/lib/auth-context";
import { notify } from "@/utils/notify";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  Briefcase,
  Calendar,
  Camera,
  Edit2,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Save,
  School,
  User,
  VenusAndMars,
  X,
} from "lucide-react";
import { useState } from "react";
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
import { IUserProfile } from "@/types";
import { formatDate, getUserInitials } from "@/utils";

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

export default function ProfilePage() {
  const { session, updateSession } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  const user = session?.user as IUserProfile;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      gender: user?.gender || "",
      age: user?.age || undefined,
      instituteName: user?.instituteName || "",
      educationLevel: user?.educationLevel || "",
      bio: user?.bio || "",
      occupation: user?.occupation || "",
      image: user?.image || "",
      imagePublicId: user?.imagePublicId || "",
    },
  });

  // Handle image upload from ImageUploader
  const handleImageChange = (url: string, public_id: string) => {
    form.setValue("image", url);
    form.setValue("imagePublicId", public_id);

    // If in view mode, update session immediately
    if (!isEditing) {
      updateSession({
        user: {
          ...user,
          image: url,
          imagePublicId: public_id,
        },
      });
      notify.success("Profile picture updated successfully!");
    }

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
        console.log(await response.json())
        // const updatedUser = await response.json();
        // await updateSession({ user: updatedUser });
        // notify.success("Profile updated successfully!");
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

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "instructor":
        return "bg-gradient-to-r from-secondary to-primary";
      case "admin":
        return "bg-gradient-to-r from-red-500 to-orange-500";
      default:
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
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
          <p className="text-white/60">
            Please log in to view your profile.
          </p>
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
              <span>Profile</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#F9D49B] to-[#C994FF] bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-white/50 mt-2 text-sm">
            Manage your personal information and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border-white/10 bg-black/40 backdrop-blur-xl shadow-xl">
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Avatar className="h-28 w-28 border-4 border-secondary/30 shadow-xl">
                    <AvatarImage
                      src={form.watch("image") || user.image || ""}
                      alt={user.name}
                    />
                    <AvatarFallback className="text-3xl bg-gradient-to-br from-secondary to-primary text-white">
                      {getUserInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>

                  {/* Image Upload Dialog */}
                  <Dialog
                    open={isImageDialogOpen}
                    onOpenChange={setIsImageDialogOpen}
                  >
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
                          Upload a new profile picture or remove the
                          current one.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="py-4">
                        <ImageUploader
                          value={form.watch("image") || user.image}
                          imagePublicId={
                            form.watch("imagePublicId") ||
                            user.imagePublicId
                          }
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

                <CardTitle className="text-2xl text-white">
                  {user.name}
                </CardTitle>
                <CardDescription className="text-white/50">
                  {user.email}
                </CardDescription>
                <div className="mt-2 flex justify-center">
                  <Badge
                    className={`${getRoleBadgeColor(user.role)} text-white border-none`}
                  >
                    {user.role.charAt(0).toUpperCase() +
                      user.role.slice(1)}
                  </Badge>
                </div>
                {!user.emailVerified && (
                  <Badge
                    variant="outline"
                    className="mt-2 border-yellow-500/50 text-yellow-500"
                  >
                    Email Not Verified
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                <Separator className="bg-white/10" />
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-white/60">
                    <Mail className="h-4 w-4 text-secondary" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <Phone className="h-4 w-4 text-secondary" />
                    <span>{user.phone || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <Calendar className="h-4 w-4 text-secondary" />
                    <span>Joined {formatDate(user.createdAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Profile Details Form/Display */}
          <div className="lg:col-span-2">
            <Card className="border-white/10 bg-black/40 backdrop-blur-xl shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">
                    {isEditing
                      ? "Edit Profile"
                      : "Profile Information"}
                  </CardTitle>
                  <CardDescription className="text-white/50">
                    {isEditing
                      ? "Update your personal information"
                      : "View your personal information"}
                  </CardDescription>
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
                      Update Profile
                    </>
                  )}
                </Button>
              </CardHeader>
              <Separator className="bg-white/10" />
              <CardContent className="pt-6">
                {isEditing ? (
                  <form
                    id="profile-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    {/* Hidden image fields */}
                    <input
                      type="hidden"
                      {...form.register("image")}
                    />
                    <input
                      type="hidden"
                      {...form.register("imagePublicId")}
                    />

                    <FieldGroup className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name Field */}
                        <Controller
                          name="name"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="profile-name">
                                Full Name
                              </FieldLabel>
                              <Input
                                {...field}
                                id="profile-name"
                                aria-invalid={fieldState.invalid}
                                placeholder="Your full name"
                                className="border-white/10 bg-black/40 text-white placeholder:text-white/30 focus:border-secondary"
                              />
                              {fieldState.invalid && (
                                <FieldError
                                  errors={[fieldState.error]}
                                />
                              )}
                            </Field>
                          )}
                        />

                        {/* Email Field (Disabled) */}
                        <Controller
                          name="email"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="profile-email">
                                Email
                              </FieldLabel>
                              <Input
                                {...field}
                                id="profile-email"
                                disabled
                                className="border-white/10 bg-black/40 text-white/50 cursor-not-allowed"
                              />
                              {fieldState.invalid && (
                                <FieldError
                                  errors={[fieldState.error]}
                                />
                              )}
                            </Field>
                          )}
                        />

                        {/* Phone Field */}
                        <Controller
                          name="phone"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="profile-phone">
                                Phone Number
                              </FieldLabel>
                              <Input
                                {...field}
                                id="profile-phone"
                                aria-invalid={fieldState.invalid}
                                placeholder="Your phone number"
                                className="border-white/10 bg-black/40 text-white placeholder:text-white/30 focus:border-secondary"
                              />
                              {fieldState.invalid && (
                                <FieldError
                                  errors={[fieldState.error]}
                                />
                              )}
                            </Field>
                          )}
                        />

                        {/* Gender Field */}
                        <Controller
                          name="gender"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="profile-gender">
                                Gender
                              </FieldLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                              >
                                <SelectTrigger
                                  id="profile-gender"
                                  className="border-white/10 bg-black/40 text-white focus:border-secondary"
                                >
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent className="bg-black/95 border-white/10 text-white">
                                  <SelectItem value="male">
                                    Male
                                  </SelectItem>
                                  <SelectItem value="female">
                                    Female
                                  </SelectItem>
                                  <SelectItem value="other">
                                    Other
                                  </SelectItem>
                                  <SelectItem value="prefer-not-to-say">
                                    Prefer not to say
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              {fieldState.invalid && (
                                <FieldError
                                  errors={[fieldState.error]}
                                />
                              )}
                            </Field>
                          )}
                        />

                        {/* Age Field */}
                        <Controller
                          name="age"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="profile-age">
                                Age
                              </FieldLabel>
                              <Input
                                type="number"
                                {...field}
                                id="profile-age"
                                aria-invalid={fieldState.invalid}
                                placeholder="Your age"
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.valueAsNumber,
                                  )
                                }
                                className="border-white/10 bg-black/40 text-white placeholder:text-white/30 focus:border-secondary"
                              />
                              {fieldState.invalid && (
                                <FieldError
                                  errors={[fieldState.error]}
                                />
                              )}
                            </Field>
                          )}
                        />

                        {/* Education Level Field */}
                        <Controller
                          name="educationLevel"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="profile-education">
                                Education Level
                              </FieldLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                              >
                                <SelectTrigger
                                  id="profile-education"
                                  className="border-white/10 bg-black/40 text-white focus:border-secondary"
                                >
                                  <SelectValue placeholder="Select education level" />
                                </SelectTrigger>
                                <SelectContent className="bg-black/95 border-white/10 text-white">
                                  <SelectItem value="high-school">
                                    High School
                                  </SelectItem>
                                  <SelectItem value="bachelor">
                                    Bachelor's Degree
                                  </SelectItem>
                                  <SelectItem value="master">
                                    Master's Degree
                                  </SelectItem>
                                  <SelectItem value="phd">
                                    PhD
                                  </SelectItem>
                                  <SelectItem value="diploma">
                                    Diploma
                                  </SelectItem>
                                  <SelectItem value="other">
                                    Other
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              {fieldState.invalid && (
                                <FieldError
                                  errors={[fieldState.error]}
                                />
                              )}
                            </Field>
                          )}
                        />

                        {/* Institute Name Field - Full Width */}
                        <div className="md:col-span-2">
                          <Controller
                            name="instituteName"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field
                                data-invalid={fieldState.invalid}
                              >
                                <FieldLabel htmlFor="profile-institute">
                                  Institute Name
                                </FieldLabel>
                                <Input
                                  {...field}
                                  id="profile-institute"
                                  aria-invalid={fieldState.invalid}
                                  placeholder="Your educational institute"
                                  className="border-white/10 bg-black/40 text-white placeholder:text-white/30 focus:border-secondary"
                                />
                                {fieldState.invalid && (
                                  <FieldError
                                    errors={[fieldState.error]}
                                  />
                                )}
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
                              <Field
                                data-invalid={fieldState.invalid}
                              >
                                <FieldLabel htmlFor="profile-occupation">
                                  Occupation
                                </FieldLabel>
                                <Input
                                  {...field}
                                  id="profile-occupation"
                                  aria-invalid={fieldState.invalid}
                                  placeholder="Your current occupation"
                                  className="border-white/10 bg-black/40 text-white placeholder:text-white/30 focus:border-secondary"
                                />
                                {fieldState.invalid && (
                                  <FieldError
                                    errors={[fieldState.error]}
                                  />
                                )}
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
                              <Field
                                data-invalid={fieldState.invalid}
                              >
                                <FieldLabel htmlFor="profile-address">
                                  Address
                                </FieldLabel>
                                <Input
                                  {...field}
                                  id="profile-address"
                                  aria-invalid={fieldState.invalid}
                                  placeholder="Your address"
                                  className="border-white/10 bg-black/40 text-white placeholder:text-white/30 focus:border-secondary"
                                />
                                {fieldState.invalid && (
                                  <FieldError
                                    errors={[fieldState.error]}
                                  />
                                )}
                              </Field>
                            )}
                          />
                        </div>

                        {/* Bio Field with Character Counter */}
                        <div className="md:col-span-2">
                          <Controller
                            name="bio"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field
                                data-invalid={fieldState.invalid}
                              >
                                <FieldLabel htmlFor="profile-bio">
                                  Bio
                                </FieldLabel>
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
                                      {field.value?.length || 0}/500
                                      characters
                                    </InputGroupText>
                                  </InputGroupAddon>
                                </InputGroup>
                                <FieldDescription className="text-white/40">
                                  Share your background, expertise, or
                                  interests
                                </FieldDescription>
                                {fieldState.invalid && (
                                  <FieldError
                                    errors={[fieldState.error]}
                                  />
                                )}
                              </Field>
                            )}
                          />
                        </div>
                      </div>
                    </FieldGroup>
                  </form>
                ) : (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InfoItem
                        icon={User}
                        label="Full Name"
                        value={user.name}
                      />
                      <InfoItem
                        icon={Mail}
                        label="Email"
                        value={user.email}
                      />
                      <InfoItem
                        icon={Phone}
                        label="Phone"
                        value={user.phone || "Not provided"}
                      />
                      <InfoItem
                        icon={VenusAndMars}
                        label="Gender"
                        value={user.gender || "Not provided"}
                      />
                      <InfoItem
                        icon={Calendar}
                        label="Age"
                        value={
                          user.age
                            ? `${user.age} years`
                            : "Not provided"
                        }
                      />
                      <InfoItem
                        icon={GraduationCap}
                        label="Education Level"
                        value={user.educationLevel || "Not provided"}
                      />
                      <InfoItem
                        icon={School}
                        label="Institute"
                        value={user.instituteName || "Not provided"}
                      />
                      <InfoItem
                        icon={Briefcase}
                        label="Occupation"
                        value={user.occupation || "Not provided"}
                      />
                    </div>
                    <InfoItem
                      icon={MapPin}
                      label="Address"
                      value={user.address || "Not provided"}
                      fullWidth
                    />
                    <InfoItem
                      icon={User}
                      label="Bio"
                      value={user.bio || "Not provided"}
                      fullWidth
                    />
                  </div>
                )}
              </CardContent>
              {isEditing && (
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
                      {isLoading ? (
                        "Saving..."
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </Field>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper component for displaying info items
function InfoItem({
  icon: Icon,
  label,
  value,
  fullWidth = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={`space-y-1 ${fullWidth ? "col-span-full" : ""}`}>
      <div className="flex items-center gap-2 text-sm text-white/50">
        <Icon className="h-4 w-4 text-secondary" />
        <span>{label}</span>
      </div>
      <p className="text-white/80 pl-6">{value}</p>
    </div>
  );
}

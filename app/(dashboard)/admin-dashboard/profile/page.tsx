"use client";

import { useSession } from "@/lib/auth-context";
import { notify } from "@/utils/notify";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import LeftProfileCard from "@/components/AdminDashboard/profile/LeftProfileCard";
import ProfileSkeletonLoader from "@/components/AdminDashboard/profile/ProfileSkeletonLoader";
import UserNotFound from "@/components/AdminDashboard/profile/UserNotFound";

import RightProfileDisplayCard from "@/components/AdminDashboard/profile/RightProfileDisplayCard";
import { useFetchById } from "@/hooks/swr/useFetchById";
import { IUserProfile } from "@/types";
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

export default function ProfilePage() {
  const { session, setSession } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  const user = session?.user as IUserProfile;

  const { data, isLoading: userIsLoading } = useFetchById(
    "/users/get-user-details",
    user?.id,
  );

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

  // Handle image upload from ImageUploader
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
    return <UserNotFound />;
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
          <LeftProfileCard
            user={user}
            form={form}
            isImageDialogOpen={isImageDialogOpen}
            setIsImageDialogOpen={setIsImageDialogOpen}
            handleImageChange={handleImageChange}
            isEditing={isEditing}
          />

          {/* Right Column - Profile Details Form/Display with Skeleton Loader */}
          <div className="lg:col-span-2">
            {userIsLoading ? (
              <ProfileSkeletonLoader />
            ) : (
              <RightProfileDisplayCard
                form={form}
                isLoading={isLoading}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                onSubmit={onSubmit}
                userData={userData}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

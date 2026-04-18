import { ImageUploader } from "@/components/ImageUploader";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getUserInitials } from "@/utils";
import { Camera, Edit2, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { IUserStudentProfile } from "@/types";

interface IProps {
  form: any;
  user: IUserStudentProfile;
  isImageDialogOpen: boolean;
  setIsImageDialogOpen: Dispatch<SetStateAction<boolean>>;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  handleImageChange: (url: string, publicId: string) => void;
}

export default function ProfileHeaderCard({
  form,
  user,
  isImageDialogOpen,
  setIsImageDialogOpen,
  isEditing,
  setIsEditing,
  handleImageChange,
}: IProps) {
  return (
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
                    Upload a new profile picture or remove the current
                    one.
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

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {user.name}
                </h2>
                <p className="text-white/50">{user.email}</p>
                <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                  <Badge className="bg-gradient-to-r from-secondary to-primary text-white border-none">
                    Student
                  </Badge>
                  {!user.emailVerified && (
                    <Badge
                      variant="outline"
                      className="border-yellow-500/50 text-yellow-500"
                    >
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
  );
}

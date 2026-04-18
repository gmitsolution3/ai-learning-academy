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
import { formatDate, getUserInitials } from "@/utils";
import { Camera,Mail, Phone, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { IUserProfile } from "@/types";
import { Dispatch, SetStateAction } from "react";

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

interface IProps {
  user: IUserProfile;
  form: any;
  isImageDialogOpen: boolean;
  setIsImageDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleImageChange: (url: string, publicId: string) => void;
  isEditing: boolean;
}

export default function LeftProfileCard({
  user,
  form,
  isImageDialogOpen,
  setIsImageDialogOpen,
  handleImageChange,
  isEditing,
}: IProps) {
  return (
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
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
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
  );
}

import { AlertCircle } from "lucide-react";

export default function UserNotFound() {
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

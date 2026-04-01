import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function TestimonialVideoModal({
  isModalOpen,
  closeModal,
  currentVideo,
}: {
  isModalOpen: boolean;
  closeModal: () => void;
  currentVideo: string | null;
}) {
  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-4xl p-0 bg-black/95 border border-white/20 rounded-2xl overflow-hidden">
        {/* Video Player */}
        <div className="relative">
          <div className="aspect-video">
            <video
              src={currentVideo as string}
              controls
              autoPlay
              className="w-full h-full object-cover"
              controlsList="nodownload"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";

export default function PreviewVideoModal({
  isModalOpen,
  setIsModalOpen,
  selectedVideo,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedVideo: any;
}) {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className=" sm:max-w-4xl p-0 bg-black/95 border border-white/20 rounded-2xl overflow-hidden">
        <div className="relative pt-[56.25%]">
          {selectedVideo && (
            <iframe
              src={`${selectedVideo.videoUrl}?autoplay=1`}
              title={selectedVideo.title}
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

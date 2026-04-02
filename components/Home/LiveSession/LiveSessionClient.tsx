"use client";

import { useState, useCallback } from "react";
import LiveSessionPreview from "./LiveSessionPreview";
import PreviewVideoModal from "@/components/modal/PreviewVideoModal";

type Video = {
  id: number;
  title: string;
  thumbnail: string;
  videoUrl: string;
};

export default function LiveSessionClient({
  videos,
}: {
  videos: Video[];
}) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(
    null,
  );

  const handleVideoClick = useCallback((video: Video) => {
    setSelectedVideo(video);
  }, []);

  const closeModal = () => setSelectedVideo(null);

  return (
    <>
      {/* Left Section */}
      <div className="space-y-4">
        <h3 className="text-white text-xl sm:text-2xl font-semibold mb-4">
          ভিডিও টিউটোরিয়াল
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {videos.map((video) => (
            <LiveSessionPreview
              key={video.id}
              video={video}
              onClick={handleVideoClick}
            />
          ))}
        </div>
      </div>

      {/* Modal only when needed */}
      {selectedVideo && (
        <PreviewVideoModal
          isModalOpen={true}
          setIsModalOpen={closeModal}
          selectedVideo={selectedVideo}
        />
      )}
    </>
  );
}

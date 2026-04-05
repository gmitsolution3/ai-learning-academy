"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import PreviewVideoModal from "@/components/modal/PreviewVideoModal";
import { Play } from "lucide-react";

type Video = {
  id: number;
  title: string;
  thumbnail: string;
  videoUrl: string;
  height: string;
};

export default function WorkSampleClient({
  videos,
}: {
  videos: Video[];
}) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(
    null,
  );

  const handleClick = useCallback((video: Video) => {
    setSelectedVideo(video);
  }, []);

  const closeModal = () => setSelectedVideo(null);

  return (
    <>
      <div className="columns-1 sm:columns-2 gap-4 space-y-4">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => handleClick(video)}
            className="break-inside-avoid text-left w-full group rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#C994FF]/50 transition-all duration-300 hover:-translate-y-1 mb-4"
            aria-label={`Play video: ${video.title}`}
          >
            <div className={`relative ${video.height}`}>
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div
                aria-hidden
                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#F9D49B] to-[#C994FF] flex items-center justify-center">
                  <Play className="w-7 h-7 text-white ml-0.5" />
                </div>
              </div>
            </div>

            <div className="p-4">
              <p className="text-white text-sm font-medium line-clamp-2">
                {video.title}
              </p>
            </div>
          </button>
        ))}
      </div>

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

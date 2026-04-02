import React from "react";
import { Play } from 'lucide-react';

export default function LiveSessionPreview({
  video,
  handleVideoClick,
}: {
  video: any;
  handleVideoClick: (video: any) => void;
}) {
  return (
    <div
      key={video.id}
      onClick={() => handleVideoClick(video)}
      className="group cursor-pointer rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#C994FF]/50 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-video">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <Play className="w-6 h-6 text-white ml-0.5" />
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-white text-sm font-medium truncate">
          {video.title}
        </p>
      </div>
    </div>
  );
}

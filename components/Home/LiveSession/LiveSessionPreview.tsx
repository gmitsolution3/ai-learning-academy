import Image from "next/image";
import { Play } from "lucide-react";

type Video = {
  id: number;
  title: string;
  thumbnail: string;
  videoUrl: string;
};

export default function LiveSessionPreview({
  video,
  onClick,
}: {
  video: Video;
  onClick: (video: Video) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(video)}
      aria-label={`Play video: ${video.title}`}
      className="group text-left w-full rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#C994FF]/50 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay */}
        <div
          aria-hidden
          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <Play className="w-6 h-6 text-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="p-5">
        <p className="text-white text-sm font-medium truncate">
          {video.title}
        </p>
      </div>
    </button>
  );
}
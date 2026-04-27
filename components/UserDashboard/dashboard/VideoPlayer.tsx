import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ILesson } from "@/types";
import { formatDuration, getGoogleDocsEmbedUrl, getYouTubeEmbedUrl } from "@/utils";
import { FileText } from "lucide-react";
import VideoPlayerError from "./VideoPlayerError";

interface IProps {
  currentLesson: ILesson;
  overallProgress: number;
}

export default function VideoPlayer({
  currentLesson,
  overallProgress,
}: IProps) {
  if (!currentLesson) {
    return <VideoPlayerError />;
  }

  console.log(currentLesson);

  const isTextContent = currentLesson.content_type === "text";
  const isVideoContent = currentLesson.content_type === "video";

  return (
    <div className="flex-1 min-w-0">
      <div className="sticky top-14 bg-black/90">
        {/* Content Player - Video or Text */}
        <div className="relative aspect-video bg-black">
          {isVideoContent ? (
            <iframe
              className="w-full h-full"
              src={
                getYouTubeEmbedUrl(
                  currentLesson.content_url,
                ) as string
              }
              title={currentLesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : isTextContent ? (
            <div className="w-full h-full overflow-auto bg-gradient-to-br from-[#05010F] via-[#0A0418] to-[#0F0720] p-6">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-secondary" />
                  <span className="text-white/60 text-sm">
                    Text Content
                  </span>
                </div>
                <div className="prose prose-invert max-w-none">
                  <iframe
                    src={getGoogleDocsEmbedUrl(currentLesson?.content_url)}
                    className="w-full h-[500px] rounded-lg"
                    title={currentLesson.title}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-black/50">
              <svg
                xmlns="http://w3.org"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-youtube"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </svg>

              <p className="text-white/40 ml-2">
                Content not available
              </p>
            </div>
          )}
        </div>

        {/* Content Info */}
        <div className="p-4 md:p-6 space-y-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="bg-gradient-to-r from-secondary to-primary text-white border-none">
                  Lesson {currentLesson.order_index + 1}
                </Badge>
                {isTextContent && (
                  <Badge
                    variant="outline"
                    className="border-secondary/50 text-secondary"
                  >
                    Text Lesson
                  </Badge>
                )}
                {isVideoContent && (
                  <Badge
                    variant="outline"
                    className="border-secondary/50 text-secondary"
                  >
                    Video Lesson
                  </Badge>
                )}
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                {currentLesson.title}
              </h1>
              <p className="text-white/50 text-sm">
                Duration: {formatDuration(currentLesson.duration)}
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-2">
              {/* Navigation buttons can be added here */}
            </div>
          </div>

          {/* Description Section */}
          {currentLesson.description && (
            <div className="mt-4 p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-sm font-semibold text-white/70 mb-2">
                Lesson Description
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {currentLesson.description}
              </p>
            </div>
          )}

          {/* Course Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-white/50">
              <span>Course Progress</span>
              <span className="text-secondary">
                {Math.round(overallProgress)}% Complete
              </span>
            </div>
            <Progress
              value={overallProgress}
              className="h-1.5 bg-white/10 [&>div]:bg-gradient-to-r [&>div]:from-secondary [&>div]:to-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

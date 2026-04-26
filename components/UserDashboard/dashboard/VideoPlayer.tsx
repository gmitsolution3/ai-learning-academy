import { Progress } from "@/components/ui/progress";
import { ILesson } from "@/types";
import { getYouTubeEmbedUrl } from "@/utils";
import { Badge } from "lucide-react";

interface IProps {
  currentLesson: ILesson;
  overallProgress: number;
  playerRef: React.RefObject<HTMLIFrameElement | null>
}

export default function VideoPlayer({
  currentLesson,
  overallProgress,
  playerRef
}: IProps) {
  return (
    <div className="flex-1 min-w-0">
      <div className="sticky top-14 bg-black/90">
        {/* Video Player */}
        <div className="relative aspect-video bg-black">
          <iframe
          ref={playerRef}
            className="w-full h-full"
            src={
              getYouTubeEmbedUrl(currentLesson.content_url) as string
            }
            title={currentLesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>

        {/* Video Info */}
        <div className="p-4 md:p-6 space-y-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-2">
              <Badge className="bg-gradient-to-r from-secondary to-primary text-white border-none">
                {/* Lesson {currentIndex + 1} of {allLessons.length} */}
              </Badge>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                {currentLesson.title}
              </h1>
              <p className="text-white/50 text-sm">
                Duration: {currentLesson.duration}
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-2">
              {/* {prevLesson && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(
                            `/course/${courseId}/lesson/${prevLesson.id}`,
                          )
                        }
                        className="border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-full"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>
                    )} */}
              {/* {nextLesson && (
                      <Button
                        onClick={() =>
                          router.push(
                            `/course/${courseId}/lesson/${nextLesson.id}`,
                          )
                        }
                        className="bg-gradient-to-r from-secondary to-primary text-white rounded-full shadow-lg shadow-secondary/25"
                        size="sm"
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    )} */}
            </div>
          </div>

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

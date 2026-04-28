export default function SidebarLoader() {
  return (
    <div className="border-b border-white/5">
      {/* Accordion Trigger Skeleton */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex-1 text-left space-y-2">
            <div className="h-5 w-48 bg-white/10 rounded animate-pulse" />
            <div className="h-3 w-16 bg-white/5 rounded animate-pulse" />
          </div>
          <div className="h-3 w-20 bg-white/5 rounded animate-pulse" />
        </div>
      </div>

      {/* Lessons Skeleton */}
      <div className="divide-y divide-white/5">
        {[1, 2, 3].map((lessonIndex) => (
          <div key={lessonIndex} className="px-4 py-3">
            <div className="flex items-start gap-3">
              {/* Icon placeholder */}
              <div className="flex-shrink-0 mt-0.5">
                <div className="h-4 w-4 rounded bg-white/10 animate-pulse" />
              </div>

              {/* Content placeholder */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="h-4 w-full max-w-[200px] bg-white/10 rounded animate-pulse" />
                <div className="h-3 w-12 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

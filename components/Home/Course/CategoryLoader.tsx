export default function CategoryLoader({ count = 5 }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          role="tab"
          disabled
          className="relative px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium bg-white/5 border border-white/10 overflow-hidden"
        >
          <span className="opacity-0">Loading</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-4 bg-white/20 rounded animate-pulse"></div>
          </div>
        </button>
      ))}
    </div>
  );
}

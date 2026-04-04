import Image from "next/image";

export default function GlobalBanner({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="Hero section"
    >
      <Image
        src="/global_banner.png"
        alt="Hero background image with abstract shapes and gradients"
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,1,15,0.94)_0%,rgba(5,1,15,0.82)_42%,rgba(5,1,15,0.58)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(92,20,167,0.35),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(227,185,138,0.14),transparent_26%)]" />

      <div className="relative z-10 mx-auto flex justify-center min-h-[45vh] md:min-h-[65vh] lg:min-h-[100vh] w-full container items-center px-4 sm:px-6 md:px-10 lg:px-14 py-30 md:py-20">
        {children}
      </div>
    </section>
  );
}

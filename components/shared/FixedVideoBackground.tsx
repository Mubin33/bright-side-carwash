"use client";

const HERO_VIDEO_SRC =
  process.env.NEXT_PUBLIC_HERO_VIDEO_SRC ??
  "/video/hero_up.mp4";

export function FixedVideoBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#0B1220CC]" aria-hidden />
    </div>
  );
}

"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

const AUTO_SLIDE_MS = 2000;

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  quote: string;
  image: string;
}

const BG_IMAGE =
  "/testimonialSlider-bg.png";

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Carolyn Willms",
    role: "Global Accountability Officer",
    rating: 4,
    quote:
      "I booked a full interior detail before a family road trip, and I honestly couldn't believe the results. The seats, carpets, and dashboard looked brand new again. Super friendly team and amazing attention to detail.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Local Business Owner",
    rating: 5,
    quote:
      "Brightside has been my go-to for over two years now. Their ceramic coating service is unmatched in Naperville. My car still looks showroom fresh after 18 months. Absolutely worth every penny.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Sarah Chen",
    role: "Marketing Director",
    rating: 5,
    quote:
      "The paint correction they did on my Tesla was incredible. Swirl marks and minor scratches completely gone. The team was professional, communicative, and delivered ahead of schedule.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "David Park",
    role: "Software Engineer",
    rating: 4,
    quote:
      "Fast, reliable, and thorough. I get my car detailed here monthly and they never disappoint. The mobile service option is a game changer for busy professionals like myself.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop&crop=face",
  },
];

function getPrevIndex(index: number) {
  return index === 0 ? testimonials.length - 1 : index - 1;
}

function getNextIndex(index: number) {
  return index === testimonials.length - 1 ? 0 : index + 1;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={cn(
            "size-5",
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-none text-gray-300 stroke-gray-300 stroke-[1.5]"
          )}
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function PreviewThumb({
  src,
  alt,
  onClick,
  ariaLabel,
}: {
  src: string;
  alt: string;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="group relative h-[248px] w-[158px] shrink-0 overflow-hidden"
    >
      <Image
        key={src}
        src={src}
        alt={alt}
        fill
        sizes="158px"
        className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/55 transition-colors group-hover:bg-black/45" />
    </button>
  );
}

function NavButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-xs bg-[var(--hero-navy)] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
    >
      {isPrev && <ChevronLeft className="size-4" strokeWidth={2.5} />}
      <span>{isPrev ? "Previous" : "Next"}</span>
      {!isPrev && <ChevronRight className="size-4" strokeWidth={2.5} />}
    </button>
  );
}

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => getPrevIndex(prev));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => getNextIndex(prev));
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => getNextIndex(prev));
    }, AUTO_SLIDE_MS);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const current = testimonials[currentIndex];
  const prev = testimonials[getPrevIndex(currentIndex)];
  const next = testimonials[getNextIndex(currentIndex)];

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Blurred car-wash background */}
      <div className="absolute inset-0">
        <Image
          src={BG_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover blur-[3px]"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-black/65 to-black/85" /> */}
        {/* <div className="absolute inset-0 bg-black/30" /> */}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-10 text-center md:mb-12">
          <h2 className="text-2xl md:text-3xl xl:text-[40px] font-bold leading-snug text-gray-900 sm:text-3xl md:text-[2.15rem]">
            &ldquo;Why Naperville Drivers Choose Brightside&rdquo;
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-700 md:text-base">
            Trusted by local families, commuters, and car enthusiasts for fast
            service, premium detailing, and consistent results.
          </p>
        </div>

        {/* White card */}
        <div className="rounded-[2rem] bg-white px-5 py-8 shadow-[0_28px_80px_rgba(0,0,0,0.22)] sm:px-8 md:px-12 md:py-11">
          <div className="flex items-end justify-center gap-5 lg:gap-8 xl:gap-10">
            {/* Left: preview + Previous */}
            <div className="hidden shrink-0 flex-col items-end gap-5 lg:flex">
              <PreviewThumb
                src={prev.image}
                alt={prev.name}
                onClick={goToPrev}
                ariaLabel={`View previous testimonial from ${prev.name}`}
              />
              <NavButton direction="prev" onClick={goToPrev} />
            </div>

            {/* Center: active testimonial */}
            <div
              key={current.id}
              className="flex min-w-0 flex-1 flex-col items-center gap-8 md:flex-row md:items-end md:gap-10 lg:gap-12"
            >
              <div className="relative h-[260px] w-[210px] shrink-0 overflow-hidden shadow-md sm:h-[300px] sm:w-[235px] md:h-[460px] md:w-[320px]">
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  sizes="(max-width: 768px) 210px, 250px"
                  className="object-cover object-top"
                />
              </div>

              <div className="relative w-full max-w-xl flex-1 px-1 md:px-0">
                {/* Decorative quote mark */}
                <span
                  className="pointer-events-none absolute -top-16 left-0 select-none font-serif text-[6.5rem] leading-none text-blue-100 md:text-[7.5rem]"
                  aria-hidden
                >
                  &ldquo;
                </span>
 

                <div className="relative z-10">
                  <StarRating rating={current.rating} />

                  <blockquote className="mt-5 text-[15px] leading-[1.8] text-gray-800 md:text-base text-justify">
                    {current.quote}
                  </blockquote>

                  <footer className="mt-7">
                    <p className="text-xl font-bold text-gray-900 md:text-2xl">
                      {current.name}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{current.role}</p>
                  </footer>
                </div>
              </div>
            </div>

            {/* Right: preview + Next */}
            <div className="hidden shrink-0 flex-col items-start gap-5 lg:flex">
              <PreviewThumb
                src={next.image}
                alt={next.name}
                onClick={goToNext}
                ariaLabel={`View next testimonial from ${next.name}`}
              />
              <NavButton direction="next" onClick={goToNext} />
            </div>
          </div>

          {/* Mobile navigation */}
          <div className="mt-8 flex items-center justify-center gap-4 lg:hidden">
            <NavButton direction="prev" onClick={goToPrev} />
            <NavButton direction="next" onClick={goToNext} />
          </div>
        </div>
      </div>
    </section>
  );
}



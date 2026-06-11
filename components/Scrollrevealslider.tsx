"use client";

import {
  useEffect,
  useRef,
  useLayoutEffect,
  CSSProperties,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface OverlayContent {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export interface ScrollRevealSliderProps {
  /** Left image URL (shown first, revealed as divider moves right) */
  leftImage: string;
  /** Right image URL (base layer, fully visible from start) */
  rightImage: string;
  leftAlt?: string;
  rightAlt?: string;
  /** Content overlaid on the left panel */
  leftOverlay?: OverlayContent;
  /** Content overlaid on the right panel */
  rightOverlay?: OverlayContent;
  /** Viewport height of the sticky section (controls scroll duration). Default: "300vh" */
  scrollHeight?: string;
  /** Responsive scroll height for mobile (<768px). Default: "200vh" */
  mobileScrollHeight?: string;
  /** Responsive scroll height for tablet (768px-1024px). Default: "250vh" */
  tabletScrollHeight?: string;
  /** Visible height of the image component. Default: "100vh" */
  componentHeight?: string;
  /** Responsive component height for mobile. Default: "50vh" */
  mobileComponentHeight?: string;
  /** Responsive component height for tablet. Default: "70vh" */
  tabletComponentHeight?: string;
  /** Extra class on the outer wrapper */
  className?: string;
  /** Transparent foam PNG used as the scroll-driven reveal edge */
  dividerImage?: string;
}

// ─── Overlay Panel ────────────────────────────────────────────────────────────

function OverlayPanel({
  content,
  side,
}: {
  content: OverlayContent;
  side: "left" | "right";
}) {
  const isLeft = side === "left";
  return (
    <div
      className={`absolute top-0 z-10 p-8 md:p-16 max-w-lg pointer-events-none select-none ${
        isLeft ? "left-0" : "right-0 text-right"
      }`}
    >
      {content.eyebrow && (
        <p className="srs-eyebrow mb-3">{content.eyebrow}</p>
      )}
      <h2 className="srs-heading mb-4 ">{content.heading}</h2>
      {content.subheading && (
        <h3 className="srs-subheading mb-3">{content.subheading}</h3>
      )}
      {content.description && (
        <p className="srs-desc mb-6">{content.description}</p>
      )}
      
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ScrollRevealSlider({
  leftImage,
  rightImage,
  leftAlt = "Before",
  rightAlt = "After",
  leftOverlay,
  rightOverlay,
  scrollHeight = "300vh",
  mobileScrollHeight = "200vh",
  tabletScrollHeight = "250vh",
  componentHeight = "100vh",
  mobileComponentHeight = "50vh",
  tabletComponentHeight = "70vh",
  className = "",
  dividerImage = "/foam-divider.png",
}: ScrollRevealSliderProps) {
  // Refs
  const wrapperRef  = useRef<HTMLDivElement>(null);  // sticky outer (scroll height)
  const stickyRef   = useRef<HTMLDivElement>(null);  // sticky inner (viewport height)
  const leftLayerRef= useRef<HTMLDivElement>(null);  // clipped left image layer
  const dividerRef  = useRef<HTMLDivElement>(null);  // foam reveal edge (scroll-only)
  const progressRef = useRef({ value: 0 });          // 0→1 scroll progress

  // State for responsive heights
  const [currentScrollHeight, setCurrentScrollHeight] = useState(scrollHeight);
  const [currentComponentHeight, setCurrentComponentHeight] = useState(componentHeight);

  // ── Responsive height handler ──────────────────────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      const width = typeof window !== "undefined" ? window.innerWidth : 0;
      if (width < 768) {
        setCurrentScrollHeight(mobileScrollHeight);
        setCurrentComponentHeight(mobileComponentHeight);
      } else if (width < 1024) {
        setCurrentScrollHeight(tabletScrollHeight);
        setCurrentComponentHeight(tabletComponentHeight);
      } else {
        setCurrentScrollHeight(scrollHeight);
        setCurrentComponentHeight(componentHeight);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [scrollHeight, mobileScrollHeight, tabletScrollHeight, componentHeight, mobileComponentHeight, tabletComponentHeight]);

  // Preload foam divider so first scroll frame is crisp
  useEffect(() => {
    const img = new window.Image();
    img.src = dividerImage;
  }, [dividerImage]);

  // Use useLayoutEffect so GSAP registers before first paint
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const leftLayer = leftLayerRef.current;
    const divider = dividerRef.current;
    const wrapper = wrapperRef.current;
    if (!leftLayer || !divider || !wrapper) return;

    const ctx = gsap.context(() => {
      const prog = progressRef.current;

      // Scroll-scrubbed reveal: foam edge + clip move in sync (no drag)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.55,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onUpdate: (self) => {
            prog.value = self.progress;
          },
        },
      });

      tl.fromTo(
        leftLayer,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", ease: "none", force3D: true },
        0
      );

      tl.fromTo(
        divider,
        { left: "0%", xPercent: -50 },
        { left: "100%", xPercent: -50, ease: "none", force3D: true },
        0
      );

      const foamImg = divider.querySelector<HTMLImageElement>(".srs-foam-img");
      if (foamImg) {
        gsap.fromTo(
          foamImg,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

    }, wrapperRef);

    return () => ctx.revert();
  }, [dividerImage]);

  // ── Scroll-progress indicator (thin top bar) ───────────────────────────────
  useEffect(() => {
    const bar = document.getElementById("srs-progress-bar");
    if (!bar) return;

    let raf: number;
    const update = () => {
      bar.style.transform = `scaleX(${progressRef.current.value})`;
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────

  const stickyStyle: CSSProperties = {
    position: "sticky",
    top: 0,
    height: currentComponentHeight,
    overflow: "hidden",
    touchAction: "pan-y",
  };

  return (
    <>
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── Design tokens ── */
        .srs-root {
          --gold:        #c9a96e;
          --gold-light:  #e2c99a;
          --gold-dim:    rgba(201,169,110,0.35);
          --ivory:       #f4ede2;
          --ivory-dim:   rgba(244,237,226,0.7);
          --shadow-ink:  rgba(8,6,4,0.65);
        }

        /* ── Typography ── */
        .srs-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--gold-light);
        }
        .srs-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4.5vw, 62px);
          font-weight: 400;
          line-height: 1.08;
          letter-spacing: -0.015em;
          color: var(--ivory);
        }
        .srs-subheading {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: clamp(16px, 2vw, 24px);
          font-weight: 400;
          color: var(--gold-light);
          letter-spacing: 0.02em;
        }
        .srs-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(13px, 1.1vw, 15px);
          font-weight: 300;
          line-height: 1.7;
          color: rgba(244,237,226,0.65);
          max-width: 38ch;
        }
        .srs-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold-light);
          border: 1px solid var(--gold-dim);
          padding: 12px 22px;
          text-decoration: none;
          transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
          backdrop-filter: blur(4px);
          background: rgba(0,0,0,0.25);
        }
        .srs-btn:hover {
          background: var(--gold);
          color: #0e0b07;
          border-color: var(--gold);
        }
        .srs-btn-arrow { transition: transform 0.25s ease; }
        .srs-btn:hover .srs-btn-arrow { transform: translateX(3px); }

        /* ── Grain overlay ── */
        .srs-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
          background-size: 200px;
          opacity: 0.07;
          mix-blend-mode: overlay;
        }

        /* ── Corner labels ── */
        .srs-corner-lbl {
          position: absolute;
          top: 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: rgba(201,169,110,0.7);
          z-index: 15;
          pointer-events: none;
          transition: opacity 0.4s;
        }

        /* ── Soap foam scroll divider (non-interactive) ── */
        .srs-foam-divider {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 30;
          width: 0;
          pointer-events: none;
          touch-action: none;
          user-select: none;
          -webkit-user-drag: none;
          will-change: left, transform;
          contain: layout style;
        }

        .srs-foam-img {
          display: block;
          width: 6px;
          min-width: 6px;
          height: 100%;
          object-fit: cover;
          object-position: center;
          pointer-events: none;
          -webkit-user-drag: none;
          filter:
            drop-shadow(0 0 2px rgba(255, 255, 255, 0.9))
            drop-shadow(0 0 6px rgba(220, 240, 255, 0.65))
            drop-shadow(0 0 14px rgba(190, 225, 255, 0.4))
            drop-shadow(0 0 22px rgba(160, 200, 240, 0.22));
        }

        @media (max-width: 640px) {
          .srs-foam-img {
            width: 5px;
            min-width: 5px;
          }
        }

        /* ── Scroll cue ── */
        @keyframes srs-scroll-bounce {
          0%,100% { transform: translateX(-50%) translateY(0); opacity: 0.7; }
          50%      { transform: translateX(-50%) translateY(6px); opacity: 0.3; }
        }
        .srs-scroll-cue {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          animation: srs-scroll-bounce 2s ease-in-out infinite;
        }
        .srs-scroll-cue p {
          font-family: 'DM Sans', sans-serif;
          font-size: 8px;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: rgba(201,169,110,0.65);
          white-space: nowrap;
        }

        /* ── Progress bar ── */
        #srs-progress-bar {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, var(--gold), var(--gold-light));
          transform-origin: left;
          transform: scaleX(0);
          z-index: 9999;
          pointer-events: none;
          box-shadow: 0 0 8px rgba(201,169,110,0.6);
        }

      `}</style>

      {/* Progress bar */}
      <div id="srs-progress-bar" />

      {/* ── Scroll wrapper (provides scroll height) ── */}
      <div
        ref={wrapperRef}
        className={`srs-root relative w-full ${className}`}
        style={{ height: currentScrollHeight, transition: "height 0.3s ease" }}
      >
        {/* ── Sticky viewport ── */}
        <div ref={stickyRef} style={stickyStyle} className="srs-grain w-full">

          {/* ── RIGHT image (base, always full visible) ── */}
          <div className="absolute inset-0 z-0">
            <img
              src={rightImage}
              alt={rightAlt}
              className="w-full h-full object-cover"
              draggable={false}
              loading="eager"
              crossOrigin="anonymous"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Right overlay text */}
          {rightOverlay && (
            <div className="srs-right-overlay absolute inset-0 z-10 pointer-events-none">
              <OverlayPanel content={rightOverlay} side="right" />
            </div>
          )}

          {/* ── LEFT image (clipped, reveals as scroll progresses) ── */}
          <div
            ref={leftLayerRef}
            className="absolute inset-0 z-20"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            <img
              src={leftImage}
              alt={leftAlt}
              className="w-full h-full object-cover"
              draggable={false}
              loading="eager"
              crossOrigin="anonymous"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none" />

            {/* Left overlay text */}
            {leftOverlay && (
              <div className="srs-left-overlay absolute inset-0 z-10 pointer-events-none">
                <OverlayPanel content={leftOverlay} side="left" />
              </div>
            )}
          </div>
 

          {/* ── Foam reveal edge (scroll-driven only, not draggable) ── */}
          <div
            ref={dividerRef}
            className="srs-foam-divider"
            style={{ left: "0%" }}
            aria-hidden
          >
            <img
              src={dividerImage}
              alt=""
              className="srs-foam-img"
              draggable={false}
              decoding="async"
              crossOrigin="anonymous"
            />
          </div>

          {/* ── Scroll cue (fades out after first scroll via CSS) ── */}
          {/* <div className="srs-scroll-cue" id="srs-scroll-cue">
            <svg width="18" height="28" viewBox="0 0 18 28" fill="none">
              <rect
                x="1"
                y="1"
                width="16"
                height="26"
                rx="8"
                stroke="rgba(201,169,110,0.5)"
                strokeWidth="1.2"
              />
              <rect
                x="7.5"
                y="5"
                width="3"
                height="6"
                rx="1.5"
                fill="rgba(201,169,110,0.7)"
              />
            </svg>
            <p>scroll to reveal</p>
          </div> */}
        </div>
      </div>
    </>
  );
}
"use client";

import { useRef, useState, useEffect, useCallback, MouseEvent, TouchEvent } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OverlayContent {
  eyebrow?: string;
  heading: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

interface ImageComparisonSliderProps {
  leftImage: string;
  rightImage: string;
  leftAlt?: string;
  rightAlt?: string;
  leftOverlay?: OverlayContent;
  rightOverlay?: OverlayContent;
  initialPosition?: number; // 0–100
  height?: string; // e.g. "600px", "80vh"
  className?: string;
}

// ─── Sub-component: Overlay ───────────────────────────────────────────────────

function Overlay({ content, side }: { content: OverlayContent; side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <div
      className={`absolute bottom-0 ${isLeft ? "left-0" : "right-0"} p-8 md:p-14 z-10 max-w-md pointer-events-none select-none`}
    >
      {content.eyebrow && (
        <p
          className="text-[11px] uppercase tracking-[0.3em] font-medium mb-3 opacity-80"
          style={{ color: "#e8d5b0", fontFamily: "'Cormorant Garamond', serif" }}
        >
          {content.eyebrow}
        </p>
      )}
      <h2
        className="text-3xl md:text-5xl font-light leading-[1.1] mb-4"
        style={{ color: "#f5efe4", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.01em" }}
      >
        {content.heading}
      </h2>
      {content.description && (
        <p
          className="text-sm md:text-base leading-relaxed mb-6 opacity-75"
          style={{ color: "#d4c9b6", fontFamily: "'Cormorant Garamond', serif" }}
        >
          {content.description}
        </p>
      )}
      {content.buttonLabel && (
        <a
          href={content.buttonHref ?? "#"}
          className="pointer-events-auto inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-medium border border-current px-5 py-3 transition-all duration-300 hover:bg-white hover:text-black"
          style={{ color: "#e8d5b0", fontFamily: "'Cormorant Garamond', serif" }}
        >
          {content.buttonLabel}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ImageComparisonSlider({
  leftImage,
  rightImage,
  leftAlt = "Before",
  rightAlt = "After",
  leftOverlay,
  rightOverlay,
  initialPosition = 50,
  height = "90vh",
  className = "",
}: ImageComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const animFrameRef = useRef<number>(0);

  // ── Helpers ────────────────────────────────────────────────────────────────

  const getPercent = useCallback((clientX: number): number => {
    const el = containerRef.current;
    if (!el) return 50;
    const { left, width } = el.getBoundingClientRect();
    const percent = Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
    return percent;
  }, []);

  const updatePosition = useCallback((clientX: number) => {
    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(() => {
      setPosition(getPercent(clientX));
    });
  }, [getPercent]);

  // ── Mouse events ──────────────────────────────────────────────────────────

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setHasInteracted(true);
    updatePosition(e.clientX);
  };

  // ── Touch events ──────────────────────────────────────────────────────────

  const onTouchStart = (e: TouchEvent) => {
    setIsDragging(true);
    setHasInteracted(true);
    updatePosition(e.touches[0].clientX);
  };

  // ── Global listeners ──────────────────────────────────────────────────────

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (isDragging) updatePosition(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
        updatePosition(e.touches[0].clientX);
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseup", handleMouseUp, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, updatePosition]);

  // ── Cleanup ────────────────────────────────────────────────────────────────

  useEffect(() => () => cancelAnimationFrame(animFrameRef.current), []);

  // ── Idle hint animation ────────────────────────────────────────────────────

  const [hintActive, setHintActive] = useState(false);
  useEffect(() => {
    if (hasInteracted) return;
    const t1 = setTimeout(() => setHintActive(true), 1800);
    const t2 = setTimeout(() => setHintActive(false), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [hasInteracted]);

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');

        .ics-root { font-family: 'Cormorant Garamond', serif; }

        /* Divider line pulse */
        @keyframes ics-line-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        /* Handle breathe */
        @keyframes ics-breathe {
          0%, 100% { transform: translateX(-50%) scale(1); }
          50% { transform: translateX(-50%) scale(1.08); }
        }

        /* Hint slide */
        @keyframes ics-hint {
          0%   { transform: translateX(-50%) translateX(0px); }
          30%  { transform: translateX(-50%) translateX(-28px); }
          60%  { transform: translateX(-50%) translateX(28px); }
          100% { transform: translateX(-50%) translateX(0px); }
        }

        /* Arrows inside handle */
        @keyframes ics-arrows {
          0%, 100% { opacity: 0.7; gap: 8px; }
          50%       { opacity: 1;   gap: 12px; }
        }

        .ics-handle-arrows { display: flex; align-items: center; }
        .ics-dragging .ics-handle { box-shadow: 0 0 0 3px rgba(232,213,176,0.45), 0 8px 32px rgba(0,0,0,0.5); }
        .ics-dragging { cursor: col-resize; }

        .ics-hint-anim { animation: ics-hint 1.4s ease-in-out; }

        .ics-label-left, .ics-label-right {
          position: absolute;
          top: 24px;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(232,213,176,0.8);
          font-family: 'Cormorant Garamond', serif;
          font-weight: 500;
          pointer-events: none;
          z-index: 12;
          transition: opacity 0.4s ease;
        }
        .ics-label-left  { left: 28px; }
        .ics-label-right { right: 28px; }

        /* Grain overlay */
        .ics-grain::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 256px 256px;
          opacity: 0.18;
          mix-blend-mode: overlay;
        }

        .ics-divider-line {
          animation: ics-line-pulse 2.4s ease-in-out infinite;
        }

        .ics-handle:not(.ics-dragging-handle) {
          animation: ics-breathe 3s ease-in-out infinite;
        }
      `}</style>

      <div
        ref={containerRef}
        className={`ics-root ics-grain relative overflow-hidden select-none ${isDragging ? "ics-dragging" : ""} ${className}`}
        style={{ 
          width: "100%", 
          height, 
          cursor: isDragging ? "col-resize" : "default",
          touchAction: "none",
          userSelect: "none",
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* ── Right image (base layer — fully visible) ── */}
        <div className="absolute inset-0 z-0">
          <img
            src={rightImage}
            alt={rightAlt}
            className="w-full h-full object-cover"
            draggable={false}
            crossOrigin="anonymous"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/25 pointer-events-none" />
        </div>

        {/* Right overlay text */}
        {rightOverlay && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            <Overlay content={rightOverlay} side="right" />
          </div>
        )}

        {/* ── Left image (clipped reveal layer) ── */}
        <div
          className="absolute inset-0 z-20"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={leftImage}
            alt={leftAlt}
            className="w-full h-full object-cover"
            draggable={false}
            crossOrigin="anonymous"
            loading="lazy"
            style={{ minWidth: "100%", minHeight: "100%" }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/25 pointer-events-none" />

          {/* Left overlay text */}
          {leftOverlay && (
            <div className="absolute inset-0 pointer-events-none">
              <Overlay content={leftOverlay} side="left" />
            </div>
          )}
        </div>

        {/* ── BEFORE / AFTER labels ── */}
        <span
          className="ics-label-left"
          style={{ opacity: position > 12 ? 1 : 0 }}
        >
          {leftAlt}
        </span>
        <span
          className="ics-label-right"
          style={{ opacity: position < 88 ? 1 : 0 }}
        >
          {rightAlt}
        </span>

        {/* ── Divider ── */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          {/* Vertical line */}
          <div
            className="ics-divider-line absolute top-0 bottom-0"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              width: "1.5px",
              background: "linear-gradient(to bottom, transparent 0%, #e8d5b0 15%, #e8d5b0 85%, transparent 100%)",
            }}
          />

          {/* Decorative top + bottom diamonds */}
          {[0, 1].map((i) => (
            <div
              key={i}
              className="absolute"
              style={{
                [i === 0 ? "top" : "bottom"]: "14%",
                left: "50%",
                transform: "translateX(-50%) rotate(45deg)",
                width: 6,
                height: 6,
                background: "#e8d5b0",
                opacity: 0.6,
              }}
            />
          ))}

          {/* Handle */}
          <div
            className={`ics-handle ${isDragging ? "ics-dragging-handle" : ""} absolute top-1/2 pointer-events-auto`}
            style={{
              left: "50%",
              transform: `translateX(-50%) translateY(-50%)`,
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1a1610 0%, #2d2419 60%, #1a1610 100%)",
              border: "1.5px solid rgba(232,213,176,0.55)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(232,213,176,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "col-resize",
              transition: isDragging ? "none" : "box-shadow 0.3s ease",
            }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            {/* Arrow chevrons */}
            <svg width="28" height="16" viewBox="0 0 28 16" fill="none" style={{ pointerEvents: "none" }}>
              <path d="M9 3L4 8l5 5" stroke="#e8d5b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
              <path d="M19 3l5 5-5 5" stroke="#e8d5b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
              <line x1="14" y1="8" x2="14" y2="8" stroke="#e8d5b0" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
            </svg>
          </div>

          {/* Hint animation overlay on handle */}
          {hintActive && (
            <div
              className="ics-hint-anim absolute top-1/2 pointer-events-none"
              style={{
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)",
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(232,213,176,0.12)",
                border: "1.5px solid rgba(232,213,176,0.3)",
              }}
            />
          )}
        </div>

        {/* ── Drag prompt (fades after first interaction) ── */}
        {!hasInteracted && (
          <div
            className="absolute bottom-8 left-1/2 z-40 pointer-events-none"
            style={{
              transform: "translateX(-50%)",
              opacity: isHovering ? 0 : 0.6,
              transition: "opacity 0.4s ease",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#e8d5b0",
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              drag to compare
            </p>
          </div>
        )}
      </div>
    </>
  );
}
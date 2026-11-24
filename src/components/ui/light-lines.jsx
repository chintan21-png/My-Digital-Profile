import { memo, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { useIsMobile } from "../../hooks/useIsMobile";

/**
 * Full 17-track layout mapped proportionally from the 1920x1080 design grid.
 * Each track holds:
 *   - left: horizontal % position
 *   - width: crisp pixel thickness
 *   - dir: "down" | "up"
 *   - duration: base cycle duration in seconds (scaled by speedMultiplier)
 *   - delay: negative normalized phase [0..1) so streaks start mid-flight
 *   - segments: [topPct, heightPct] dashes along the vertical track
 */
const DESKTOP_TRACKS = [
  {
    id: "l13",
    left: "3.66%",
    width: "4px",
    dir: "down",
    duration: 14,
    delay: 0.18,
    segments: [
      [0, 5.26],
      [6.09, 0.43],
      [18.61, 1.5],
      [47.44, 0.75],
    ],
  },
  {
    id: "l8",
    left: "6.47%",
    width: "1px",
    dir: "down",
    duration: 19,
    delay: 0.62,
    segments: [
      [17.1, 5.45],
      [46.74, 0.9],
    ],
  },
  {
    id: "l9",
    left: "15.67%",
    width: "4px",
    dir: "up",
    duration: 16,
    delay: 0.41,
    segments: [
      [35.3, 1.6],
      [70.76, 3.94],
      [89.7, 10.3],
    ],
  },
  {
    id: "l17",
    left: "17.12%",
    width: "2px",
    dir: "up",
    duration: 11,
    delay: 0.77,
    segments: [
      [0, 4.47],
      [5.18, 0.37],
      [15.81, 1.27],
      [40.29, 0.63],
    ],
  },
  {
    id: "l16",
    left: "23.74%",
    width: "2px",
    dir: "down",
    duration: 21,
    delay: 0.25,
    segments: [
      [36.85, 10.14],
      [91.92, 1.68],
    ],
  },
  {
    id: "l1",
    left: "32.03%",
    width: "4px",
    dir: "up",
    duration: 12.5,
    delay: 0.53,
    segments: [
      [5.14, 6.36],
      [12.51, 0.52],
      [27.63, 1.81],
      [62.48, 0.91],
    ],
  },
  {
    id: "l5",
    left: "35.66%",
    width: "2px",
    dir: "down",
    duration: 15.5,
    delay: 0.09,
    segments: [
      [76.18, 0.35],
      [85.96, 2.13],
      [96.65, 3.35],
    ],
  },
  {
    id: "l3",
    left: "45.48%",
    width: "2px",
    dir: "up",
    duration: 10.5,
    delay: 0.34,
    segments: [
      [0, 2.91],
      [4.65, 1.06],
      [11.46, 0.37],
      [26.8, 2.23],
    ],
  },
  {
    id: "l4",
    left: "57.29%",
    width: "2px",
    dir: "down",
    duration: 13.5,
    delay: 0.71,
    segments: [
      [78.8, 1.69],
      [80.9, 0.39],
      [91.09, 0.76],
      [99.62, 0.38],
    ],
  },
  {
    id: "l15",
    left: "64.24%",
    width: "1px",
    dir: "down",
    duration: 18,
    delay: 0.46,
    segments: [
      [52.59, 4.3],
      [67.87, 2.73],
      [82.7, 0.45],
    ],
  },
  {
    id: "l2",
    left: "65.29%",
    width: "4px",
    dir: "up",
    duration: 14.5,
    delay: 0.14,
    segments: [
      [0, 2.34],
      [23.35, 3.93],
      [46.1, 1.66],
      [49.25, 0.75],
    ],
  },
  {
    id: "l7",
    left: "68.24%",
    width: "1px",
    dir: "down",
    duration: 20,
    delay: 0.85,
    segments: [
      [4.44, 8.58],
      [34.99, 5.45],
      [64.63, 0.9],
    ],
  },
  {
    id: "l14",
    left: "71.32%",
    width: "2px",
    dir: "down",
    duration: 12,
    delay: 0.57,
    segments: [
      [60.68, 0.58],
      [76.82, 3.51],
      [94.47, 5.53],
    ],
  },
  {
    id: "l6",
    left: "80.58%",
    width: "4px",
    dir: "down",
    duration: 17,
    delay: 0.29,
    segments: [
      [48.11, 1.29],
      [76.56, 3.16],
      [91.75, 8.25],
    ],
  },
  {
    id: "l12",
    left: "84.30%",
    width: "2px",
    dir: "down",
    duration: 13,
    delay: 0.66,
    segments: [
      [0, 4.72],
      [7.53, 1.73],
      [18.58, 0.59],
      [43.44, 3.61],
    ],
  },
  {
    id: "l11",
    left: "86.79%",
    width: "1px",
    dir: "down",
    duration: 22,
    delay: 0.37,
    segments: [
      [30.69, 0.9],
      [55.78, 5.45],
      [83.19, 8.58],
    ],
  },
  {
    id: "l10",
    left: "94.71%",
    width: "4px",
    dir: "up",
    duration: 15,
    delay: 0.82,
    segments: [
      [0, 4.47],
      [5.18, 0.37],
      [15.81, 1.27],
      [40.29, 0.63],
    ],
  },
];

/**
 * Curated 7-track subset distributed across mobile viewport width.
 * Keeps compositor layer count and fill-rate low on phones/tablets.
 */
const MOBILE_TRACKS = [
  { ...DESKTOP_TRACKS[2], id: "m1", left: "9%", width: "2px" },
  { ...DESKTOP_TRACKS[6], id: "m2", left: "22%", width: "1.5px" },
  { ...DESKTOP_TRACKS[5], id: "m3", left: "36%", width: "2.5px" },
  { ...DESKTOP_TRACKS[7], id: "m4", left: "50%", width: "1.5px" },
  { ...DESKTOP_TRACKS[8], id: "m5", left: "65%", width: "2px" },
  { ...DESKTOP_TRACKS[10], id: "m6", left: "78%", width: "2.5px" },
  { ...DESKTOP_TRACKS[13], id: "m7", left: "91%", width: "1.5px" },
];

/**
 * LightLines – GPU-composited animated vertical light streaks background.
 * Uses pure CSS @keyframes (translate3d) instead of a JS requestAnimationFrame
 * SVG mutation loop, and pauses automatically when off-screen or tab-hidden.
 *
 * Props:
 *   className        – extra CSS classes on the wrapper
 *   linesOpacity     – opacity of the static grid lines  (0-1, default 0.05)
 *   lightsOpacity    – opacity of the animated streaks   (0-1, default 0.9)
 *   speedMultiplier  – animation speed multiplier        (default 1)
 *   gradientFrom     – top gradient colour               (default "#2462F6")
 *   gradientTo       – bottom gradient colour            (default "#5999F8")
 *   lightColor       – streak fill colour                (default "#fff")
 *   lineColor        – static line fill colour           (default "#fff")
 *   children         – optional content overlaid on top
 */
export const LightLines = memo(function LightLines({
  className,
  linesOpacity = 0.05,
  lightsOpacity = 0.9,
  speedMultiplier = 1,
  gradientFrom = "#2462F6",
  gradientTo = "#5999F8",
  lightColor = "#fff",
  lineColor = "#fff",
  children,
}) {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  const [isActive, setIsActive] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);

    let inViewport = true;
    let tabVisible = !document.hidden;

    const syncActive = () => {
      setIsActive(inViewport && tabVisible);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        syncActive();
      },
      { threshold: 0, rootMargin: "60px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleVisibility = () => {
      tabVisible = !document.hidden;
      syncActive();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener("change", handleMotionChange);
    } else {
      motionQuery.addListener(handleMotionChange);
    }

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener("change", handleMotionChange);
      } else {
        motionQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  const tracks = isMobile ? MOBILE_TRACKS : DESKTOP_TRACKS;
  const safeSpeed = Math.max(speedMultiplier, 0.1);
  const shouldAnimate = isActive && !prefersReducedMotion;

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full flex justify-center overflow-hidden select-none",
        className
      )}
      style={{
        background: `linear-gradient(180deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        contain: "content",
      }}
      aria-hidden="true"
    >
      <div
        className={cn(
          "relative h-full shrink-0",
          isMobile ? "w-full" : "aspect-video min-w-full"
        )}
      >
        {/* Static vertical guide lines */}
        <div
          className="absolute inset-0"
          style={{ opacity: linesOpacity, contain: "layout style paint" }}
        >
          {tracks.map((track) => (
            <div
              key={`line-${track.id}`}
              className="absolute inset-y-0"
              style={{
                left: track.left,
                width: track.width,
                backgroundColor: lineColor,
              }}
            />
          ))}
        </div>

        {/* Animated light streaks (100% GPU compositor animation) */}
        {!prefersReducedMotion && (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ opacity: lightsOpacity }}
          >
            {tracks.map((track) => {
              const durationSec = track.duration / safeSpeed;
              const delaySec = -(track.delay * durationSec);

              return (
                <div
                  key={`light-${track.id}`}
                  className={
                    track.dir === "down"
                      ? "animate-light-streak-down absolute inset-y-0"
                      : "animate-light-streak-up absolute inset-y-0"
                  }
                  style={{
                    left: track.left,
                    width: track.width,
                    animationDuration: `${durationSec.toFixed(2)}s`,
                    animationDelay: `${delaySec.toFixed(2)}s`,
                    animationPlayState: shouldAnimate ? "running" : "paused",
                    willChange: shouldAnimate ? "transform" : "auto",
                  }}
                >
                  {track.segments.map(([topPct, heightPct], segIdx) => (
                    <span
                      key={segIdx}
                      className="absolute inset-x-0 block"
                      style={{
                        top: `${topPct}%`,
                        height: `${heightPct}%`,
                        backgroundColor: lightColor,
                      }}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {children && (
        <div className="pointer-events-auto relative z-10 w-full h-full">
          {children}
        </div>
      )}
    </div>
  );
});

export default LightLines;

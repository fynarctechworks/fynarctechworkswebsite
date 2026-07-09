"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// FluidGlass is WebGL (Three.js) — it can't server-render, so load it
// client-only with a branded fallback while the canvas boots.
const FluidGlass = dynamic(() => import("./FluidGlass"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center bg-ink">
      <span className="animate-pulse font-display text-sm uppercase tracking-[0.3em] text-white/40">
        Loading
      </span>
    </div>
  ),
});

// The lens follows the cursor, which doesn't exist on touch devices — and
// WebGL costs battery there. Phones get a static glow instead.
function useIsTouchOrSmall() {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return small;
}

export function FluidGlassHero({
  height = 560,
  className = "",
  showText = true,
  textOpacity = 1,
  showBlobs = false,
  fill = false,
}: {
  height?: number;
  className?: string;
  showText?: boolean;
  /** 0..1 — dim the in-glass wordmark so it reads as a watermark the lens warps. */
  textOpacity?: number;
  /** Show drifting light-blobs behind the glass (so the lens refracts, no text). */
  showBlobs?: boolean;
  /** Absolutely fill the parent instead of using a fixed height (for backgrounds). */
  fill?: boolean;
}) {
  const isTouchOrSmall = useIsTouchOrSmall();

  return (
    <div
      className={
        fill
          ? `absolute inset-0 ${className}`
          : `relative w-full overflow-hidden rounded-card bg-ink ${className}`
      }
      style={fill ? undefined : { height }}
    >
      {isTouchOrSmall ? (
        <div
          aria-hidden
          className="absolute inset-0 bg-ink"
          style={{
            background:
              "radial-gradient(60% 55% at 30% 35%, rgba(76,110,245,0.4) 0%, transparent 65%)," +
              "radial-gradient(55% 50% at 72% 60%, rgba(112,72,232,0.35) 0%, transparent 65%)," +
              "radial-gradient(45% 45% at 55% 25%, rgba(92,124,250,0.3) 0%, transparent 60%), #10141D",
          }}
        />
      ) : (
        <FluidGlass
          showText={showText}
          textOpacity={textOpacity}
          showBlobs={showBlobs}
          label="FYN ARC"
          sublabel="TECHWORKS"
          lensProps={{
            scale: 0.25,
            ior: 1.15,
            thickness: 5,
            chromaticAberration: 0.1,
            anisotropy: 0.01,
          }}
        />
      )}
    </div>
  );
}

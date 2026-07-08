"use client";

import dynamic from "next/dynamic";

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
  return (
    <div
      className={
        fill
          ? `absolute inset-0 ${className}`
          : `relative w-full overflow-hidden rounded-card bg-ink ${className}`
      }
      style={fill ? undefined : { height }}
    >
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
    </div>
  );
}

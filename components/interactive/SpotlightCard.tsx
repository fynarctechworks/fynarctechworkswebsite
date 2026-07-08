"use client";

import { useRef, type ReactNode } from "react";

// A card with a soft radial glow that follows the cursor across its surface.
// Uses CSS custom properties updated on mousemove — cheap, no re-renders.
export function SpotlightCard({
  children,
  className = "",
  glow = "16, 20, 29",
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    el.style.setProperty("--spot", "1");
  }
  function onLeave() {
    ref.current?.style.setProperty("--spot", "0");
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative overflow-hidden ${className}`}
      style={
        {
          "--mx": "50%",
          "--my": "50%",
          "--spot": "0",
        } as React.CSSProperties
      }
    >
      {/* Spotlight layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: "var(--spot)",
          background: `radial-gradient(240px circle at var(--mx) var(--my), rgba(${glow}, 0.12), transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

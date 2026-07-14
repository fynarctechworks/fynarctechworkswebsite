"use client";

import { type ReactNode } from "react";
import BorderGlow from "./BorderGlow";

// Static import so card CONTENT server-renders (dynamic ssr:false skipped the
// whole subtree inside client components, hiding it from crawlers). BorderGlow
// only touches canvas/pointer APIs inside useEffect, so SSR is safe.

type BorderGlowCardProps = {
  children: ReactNode;
  className?: string;
  /** Extra classes for the inner content wrapper (padding, layout). */
  innerClassName?: string;
  /** Card background — defaults to white; pass a dark value on dark sections. */
  backgroundColor?: string;
  glowColor?: string;
  colors?: string[];
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  edgeSensitivity?: number;
};

// A drop-in card shell with the cursor-reactive glowing border, tuned to the
// FYN ARC monochrome palette. Renders a plain bordered box until BorderGlow
// hydrates, so there's never an empty flash.
export function BorderGlowCard({
  children,
  className = "",
  innerClassName = "p-6",
  backgroundColor = "#ffffff",
  glowColor,
  colors,
  borderRadius = 10,
  glowRadius = 34,
  glowIntensity,
  edgeSensitivity,
}: BorderGlowCardProps) {
  return (
    <div className={`h-full ${className}`}>
      <BorderGlow
        className="h-full"
        backgroundColor={backgroundColor}
        borderRadius={borderRadius}
        glowRadius={glowRadius}
        {...(glowColor ? { glowColor } : {})}
        {...(colors ? { colors } : {})}
        {...(glowIntensity != null ? { glowIntensity } : {})}
        {...(edgeSensitivity != null ? { edgeSensitivity } : {})}
      >
        <div className={`h-full ${innerClassName}`}>{children}</div>
      </BorderGlow>
    </div>
  );
}

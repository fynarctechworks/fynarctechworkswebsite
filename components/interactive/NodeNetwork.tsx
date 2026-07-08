"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };

// Mouse-reactive particle constellation. Nodes drift, connect with lines when
// close, and both brighten + gently repel near the cursor. Visualizes the
// "connect people and technology" tagline. Canvas-based for performance.
export function NodeNetwork({
  className,
  color = "16, 20, 29", // brand blue, rgb components
  density = 0.00009, // nodes per px² (balanced)
  maxDist = 130, // px: max distance to draw a link
  intensity = 1, // motion multiplier
}: {
  className?: string;
  color?: string;
  density?: number;
  maxDist?: number;
  intensity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const context = canvasEl.getContext("2d");
    if (!context) return;
    // Non-null aliases so TypeScript keeps the narrowing inside nested closures.
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const parent = canvas.parentElement as HTMLElement;

    function seed() {
      const count = Math.min(
        90,
        Math.max(24, Math.floor(width * height * density))
      );
      const nodes: Node[] = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          // deterministic-ish spread; jitter via trig so no Math.random needed
          x: (Math.sin(i * 12.9898) * 43758.5453 % 1) * width,
          y: (Math.sin(i * 78.233) * 12543.983 % 1) * height,
          vx: (Math.cos(i * 3.7) * 0.25 + 0.15) * intensity,
          vy: (Math.sin(i * 5.1) * 0.25 + 0.12) * intensity,
        });
      }
      // normalize negatives into range
      nodes.forEach((n) => {
        n.x = Math.abs(n.x) % width;
        n.y = Math.abs(n.y) % height;
      });
      nodesRef.current = nodes;
    }

    function resize() {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function step() {
      ctx.clearRect(0, 0, width, height);
      const nodes = nodesRef.current;
      const m = mouseRef.current;

      for (const n of nodes) {
        // drift
        n.x += n.vx;
        n.y += n.vy;

        // wrap around edges
        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;

        // gentle cursor repulsion
        if (m.active) {
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const d2 = dx * dx + dy * dy;
          const r = 120;
          if (d2 < r * r && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = ((r - d) / r) * 0.6;
            n.x += (dx / d) * f;
            n.y += (dy / d) * f;
          }
        }
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            let alpha = (1 - dist / maxDist) * 0.5;
            // brighten links near the cursor
            if (m.active) {
              const mx = (a.x + b.x) / 2 - m.x;
              const my = (a.y + b.y) / 2 - m.y;
              const md = Math.sqrt(mx * mx + my * my);
              if (md < 160) alpha += (1 - md / 160) * 0.5;
            }
            ctx.strokeStyle = `rgba(${color}, ${Math.min(alpha, 0.9)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        let radius = 1.8;
        let alpha = 0.6;
        if (m.active) {
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const md = Math.sqrt(dx * dx + dy * dy);
          if (md < 160) {
            const boost = 1 - md / 160;
            radius += boost * 2;
            alpha += boost * 0.4;
          }
        }
        ctx.fillStyle = `rgba(${color}, ${Math.min(alpha, 1)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    }
    function onMouseLeave() {
      mouseRef.current.active = false;
    }

    resize();

    if (reduce) {
      // draw a single static frame, no animation loop
      step();
      cancelAnimationFrame(rafRef.current);
    } else {
      rafRef.current = requestAnimationFrame(step);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    window.addEventListener("mousemove", onMouseMove);
    parent.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      parent.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [color, density, maxDist, intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
    />
  );
}

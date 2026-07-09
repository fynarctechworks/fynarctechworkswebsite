"use client";

import { motion } from "framer-motion";
import { products } from "@/lib/content";

// Floating glow CTA pinned to the bottom-right of every page.
export function FloatingProducts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 right-6 z-40"
    >
      <a
        href={products.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block"
      >
        {/* Breathing glow halo */}
        <span
          aria-hidden
          className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[#4c6ef5] via-[#7048e8] to-[#4c6ef5] opacity-60 blur-md transition-opacity duration-300 animate-float-glow group-hover:opacity-90"
        />
        <span className="relative inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(16,20,29,0.6)] transition-transform duration-300 group-hover:-translate-y-0.5">
          {products.cta}
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </span>
      </a>
    </motion.div>
  );
}

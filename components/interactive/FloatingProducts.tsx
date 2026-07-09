"use client";

import { motion } from "framer-motion";
import ElectricBorder from "./ElectricBorder";
import { products } from "@/lib/content";

// Floating CTA pinned to the bottom-right of every page, wrapped in the
// React Bits ElectricBorder (animated electric outline).
export function FloatingProducts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6"
    >
      <a
        href={products.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block transition-transform duration-300 hover:-translate-y-0.5"
      >
        <ElectricBorder color="#4c6ef5" speed={1} chaos={0.12} borderRadius={999}>
          <span className="relative inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-white">
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
        </ElectricBorder>
      </a>
    </motion.div>
  );
}

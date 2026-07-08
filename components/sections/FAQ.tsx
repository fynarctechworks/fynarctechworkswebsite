"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { faq } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-mist py-24 md:py-32">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            FAQ
          </span>
          <h2 className="mt-6 font-display text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink md:text-[44px]">
            {faq.h2}
          </h2>
          <p className="mt-4 text-[17px] font-medium text-ink/80">
            {faq.subheading}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-ink/60">
            {faq.body}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-14 max-w-3xl">
          <div className="flex flex-col gap-3">
            {faq.items.map((item, i) => {
              const open = openIndex === i;
              return (
                <div
                  key={item.q}
                  className="overflow-hidden rounded-card border border-ink/[0.07] bg-white transition-colors duration-300 hover:border-ink/15"
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-[16px] font-medium text-ink">
                      {item.q}
                    </span>
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink/10 text-ink/60 transition-transform duration-300 ${
                        open ? "rotate-180 text-brand" : ""
                      }`}
                      aria-hidden
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-[15px] leading-relaxed text-ink/60">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col items-center gap-5 text-center">
            <p className="text-[15px] text-ink/60">
              Need more help? We&apos;re here to answer any questions you may have.
            </p>
            <Link href="/contact" className="btn-primary">
              Ask a Question
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

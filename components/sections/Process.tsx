"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { BorderGlowCard } from "@/components/interactive/BorderGlowCard";
import { process } from "@/lib/content";

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  // Scrub progress as the steps track passes through the viewport.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 60%"],
  });
  // Fill the connecting line from 0 → 100% across that range.
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-x">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {process.h2}
          </div>
          <h2 className="mt-6 font-display text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink md:text-[44px]">
            {process.subheading}
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink/60">
            {process.body}
          </p>
        </Reveal>

        <div ref={trackRef} className="relative mt-16 md:mt-20">
          {/* Desktop: horizontal track that fills with scroll */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-12 hidden h-[2px] overflow-hidden rounded-full bg-ink/[0.08] lg:block"
          >
            <motion.div
              style={{ width: fill }}
              className="h-full rounded-full bg-gradient-to-r from-brand/60 via-brand to-brand/60"
            />
          </div>

          {/* Mobile/tablet: vertical track that fills with scroll */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-8 left-[13px] top-8 w-[2px] overflow-hidden rounded-full bg-ink/[0.08] lg:hidden"
          >
            <motion.div
              style={{ height: fill }}
              className="w-full rounded-full bg-gradient-to-b from-brand/60 via-brand to-brand/60"
            />
          </div>

          <Stagger className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((step) => (
              <StaggerItem key={step.n} className="h-full">
                <BorderGlowCard
                  className="h-full transition-transform duration-300 hover:-translate-y-1"
                  innerClassName="group relative flex h-full flex-col p-7"
                >
                  <span className="font-display text-[56px] font-semibold leading-none tracking-[-0.03em] text-brand/20 transition-colors duration-300 group-hover:text-brand/40">
                    {step.n}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/60">
                    {step.desc}
                  </p>
                </BorderGlowCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { services } from "@/lib/content";
import { BorderGlowCard } from "@/components/interactive/BorderGlowCard";
import { Magnetic } from "@/components/interactive/Magnetic";

export function ServicesPreview() {
  return (
    <section className="bg-mist py-24 md:py-32">
      <div className="container-x">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Services
          </div>
          <h2 className="mt-6 font-display text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink md:text-[44px]">
            {services.h2}
          </h2>
          <p className="mt-5 text-[18px] font-medium leading-snug text-ink/80">
            {services.subheading}
          </p>
          <p className="mt-3 text-[16px] leading-relaxed text-ink/60">
            {services.body}
          </p>
        </Reveal>

        <Stagger className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service) => (
            <StaggerItem key={service.title} className="h-full">
              <BorderGlowCard
                className="h-full transition-transform duration-300 hover:-translate-y-1"
                innerClassName="flex h-full flex-col p-6"
              >
                <h3 className="text-lg font-semibold tracking-tight text-ink">
                  {service.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-[15px] leading-snug text-ink/60"
                    >
                      <span
                        aria-hidden
                        className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[10px] font-bold text-brand"
                      >
                        ✓
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </BorderGlowCard>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-14 flex justify-center">
          <Magnetic>
            <Link href="/feature" className="btn-ghost">
              View all services
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}

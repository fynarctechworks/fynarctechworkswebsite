"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { hero } from "@/lib/content";
import { CountUp } from "@/components/motion/CountUp";
import { NodeNetwork } from "@/components/interactive/NodeNetwork";
import { Magnetic } from "@/components/interactive/Magnetic";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[72px]">
      {/* Interactive node-network background — reacts to the cursor */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <NodeNetwork className="h-full w-full opacity-70" />
        {/* Fade the network toward the edges so text stays legible */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 40%, rgba(255,255,255,0) 30%, rgba(255,255,255,0.85) 78%, #fff 100%)",
          }}
        />
      </div>
      {/* Ambient brand glow, echoing the live hero's soft gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(16, 20, 29,0.12) 0%, rgba(16, 20, 29,0) 70%)",
        }}
      />
      <div className="container-x flex flex-col items-center pb-14 pt-16 text-center md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="eyebrow"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          Web · AI · Design, all in one place
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease }}
          className="mt-6 max-w-4xl text-balance font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-ink md:text-[64px]"
        >
          {hero.h1}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink/60 md:text-[19px]"
        >
          {hero.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Magnetic>
            <Link href={hero.primaryCta.href} className="btn-primary">
              {hero.primaryCta.label}
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href={hero.secondaryCta.href} className="btn-ghost">
              {hero.secondaryCta.label}
            </Link>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease }}
          className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-card border border-ink/[0.07] bg-ink/[0.06] sm:grid-cols-3"
        >
          {hero.stats.map((s) => (
            <div key={s.label} className="bg-white px-6 py-8">
              <div className="font-display text-[44px] font-semibold tracking-tight text-brand">
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-[14px] font-medium text-ink/60">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

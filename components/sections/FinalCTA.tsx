import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { finalCta } from "@/lib/content";
import { Magnetic } from "@/components/interactive/Magnetic";
import { FluidGlassHero } from "@/components/interactive/FluidGlassHero";

export function FinalCTA() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-card bg-ink text-white">
          {/* WebGL FluidGlass lens fills the panel — it refracts a colorful glow
              inside its own scene and follows the cursor. */}
          <FluidGlassHero fill showText={false} showBlobs />

          {/* Veil so the copy stays readable over the moving glass */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-ink/35"
          />

          {/* Content sits above the canvas. pointer-events-none on the wrapper so
              the lens still tracks the cursor; buttons re-enable pointer events. */}
          <div className="pointer-events-none relative px-6 py-20 md:px-16 md:py-28">
            <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[13px] font-medium tracking-tight text-white/90 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                {finalCta.subheading}
              </span>
              <h2 className="mt-6 font-display text-[40px] font-semibold leading-[1.08] tracking-[-0.03em] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.55)] md:text-[56px]">
                {finalCta.h2}
              </h2>
              <p className="mt-6 max-w-3xl font-display text-[22px] italic leading-relaxed text-white/90 drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)] md:text-[26px]">
                &ldquo;{finalCta.quote}&rdquo;
              </p>
              <p className="mt-5 text-sm text-white/70">{finalCta.attribution}</p>
              <div className="pointer-events-auto mt-10 flex flex-col items-center gap-3 sm:flex-row">
                <Magnetic>
                  {/* White pill so the primary CTA pops on the dark glass */}
                  <Link
                    href={finalCta.primaryCta.href}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-medium text-ink transition-all duration-300 hover:bg-white/90 hover:shadow-[0_10px_30px_-8px_rgba(255,255,255,0.35)] active:scale-[0.98]"
                  >
                    {finalCta.primaryCta.label}
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    href={finalCta.secondaryCta.href}
                    className="btn-ghost-dark"
                  >
                    {finalCta.secondaryCta.label}
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

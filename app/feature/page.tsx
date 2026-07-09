import { BorderGlowCard } from "@/components/interactive/BorderGlowCard";
import { Magnetic } from "@/components/interactive/Magnetic";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { services, products } from "@/lib/content";

export const metadata = { title: "Services" };

export default function FeaturePage() {
  return (
    <>
      {/* 1. Hero band */}
      <section className="relative overflow-hidden pt-[72px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(16, 20, 29,0.12) 0%, rgba(16, 20, 29,0) 70%)",
          }}
        />
        <div className="container-x flex flex-col items-center pb-20 pt-20 text-center md:pt-28">
          <Reveal className="flex flex-col items-center">
            <div className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Services
            </div>
            <h1 className="mt-6 max-w-4xl text-balance font-display text-[40px] font-semibold leading-[1.08] tracking-[-0.03em] text-ink md:text-[64px]">
              Our Services
            </h1>
            <p className="mt-6 max-w-2xl text-[18px] font-medium leading-snug text-ink/80 md:text-[20px]">
              {services.subheading}
            </p>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink/60 md:text-[17px]">
              {services.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. Full services grid */}
      <section className="bg-white pb-24 md:pb-32">
        <div className="container-x">
          <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.items.map((service) => (
              <StaggerItem key={service.title} className="h-full">
                <BorderGlowCard
                  className="h-full hover:-translate-y-1 transition-transform duration-300"
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
        </div>
      </section>

      {/* 3. Products */}
      <section className="bg-mist py-24 md:py-32">
        <div className="container-x">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <div className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Products
            </div>
            <h2 className="mt-6 font-display text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink md:text-[44px]">
              {products.h2}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 flex justify-center">
            <Magnetic>
              <a
                href={products.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {products.cta}
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* 4. Final CTA */}
      <FinalCTA />
    </>
  );
}

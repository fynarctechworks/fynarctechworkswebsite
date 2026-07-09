import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { whyChooseUs } from "@/lib/content";
import { BorderGlowCard } from "@/components/interactive/BorderGlowCard";
import { Magnetic } from "@/components/interactive/Magnetic";

export function WhyChooseUs() {
  return (
    <section className="bg-mist py-24 md:py-32">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Left: intro + CTA */}
        <Reveal className="max-w-xl">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {whyChooseUs.h2}
          </span>

          <h2 className="mt-6 text-balance font-display text-[36px] font-semibold leading-[1.12] tracking-[-0.02em] text-ink md:text-[44px]">
            {whyChooseUs.tagline}
          </h2>

          <p className="mt-6 text-[17px] leading-relaxed text-ink/60">
            {whyChooseUs.body}
          </p>

          <Magnetic className="mt-8 inline-block">
            <Link href={whyChooseUs.cta.href} className="btn-primary">
              {whyChooseUs.cta.label}
            </Link>
          </Magnetic>
        </Reveal>

        {/* Right: 2x2 stat grid */}
        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.1}>
          {whyChooseUs.stats.map((stat) => (
            <StaggerItem key={stat.title}>
              <BorderGlowCard
                className="h-full hover:-translate-y-1 transition-transform duration-300"
                innerClassName="p-6"
              >
                <div className="font-display text-[40px] font-semibold tracking-tight text-brand">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 font-semibold text-ink">{stat.title}</div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/60">
                  {stat.desc}
                </p>
              </BorderGlowCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

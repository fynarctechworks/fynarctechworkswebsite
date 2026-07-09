import type { Metadata } from "next";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FounderCard } from "@/components/interactive/FounderCard";
import { BorderGlowCard } from "@/components/interactive/BorderGlowCard";
import { about } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function AboutPage() {
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
        <div className="container-x flex flex-col items-center pb-14 pt-16 text-center md:pt-28">
          <Reveal className="flex flex-col items-center">
            <div className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {about.hero.eyebrow}
            </div>
            <h1 className="mt-6 max-w-4xl text-balance font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-ink md:text-[64px]">
              {about.hero.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink/60 md:text-[19px]">
              {about.hero.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. Mission */}
      <section className="bg-mist py-16 md:py-32">
        <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <Reveal>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {about.mission.title}
            </span>
            <h2 className="mt-6 text-balance font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-ink md:text-[44px]">
              {about.mission.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-display text-[22px] leading-relaxed tracking-[-0.01em] text-ink/70 md:text-[26px]">
              {about.mission.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. Values */}
      <section className="bg-white py-16 md:py-32">
        <div className="container-x">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <div className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {about.values.title}
            </div>
            <h2 className="mt-6 font-display text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink md:text-[44px]">
              What we stand for
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink/60">
              The principles that shape every decision, design, and line of code
              we ship.
            </p>
          </Reveal>

          <Stagger className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2">
            {about.values.items.map((item) => (
              <StaggerItem key={item.title} className="h-full">
                <BorderGlowCard
                  className="h-full transition-transform duration-300 hover:-translate-y-1"
                  innerClassName="group p-6"
                >
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/60">
                    {item.desc}
                  </p>
                </BorderGlowCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 4. Founder */}
      <section className="bg-mist py-16 md:py-32">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="eyebrow mx-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Leadership
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <div className="relative overflow-hidden rounded-card border border-white/10 bg-ink px-6 py-14 text-white md:px-12 md:py-16 lg:px-16">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(55% 60% at 50% 0%, rgba(255, 255, 255,0.06) 0%, rgba(255, 255, 255,0) 70%)",
                }}
              />
              <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,360px)_1fr] md:gap-14">
                {/* Holographic ProfileCard */}
                <FounderCard />

                {/* Founder copy */}
                <div className="text-center md:text-left">
                  <h2 className="font-display text-[28px] font-semibold leading-tight tracking-[-0.02em] text-white md:text-[36px]">
                    {about.founder.title}
                  </h2>
                  <p className="mt-3 text-lg font-semibold text-white">
                    {about.founder.name}
                  </p>
                  <p className="mt-1 text-[15px] font-medium text-white/60">
                    {about.founder.role}
                  </p>
                  <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/70">
                    {about.founder.bio}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Team */}
      <section className="bg-white py-16 md:py-32">
        <div className="container-x">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <div className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Our Team
            </div>
            <h2 className="mt-6 font-display text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink md:text-[44px]">
              {about.team.title}
            </h2>
          </Reveal>

          <Stagger className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
            {about.team.members.map((member) => (
              <StaggerItem key={member.name} className="h-full">
                <BorderGlowCard
                  className="h-full transition-transform duration-300 hover:-translate-y-1"
                  innerClassName="group flex h-full flex-col items-center p-6 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 font-display text-lg font-semibold tracking-tight text-brand">
                    {initials(member.name)}
                  </div>
                  <h3 className="mt-5 font-display text-base font-semibold tracking-tight text-ink">
                    {member.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/60">
                    {member.role}
                  </p>
                </BorderGlowCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 6. Roadmap */}
      <section className="bg-mist py-16 md:py-32">
        <div className="container-x">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <div className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Roadmap
            </div>
            <h2 className="mt-6 font-display text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink md:text-[44px]">
              {about.roadmap.title}
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink/60">
              {about.roadmap.subtitle}
            </p>
          </Reveal>

          <Stagger className="relative mx-auto mt-16 max-w-3xl md:mt-20">
            {/* Vertical timeline spine */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-[19px] top-2 w-px bg-gradient-to-b from-brand/30 via-ink/10 to-transparent md:left-[23px]"
            />
            <div className="flex flex-col gap-8">
              {about.roadmap.phases.map((phase, i) => (
                <StaggerItem key={phase.n} className="relative flex gap-6">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand font-display text-[15px] font-semibold text-white md:h-12 md:w-12 md:text-base">
                    {i + 1}
                  </div>
                  <BorderGlowCard
                    className="flex-1 transition-transform duration-300 hover:-translate-y-1"
                    innerClassName="p-6"
                  >
                    <div className="text-[13px] font-medium uppercase tracking-wide text-brand">
                      {phase.n}
                    </div>
                    <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-ink">
                      {phase.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink/60">
                      {phase.desc}
                    </p>
                  </BorderGlowCard>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </div>
      </section>

      {/* 7. Final CTA */}
      <FinalCTA />
    </>
  );
}

import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { testimonials } from "@/lib/content";

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Testimonials
          </span>
          <h2 className="mt-6 font-display text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink md:text-[44px]">
            {testimonials.h2}
          </h2>
          <p className="mt-4 text-[17px] font-medium text-ink/80">
            {testimonials.subheading}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-ink/60">
            {testimonials.intro}
          </p>
        </Reveal>

        <Stagger className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.items.map((t) => (
            <StaggerItem key={t.name}>
              <figure className="card flex h-full flex-col hover:-translate-y-1 hover:border-ink/15">
                <span
                  aria-hidden
                  className="font-display text-[56px] font-semibold leading-none text-brand"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-2 flex-1 text-[16px] leading-relaxed text-ink/80">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/[0.07] pt-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/10 text-[14px] font-semibold text-brand">
                    {initials(t.name)}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-semibold text-ink">{t.name}</span>
                    <span className="text-sm text-ink/50">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

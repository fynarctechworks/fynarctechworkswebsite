import { Reveal } from "@/components/motion/Reveal";
import { pitch } from "@/lib/content";

// Emphasize the three verbs in "Think It. Build It. Launch It."
function EmphasizedHeading({ text }: { text: string }) {
  const parts = text.split(/(Think|Build|Launch)/g);
  return (
    <>
      {parts.map((part, i) =>
        part === "Think" || part === "Build" || part === "Launch" ? (
          <span key={i} className="text-brand">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

export function Pitch() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-x flex flex-col items-center text-center">
        <Reveal className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          Our Promise
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-3xl text-balance font-display text-[36px] font-semibold leading-[1.1] tracking-[-0.03em] text-ink md:text-[52px]">
            <EmphasizedHeading text={pitch.h2} />
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink/60 md:text-[19px]">
            {pitch.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

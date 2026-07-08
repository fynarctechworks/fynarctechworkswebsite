import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

const socials: {
  label: string;
  href: string;
  icon: React.ReactNode;
}[] = [
  {
    label: "LinkedIn",
    href: site.socials.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden width="18" height="18">
        <path d="M4.98 3.5A2.5 2.5 0 0 0 2.5 6a2.5 2.5 0 0 0 2.48 2.5A2.5 2.5 0 0 0 7.5 6a2.5 2.5 0 0 0-2.52-2.5ZM3 9h4v12H3V9Zm6 0h3.8v1.64h.05c.53-1 1.83-2.05 3.76-2.05C20.6 8.59 22 10.27 22 13.5V21h-4v-6.66c0-1.59-.03-3.63-2.21-3.63-2.21 0-2.55 1.73-2.55 3.51V21H9V9Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: site.socials.instagram,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden width="18" height="18">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "X",
    href: site.socials.x,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden width="17" height="17">
        <path d="M18.9 2.5h3.3l-7.2 8.24L23.5 21.5h-6.6l-5.18-6.77L5.8 21.5H2.5l7.7-8.8L2 2.5h6.77l4.68 6.19L18.9 2.5Zm-1.16 17.03h1.83L7.34 4.38H5.38l12.36 15.15Z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: site.socials.facebook,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden width="18" height="18">
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: site.socials.whatsapp,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden width="18" height="18">
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.16-1.35a9.9 9.9 0 0 0 4.88 1.25h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.83 14.06c-.25.7-1.44 1.33-1.99 1.41-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.68-.62-2.96-1.28-4.9-4.26-5.05-4.46-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.59-.37.79-.37.2 0 .39 0 .57.01.18.01.43-.07.67.51.25.6.85 2.06.92 2.21.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.47.12.65-.07.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.13.07.72-.18 1.42Z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero band */}
      <section className="relative overflow-hidden pt-[72px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(16, 20, 29,0.12) 0%, rgba(16, 20, 29,0) 70%)",
          }}
        />
        <div className="container-x flex flex-col items-center pb-6 pt-20 text-center md:pt-24">
          <Reveal>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Contact
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl text-balance font-display text-[40px] font-semibold leading-[1.08] tracking-[-0.03em] text-ink md:text-[56px]">
              Let&rsquo;s Connect
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 font-display text-[20px] font-medium tracking-tight text-ink/80 md:text-[22px]">
              Get in Touch with Us
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink/60">
              Have a question, an idea, or a project in mind? Share the details and
              we&rsquo;ll get back to you with a clear path forward.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Two-column body */}
      <section className="py-16 md:py-24">
        <div className="container-x grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
          {/* LEFT — contact info */}
          <Reveal direction="right">
            <div className="rounded-card border border-ink/[0.07] bg-mist p-6 md:p-8">
              <h2 className="font-display text-[24px] font-semibold tracking-tight text-ink">
                Contact details
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/60">
                Reach us directly or connect on your preferred channel.
              </p>

              <div className="mt-8 flex flex-col gap-6">
                <div>
                  <div className="text-[13px] font-medium uppercase tracking-wide text-ink/50">
                    Email
                  </div>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-1 inline-block text-[16px] font-medium text-ink transition-colors hover:text-brand"
                  >
                    {site.email}
                  </a>
                </div>

                <div>
                  <div className="text-[13px] font-medium uppercase tracking-wide text-ink/50">
                    Phone
                  </div>
                  <a
                    href={site.phoneHref}
                    className="mt-1 inline-block text-[16px] font-medium text-ink transition-colors hover:text-brand"
                  >
                    {site.phone}
                  </a>
                </div>

                <div>
                  <div className="text-[13px] font-medium uppercase tracking-wide text-ink/50">
                    Location
                  </div>
                  <p className="mt-1 text-[16px] font-medium text-ink">
                    {site.location}
                  </p>
                </div>

                <div>
                  <div className="text-[13px] font-medium uppercase tracking-wide text-ink/50">
                    Follow us
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        title={s.label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand"
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT — form */}
          <Reveal direction="left" delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

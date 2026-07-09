import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/content";

const socials = [
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "Instagram", href: site.socials.instagram },
  { label: "X", href: site.socials.x },
  { label: "Facebook", href: site.socials.facebook },
  { label: "WhatsApp", href: site.socials.whatsapp },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            {/* Logo sits on a light chip so the dark circle stays visible on the dark footer */}
            <span className="grid h-9 w-9 place-items-center rounded-[9px] bg-white/90 p-1">
              <Image
                src="/fynarc_logo_mark.png"
                alt="FYN ARC Techworks logo"
                width={32}
                height={32}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="text-[17px] font-semibold uppercase tracking-[0.02em]">
              FYN ARC Techworks
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/60">
            We turn imagination into digital reality, from smooth designs to
            smart systems that think for you.
          </p>
          <p className="mt-4 text-[14px] text-white/50">{site.location}</p>
        </div>

        <div>
          <h4 className="text-[13px] font-semibold uppercase tracking-wider text-white/40">
            Navigate
          </h4>
          <ul className="mt-4 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[15px] text-white/70 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[13px] font-semibold uppercase tracking-wider text-white/40">
            Connect
          </h4>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-[15px] text-white/70 transition-colors hover:text-white"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.phoneHref}
                className="text-[15px] text-white/70 transition-colors hover:text-white"
              >
                {site.phone}
              </a>
            </li>
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] text-white/70 transition-colors hover:text-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-[13px] text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} FYN ARC Techworks. All rights reserved.</p>
          <p>Designing moments that connect people and technology.</p>
        </div>
      </div>
    </footer>
  );
}

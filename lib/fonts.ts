import { Alexandria, Instrument_Sans, Outfit } from "next/font/google";
import { GeistSans } from "geist/font/sans";

// Fonts pulled from the live site's <head>: Geist (primary/body) via the official
// geist package; Alexandria (display), Instrument Sans + Outfit (accents) via Google.
// GeistSans already exposes a --font-geist-sans variable; we alias it below.
export const geist = GeistSans;

export const alexandria = Alexandria({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-alexandria",
  display: "swap",
});

export const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument",
  display: "swap",
});

export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

// GeistSans.variable === "--font-geist-sans"; the rest set their own vars.
// We also map --font-geist to Geist so Tailwind's font-sans (which uses
// var(--font-geist)) resolves correctly — done via a wrapper class in layout.
export const fontVariables = `${geist.variable} ${alexandria.variable} ${instrument.variable} ${outfit.variable}`;

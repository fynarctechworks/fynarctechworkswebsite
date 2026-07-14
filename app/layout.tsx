import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingProducts } from "@/components/interactive/FloatingProducts";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default:
      "FYN ARC Techworks | Web Development, AI Solutions & Digital Design Company",
    template: "%s | FYN ARC Techworks",
  },
  description: site.metaDescription,
  icons: { icon: site.favicon },
  openGraph: {
    type: "website",
    url: site.domain,
    title:
      "FYN ARC Techworks | Web Development, AI Solutions & Digital Design Company",
    description: site.metaDescription,
    images: [site.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "FYN ARC Techworks | Web Development, AI Solutions & Digital Design Company",
    description: site.metaDescription,
    images: [site.ogImage],
  },
  // "/" resolves against metadataBase → homepage canonical. Every other route
  // overrides with its own path so Google indexes each page separately.
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: site.name,
  url: site.domain,
  logo: site.favicon,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Visakhapatnam",
    addressRegion: "Andhra Pradesh",
    addressCountry: "IN",
  },
  founder: { "@type": "Person", name: site.founder },
  sameAs: Object.values(site.socials),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingProducts />
      </body>
    </html>
  );
}

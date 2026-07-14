/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "framerusercontent.com" },
    ],
  },
  // three / @react-three ship untranspiled ESM — let Next transpile them.
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  async redirects() {
    return [
      // Route renamed /feature → /services; 301 preserves old links + SEO.
      { source: "/feature", destination: "/services", permanent: true },
    ];
  },
};

export default nextConfig;

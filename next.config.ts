import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Freebuff preview serves the app from its own origin, so Next must
  // allow that host for dev resources (HMR websocket). Without this, Next 16
  // blocks /_next/hmr cross-origin, hydration never boots and the page stays
  // hidden behind the scroll-reveal animations.
  allowedDevOrigins: ["3000-ih0r8nuos5l1pp2x6y3s4.e2b.app"],
};

export default nextConfig;

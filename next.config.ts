import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  async redirects() {
    return [
      { source: "/contact", destination: "/newsletter", permanent: true },
      { source: "/touch", destination: "/newsletter", permanent: true },
      { source: "/listen", destination: "/find-us", permanent: true },
      { source: "/music", destination: "/find-us", permanent: true },
    ];
  },
};

export default nextConfig;

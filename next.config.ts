import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/work/nike-athletehq",
        destination: "/work/athletehq",
        permanent: true,
      },
      {
        source: "/work/shopify-logistics",
        destination: "/work/shopify",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

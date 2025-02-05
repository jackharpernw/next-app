import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagestore.jpimedia.uk",
      },
    ],
  },
};

export default nextConfig;
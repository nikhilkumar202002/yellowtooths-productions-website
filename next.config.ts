import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.16.0.6"],
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yt.jinskadamthodu.com",
        pathname: "/storage/film_posters/**",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.16.0.6"],
  images: {
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

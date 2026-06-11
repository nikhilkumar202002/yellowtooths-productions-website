import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.16.0.6"],
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yt.jinskadamthodu.com",
        pathname: "/storage/film_posters/**",
      },
      {
        protocol: "https",
        hostname: "yt.jinskadamthodu.com",
        pathname: "/storage/client_logos/**",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //https://i.ibb.co.com/khHN7Pk/9780143454212.jpg
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;

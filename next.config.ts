import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      ...(config.watchOptions || {}),
      ignored: ["**/.cursor/**"],
    };
    return config;
  },
};

export default nextConfig;

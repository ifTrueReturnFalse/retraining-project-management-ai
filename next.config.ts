import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["llamaindex", "@llamaindex/mistral"]
};

export default nextConfig;

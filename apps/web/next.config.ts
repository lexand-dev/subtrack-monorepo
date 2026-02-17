import "@subtrack/env/web";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: false,
  reactCompiler: true,
  transpilePackages: ["shiki"],
};

export default nextConfig;

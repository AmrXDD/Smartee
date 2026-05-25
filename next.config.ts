import path from "node:path";
import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: false,
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
  experimental: {
    optimizePackageImports: ["motion", "lucide-react"],
  },
};

export default config;

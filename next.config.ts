import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone build output because cPanel Setup Node.js App requires a self-contained server directory
  output: "standalone",
};

export default nextConfig;

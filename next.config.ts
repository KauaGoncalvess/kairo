import type { NextConfig } from "next";

// GITHUB_PAGES=true é setado no workflow de deploy para servir sob /kairo
const onPages = process.env.GITHUB_PAGES === "true";
const repo = "kairo";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: onPages ? `/${repo}` : "",
  assetPrefix: onPages ? `/${repo}/` : undefined,
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Cabeçalhos de segurança (CSP etc.) vivem em vercel.json — export estático
  // não aplica headers do Next em runtime.
};

export default nextConfig;

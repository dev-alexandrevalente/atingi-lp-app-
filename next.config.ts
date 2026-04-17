import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_FUNNEL_VERSION: process.env.FUNNEL_VERSION || 'v1',
  },
  async rewrites() {
    return [
      {
        source: '/atingi-fnofd-0001-demo-mads-:version/Marca_Principal.png',
        destination: '/Marca_Principal.png',
      },
      {
        source: '/atingi-fnofd-0001-demo-mads-:version/mobile-user.png',
        destination: '/mobile-user.png',
      },
      {
        source: '/atingi-fnofd-0001-demo-mads-:version/marcas/:file*',
        destination: '/marcas/:file*',
      },
      {
        source: '/atingi-fnofd-0001-demo-mads-:version/analytics/',
        destination: '/analytics/',
      },
      {
        source: '/atingi-fnofd-0001-demo-mads-:version/analytics',
        destination: '/analytics/',
      },
    ];
  },
};

export default nextConfig;

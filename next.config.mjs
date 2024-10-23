/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, 
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all domains
      },
      {
        protocol: 'http',
        hostname: '**', // Allow all domains
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

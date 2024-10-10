/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        forceSwcTransforms: true,
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**', // Allow all domains
          },
        ],
      },
};

export default nextConfig;

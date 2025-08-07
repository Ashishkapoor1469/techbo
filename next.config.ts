import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['upload.wikimedia.org', 'raw.githubusercontent.com', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
        port: '',
        pathname: '/v2/resize:fit:720/**',
      },
      {
        protocol: 'https',
        hostname: 'media.daily.dev',
        port: '',
        pathname: '/image/upload/f_auto,q_auto/v1/posts/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.daily.dev',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        port: '',
        pathname: '/photo/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/photos/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        port: '',
        pathname: '/npm/shadcn-ui@latest/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.tailwindcss.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.org',
        port: '',
        pathname: '/photo-**',
      },
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
        port: '',
        pathname: '/image-vector/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/images?q=tbn:**',
      },
      {
        protocol: 'https',
        hostname: 'media2.dev.to',
        port: '',
        pathname: '/dynamic/image/**',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        port: '',
        pathname: '/dms/image/sync/v2/**',
      },
      {
        protocol: 'https',
        hostname: 'www.shadcn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kit.svelte.dev',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'remix.run',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nextjs.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'svelte.dev',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'remix.run',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'astro.build',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tailwindcss.com',
        port: '',
        pathname: '/docs/**',
      },
      {
        protocol: 'https',
        hostname: 'shadcn-ui.com',
        port: '',
        pathname: '/docs/**',
      },
      {
        protocol: 'https',
        hostname: 'zod.dev',
        port: '',
        pathname: '/**',
      },
        {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/**',
        },
        
    ],
  },
};

export default nextConfig;

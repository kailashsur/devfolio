import bundleAnalyzer from '@next/bundle-analyzer';
import nextMDX from '@next/mdx';
import rehypePlugins from './packages/rehype-plugins/dist/index.mjs'; // Correct import path
import remarkPlugins from './packages/remark-plugins/dist/index.mjs'; // Correct import path



/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: '/work',
      destination: '/work/skills-and-tools',
      permanent: false,
    },
    {
      source: '/docs',
      destination: '/docs/tailwindcss-accent',
      permanent: false,
    },
  ],
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
};


const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins,
    rehypePlugins,
    providerImportSource: '@mdx-js/react',
  },
});

export default withBundleAnalyzer(withMDX(nextConfig));


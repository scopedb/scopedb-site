import type { NextConfig } from "next"
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
import { rehypeHeadingIds, rehypeShiki } from '@astrojs/markdown-remark'
import remarkMdxFrontmatter from '@/plugins/remark-frontmatter-mdx'
import rehypeHeadingsMdx from '@/plugins/rehype-headings-mdx'
import scopeql from "@/shiki-scopeql-grammar.json"

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,

  options: {
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      remarkMdxFrontmatter,
    ],
    rehypePlugins: [
      rehypeHeadingIds,
      rehypeHeadingsMdx,
      [rehypeShiki, {
        theme: 'github-light',
        langs: [scopeql],
      }]
    ],
  }
});

export default withMDX(nextConfig)

initOpenNextCloudflareForDev();

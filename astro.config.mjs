import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import remarkDirective from "remark-directive";
import remarkCalloutDirectives from '@microflash/remark-callout-directives';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { defineConfig, passthroughImageService } from "astro/config";
import scopeql from "./shiki-scopeql-grammar.json";

// https://astro.build/config
export default defineConfig({
  site: "https://www.scopedb.io",
  integrations: [mdx({
    remarkPlugins: [remarkDirective, [remarkCalloutDirectives, {
      aliases: {
        info: "assert",
        commend: "tip"
      },
      callouts: {
        commend: {
          title: "Tip"
        },
        assert: {
          title: "Info"
        }
      }
    }]],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, {
        behavior: 'wrap',
        properties: {
          className: ['heading-anchor'],
          ariaLabel: 'Link to section'
        }
      }]
    ]
  }), sitemap(), react()],
  image: {
    service: passthroughImageService(),
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        external: [
          /^virtual:astro-expressive-code\//,
        ],
      },
    },
  },
  markdown: {
    remarkPlugins: [remarkDirective, [remarkCalloutDirectives, {
      aliases: {
        info: "assert",
        commend: "tip"
      },
      callouts: {
        commend: {
          title: "Tip"
        },
        assert: {
          title: "Info"
        }
      }
    }]],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, {
        behavior: 'wrap',
        properties: {
          className: ['heading-anchor'],
          ariaLabel: 'Link to section'
        }
      }]
    ],
    shikiConfig: {
      langs: [scopeql],
      theme: "github-light",
    },
  },
});

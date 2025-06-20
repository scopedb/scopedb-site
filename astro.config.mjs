import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import remarkDirective from "remark-directive";
import remarkCalloutDirectives from '@microflash/remark-callout-directives';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import devtoolsJson from "vite-plugin-devtools-json";
import {defineConfig, passthroughImageService} from "astro/config";
import scopeql from "./shiki-scopeql-grammar.json";

// https://astro.build/config
export default defineConfig({
    site: "https://www.scopedb.io",
    integrations: [react(), sitemap(), mdx()],
    vite: {
        plugins: [tailwindcss(), devtoolsJson()],
    },
    image: {
        service: passthroughImageService(),
    },
    markdown: {
        remarkPlugins: [remarkDirective, remarkCalloutDirectives],
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
            theme: 'github-light',
            langs: [scopeql],
        }
    },
});

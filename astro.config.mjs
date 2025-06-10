import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import remarkDirective from "remark-directive";
import remarkCalloutDirectives from '@microflash/remark-callout-directives';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import expressiveCode from "astro-expressive-code";
import devtoolsJson from "vite-plugin-devtools-json";
import {defineConfig} from "astro/config";
import scopeql from "./shiki-scopeql-grammar.json";

// https://astro.build/config
export default defineConfig({
    site: "https://www.scopedb.io",
    integrations: [
        react(),
        sitemap(),
        expressiveCode({
            themes: ['github-light'],
            shiki: {
                langs: [scopeql],
            },
        }), mdx()],
    vite: {
        plugins: [tailwindcss(), devtoolsJson()],
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
    },
});

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, passthroughImageService } from "astro/config";
import scopeql from "./shiki-scopeql-grammar.json";

// https://astro.build/config
export default defineConfig({
  site: "https://www.scopedb.io",
  integrations: [mdx(), sitemap(), react()],
  image: {
    service: passthroughImageService(),
  },
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      langs: [scopeql],
    },
  },
});

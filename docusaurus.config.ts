import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ScopeDB',
  favicon: 'brand-kit/favicon.svg',

  url: 'https://scopedb.io',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {},
        blog: {
          showReadingTime: true,
          blogSidebarCount: 0,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'brand-kit/centered-sign.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
    },
    navbar: {
      logo: {
        alt: 'ScopeDB Logo',
        src: 'brand-kit/horizontal-no-slogan-trimmed.svg',
      },
      items: [
        {type: 'docSidebar', docsPluginId: 'reference', sidebarId: 'reference', position: 'right', label: 'Reference'},
        {to: '/blog', label: 'Blog', position: 'right'},
        {to: '/contact', label: 'Contact', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright (c) 2024 ScopeDB, Inc. All rights reserved.`
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      }
    }
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'reference',
        path: 'reference',
        routeBasePath: 'reference',
        sidebarPath: './reference/sidebars.ts',
      },
    ],
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        indexBlog: false,
        language: ['en'],
        docsDir: ['reference'],
        docsRouteBasePath: ['reference'],
      } satisfies import("@easyops-cn/docusaurus-search-local").PluginOptions,
    ],
  ],

  scripts: [{src: 'https://plausible.io/js/script.js', defer: true, 'data-domain': 'scopedb.io'}],
};

export default config;

import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ScopeDB',
  favicon: 'brand-kit/favicon.svg',

  url: 'https://scopedb.io',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
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
        { to: 'https://docs.scopedb.io/reference/', label: 'Reference', position: 'right' },
        { to: '/blog', label: 'Blog', position: 'right' },
        { to: '/contact', label: 'Contact', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright (c) ${new Date().getFullYear()} ScopeDB Inc. All rights reserved.`
    },
    prism: {
      theme: prismThemes.github,
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      }
    }
  } satisfies Preset.ThemeConfig,

  plugins: [],
  themes: [],

  scripts: [{ src: 'https://plausible.io/js/script.js', defer: true, 'data-domain': 'scopedb.io' }],
};

export default config;

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
        docs: false,
        // TODO(tisonkun): uncomment when blogs get ready
        blog: false,
        // blog: {
        //   showReadingTime: true,
        // },
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
        {to: '/contact', label: 'Contact', position: 'right'},
        // TODO(tisonkun): uncomment when blogs get ready
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/scopedb/',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub Organization',
        },
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

  scripts: [{src: 'https://plausible.io/js/script.js', defer: true, 'data-domain': 'scopedb.io'}],
};

export default config;

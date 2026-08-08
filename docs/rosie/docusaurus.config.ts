import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const appUrl = process.env.APP_URL ?? 'http://localhost:3000';

const config: Config = {
  title: 'Rosie Documentation',
  tagline:
    'A multi-tenant, API-first platform to crawl, monitor, and archive web content at scale',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.rosie.dev',
  baseUrl: '/',

  organizationName: 'fafadiatech',
  projectName: 'rosie',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      type: 'text/css',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Rosie',
      logo: {
        alt: 'Rosie',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: `${appUrl}/login`,
          label: 'Log In',
          position: 'right',
          className: 'navbar-login',
        },
        {
          href: `${appUrl}/signup`,
          label: 'Get Started',
          position: 'right',
          className: 'navbar-get-started',
        },
      ],
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

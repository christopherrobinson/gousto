import { defineConfig, envField } from 'astro/config';
import icon from 'astro-icon';
import remarkDescription from 'astro-remark-description';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import Unimport from 'unimport/unplugin';
import { loadEnv } from 'vite';
import { excludedFiles, site } from './src/config';
import { remarkExternalLinks } from './src/helpers/remarkExternalLinks';
import { remarkReadingTime } from './src/helpers/remarkReadingTime';

const { GOUSTO_REFERRAL_CODE } = loadEnv(process.env.NODE_ENV, process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    imageService: 'compile',
  }),
  env: {
    schema: {
      FEATURE_FEATURED_PRODUCTS: envField.boolean({ access: 'public', context: 'server', default: false, optional: true }),
      GOOGLE_TAG_MANAGER_ID: envField.string({ access: 'public', context: 'client', optional: true }),
      GOUSTO_REFERRAL_CODE: envField.string({ access: 'public', context: 'client', optional: false }),
      SUPABASE_KEY: envField.string({ access: 'public', context: 'server', optional: false }),
      SUPABASE_URL: envField.string({ access: 'public', context: 'server', optional: false }),
    },
  },
  experimental: {
    chromeDevtoolsWorkspace: true,
    contentIntellisense: true,
    headingIdCompat: true,
    staticImportMetaEnv: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  image: {
    domains: ['images.gousto.wiki'],
  },
  integrations: [
    icon({ iconDir: './src/images/icons' }),
    sitemap({
      filter: (page) => {
        // Exclude paginated URLs (e.g., /something/2/)
        if (/\/\d+\/$/.test(page)) {
          return false;
        }

        return true;
      },
      namespaces: {
        video: false,
      },
    }),
    (await import('astro-compress')).default({
      CSS: true,
      HTML: false,
      Image: true,
      JavaScript: true,
      SVG: true,
    }),
  ],
  markdown: {
    remarkPlugins: [
      [remarkDescription, { name: 'excerpt' }],
      [remarkExternalLinks, {}],
      [remarkReadingTime, {}],
    ],
  },
  prefetch: {
    defaultStrategy: 'hover',
  },
  redirects: {
    '/signup': `https://www.gousto.co.uk/raf/?promo_code=${GOUSTO_REFERRAL_CODE}`,
  },
  site: site.url,
  trailingSlash: 'always',
  vite: {
    build: {
      rollupOptions: {
        external: [
          ...excludedFiles.map((src) => new URL(src, import.meta.url).pathname),
        ],
      },
    },
    plugins: [
      basicSsl(),
      tailwindcss(),
      Unimport.vite({
        dirs: [
          './src/components/**/*',
          './src/config/**/*',
          './src/helpers/**/*',
        ],
        dts: true,
        include: [/\.astro$/, /\.[jt]sx?$/],
        presets: [
          { from: 'astro:assets',          imports: [ 'getImage', 'Image' ] },
          { from: 'astro:components',      imports: [ 'Debug' ] },
          { from: 'astro:content',         imports: [ 'defineCollection', 'getCollection', 'getEntry', 'render', 'z' ] },
          { from: 'astro:transitions',     imports: [ 'ViewTransitions' ] },
          { from: 'astro/loaders',         imports: [ 'glob' ] },
          { from: 'astro-capo',            imports: [ 'Head' ] },
          { from: 'astro-icon/components', imports: [ 'Icon' ] },
          { from: 'string-strip-html',     imports: [ 'stripHtml' ] },
          { from: 'vitest',                imports: [ 'beforeEach', 'describe', 'expect', 'it', 'vi' ], condition: (filepath) => /\.test\.[jt]sx?$/.test(filepath) },
        ],
      }),
    ],
    server: {
      https: true,
    },
  },
});

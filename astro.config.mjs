import { defineConfig, envField, passthroughImageService } from 'astro/config';
import icon from 'astro-icon';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import Unimport from 'unimport/unplugin';
import { loadEnv } from 'vite';
import { site } from './src/config';

const { GOUSTO_REFERRAL_CODE } = loadEnv(process.env.NODE_ENV, process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  adapter: netlify({
    cacheOnDemandPages: true,
  }),
  env: {
    schema: {
      GOOGLE_TAG_MANAGER_ID: envField.string({ access: 'public', context: 'client', optional: true }),
      GOUSTO_REFERRAL_CODE: envField.string({ access: 'public', context: 'client', optional: false }),
      SUPABASE_KEY: envField.string({ access: 'public', context: 'client', optional: false }),
      SUPABASE_URL: envField.string({ access: 'public', context: 'client', optional: false }),
    },
  },
  experimental: {
    contentIntellisense: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  image: {
    domains: ['images.gousto.wiki'],
    service: passthroughImageService(),
  },
  integrations: [
    icon({ iconDir: './src/images/icons' }),
    sitemap(),
    (await import('astro-compress')).default({
      CSS: true,
      HTML: false,
      Image: true,
      JavaScript: true,
      SVG: true,
    }),
  ],
  // output: 'server',
  prefetch: {
    defaultStrategy: 'hover',
  },
  redirects: {
    '/signup': `https://www.gousto.co.uk/raf/?promo_code=${GOUSTO_REFERRAL_CODE}`,
  },
  site: site.url,
  trailingSlash: 'always',
  vite: {
    plugins: [
      basicSsl(),
      tailwindcss(),
      Unimport.vite({
        dirs: [
          './src/config/**/*',
          './src/helpers/**/*',
        ],
        dts: true,
        include: [/\.astro$/, /\.[jt]sx?$/],
        presets: [
          { from: 'astro:assets',          imports: [ 'getImage', 'Image' ] },
          { from: 'astro:components',      imports: [ 'Debug' ] },
          { from: 'astro:content',         imports: [ 'defineCollection', 'getEntry', 'getCollection', 'render', 'z' ] },
          { from: 'astro:transitions',     imports: [ 'ViewTransitions' ] },
          { from: 'astro/loaders',         imports: [ 'glob' ] },
          { from: 'astro-capo',            imports: [ 'Head' ] },
          { from: 'astro-icon/components', imports: [ 'Icon' ] },
          { from: 'string-strip-html',     imports: [ 'stripHtml' ] },
        ],
      }),
    ],
    server: {
      https: true,
    },
  },
});

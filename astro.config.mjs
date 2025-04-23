import { defineConfig, envField } from 'astro/config';
import icon from 'astro-icon';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";
import basicSsl from '@vitejs/plugin-basic-ssl';
import Unimport from 'unimport/unplugin';
import { site } from './src/config';

// https://astro.build/config
export default defineConfig({
  adapter: netlify({
    cacheOnDemandPages: true,
    imageCDN: false,
  }),
  env: {
    schema: {
      GOOGLE_TAG_MANAGER_ID: envField.string({ access: 'public', context: 'client', optional: true }),
      GOUSTO_REFERRAL_CODE: envField.string({ access: 'public', context: 'client', optional: true }),
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
  },
  integrations: [
    icon({ iconDir: './src/images/icons' }),
    sitemap(),
    (await import("astro-compress")).default({
      CSS: true,
      HTML: false,
      Image: true,
      JavaScript: true,
      SVG: true,
    }),
  ],
  prefetch: {
    defaultStrategy: 'hover',
  },
  site: site.url,
  trailingSlash: 'always',
  vite: {
    plugins: [
      basicSsl(),
      tailwindcss(),
      Unimport.vite({
        dirs: [
          './src/config/*',
          './src/helpers/*',
        ],
        dts: true,
        include: [/\.astro$/, /\.[jt]sx?$/],
        presets: [
          { from: 'astro:assets',          imports: [ 'getImage', 'Image' ] },
          { from: 'astro:components',      imports: [ 'Debug' ] },
          { from: 'astro:content',         imports: [ 'defineCollection', 'getCollection', 'render', 'z' ] },
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

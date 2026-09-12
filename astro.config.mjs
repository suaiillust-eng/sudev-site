// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * 公開先に合わせて site / base を変える。
 * - 独自ドメイン or ユーザーページ (suaiillust-eng.github.io) : base は '/' のまま
 * - プロジェクトページ (github.io/sudev-site/)              : BASE_PATH=/sudev-site/ npm run build
 */
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://suaiillust-eng.github.io',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap()],
});

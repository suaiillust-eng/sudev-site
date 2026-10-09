import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * 記事（SULab の涼葉が下書きし、運営者が手直ししたもの）。
 *
 * `src/content/articles/<slug>.md` を置くだけで、一覧（/articles）と個別ページ（/articles/<slug>）が増える。
 * ファイル名（拡張子なし）がそのまま URL になる。
 * 書き込むのは sns-marketing の確認画面の「承認してサイトに反映」（手で置いてもよい）。
 */
const articles = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    /** 一覧と OGP に出す短い説明（1〜2文）。 */
    description: z.string(),
    /** 公開日（YYYY-MM-DD）。一覧は新しい順。 */
    date: z.coerce.date(),
    /** 書き手。今は涼葉だけ。 */
    author: z.literal('suzuha').default('suzuha'),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { articles };

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * 記事（SULab の涼葉が下書きし、運営者が手直ししたもの）。涼葉の部屋の中に置く。
 *
 * `src/content/articles/<slug>.md` を置くだけで、一覧（/suzuha/articles）と個別ページ（/suzuha/articles/<slug>）が増える。
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
    /** 分類（2026-10-09）。`dev`（開発の話）/ `illustration`（イラスト紹介）。 */
    category: z.enum(['dev', 'illustration']).default('dev'),
    /** イラスト紹介の記事の絵（public/ 以下のパス）と説明。ギャラリーの絵と同じもの。 */
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    /** ギャラリーの絵の名前（src/content/gallery/<id>.json）。 */
    gallery: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

/**
 * 涼葉の部屋のギャラリー（AI で作った涼葉の絵）。
 *
 * `src/content/gallery/<id>.json` と、`public/suzuha/gallery/<id>.webp`・`<id>-thumb.webp` の組で 1 枚。
 * 書き込むのは sns-marketing の確認画面の「ギャラリー」の承認（画像の中の情報を消し、Web 用に変換してから置く）。
 */
const gallery = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/gallery' }),
  schema: z.object({
    /** 飾った日（YYYY-MM-DD）。 */
    date: z.coerce.date(),
    /** 涼葉の一言。 */
    comment: z.string(),
    /** 絵の説明（代替テキスト）。 */
    alt: z.string(),
    /** public/ 以下のパス。 */
    image: z.string(),
    thumb: z.string(),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    /** この絵を紹介した記事（src/content/articles/<slug>.md）。 */
    article: z.string().optional(),
  }),
});

export const collections = { articles, gallery };

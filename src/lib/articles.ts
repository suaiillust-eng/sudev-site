import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

/** 公開日の新しい順。 */
export async function listArticles(): Promise<Article[]> {
  const all = await getCollection('articles');
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** 2026-10-09 → 2026.10.09 */
export function formatDate(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

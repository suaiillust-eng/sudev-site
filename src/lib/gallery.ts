import { getCollection, type CollectionEntry } from 'astro:content';

export type GalleryItem = CollectionEntry<'gallery'>;

/** 飾った日の新しい順（同じ日はファイル名の逆順）。 */
export async function listGallery(): Promise<GalleryItem[]> {
  const all = await getCollection('gallery');
  return all.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime() || b.id.localeCompare(a.id),
  );
}

/**
 * ページの端に飾る絵を 1 枚選ぶ。ページのパスで決まる（同じページなら毎回同じ絵）。
 * 絵が無ければ undefined（絵の場所を出さない）。
 */
export function pickForPage(items: readonly GalleryItem[], path: string): GalleryItem | undefined {
  if (items.length === 0) return undefined;
  let hash = 0;
  for (const char of path) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return items[hash % items.length];
}

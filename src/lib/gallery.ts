import { getCollection, type CollectionEntry } from 'astro:content';

export type GalleryItem = CollectionEntry<'gallery'>;

/** 飾った日の新しい順（同じ日はファイル名の逆順）。 */
export async function listGallery(): Promise<GalleryItem[]> {
  const all = await getCollection('gallery');
  return all.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime() || b.id.localeCompare(a.id),
  );
}

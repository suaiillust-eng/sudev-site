import { getCollection, type CollectionEntry } from 'astro:content';
import { articleCategories } from '../data/suzuha';

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

/** 記事のカテゴリー（2026-10-17）。 */
export interface ArticleTopic {
  label: string;
  /** カテゴリーのページの URL の名前。カテゴリーが無い開発の話の記事は null（ページを持たない） */
  slug: string | null;
}

/**
 * 記事のカテゴリー。topic と topicSlug があればそれ。無ければ、イラスト紹介の記事は「イラスト紹介」（illustration）、
 * 開発の話の記事は今までどおり「開発の話」（カテゴリーのページは無い）。
 */
export function articleTopic(article: Article): ArticleTopic {
  const { topic, topicSlug, category } = article.data;
  if (topic !== undefined && topicSlug !== undefined) return { label: topic, slug: topicSlug };
  if (category === 'illustration') return { label: articleCategories.illustration, slug: 'illustration' };
  return { label: articleCategories.dev, slug: null };
}

export interface TopicSummary {
  label: string;
  slug: string;
  count: number;
  /** いちばん新しい記事の公開日 */
  latest: Date;
}

/** カテゴリーの一覧（ページを持つものだけ）。いちばん新しい記事の新しい順 */
export function listTopics(articles: readonly Article[]): TopicSummary[] {
  const map = new Map<string, TopicSummary>();
  for (const article of articles) {
    const topic = articleTopic(article);
    if (topic.slug === null) continue;
    const found = map.get(topic.slug);
    if (found === undefined) map.set(topic.slug, { label: topic.label, slug: topic.slug, count: 1, latest: article.data.date });
    else {
      found.count += 1;
      if (article.data.date > found.latest) found.latest = article.data.date;
    }
  }
  return [...map.values()].sort((a, b) => b.latest.getTime() - a.latest.getTime() || a.label.localeCompare(b.label, 'ja'));
}

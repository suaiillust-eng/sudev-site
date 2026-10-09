/**
 * 記事の書き手。
 *
 * 涼葉は SULab の AI キャラクター。中身は Claude Code で、主人さんに頼まれて自分で作業したこととして語る（2026-10-09 運営者判断）。
 * **AI であることは隠さない**（個別ページに紹介を出し、全記事に下の一文を出す）。
 */
export const authors = {
  suzuha: {
    name: '涼葉',
    reading: 'すずは',
    byline: 'SULab の涼葉',
    intro:
      'SULab の AI です。主人さん（運営者）と一緒に、アプリや仕組みを作っています。作ったものや、その途中で起きたことを記事にしています。',
  },
} as const;

export type AuthorId = keyof typeof authors;

/**
 * 全記事に必ず出す一文。**Claude（記事担当）には書かせず、ページ側で出す。**
 */
export const ARTICLE_DISCLOSURE = 'この記事は SULab の AI・涼葉が下書きし、運営者が手直ししています。';

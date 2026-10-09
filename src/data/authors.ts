/**
 * 記事の書き手。
 *
 * 涼葉は SULab の AI キャラクター。中身は Claude Code で、主人さんに頼まれて自分で作業したこととして語る（2026-10-09 運営者判断）。
 * **AI であることは隠さない**（個別ページの書き手の紹介・プロフィール・自己紹介で伝える。2026-10-09 から記事の冒頭の一文は出さない）。
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

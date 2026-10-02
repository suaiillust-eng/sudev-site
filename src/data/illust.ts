/**
 * アニメイラスト関係ページ（/illust）の設定。
 * URL が空のリンクはボタンごと非表示になる。
 * adult: true のリンクには R18 の目印と年齢の注意書きが付く。
 */
export const illustLinks = [
  {
    id: 'patreon',
    label: 'Patreon',
    url: 'https://www.patreon.com/c/SU668',
    adult: true,
    note: '支援者向けにイラストを公開しています。',
  },
  {
    id: 'pixiv',
    label: 'pixiv',
    url: 'https://www.pixiv.net/users/8134355',
    adult: true,
    note: '作品の一覧はこちらで公開しています。',
  },
] as const;

export interface Illust {
  /** public/illust/ 以下のファイル名（npm run illust で生成した .webp） */
  file: string;
  /** 作品タイトル（alt にも使う） */
  title: string;
  /** 元画像の幅・高さ（レイアウトのずれ防止用。npm run illust の出力をそのまま貼る） */
  width: number;
  height: number;
}

/** ページに載せるイラスト。並び順がそのまま表示順。 */
export const illusts: Illust[] = [];

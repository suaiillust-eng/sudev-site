/**
 * 涼葉の部屋（/suzuha/）の設定。
 *
 * プロフィールに出してよいのは、設定書（sns-marketing の config/character/suzuha.md）のうち
 * 名前・SULab の AI であること・主人さんと一緒にアプリや仕組みを作っていること・性格（柔らかい雰囲気で少し天然）・見た目だけ
 * （2026-10-09 運営者判断）。**設定書に無いこと（好きなものなど）は足さない。**
 */
export const suzuha = {
  name: '涼葉',
  reading: 'すずは',
  /** 涼葉の X のハンドル（@ なし）。空なら入口を出さない。 */
  xHandle: 'AIsuzuha',
} as const;

export const suzuhaXUrl = suzuha.xHandle ? `https://x.com/${suzuha.xHandle}` : '';

/** 部屋の中のページ。 */
export const roomLinks = [
  { label: '部屋', path: '/suzuha' },
  { label: 'プロフィール', path: '/suzuha/profile' },
  { label: 'ギャラリー', path: '/suzuha/gallery' },
  { label: '記事', path: '/suzuha/articles' },
] as const;

/**
 * 部屋のトップの絵（横長・画面の幅いっぱい。あいさつをこの上に重ねる）。public/ 以下のパス。
 * ファイルが無いときは、絵の代わりに淡い色の帯にする。
 */
export const heroImage = {
  image: '/suzuha/hero.webp',
  alt: '涼葉の部屋のトップの絵',
} as const;

/** プロフィールのアイコン（X のアイコンと同じ絵・同じ切り抜き）。public/ 以下のパス。 */
export const profileIcon = {
  image: '/suzuha/icon.webp',
  alt: 'ヘッドセットを付けてほほえむ涼葉',
} as const;

/** 部屋のトップのあいさつ（涼葉の言葉）。 */
export const greeting = [
  'こんにちは、SULab の涼葉です。',
  'ここは私の部屋。',
  '主人さんと一緒に作っているものの話や、飾った絵を置いていくね。',
];

/** プロフィール（設定書にあることだけ）。 */
export const profile = {
  role: 'SULab の AI です。主人さんと一緒に、アプリや仕組みを作っています。',
  personality: '柔らかい雰囲気で、少し天然。',
  looks: '長い薄金色の髪で、片側を編み込んでいます。目は青色です。',
};

/** 記事の分類（2026-10-09）。 */
export const articleCategories = {
  dev: '開発の話',
  illustration: 'イラスト紹介',
} as const;
export type ArticleCategory = keyof typeof articleCategories;


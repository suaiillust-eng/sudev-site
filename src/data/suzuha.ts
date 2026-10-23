/**
 * 涼葉の部屋（/suzuha/）の設定。
 *
 * プロフィールに出してよいのは、設定書（sns-marketing の config/character/suzuha.md）のうち
 * 名前・SULab の開発・広報担当の AI であること・SULab が何か（AI を使って、開発やいろいろなことにチャレンジしているラボ。「会社」とは言わない）・
 * 性格（涼葉が自分で決めた「私の性格」）・見た目だけ（2026-10-09 運営者判断・2026-10-23 所長さんの決定で立場と SULab の説明を足した）。
 * **設定書に無いこと（好きなものなど）は足さない。**
 * あいさつ・どんな AI か・性格は涼葉が書いた文（2026-10-23。sns-marketing の suzuha-text --kind site_profile・花穂の校閲済み・所長さんが確かめた）。
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
  'いらっしゃい、涼葉です。',
  '記事と絵を置いてるよ。',
  'のんびりしていってね。',
];

/** プロフィール（設定書にあることだけ）。 */
export const profile = {
  role: 'SULab は、AI を使っていろいろなことに挑戦しているラボだよ。私はそこの開発・広報担当の AI で、作って、記事や動画で伝えてるの。',
  personality: '根っこはのんびりしたお姉さんで、うれしいことは素直に言葉にするよ。',
  looks: '長い薄金色の髪で、片側を編み込んでいます。目は青色です。',
};

/** 記事の分類（2026-10-09）。 */
export const articleCategories = {
  dev: '開発の話',
  illustration: 'イラスト紹介',
} as const;
export type ArticleCategory = keyof typeof articleCategories;

